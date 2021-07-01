const ProjectModel = require("../model/projectSchema");
const TaskModel = require('../model/taskSchema')
const UserModel = require('../model/user')


exports.getList = async function(req, res) {
    try {
        let id = req.params.id

        let userName=""
        
        let projects = await ProjectModel.find()
     
        let users = await UserModel.find()

      
        for(user of users){
            if(user._id == id){
                userName = user.username
              
            }
        }

        let listData = {
            projects: projects,
            users: users,
            userName: userName,
            match: req.query,
            id:id
        }
        res.render('project.ejs', listData)
    
      } catch (error) {
          res.json(error)
      }
};

exports.createProject = async function (req,res){
    try {
        let {title,detail,status} = req.body
        let id = req.params.id
        console.log(id);
        let newProject = await ProjectModel.create({
            title: title,
            detail: detail,
            status:status,
            admin: id
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