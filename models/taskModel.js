const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  list:{
      type: Schema.Types.ObjectID, 
      ref: "List",
      required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", TaskSchema);