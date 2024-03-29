const express = require("express");
const logger = require("morgan");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const postsRoutes = require('./routes/post.route');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use('/api', postsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Error handling middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

module.exports = app;
