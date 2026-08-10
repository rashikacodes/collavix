const memberService = require("../services/workspaceMemberService");

const handleServiceError = (
  res,
  err,
  fallbackMessage
) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    message:
      status === 500
        ? fallbackMessage
        : err.message,
  });
};

exports.addMember = async (req, res) => {
  try {
    const { email, role } = req.body;

    const member = await memberService.addMember({
      workspaceId: req.params.id,
      email,
      role,
    });

    res.status(201).json({
      member,
    });
  } catch (err) {
    handleServiceError(
      res,
      err,
      "Failed to add member"
    );
  }
};

exports.listMembers = async (req, res) => {
  try {
    const members =
      await memberService.listMembers(
        req.params.id
      );

    res.status(200).json({
      members,
    });
  } catch (err) {
    handleServiceError(
      res,
      err,
      "Failed to list members"
    );
  }
};

exports.updateMemberRole = async (req, res) => {
  try {
    const membership =
      await memberService.updateMemberRole({
        workspaceId: req.params.id,
        memberId: req.params.memberId,
        newRole: req.body.role,
      });

    res.status(200).json({
      membership,
    });
  } catch (err) {
    handleServiceError(
      res,
      err,
      "Failed to update member role"
    );
  }
};

exports.removeMember = async (req, res) => {
  try {
    await memberService.removeMember({
      workspaceId: req.params.id,
      memberId: req.params.memberId,
    });

    res.status(200).json({
      message: "Member removed",
    });
  } catch (err) {
    handleServiceError(
      res,
      err,
      "Failed to remove member"
    );
  }
};