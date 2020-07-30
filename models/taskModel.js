const mongoose = require('mongoose');
const Schema = mongoose.Schema


const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  list:{
      //this is not a Schema.Types.ObjectID because I cast the Art Model into a number instead
      type: Schema.Types.Number, 
      ref: "List"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);