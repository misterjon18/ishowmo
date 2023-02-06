import { connectDatabase } from "./pool.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs/promises";

const pool = connectDatabase();
const app = express();
const PORT = 8000;

//Config
app.use(
  fileUpload({
    createParentPath: true,
  }) //to read req.files
);
app.use(cors()); //for connecting backend and frontend
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to database
pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server has started on http://localhost:${PORT}`);
    });
  }
});
import postLikesRouter from "./routes/postLikes.js";
import router from "./routes/users.js";
import collectionRouter from "./routes/collection.js";
import commentRouter from "./routes/comment.js";

import postsRouter from "./routes/posts.js";
app.use("/", postLikesRouter);
app.use("/", router);
app.use("/", collectionRouter);
app.use("/", commentRouter);
app.use("/", postsRouter);

app.get("/contact", async (req, res) => {
  try {
    res.setHeader("content-type", "text/html");
    const contactHTML = await fs.readFile("./views/contact.html");
    console.log("CONTACT PAGE");
    res.send(contactHTML);
  } catch (error) {
    console.log(error);
    res.end("Error Reading Page");
  }
});
app.get("/secret", (req, res) => {
  console.log("SECRET");
  res.status(403).end(); // 403 means Forbidden
});
app.get("*", (req, res) => {
  res.status(404).send("Sorry, we can't find the specified page :(");
});
// -----------
