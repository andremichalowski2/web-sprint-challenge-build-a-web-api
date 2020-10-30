const express = require('express'); //import
const router = express.Router(); //instantiate

const projects = require('../../data/helpers/projectModel'); //import functions

  //GET----------------------------------------------------------------//
  
  //GET PROJECTS

  router.get('/projects', (req, res) => {
    projects
      .get()
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((err) => {
        res.status(500).json({ message: "Error retreiving project" });
      });
  });

  //GET PROJECT BY ID

  router.get("/projects/:id", validateProjectId, (req, res) => {
    projects
      .get(req.params.id)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error retreiving project.",
        });
      });
  });

  //GET PROJECT ACTIONS

  router.get("/projects/:id/actions", validateProjectId, (req, res) => {
    projects
      .getProjectActions(req.params.id)
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error retreiving actions.",
        });
      });
  });


  //POST----------------------------------------------------------------//

  // POST PROJECT
  router.post("/projects", validateProjectData, (req, res) => {
    projects
      .insert(req.body)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error creating project.",
        });
      });
  });

  
  //PUT----------------------------------------------------------------//

  // CREATE PROJECT
  router.put(
    "/projects/:id", 
    validateProjectId,
    validateProjectData,
    (req, res) => {
      projects
        .update(req.params.id, req.body)
        .then((project) => {
          res.json(project);
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error updating.",
          });
        });
    }
  );

  //DELETE----------------------------------------------------------------//

  //DELETE PROJECT
  router.delete("/projects/:id", validateProjectId, (req, res) => {
    projects
      .remove(req.params.id)
      .then((project) => {
        res.json({
          message: `Project #${req.params.id} deleted.`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error deleting #${req.params.id} Please try again.`,
        });
      });
  });


//VALIDATION----------------------------------------------------------------//

// VALIDATE PROJECT ID
function validateProjectId(req, res, next) {
  projects
    .get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({
          message: `No project ID# ${req.params.id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving ID# ${req.params.id}.`,
      });
    });
}

// VALIDATE REQUIRED INFO EXISTS
function validateProjectData(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "Missing name or description data.",
    });
  } else {
    next();
  }
}


  router.get("/projectTest", (req, res) => {
    res.status(200).json({
      test: "Test Endpoint from Projects",
      environment: process.env.NODE_ENV
    });
  });

module.exports = router; //export