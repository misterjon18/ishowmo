import express from "express";
const postsRouter = express.Router();
import { connectDatabase } from "../pool.js";
import { auth } from "../middleware/auth.js";
import path from "path";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 5);

const pool = connectDatabase();

// NOT WORKING ---------SEE ALL LATEST POSTS
postsRouter.get("/postslist", auth, async (req, res) => {
  try {
    console.log("POSTS WORKING!!!");
    const posts = await pool.query("SELECT * FROM posts");

    res.status(200).json(posts.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});
// // ------SEE OWN POSTS --- WORKING
postsRouter.get("/me/postslist", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    // const { id } = req.body;

    console.log(collector_id); // 6
    console.log("WORKING !!!!!");
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

//  WORKING ------SEE SPECIC POSTS ID
postsRouter.get("/posts/:postId", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const post_id = req.params.postId;
    console.log(post_id);
    console.log("WORKING !!!!!");
    const posts = await pool.query(
      "SELECT * FROM public.posts WHERE post_id = $1",
      [post_id]
    );
    res.status(200).json({ posts: posts.rows });
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

    console.log("POSTS  IS WORKING !!!");
    const source = req.files.source;
    // const uploadPath = process.cwd() + "/uploads/" + source.name;

    const publicPath = path.join(
      "uploads",
      "collectors",
      `${collector_id}`,
      `${nanoid()}${source.name}`
    );
    const uploadPath = path.join(process.cwd(), publicPath);

    console.log(source);
    console.log(uploadPath);

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
        collector_id
      )
      VALUES ($1, $2, $3) RETURNING *
      `,
      [publicPath, source.mimetype, collector_id]
    );
    res.status(201).json(newPosts.rows[0]);
    // 201 means CREATED
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
//  WORKING---- DELETE POST OF OWNER
postsRouter.delete("/me/posts/:postID", auth, async (req, res) => {
  try {
    const { collector_id } = req.collector;
    const post_id = req.params.postID;
    console.log(post_id);
    console.log(collector_id);
    const newPosts = await pool.query(
      `
  DELETE FROM posts 
  WHERE post_id =$1 AND collector_id = $2 `,
      [post_id, collector_id]
    );
    res.send(`posts with id :${post_id} succesfully deleted!`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export default postsRouter;
