const Task = require("../models/taskModel")
const List = require("../models/listModel")

// @desc   Get all from Task
// @route  GET /api/v1/Task
exports.getTask = async (req, res, next) => {
    try {
      const task = await Task.find();
      return res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      res.sendStatus(500).json({
        success: false,
        error: "Server error"
      });
    }
};

// @desc   Get one from Task
// @route  GET /api/v1/Task/:id
exports.showTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({
                success: false,
                error: "Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            data: task
        });
        
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server error"
      })
    }
}
  
// @desc   Add to Task
// @route  POST /api/v1/Task/
exports.addTask = async (req, res, next) => {
    try {
      const list = await List.findById(req.body.list);
      
      if (!list) {
        res.status(404).json({
            success: false,
            error: 'list Id Not Found'
        });
      }

      const task = await Task.create(req.body);

      list.tasks.push(task);
      list.save();

      return res.status(200).json({
        success: true,
        data: list
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Server error"
      })
    }
}
  
// @desc   Update Task
// -@route  PUT /api/v1/Task/
exports.updateTask = async (req, res, next) => {
    try {
      const { _id } = req.params.id;
      const newTask = await Task.findOneAndUpdate(
        { _id },
        req.body,
        { new: true }, // Return updated one
      );
      return res.status(200).json(newTask);
    } catch (error) {
      res.sendStatus(500).json({
        success: false,
        error: "Server error"
      })
    }
}

// @desc   Delete Task
// @route  DELETE /api/v1/Task/:id
exports.deleteTask = async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        res.status(404).json({
          success: false,
          error: "Not Found"
        });
      }
      let temp = await List.findById(task.list);

      const list = await List.updateOne(
        {_id: temp.list},
        {
          ...temp._doc,
          tasks: temp.tasks.filter((value) => {
            return value != task.id;
          })
        },
        { new: true },
      )

      // await task.remove();
      return res.status(200).json({
        success: true,
        data: list
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
          success: false,
          error: "unknown error"
        });
    }
}