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
  router.get("/actions/:id", validateActionId, (req, res) => {
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
  router.post("/actions", validateActionData, (req, res) => {
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

  
  //PUT----------------------------------------------------------------//

  //UPDATE ACTION
  router.put("/actions/:id", validateActionId, (req, res) => {
    actions
      .update(req.params.id, req.body)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error updating action.",
        });
      });
  });

  //DELETE----------------------------------------------------------------//

  //DELETE ACTION
  router.delete("/actions/:id", validateActionId, validateActionData, (req, res) => {
    actions
      .remove(req.params.id)
      .then((action) => {
        res.status(200).json({
          message: "Action successfully deleted.",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error deleting action. Please try again.",
        });
      });
  });


  router.get("/actionsTest", (req, res) => {
    res.status(200).json({
      test: "Test Endpoint from Actions",
      environment: process.env.NODE_ENV
    });
  });


//VALIDATION----------------------------------------------------------------//

//VALIDATION ACTION ID
function validateActionId(req, res, next) {
  actions
    .get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({
          message: `No action ID#${req.params.id} can be found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retreiving action ID#${req.params.id}.`,
      });
    });
}

//VALIDATION ACTION DATA
function validateActionData(req, res, next) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    res.status(400).json({
      message: "Missing description or project_id.",
    });
  } else {
    next();
  }
}

module.exports = router; //export