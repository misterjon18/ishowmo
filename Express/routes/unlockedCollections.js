import express from "express";
const unlockedCollectionsRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
import getUserPoints from "../points/getUserPoints.js";

const pool = connectDatabase();

// ADD RECORD OF USED POINTS
unlockedCollectionsRouter.post(
  "/unlocked-collections",
  auth,
  async (req, res) => {
    try {
      const { collector_id } = req.collector;
      const { paid_points, collection_id } = req.body;
      const points = await getUserPoints(collector_id);

      if (points >= paid_points) {
        const unlockedCollections = await pool.query(
          `INSERT INTO public.unlocked_collections (paid_points, collection_id ,collector_id)
          VALUES ($1, $2, $3)RETURNING *`,
          [paid_points, collection_id, collector_id]
        );
        res.status(200).json(unlockedCollections.rows);
      } else {
        res.status(400).send("Not Enough Points!");
      }
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  }
);

export default unlockedCollectionsRouter;
