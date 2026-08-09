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