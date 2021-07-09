const TaskModel = require('../model/taskSchema')
const UserModel = require('../model/user')
const ProjectModel = require("../model/projectSchema");

exports.getList = async function (req, res) {

  try {
    let projectId = req.query.projectId
 
    let data = await TaskModel.find({projectId:projectId}).sort({ "priority": 1 })
    let users = await UserModel.find()
    let usersAccepted = await UserModel.find({idProject:projectId})
    console.log(usersAccepted);
    let project = await ProjectModel.findOne({_id:projectId})
   
    let listData = {
        users: users,
        usersAccepted:usersAccepted,
        listData: data,
        projectId:projectId,
        project:project,
        listStatus: [
            {
                title: 'To Do',
                value: 'toDo'
            },
            {
                title: 'Doing',
                value: 'doing'
            },
            {
                title: 'Done',
                value: 'done'
            }
        ]
    }
    res.render('task.ejs', listData)

  } catch (error) {
      
  }
}

exports.createTask = function (req, res) {
    let data = req.body


    TaskModel.create({
        title: data.title,
        priority: data.priority,
        status: data.status,
        projectId:data.projectId,
        userId:data.userId
    })
        .then((data) => {
            res.json('Tạo task thành công')
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.updateTask = function (req, res) {
    let { id, title, status, priority } = req.body

    TaskModel.updateOne({ _id: id }, { title: title, status: status, priority: priority })
        .then((data) => {
            res.json('Update task thành công')
        })
        .catch((err) => {
            res.json(err)
        })
}
exports.deleteTask = function (req, res) {
    let id = req.body.id
    TaskModel.deleteOne({ _id: id })
        .then((data) => {
            res.json('Delete task thành công')
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.addUser = async function (req, res) {
   try {
    let userId = req.body.userId
    let projectId = req.body.projectId
   await ProjectModel.updateOne(
        { _id: projectId },
        { $addToSet: { users:userId } }
      )
   await UserModel.updateOne(
        { _id: userId },
        { $addToSet: { idProject:projectId } }
      )
      res.json('Thêm user thành công')
   } catch (error) {
       res.json(error)
   }

}