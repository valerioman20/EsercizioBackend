import express from "express";
import Post from "../models/Post.js"; // Importa il modello Post

const router = express.Router();

// Rotta per ottenere tutti i post con paginazione
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "createdAt";
    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
    const skip = (page - 1) * limit;

    const posts = await Post.find({})
      .sort({ [sort]: sortDirection })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rotta per ottenere un singolo post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post non trovato" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rotta per creare un nuovo post
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rotta per aggiornare un post
router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rotta per eliminare un post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post eliminato" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rotta per cercare i post in base al titolo
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.title;
    const posts = await Post.find({ title: new RegExp(searchQuery, 'i') });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
