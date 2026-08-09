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
module.exports = router;