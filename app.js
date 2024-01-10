const express = require("express");
const logger = require("morgan");
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const postsRoutes = require('./routes/post.route');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use('/api', postsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

module.exports = app;
