const express = require("express");
const server = express();
const projectsRouter = require('../Routers/projects/projectsRouter.js');
const actionsRouter = require('../Routers/actions/actionsRouter.js');

server.use(express.json());
server.use(projectsRouter);
server.use(actionsRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    test: "Test Endpoint from Server",
    environment: process.env.NODE_ENV
  });
});

module.exports = server;
