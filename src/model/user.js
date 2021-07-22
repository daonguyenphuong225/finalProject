const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = require("./projectSchema");
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    code: String,
    token:String,
    idProject: [{
        type: Schema.Types.ObjectId,
        ref: "project",
    }, ],
    // idTask: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "task",
    // }, ],
}, { collection: "user" });

const User = mongoose.model("user", UserSchema);

User.prototype.addProject = async function(projectID) {
    const project = await projectSchema.findById(projectID);

    if (!project) throw Error("Not found post");

    this.project.push(projectID);
    await this.save();

    project.user = this._id;
    await project.save();
};

module.exports = User;