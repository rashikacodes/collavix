const Task = require("../models/Task");

exports.createTask = async ({
  projectId,
  title,
  description,
  status,
  priority,
  assignedTo,
  deadline,
  createdBy,
}) => {
  return Task.create({
    projectId,
    title,
    description,
    status,
    priority,
    assignedTo,
    deadline,
    createdBy,
  });
};

exports.getTasksForProject = async (projectId) => {
  return Task.find({ projectId }).sort({ createdAt: -1 });
};

exports.getTaskById = async (taskId) => {
  return Task.findById(taskId);
};

exports.updateTask = async (taskId, updates) => {
  const allowedUpdates = {
    title: updates.title,
    description: updates.description,
    status: updates.status,
    priority: updates.priority,
    assignedTo: updates.assignedTo,
    deadline: updates.deadline,
  };

  Object.keys(allowedUpdates).forEach((key) => {
    if (allowedUpdates[key] === undefined) {
      delete allowedUpdates[key];
    }
  });

  return Task.findByIdAndUpdate(
    taskId,
    allowedUpdates,
    {
      new: true,
      runValidators: true,
    }
  );
};

exports.deleteTask = async (taskId) => {
  return Task.findByIdAndDelete(taskId);
};