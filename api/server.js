const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.status(200).json({
    test: "Test Endpoint from Server",
    environment: process.env.NODE_ENV
  });
});

module.exports = server;
