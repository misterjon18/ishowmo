import express from "express";
const collectionRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";

const pool = connectDatabase();

collectionRouter.get("/collection", auth, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM collection");
    res.json(users.rows);
  } catch (error) {
    console.log(error);
  }
});
//Routes

collectionRouter.post(
  "/collection",
  auth,

  async (req, res) => {
    try {
      const { collector_id } = req.collector;
      const file = req.files.picture;
      const { youtube_link } = req.body;

      const newCollection = await pool.query(
        `INSERT INTO collection (youtube_link,collector_id,picture,picture_name)
      VALUES ($1, $2,$3,$4) RETURNING *
      `,
        [youtube_link, collector_id, file.data, file.name]
      );
      res.json(newCollection.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);

collectionRouter.put("/collection", auth, async (req, res) => {
  try {
    const { id } = req.collector;
    const { youtube_link } = req.body;

    const newCollection = await pool.query(
      `UPDATE collection SET youtube_link = $1
       WHERE collector_id = $2
      RETURNING *`,
      [youtube_link, id]
    );
    res.json(newCollection.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

collectionRouter.delete("/collection", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const { id } = req.body;
    const newCollection = await pool.query(
      `
  DELETE FROM collection 
  WHERE account_id =$1 AND id = $2 RETURNING *`,
      [collector_id, id]
    );
    res.send(`Collection with id :${id} succesfully deleted!`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export default collectionRouter;
