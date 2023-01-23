import express from "express";
const reviewRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";

const pool = connectDatabase();

reviewRouter.get("/reviewlist", auth, async (req, res) => {
  try {
    console.log("REVIEW");
    const users = await pool.query("SELECT * FROM public.reviews");
    res.json(users.rows);
  } catch (error) {
    console.log(error);
  }
});

//Routes
reviewRouter.post("/review", auth, async (req, res) => {
  try {
    console.log("REVIEW  IS WORKING !!!");
    // const { collector_id: account_id } = req.collector;
    const { star_rating, collection_id } = req.body;

    const newReview = await pool.query(
      `
      INSERT INTO reviews (star_rating,
        collection_id
        )
      VALUES ($1, $2) RETURNING *
      `,
      [star_rating, collection_id]
    );
    res.json(newReview.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
reviewRouter.put("/review", auth, async (req, res) => {
  try {
    const { star_rating, id } = req.body;
    const newreview = await pool.query(
      `
    UPDATE reviews set star_rating =$1 
    WHERE id =$2 RETURNING *`,
      [star_rating, id]
    );
    res.json(newreview.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
reviewRouter.delete("/review", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const { id } = req.body;
    const newreview = await pool.query(
      `
  DELETE FROM reviews 
  WHERE account_id =$1 AND id = $2 RETURNING *`,
      [collector_id, id]
    );
    res.send(`review with id :${id} succesfully deleted!`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export default reviewRouter;
