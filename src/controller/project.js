const ProjectModel = require("../model/projectSchema");
const TaskModel = require('../model/taskSchema')
const UserModel = require('../model/user')


exports.getList = async function(req, res) {
    try {

            
        let projects = await ProjectModel.find({admin:req.session.userId})
        let users = await UserModel.find()

        let listData = {
            projects: projects,
            users: users,
            match: req.query,
        }
        res.render('project.ejs', listData)
    
      } catch (error) {
          res.json(error)
      }
};

exports.createProject = async function (req,res){
    try {
        let {title,detail,status,userId} = req.body

        let newProject = await ProjectModel.create({
            title: title,
            detail: detail,
            status:status,
            admin: userId
        })
        
        res.json('Tạo project thành công')
    } catch (error) {
        res.json(error)
    }
}
   

exports.updateProject = function(req, res) {
    try{
        const { id, detail, status, users, tasks } = req.body;
    ProjectModel.updateOne({ _id: id }, { detail: detail, status: status, users: users, tasks: tasks })
        .then(() => {
            res.redirect("/project");
        })
        .catch((err) => {
            res.json(err);
        });
    }catch(error){
        console.log(error);
    }
    
};

exports.deleteProject = function(req,res) {
    try {
        const id=req.body.id;
        ProjectModel.deleteOne({ _id: id })
        .then((data) => {
            res.json('Delete project thành công')
        })
        .catch((err) => {
            res.json(err)
        })
    } catch (error) {
        console.log(error)
    }
};