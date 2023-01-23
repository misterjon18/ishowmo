import express from "express";
const commentRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
const pool = connectDatabase();

commentRouter.get("/comment", auth, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM public.comment");
    res.json(users.rows);
  } catch (error) {
    console.log(error);
  }
});

//Routes
commentRouter.post("/comment", auth, async (req, res) => {
  try {
    const { collector_id: account_id } = req.collector;
    const { comment, collection_id } = req.body;

    // front-end has access to account id of the collection

    const newComment = await pool.query(
      `
      INSERT INTO comments (comment,
        collection_id,
        account_id)
      VALUES ($1, $2, $3) RETURNING *
      `,
      [comment, collection_id, account_id]
    );
    res.json(newComment);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
commentRouter.put("/comment", auth, async (req, res) => {
  try {
    const { comment, id } = req.body;
    const newComment = await pool.query(
      `
    UPDATE comments set comment =$1 
    WHERE id =$2 RETURNING *`,
      [comment, id]
    );
    console.log(req.collector);
    res.json(newComment.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
commentRouter.delete("/comment", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const { id } = req.body;
    const newComment = await pool.query(
      `
  DELETE FROM comments 
  WHERE account_id =$1 AND id = $2 RETURNING *`,
      [collector_id, id]
    );
    res.send(`Comment with id :${id} succesfully deleted!`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export default commentRouter;
