const express = require("express");
const { Comment } = require("../models/db");

const router = express.Router();

router.get("/all", async (_req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { postId, sender, text } = req.body;

    if (!postId || !sender || !text) {
      return res
        .status(400)
        .json({ error: "postId, sender, and text are required" });
    }

    const newComment = new Comment({ postId, sender, text });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { postId, sender, text } = req.body;

    if (!postId && !sender && !text) {
      return res.status(400).json({ error: "No fields provided to update" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { postId, sender, text },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res
        .status(404)
        .json({ error: `Comment with id '${req.params.id}' not found` });
    }

    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res
        .status(404)
        .json({ error: `Comment with id '${req.params.id}' not found` });
    }

    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
