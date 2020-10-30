const express = require('express'); //import
const router = express.Router(); //instantiate

const actions = require('../../data/helpers/actionModel'); //import functions

  // router.get('/', (req, res) => {...}
  // router.get('/:id', (req, res) => {...}
  // router.post('/', (req, res) => {...}
  // router.delete('/:id', (req, res) => {...}
  // router.put('/:id', (req, res) => {...}

  router.get("/actionsTest", (req, res) => {
    res.status(200).json({
      test: "Test Endpoint from Actions",
      environment: process.env.NODE_ENV
    });
  });

module.exports = router; //export