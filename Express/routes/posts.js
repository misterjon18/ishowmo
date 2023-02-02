import express from "express";
const postsRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
import path from "path";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 5);

const pool = connectDatabase();

postsRouter.get("/postslist", auth, async (req, res) => {
  try {
    console.log("POSTS IS WORKING !!!");
    const userId = req.user.id;
    const posts = await pool.query(
      "SELECT * FROM public.posts WHERE user_id = $1",
      [userId]
    );
    res.status(200).json({ posts: posts.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});
//Routes
postsRouter.post("/posts", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;

    console.log("POSTS  IS WORKING !!!");
    const source = req.files.source;
    // const uploadPath = process.cwd() + "/uploads/" + source.name;

    const publicPath = path.join(
      "uploads",
      "collectors",
      `${collector_id}`,
      `${nanoid()}${source.name}`
    );
    const uploadPath = path.join(process.cwd(), publicPath);

    console.log(source);
    console.log(uploadPath);

    const err = await source.mv(uploadPath);
    if (err) {
      return res.status(500).send(err);
    }

    // -------EDIT FOR UPLOADING FILES TO BACKEND

    const newPosts = await pool.query(
      `
      INSERT INTO posts (
        source,
        type,
        collector_id
      )
      VALUES ($1, $2, $3) RETURNING *
      `,
      [publicPath, source.mimetype, collector_id]
    );
    res.status(201).json(newPosts.rows[0]);
    // 201 means CREATED
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
postsRouter.put("/posts", auth, async (req, res) => {
  try {
    const { star_rating, id } = req.body;
    const newreview = await pool.query(
      `
    UPDATE posts set star_rating =$1 
    WHERE id =$2 RETURNING *`,
      [star_rating, id]
    );
    res.json(newPosts.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
postsRouter.delete("/review", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const { id } = req.body;
    const newPosts = await pool.query(
      `
  DELETE FROM posts 
  WHERE account_id =$1 AND id = $2 RETURNING *`,
      [collector_id, id]
    );
    res.send(`posts with id :${id} succesfully deleted!`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export default postsRouter;
