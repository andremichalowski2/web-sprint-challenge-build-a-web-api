const express = require('express'); //import
const router = express.Router(); //instantiate

const projects = require('../../data/helpers/projectModel'); //import functions

  // router.get('/', (req, res) => {...}
  // router.get('/:id', (req, res) => {...}
  // router.post('/', (req, res) => {...}
  // router.delete('/:id', (req, res) => {...}
  // router.put('/:id', (req, res) => {...}

  router.get("/projectTest", (req, res) => {
    res.status(200).json({
      test: "Test Endpoint from Projects",
      environment: process.env.NODE_ENV
    });
  });

module.exports = router; //export