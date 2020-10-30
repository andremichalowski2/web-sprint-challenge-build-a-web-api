const express = require('express'); //import
const router = express.Router(); //instantiate

const actions = require('../../data/helpers/actionModel'); //import functions


  //GET----------------------------------------------------------------//

  //GET ACTIONS
  router.get("/actions", (req, res) => {
    actions
      .get()
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error retrieving action.",
        });
      });
  });
  
  //GET ACTION BY ID
  router.get("/actions/:id", (req, res) => {
    actions
      .get(req.params.id)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error retrieving action.",
        });
      });
  });


  //POST----------------------------------------------------------------//

  //CREATE ACTION
  router.post("/actions", (req, res) => {
    actions
      .insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error creating action.",
        });
      });
  });


  // router.delete('/:id', (req, res) => {...}
  // router.put('/:id', (req, res) => {...}

  router.get("/actionsTest", (req, res) => {
    res.status(200).json({
      test: "Test Endpoint from Actions",
      environment: process.env.NODE_ENV
    });
  });

module.exports = router; //export