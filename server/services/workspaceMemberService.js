const User = require("../models/User");
const WorkspaceMember = require("../models/WorkspaceMember");

exports.addMember = async ({
  workspaceId,
  email,
  role,
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error(
      "No user found with that email"
    );

    err.statusCode = 404;
    throw err;
  }

  const existing = await WorkspaceMember.findOne({
    workspaceId,
    userId: user._id,
  });

  if (existing) {
    const err = new Error(
      "User is already a member of this workspace"
    );

    err.statusCode = 409;
    throw err;
  }

  return WorkspaceMember.create({
    workspaceId,
    userId: user._id,
    role: role || "member",
  });
};

exports.listMembers = async (workspaceId) => {
  return WorkspaceMember.find({ workspaceId })
    .populate("userId", "name email avatar");
};

exports.updateMemberRole = async ({
  workspaceId,
  memberId,
  newRole,
}) => {
  const membership = await WorkspaceMember.findOne({
    _id: memberId,
    workspaceId,
  });

  if (!membership) {
    const err = new Error(
      "Member not found in this workspace"
    );

    err.statusCode = 404;
    throw err;
  }

  if (
    membership.role === "owner" ||
    newRole === "owner"
  ) {
    const err = new Error(
      "Ownership cannot be changed through this endpoint"
    );

    err.statusCode = 400;
    throw err;
  }

  membership.role = newRole;

  await membership.save();

  return membership;
};

exports.removeMember = async ({
  workspaceId,
  memberId,
}) => {
  const membership = await WorkspaceMember.findOne({
    _id: memberId,
    workspaceId,
  });

  if (!membership) {
    const err = new Error(
      "Member not found in this workspace"
    );

    err.statusCode = 404;
    throw err;
  }

  if (membership.role === "owner") {
    const err = new Error(
      "The workspace owner cannot be removed"
    );

    err.statusCode = 400;
    throw err;
  }

  await WorkspaceMember.findByIdAndDelete(memberId);
};