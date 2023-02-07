import express from "express";
const commentsRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
const pool = connectDatabase();

// GET ALL COMMENTS FROM THAT POST-----WORKING
commentsRouter.get("/posts/:postId/comments", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const users = await pool.query(
      "SELECT comment FROM public.comments WHERE post_id = $1",
      [postId]
    );
    res.json(users.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching comments" });
  }
});

//POST COMMENTS ON A SPECIFIC POST------ WORKING
commentsRouter.post("/posts/:postId/comments", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const postId = req.params.postId;
    const { comment } = req.body;
    const newComment = await pool.query(
      `
      INSERT INTO comments (comment,
        collector_id,
        post_id)
      VALUES ($1, $2, $3) RETURNING *
      `,
      [comment, collector_id, postId]
    );
    res.json(newComment);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
commentsRouter.patch(
  "/posts/:postId/comments/:comment_id",
  auth,
  async (req, res) => {
    try {
      const comment_id = req.params.comment_id;
      const postId = req.params.postId;
      const { collector_id } = req.collector;
      const { comment } = req.body;
      const newComment = await pool.query(
        `
    UPDATE comments set comment =$1 
    WHERE collector_id =$2 AND comment_id = $3 RETURNING *`,
        [comment, collector_id, comment_id]
      );
      console.log(req.collector);
      res.json(newComment.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);

// DELETING A COMMENT ON A SPECIFIC POST -----WORKING
commentsRouter.delete(
  "/posts/:postId/comments/:comment_id",
  auth,
  async (req, res) => {
    try {
      const { collector_id } = req.collector;
      const comment_id = req.params.comment_id;
      const postId = req.params.postId;

      const newComment = await pool.query(
        `
  DELETE FROM comments 
  WHERE collector_id =$1 AND comment_id = $2 RETURNING *`,
        [collector_id, comment_id]
      );
      if (newComment.rowCount > 0) {
        res.send(`Comment with id :${comment_id} succesfully deleted!`);
      } else {
        res.status(404).send("Already deleted");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);

export default commentsRouter;
