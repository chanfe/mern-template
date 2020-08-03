const express = require("express");
const taskRouter = express.Router();

const { getTask, showTask, addTask, updateTask, deleteTask } = require("../controllers/task");

taskRouter.route("/:id")
  .get(showTask)
  .post(addTask)
  .delete(deleteTask);

taskRouter.route("/")
  .get(getTask);

module.exports = taskRouter;