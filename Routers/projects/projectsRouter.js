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

  router.get("/projects/:id", (req, res) => {
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

  router.get("/projects/:id/actions", (req, res) => {
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
  router.post("/projects", (req, res) => {
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






  // router.delete('/:id', (req, res) => {...}

  router.get("/projectTest", (req, res) => {
    res.status(200).json({
      test: "Test Endpoint from Projects",
      environment: process.env.NODE_ENV
    });
  });

module.exports = router; //export