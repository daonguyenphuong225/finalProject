const express = require("express");
const router = express.Router();
const projectController = require("../controller/project");
const ProjectModel = require("../model/projectSchema");
const { checkAccount } = require("../middleware/auth")
router.get("/project", checkAccount, projectController.getList);
router.post("/project", projectController.createProject);

router.put("/project", projectController.updateProject);
router.delete("/project",projectController.deleteProject);
module.exports = router;