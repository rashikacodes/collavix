const express = require("express");

const router = express.Router();

const {
  createWorkspace,
  getMyWorkspaces,
} = require("../controllers/workspaceController");

const { protect } = require("../middlewares/authMiddleware");

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

module.exports = router;