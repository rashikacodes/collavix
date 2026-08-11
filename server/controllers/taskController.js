const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      assignedTo,
      deadline,
    } = req.body;

    const task = await taskService.createTask({
      projectId: req.params.projectId,
      title,
      description,
      status,
      priority,
      assignedTo,
      deadline,
      createdBy: req.user._id,
    });

    res.status(201).json({
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create task",
      error: err.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasksForProject(
      req.params.projectId
    );

    res.status(200).json({
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: err.message,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(
      req.params.taskId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch task",
      error: err.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.taskId,
      req.body
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update task",
      error: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(
      req.params.taskId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete task",
      error: err.message,
    });
  }
};