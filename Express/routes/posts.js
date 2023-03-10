import express from "express";
const postsRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
import path from "path";
import { customAlphabet } from "nanoid"; //for generating random characters for files with same name
const nanoid = customAlphabet("1234567890abcdef", 5);

const pool = connectDatabase();

// WORKING ---------SEE ALL LATEST POSTS
postsRouter.get("/posts", auth, async (req, res) => {
  try {
    const posts = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    res.status(200).json({ posts: posts.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});
// // ------SEE OWN POSTS --- WORKING
postsRouter.get("/me/posts", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;

    const posts = await pool.query(
      "SELECT * FROM public.posts WHERE collector_id = $1",
      [collector_id]
    );
    res.status(200).json({ posts: posts.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});
// // GET COLLECTION BY COLLECTION ID ----- WORKING
postsRouter.get("/collection-items/:collectionId", auth, async (req, res) => {
  try {
    const collectionId = req.params.collectionId;

    const posts = await pool.query(
      "SELECT * FROM public.posts WHERE collection_id = $1",
      [collectionId]
    );
    res.status(200).json({ posts: posts.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching collection" });
  }
});

//  WORKING ------SEE SPECIFIC POSTS ID
postsRouter.get("/posts/:postId", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const postId = req.params.postId;

    const [postLikes, posts, likePost] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM post_likes WHERE post_id = $1", [
        postId,
      ]),
      pool.query("SELECT * FROM public.posts WHERE post_id = $1", [postId]),
      pool.query(
        "SELECT post_like_id FROM public.post_likes WHERE collector_id = $1 AND post_id = $2",
        [collector_id, postId]
      ),
    ]);

    res.status(200).json({
      post: posts.rows[0],
      likeCount: Number(postLikes.rows[0].count), //counts the total number of likes
      likePost: likePost.rowCount != 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

//Routes
// WORKING ---- POSTS IN POSTS TABLE
postsRouter.post("/posts", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;

    const collection_id = req.body.collection_id;
    const source = req.files.source;
    // const uploadPath = process.cwd() + "/uploads/" + source.name;
    if (collection_id != null) {
      const collection = await pool.query(
        "SELECT * FROM public.collection WHERE collection_id = $1 AND collector_id = $2",
        [collection_id, collector_id]
      );
      if (collection.rowCount === 0) {
        return res.status(404).send("Not found");
      }
    }
    const publicPath = path.join(
      "uploads",
      "collectors",
      `${collector_id}`,
      `${nanoid()}${source.name}`
    );
    const uploadPath = path.join(process.cwd(), publicPath);

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
        collector_id,
        collection_id
      )
      VALUES ($1, $2, $3, $4) RETURNING *
      `,
      [publicPath, source.mimetype, collector_id, collection_id]
    );
    res.status(201).json(newPosts.rows[0]);
    // 201 means CREATED
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//  WORKING---- DELETE POST OF OWNER
postsRouter.delete("/me/posts/:postId", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const postId = req.params.postId;
    const newPosts = await pool.query(
      `
      DELETE FROM posts 
      WHERE post_id =$1 AND collector_id = $2 `,
      [postId, collector_id]
    );
    res.send(`posts with id :${postId} succesfully deleted!`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export default postsRouter;
