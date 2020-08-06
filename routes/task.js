const express = require("express");
const taskRouter = express.Router();

const { getTask, showTask, addTask, updateTask, deleteTask } = require("../controllers/task");

taskRouter.route("/:id")
  .get(showTask);

taskRouter.route("/")
  .get(getTask)
  .post(addTask)
  .delete(deleteTask)
  .put(updateTask);

module.exports = taskRouter;