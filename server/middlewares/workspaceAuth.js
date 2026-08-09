const WorkspaceMember = require("../models/WorkspaceMember");

const requireWorkspaceRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const workspaceId = req.params.id;

      const membership = await WorkspaceMember.findOne({
        workspaceId,
        userId: req.user._id,
      });

      if (!membership) {
        return res.status(403).json({
          message: "You are not a member of this workspace",
        });
      }

      if (!allowedRoles.includes(membership.role)) {
        return res.status(403).json({
          message: "You do not have permission to do this",
        });
      }

      req.membership = membership;

      next();
    } catch (err) {
      res.status(500).json({
        message: "Authorization check failed",
        error: err.message,
      });
    }
  };
};

module.exports = {
  requireWorkspaceRole,
};