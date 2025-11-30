const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PostSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  title: String,
  content: String,
});

const Post = mongoose.model("Post", PostSchema);

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  sender: { type: String, required: true },
  text: { type: String, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Post, Comment };
