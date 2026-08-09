const Workspace = require("../models/Workspace");
const WorkspaceMember = require("../models/WorkspaceMember");

exports.createWorkspace = async ({
  name,
  description,
  ownerId,
}) => {
  const workspace = await Workspace.create({
    name,
    description,
    ownerId,
  });

  await WorkspaceMember.create({
    workspaceId: workspace._id,
    userId: ownerId,
    role: "owner",
  });

  return workspace;
};

exports.getWorkspacesForUser = async (userId) => {
  const memberships = await WorkspaceMember.find({ userId })
    .populate("workspaceId");

  return memberships.map((m) => ({
    ...m.workspaceId.toObject(),
    role: m.role,
  }));
};

exports.getWorkspaceById = async (workspaceId) => {
  return Workspace.findById(workspaceId);
};

exports.updateWorkspace = async (workspaceId, updates) => {
  const allowedUpdates = {
    name: updates.name,
    description: updates.description,
  };

  return Workspace.findByIdAndUpdate(
    workspaceId,
    allowedUpdates,
    {
      new: true,
      runValidators: true,
    }
  );
};

exports.deleteWorkspace = async (workspaceId) => {
  await WorkspaceMember.deleteMany({
    workspaceId,
  });

  await Workspace.findByIdAndDelete(workspaceId);
};