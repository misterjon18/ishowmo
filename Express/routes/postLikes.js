import express from "express";
const postLikesRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
const pool = connectDatabase();

// get all likes from that postid
postLikesRouter.get("posts/:postId/post-likes", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const users = await pool.query(
      "SELECT * FROM public.post_likes WHERE post_id = $1 ",
      [postId]
    );
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});
// GET OWN LIKE ON THAT POST -- WORKING
postLikesRouter.get("/me/post-likes", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;

    const postLikes = await pool.query(
      `SELECT * FROM post_likes WHERE collector_id = $1`,
      [collector_id]
    );

    res.json({ postLikes: postLikes.rows });
  } catch (error) {
    console.log(error);
  }
});
// POST A LIKE --- WORKING
postLikesRouter.post("/posts/:postId/likes", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const postId = req.params.postId;
    const users = await pool.query(
      `INSERT INTO post_likes(
      post_id,
      collector_id)VALUES ($1, $2)RETURNING *`,
      [postId, collector_id]
    );
    res.json(users.rows);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});
// DELETE LIKE ---WORKING
postLikesRouter.delete("/posts/:postId/likes", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const postId = req.params.postId;

    const deletedPost = await pool.query(
      `DELETE FROM post_likes WHERE post_id = $1 AND collector_id = $2`,
      [postId, collector_id]
    );

    if (deletedPost.rowCount > 0) {
      res.send(`post_like succesfully deleted!`);
    } else {
      res.status(404).send("post-like not found !!!");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
export default postLikesRouter;
