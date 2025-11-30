const express = require("express");
const db = require("../models/db");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.query.sender_id) {
    return res
      .status(400)
      .json({ error: "sender_id query parameter is required" });
  }
  const posts = await db.Post.find({ senderId: req.query.sender_id });
  res.json(posts);
});

router.get("/all", async (_req, res) => {
  const allPosts = await db.Post.find();
  res.json(allPosts);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ error: `Post with id '${req.params.id}' not found` });
    }

    res.json(post);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, title, content } = req.body;

    if (!senderId || !title || !content) {
      return res
        .status(400)
        .json({ error: "senderId, title and content are required" });
    }

    const newPost = new db.Post({ senderId, receiverId, title, content });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { senderId, receiverId, title, content } = req.body;

    if (!senderId && !receiverId && !title && !content) {
      return res.status(400).json({ error: "No fields provided to update" });
    }

    const updatedPost = await db.Post.findByIdAndUpdate(
      req.params.id,
      { senderId, receiverId, title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ error: `Post with id '${req.params.id}' not found` });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
