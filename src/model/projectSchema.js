const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["done", "undone"],
      required: true,
      trim: true,
    },
    admin: {
      type: String,
      required: true,
      trim: true,
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }],
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    }],
  },
  { collection: "project" }
);
let ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;
