const List = require("../models/listModel");
const Task = require("../models/taskModel");
const axios = require("axios");


// @desc   Get all from List
// @route  GET /api/v1/List
exports.getList = async (req, res, next) => {
    try {
      const list = await List.find();
      return res.status(200).json({
        success: true,
        data: list
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server error"
      });
    }
};

// @desc   Get one from List
// @route  GET /api/v1/List/:id
exports.showList = async (req, res, next) => {
    try {
        const list = await List.findById(req.params.id);
        if (!list) {
            res.status(404).json({
                success: false,
                error: "Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            data: list
        });
        
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server error"
      })
    }
}

// @desc   Get one from List
// @route  GET /api/v1/List/:id/tasks
exports.showListTasks = async (req, res, next) => {
  try {
      const list = await List.findById(req.params.id);
      if (!list) {
          res.status(404).json({
              success: false,
              error: "Not Found"
          });
      }

      const tasks = await Promise.all(list.tasks.map(async (task) => {
        let temp = await Task.findById(task);
        return temp.task;
        })
      );
      
      return res.status(200).json({
          success: true,
          data: tasks
      });
      
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}
  
// @desc   Add to List
// @route  POST /api/v1/List
exports.addList = async (req, res, next) => {
    try {
      const list = await List.create(req.body);
      return res.status(200).json({
        success: true,
        data: list
      });
    } catch (error) {
        console.log(error)
      res.status(500).json({
        success: false,
        error: "Server error"
      })
    }
}
  
// @desc   Update List
// @route  PUT /api/v1/List
exports.updateList = async (req, res, next) => {
    try {
      const { _id } = req.params.id;
      const newList = await List.findOneAndUpdate(
        { _id },
        req.body,
        { new: true }, // Return updated one
      );
      return res.status(200).json(newList);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server error"
      })
    }
}

// @desc   Delete List
// @route  DELETE /api/v1/List
exports.deleteList = async (req, res, next) => {
    try {
      const list = await List.findById(req.params.id);
      if (!list) {
        res.status(404).json({
          success: false,
          error: "Not Found"
        });
      }

      list.tasks.map(async (task) => {
        let rm = await Task.findById(task);
        await rm.remove();
      })

      list.remove();
      return res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server error"
          })
    }
}