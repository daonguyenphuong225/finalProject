const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/finalProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("connected");
  })
  .catch(function () {
    console.log("ERR");
  })
module.exports = mongoose