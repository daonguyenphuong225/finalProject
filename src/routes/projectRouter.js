const express = require("express");
const router = express.Router();
const projectController = require("../controller/project");
const ProjectModel = require("../model/projectSchema");

router.get("/project", projectController.getList);
router.post("/project", async (req, res) => {
  const body = req.body;
  console.log(body);
  const data = await projectController.createProject(body);
  res.json({ data });
});
router.put("/project/:projectid", async (req, res) => {
  const body = req.body;
  const data = await projectController.updateProject(body);
  res.json([data]);
});
router.delete("/project/:projectid", async (req, res) => {
  const projectid = req.params.projectid;
  const data = await projectController.deleteProject(projectid);
  res.json({ data });
});
module.exports = router;
