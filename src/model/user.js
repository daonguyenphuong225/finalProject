const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    code: String,
    idProject: [{
        type: Schema.Types.ObjectId,
        ref: "project",
    }, ],
    idTask: [{
        type: Schema.Types.ObjectId,
        ref: "task",
    }, ],
}, { collection: "user" });

const User = mongoose.model("user", UserSchema);

module.exports = User;