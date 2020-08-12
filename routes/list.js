const express = require("express");
const listRouter = express.Router();

const { getList, addList, updateList, deleteList, showList} = require("../controllers/list");

listRouter.route("/:id")
  .get(showList)
  .delete(deleteList)
  .put(updateList);

listRouter.route("/")
  .get(getList)
  .post(addList);
  

module.exports = listRouter;