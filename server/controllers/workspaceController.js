const workspaceService = require("../services/workspaceService");

exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await workspaceService.createWorkspace({
      name,
      description,
      ownerId: req.user._id,
    });

    res.status(201).json({
      workspace,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create workspace",
      error: err.message,
    });
  }
};

exports.getMyWorkspaces = async (req, res) => {
  try {
    const workspaces =
      await workspaceService.getWorkspacesForUser(
        req.user._id
      );

    res.status(200).json({
      workspaces,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch workspaces",
      error: err.message,
    });
  }
};

exports.getWorkspace = async (req, res) => {
  try {
    const workspace =
      await workspaceService.getWorkspaceById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      workspace,
      role: req.membership.role,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch workspace",
      error: err.message,
    });
  }
};

exports.updateWorkspace = async (req, res) => {
  try {
    const workspace =
      await workspaceService.updateWorkspace(
        req.params.id,
        req.body
      );

    res.status(200).json({
      workspace,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update workspace",
      error: err.message,
    });
  }
};

exports.deleteWorkspace = async (req, res) => {
  try {
    await workspaceService.deleteWorkspace(req.params.id);

    res.status(200).json({
      message: "Workspace deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete workspace",
      error: err.message,
    });
  }
};