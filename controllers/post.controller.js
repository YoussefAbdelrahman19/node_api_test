const posts = require('../data/posts.json');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllPosts = asyncWrapper(async (req, res) => {
  res.status(200).json({ data: posts });
});

const getPostById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === parseInt(id, 10));
  if (!post) {
    return next(createCustomError(`No post with id: ${id}`, 404));
  }
  res.status(200).json({ data: post });
});

const getCommentsByPostId = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === parseInt(id, 10));
  if (!post) {
    return next(createCustomError(`No post with id: ${id}`, 404));
  }
  res.status(200).json({ data: post.comments || [] });
});

const getPostsByTag = asyncWrapper(async (req, res) => {
  const { name } = req.params;
  const filteredPosts = posts.filter(post => post.tags.includes(name));
  res.status(200).json({ data: filteredPosts });
});

const createPost = asyncWrapper(async (req, res) => {
  const { title, body, tags } = req.body;
  const newPost = { id: posts.length + 1, title, body, tags, comments: [] };
  posts.push(newPost);
  res.status(201).json({ data: newPost });
});

const updatePost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const postIndex = posts.findIndex(p => p.id === parseInt(id, 10));
  if (postIndex === -1) {
    return next(createCustomError(`No post with id: ${id}`, 404));
  }
  const updatedPost = { ...posts[postIndex], title, body, tags };
  posts[postIndex] = updatedPost;
  res.status(200).json({ data: updatedPost });
});

const deletePost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const postIndex = posts.findIndex(p => p.id === parseInt(id, 10));
  if (postIndex === -1) {
    return next(createCustomError(`No post with id: ${id}`, 404));
  }
  posts.splice(postIndex, 1);
  res.status(200).json({ msg: `Post with id: ${id} was deleted` });
});

module.exports = {
  getAllPosts,
  getPostById,
  getCommentsByPostId,
  getPostsByTag,
  createPost,
  updatePost,
  deletePost,
};
