import express from "express";
const router = express.Router();
import { connectDatabase } from "../pool.js";
import bcrypt from "bcryptjs";
import { generateJwt } from "../jwt/jwtGenerator.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const pool = connectDatabase();
import crypto from "crypto";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/send-email", async (req, res) => {
  try {
    // Check if email is existing
    const { email } = req.body;
    const result = await pool.query(
      `SELECT email FROM collector WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "email not found" });
    }
    //generate random password
    const newPassword = crypto
      .randomBytes(Math.ceil(10 / 2))
      .toString("hex")
      .slice(0, 10);

    console.log(newPassword);
    // Converting password to bcrypt

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    const user = await pool.query(
      `
          UPDATE collector set
    password = $1
    WHERE email =$2 RETURNING *`,
      [bcryptPassword, email]
    );

    transporter.sendMail(
      {
        from: "anthonydeleon135@gmail.com",
        to: email,
        subject: "Resetting your Password",
        text: "Your new password is  " + newPassword,
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send({ message: "password reset email sent" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});
router.get("/userlist", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM collector");
    res.json(users.rows);
  } catch (error) {
    console.log(error);
  }
});
//Routes
router.post("/register", upload.single("picture"), async (req, res) => {
  try {
    //take the username and password from the req.body
    const {
      first_name,
      last_name,
      email,
      street,
      city,
      province,
      zip,
      phone,
      birth_date,
      sex,
      country,
      password,
      username,
    } = req.body;

    //Check if the user is already existing
    const user = await pool.query(
      `SELECT * FROM collector WHERE
      username = $1`,
      [username]
    );

    if (user.rows.length > 0) {
      return res.status(401).send("User already exists");
    }

    //Setup Bcrypt for password hashing

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //Add the new user into the database
    //generate the uuid using the uuidv4() function
    const newUser = await pool.query(
      `
      INSERT INTO collector (first_name,
        last_name,
        email,
        street,
        city,
        province,
        zip,
        phone,
        birth_date,
        sex,
        country,
        password,
        username)
      VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *
      `,
      [
        first_name,
        last_name,
        email,
        street,
        city,
        province,
        zip === "" ? null : zip,
        phone,
        birth_date,
        sex,
        country,
        bcryptPassword,
        username,
      ]
    );

    //generate and return the JWT token
    const token = generateJwt(newUser.rows[0]);

    res.json({
      token,
      user: { username, email },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    //take the username and password from the req.body
    const { username, password } = req.body;

    //Check if the user is not existing
    const user = await pool.query(
      `SELECT * FROM collector WHERE
      username = $1`,
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(401).send("User does not exists");
    }

    //Check if the password matches using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password is incorrect");
    }

    //generate and return the JWT
    const token = generateJwt(user.rows[0]);
    res.json({
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
});
// provide the auth middleware
router.get("/verify", auth, async (req, res) => {
  try {
    //return the user object
    res.json(req.user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
});

// Cleaner syntax for routes
router
  .route("/:id") // localhost:8000/user/1
  .get(auth, async (req, res) => {
    try {
      const id = req.params.id;
      const users = await pool.query(
        `SELECT * FROM public.collector WHERE collector_id=$1`,
        [id]
      );
      if (users.rows.length === 0) {
        return res.status(401).send("Cannot get that user data");
      } else {
        res.json(users.rows);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
    // Reading id from the URL

    // res.send(`Get User With ID ${id}`);
  })
  .put(auth, async (req, res) => {
    try {
      const id = req.params.id;
      const newValue = req.body;
      const user = await pool.query(
        `
            UPDATE collector set  
      first_name = $1,
      last_name = $2,
      email = $3,
      street = $4,
      city = $5,
      province = $6,
      zip = $7,
      phone = $8,
      birth_date = $9,
      sex = $10,
      country = $11 
      WHERE collector_id =$12 RETURNING *`,
        [
          newValue.first_name,
          newValue.last_name,
          newValue.email,
          newValue.street,
          newValue.city,
          newValue.province,
          newValue.zip,
          newValue.phone,
          newValue.birth_date,
          newValue.sex,
          newValue.country,
          id,
        ]
      );
      res.json({
        msg: `Update User With ID ${req.params.id}`,
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .delete(auth, async (req, res) => {
    try {
      console.log(`DELETED`);
      const { collector_id } = req.collector;
      const id = req.params.id;
      if (id === collector_id) {
        const users = await pool.query(
          `DELETE FROM collector WHERE collector_id = $1`,
          [id]
        );
        res.json(users.rows);
      } else {
        res.send("Cannot delete another user's account");
      }
    } catch (error) {
      console.log(error.message);

      res.status(500).send(error.message);
    }
    // res.send(`Delete user With ID ${req.params.id}`);
  });

export default router;
