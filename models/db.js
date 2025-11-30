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

module.exports = { Post };
