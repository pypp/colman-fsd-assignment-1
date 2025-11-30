require("dotenv").config();

const express = require("express");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/post/", postsRouter);
app.use("/comments", commentsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
