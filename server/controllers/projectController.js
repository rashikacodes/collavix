const projectService = require("../services/projectService");

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await projectService.createProject({
      workspaceId: req.params.id,
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create project",
      error: err.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects =
      await projectService.getProjectsForWorkspace(
        req.params.id
      );

    res.status(200).json({
      projects,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch projects",
      error: err.message,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project =
      await projectService.getProjectById(
        req.params.projectId
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch project",
      error: err.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project =
      await projectService.updateProject(
        req.params.projectId,
        req.body
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update project",
      error: err.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project =
      await projectService.deleteProject(
        req.params.projectId
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete project",
      error: err.message,
    });
  }
};