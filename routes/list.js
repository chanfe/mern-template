const express = require("express");
const listRouter = express.Router();

const { getList, addList, updateList, deleteList, showList} = require("../controllers/list");

listRouter.route("/:id")
  .get(showList);

listRouter.route("/")
  .get(getList)
  .post(addList)
  .delete(deleteList)
  .put(updateList);

module.exports = listRouter;