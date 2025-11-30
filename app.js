require("dotenv").config(); // <- move this to the top

const express = require("express");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/post/", postsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
