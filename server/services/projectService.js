const Project = require("../models/Project");

exports.createProject = async ({
  workspaceId,
  title,
  description,
  createdBy,
}) => {
  return Project.create({
    workspaceId,
    title,
    description,
    createdBy,
  });
};

exports.getProjectsForWorkspace = async (workspaceId) => {
  return Project.find({ workspaceId }).sort({ createdAt: -1 });
};

exports.getProjectById = async (projectId) => {
  return Project.findById(projectId);
};

exports.updateProject = async (projectId, updates) => {
  const allowedUpdates = {
    title: updates.title,
    description: updates.description,
    status: updates.status,
  };

  Object.keys(allowedUpdates).forEach((key) => {
    if (allowedUpdates[key] === undefined) {
      delete allowedUpdates[key];
    }
  });

  return Project.findByIdAndUpdate(
    projectId,
    allowedUpdates,
    {
      new: true,
      runValidators: true,
    }
  );
};

exports.deleteProject = async (projectId) => {
  return Project.findByIdAndDelete(projectId);
};