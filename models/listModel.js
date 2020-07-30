const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ListSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  tasks:[{
      type: Schema.Types.ObjectId,
      ref: "Task"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('List', ListSchema);