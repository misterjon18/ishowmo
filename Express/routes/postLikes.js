import express from "express";
const postLikesRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
import path from "path";
const pool = connectDatabase();

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
postLikesRouter.delete("/post-likes/:post_like_id", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const post_like_id = req.params.post_like_id;

    const deletedPost = await pool.query(
      `DELETE FROM post_likes WHERE post_like_id = $1 AND collector_id = $2`,
      [post_like_id, collector_id]
    );

    if (deletedPost.rowCount > 0) {
      res.send(`post_like with id :${post_like_id} succesfully deleted!`);
    } else {
      res.status(404).send("post-like not found !!!");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
export default postLikesRouter;
