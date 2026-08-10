const express = require("express");

const router = express.Router();
const validateObjectId = require('../middlewares/validateObjectId');
const {
  createWorkspace,
  getMyWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

const {
  protect,
} = require("../middlewares/authMiddleware");

const {
  requireWorkspaceRole,
} = require("../middlewares/workspaceAuth");

const validateRequest = require("../middlewares/validateRequest");

const {
  createWorkspaceValidation,
} = require("../validators/workspaceValidators");

const {
  addMember,
  listMembers,
  updateMemberRole,
  removeMember,
} = require("../controllers/workspaceMemberController");

const {
  addMemberValidation,
  updateRoleValidation,
} = require("../validators/workspaceMemberValidators");
router.use(protect);

router.post(
  "/",
  createWorkspaceValidation,
  validateRequest,
  createWorkspace
);

router.get(
  "/",
  getMyWorkspaces
);

router.get('/:id', validateObjectId(), requireWorkspaceRole(['owner', 'admin', 'member', 'viewer']), getWorkspace);
router.put('/:id', validateObjectId(), requireWorkspaceRole(['owner', 'admin']), updateWorkspace);
router.delete('/:id', validateObjectId(), requireWorkspaceRole(['owner']), deleteWorkspace);
router.post(
  "/:id/members",
  validateObjectId(),
  requireWorkspaceRole(["owner", "admin"]),
  addMemberValidation,
  validateRequest,
  addMember
);

router.get(
  "/:id/members",
  validateObjectId(),
  requireWorkspaceRole([
    "owner",
    "admin",
    "member",
    "viewer",
  ]),
  listMembers
);

router.patch(
  "/:id/members/:memberId",
  validateObjectId(),
  requireWorkspaceRole(["owner"]),
  updateRoleValidation,
  validateRequest,
  updateMemberRole
);

router.delete(
  "/:id/members/:memberId",
  validateObjectId(),
  requireWorkspaceRole(["owner", "admin"]),
  removeMember
);
module.exports = router;