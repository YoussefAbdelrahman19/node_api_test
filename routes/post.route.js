  const express = require("express");
  const router = express.Router();
  const {
    getAllPosts,
    getPostById,
    getCommentsByPostId,
    getPostsByTag,
    createPost,
    updatePost,
    deletePost,
  } = require("../controllers/post.controller");

  router.route("/posts").get(getAllPosts).post(createPost);
  router.route("/posts/:id").get(getPostById).put(updatePost).delete(deletePost);
  router.get("/posts/:id/comments", getCommentsByPostId);
  router.get("/tags/:name", getPostsByTag);

  module.exports = router;
