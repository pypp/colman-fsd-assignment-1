const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", postsRouter);
app.use("/", commentsRouter);

// health
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
