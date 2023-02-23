import express from "express";
const collectionsRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";

const pool = connectDatabase();
// Lists collector collections ---- WORKING
collectionsRouter.get(
  "/collectors/:collectorId/collections",
  auth,
  async (req, res) => {
    try {
      const collectorId = req.params.collectorId;
      const users = await pool.query(
        `SELECT    cl.*
            , case 
            WHEN cl.type = 'public' THEN TRUE
            ELSE uc.unlocked_collection_ID IS NOT NULL 
            end AS has_unlocked
            FROM      collection cl
            LEFT JOIN unlocked_collections uc
            ON  cl.collection_id = uc.collection_id
            WHERE  cl.collector_id = $1;`,
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

// Get login user's own collection ----- WORKING
collectionsRouter.get("/me/collections", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;

    const collections = await pool.query(
      `SELECT * FROM collection WHERE collector_id = $1`,
      [collector_id]
    );

    res.json({ collections: collections.rows });
  } catch (error) {
    console.log(error);
  }
});

// Collection of specific collector
collectionsRouter.get(
  "/collectors/:collector_id/collection",
  auth,
  async (req, res) => {
    try {
      const collector_id = req.params.collector_id;

      const users = await pool.query(
        `SELECT * FROM collection WHERE collector_id = $1`,
        [collector_id]
      );
      if (users.rowCount > 0) {
        res.json(users.rows);
      } else {
        res.status(404).send("Collection Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// POSTING THE LOGIN USER'S COLLECTIONS ---- WORKING
collectionsRouter.post(
  "/collections",
  auth,

  async (req, res) => {
    try {
      const { collector_id } = req.collector;

      const { name, type, required_points } = req.body;
      const typeLowercase = type.toLowerCase();
      const points = typeLowercase === "public" ? 0 : required_points;
      const newCollection = await pool.query(
        `
      INSERT INTO collection
      (collector_id, type, name, required_points)
      VALUES 
      ($1, $2, $3, $4) RETURNING *
      `,
        [collector_id, type.toLowerCase(), name, points]
      );
      res.json(newCollection.rows);
    } catch (error) {
      console.log(error);
      if (error.constraint === "check_type") {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
);
// Updates the login user's collection name and type ----WORKING
collectionsRouter.put("/collections/:collectionId", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const collectionId = req.params.collectionId;
    const { name, type } = req.body;

    const newCollection = await pool.query(
      `UPDATE collection SET name = $1, type = $2
       WHERE collection_id = $3 AND collector_id = $4
      RETURNING *`,
      [name, type.toLowerCase(), collectionId, collector_id]
    );
    res.json(newCollection.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
// DELETE COLLECTION OF LOGIN USER  ------WORKING
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
        WHERE collector_id =$1 AND collection_id = $2 RETURNING *`,
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
