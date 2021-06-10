const ProjectModel = require("../model/projectSchema");

exports.getList = function (req, res) {
  let match = {};
  ProjectModel.find(match)
    .then((data) => {
      let rs = {
        projectes: data,
        match: req.query,
      };
      res.render("project.ejs", rs);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createProject = async (body) => {
  try {
    const newProject = await ProjectModel.create({ ...body });
    return newProject;
  } catch (error) {}
};

exports.updateProject = function (req, res) {
  const { id, detail, status, users, tasks } = req.body;
  ProjectModel.updateOne(
    { _id: id },
    { detail: detail, status: status, users: users, tasks: tasks }
  )
    .then(() => {
      res.redirect("/project");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteProject = async (projectid) => {
  try {
    console.log(projectid);
    const result = await ProjectModel.destroy({ where: { _id: projectid } });
    return result;
  } catch (error) {}
};
