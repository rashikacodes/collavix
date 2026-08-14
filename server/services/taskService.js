const Task = require("../models/Task");

const getNextOrder = async (projectId, status) => {
  const lastTask = await Task.findOne({ projectId, status }).sort({ order: -1 });
  return lastTask ? lastTask.order + 1000 : 1000;
};

exports.createTask = async ({
  projectId, title, description, status, priority, assignedTo, deadline, createdBy,
}) => {
  const taskStatus = status || 'todo';
  const order = await getNextOrder(projectId, taskStatus);

  return Task.create({
    projectId, title, description, status: taskStatus, priority, assignedTo, deadline, createdBy, order,
  });
};
exports.getTasksForProject = async (projectId) => {
  return Task.find({ projectId }).sort({ status: 1, order: 1 }); 
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
exports.moveTask = async (taskId, { status, beforeTaskId, afterTaskId }) => {
  const task = await Task.findById(taskId);
  if (!task) {
    const err = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }

  const validateNeighbor = async (neighborId, label) => {
    if (!neighborId) return null;

    const neighbor = await Task.findById(neighborId);
    if (!neighbor) {
      const err = new Error(`${label} does not reference an existing task`);
      err.statusCode = 400;
      throw err;
    }
    if (neighbor.projectId.toString() !== task.projectId.toString()) {
      const err = new Error(`${label} does not belong to the same project`);
      err.statusCode = 400;
      throw err;
    }
    if (neighbor.status !== status) {
      const err = new Error(`${label} is not in the destination column`);
      err.statusCode = 400;
      throw err;
    }
    return neighbor;
  };

  const beforeTask = await validateNeighbor(beforeTaskId, 'beforeTaskId');
  const afterTask = await validateNeighbor(afterTaskId, 'afterTaskId');

  let newOrder;
  if (beforeTask && afterTask) {
    newOrder = (beforeTask.order + afterTask.order) / 2;
  } else if (beforeTask) {
    newOrder = beforeTask.order + 1000;
  } else if (afterTask) {
    newOrder = afterTask.order - 1000;
  } else {
    newOrder = 1000;
  }

  task.status = status;
  task.order = newOrder;
  await task.save();
  return task;
};