import express from "express";
const collectionsRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";

const pool = connectDatabase();
// Lists collector collections ---- WORKING
collectionsRouter.get(
  "/collections/:collectorId/collectors",
  auth,
  async (req, res) => {
    try {
      const collectorId = req.params.collectorId;
      const users = await pool.query(
        `SELECT * FROM collection WHERE collector_id = $1`,
        [collectorId]
      );
      res.json(users.rows);
    } catch (error) {
      console.log(error);
    }
  }
);
//  Gets a specific collection ---WORKING
collectionsRouter.get("/collections/:collectionId", auth, async (req, res) => {
  try {
    const collectionId = req.params.collectionId;

    const users = await pool.query(
      `SELECT * FROM collection WHERE collection_id = $1`,
      [collectionId]
    );
    if (users.rowCount > 0) {
      res.json(users.rows);
    } else {
      res.status(404).send("Collection Not Found");
    }
  } catch (error) {
    console.log(error);
  }
});

// POSTING COLLECTIONS ----NOT WORKING
collectionsRouter.post(
  "/collections",
  auth,

  async (req, res) => {
    try {
      console.log("COLLECTIONS");
      const { collector_id } = req.collector;
      const file = req.files.picture;

      const newCollection = await pool.query(
        `INSERT INTO collection (collector_id,type,name)
      VALUES ($1, $2,$3,$4) RETURNING *
      `,
        [collector_id, file.data, file.name]
      );
      res.json(newCollection.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);
// Updates the collection name and type ----WORKING
collectionsRouter.put("/collections/:collectionId", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const collectionId = req.params.collectionId;
    const { name, type } = req.body;

    const newCollection = await pool.query(
      `UPDATE collection SET name = $1, type = $2
       WHERE collection_id = $3 AND collector_id = $4
      RETURNING *`,
      [name, type, collectionId, collector_id]
    );
    res.json(newCollection.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

collectionsRouter.delete(
  "/collections/:collectionId",
  auth,
  async (req, res) => {
    try {
      const { collector_id } = req.collector;
      const collectionId = req.params.collectionId;
      const newCollection = await pool.query(
        `
  DELETE FROM collection 
  WHERE collector_id =$1 AND collectionId = $2 RETURNING *`,
        [collector_id, collectionId]
      );
      if (newCollection.rowCount > 0) {
        res.send(`Collection with id :${collectionId} succesfully deleted!`);
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);

export default collectionsRouter;
