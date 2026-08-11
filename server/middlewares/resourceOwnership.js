const Project = require('../models/Project');
const Task = require('../models/Task');

exports.verifyProjectInWorkspace = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project || project.workspaceId.toString() !== req.params.id) {
      return res.status(404).json({ message: 'Project not found in this workspace' });
    }
    req.project = project;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify project', error: err.message });
  }
};

exports.verifyTaskInProject = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task || task.projectId.toString() !== req.params.projectId) {
      return res.status(404).json({ message: 'Task not found in this project' });
    }
    req.task = task;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify task', error: err.message });
  }
};