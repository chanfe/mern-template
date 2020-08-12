const express = require("express");
const taskRouter = express.Router();

const { getTask, showTask, addTask, updateTask, deleteTask } = require("../controllers/task");

taskRouter.route("/:id")
  .get(showTask)
  .delete(deleteTask)
  .put(updateTask);

taskRouter.route("/")
  .get(getTask)
  .post(addTask);
  

module.exports = taskRouter;