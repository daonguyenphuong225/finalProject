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
    users: {
      type: String,
      ref: "user",
    },
    tasks: {
      type: String,
      ref: "tasks",
    },
  },
  { collection: "project" }
);
let ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;
