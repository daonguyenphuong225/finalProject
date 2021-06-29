const express = require("express");
const router = express.Router();
const projectController = require("../controller/project");
const ProjectModel = require("../model/projectSchema");

router.get("/project/:userId", projectController.getList);
router.get("/project/:projectId", async(req, res) => {
    const project = await ProjectModel.findById(req.params.projectId);
    if (project)
        return res.status(200).json({ Project: project._id });
    return res.status(400).json({ message: "Khong co" })

});
router.post("/project", async(req, res) => {
    const body = req.body;
    console.log(body);
    const data = await projectController.createProject(body);
    res.json({ data });
});
router.put("/project/:projectid", async(req, res) => {
    const body = req.body;
    const data = await projectController.updateProject(body);
    res.json([data]);
});
router.delete("/project/:projectid", async(req, res) => {
    const projectid = req.params.projectid;
    const data = await projectController.deleteProject(projectid);
    res.json({ data });
});
module.exports = router;