const ProjectModel = require("../model/projectSchema");
const TaskModel = require("../model/taskSchema");
const UserModel = require("../model/user");

exports.getList = async function (req, res) {
  try {
    let projects = await ProjectModel.find({ admin: req.session.userId });
    let usprojects = await ProjectModel.find({
      users: req.session.userId,
    });
    let users = await UserModel.find();
    let listData = {
      projects: projects,
      colaborator: usprojects,
      users: users,
      match: req.query,
    };
    // for (usprojects of listData.colaborator) {
    //   console.log(usprojects);
    // }
    res.render("project.ejs", listData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.createProject = async function (req, res) {
  try {
    let { title, detail, status, userId } = req.body;

    let newProject = await ProjectModel.create({
      title: title,
      detail: detail,
      status: status,
      admin: userId,
    });

    res.json("Tạo project thành công");
  } catch (error) {
    res.json(error);
  }
};

exports.updateProject = async function (req, res) {
  try {
    const { id, title, detail, status } = req.body;
    let updatProject = await ProjectModel.updateOne(
      { _id: id },
      { detail: detail, title: title, status: status }
    )
      .then((data) => {
        res.json(data);
        // res.redirect("/project");
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProject = async function (req, res) {
  try {
    const id = req.body.id;
    let deletproject = await ProjectModel.deleteOne({ _id: id })
      .then((data) => {
        res.json("Delete project thành công");
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    console.log(error);
  }
};
