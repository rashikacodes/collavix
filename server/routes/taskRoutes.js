const express = require("express");

const router = express.Router({
  mergeParams: true,
});

const { protect } = require("../middlewares/authMiddleware");

const {
  requireWorkspaceRole,
} = require("../middlewares/workspaceAuth");

const validateObjectId = require("../middlewares/validateObjectId");

const validateRequest = require("../middlewares/validateRequest");

const {
  verifyProjectInWorkspace,
  verifyTaskInProject,
} = require("../middlewares/resourceOwnership");

const {
  createTaskValidation,
  updateTaskValidation,
} = require("../validators/taskValidators");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(protect);

router.post(
  "/",
  validateObjectId("projectId"),
  requireWorkspaceRole(["owner", "admin", "member"]),
  verifyProjectInWorkspace,
  createTaskValidation,
  validateRequest,
  createTask
);

router.get(
  "/",
  validateObjectId("projectId"),
  requireWorkspaceRole([
    "owner",
    "admin",
    "member",
    "viewer",
  ]),
  verifyProjectInWorkspace,
  getTasks
);

router.get(
  "/:taskId",
  validateObjectId("projectId"),
  validateObjectId("taskId"),
  requireWorkspaceRole([
    "owner",
    "admin",
    "member",
    "viewer",
  ]),
  verifyProjectInWorkspace,
  verifyTaskInProject,
  getTask
);

router.put(
  "/:taskId",
  validateObjectId("projectId"),
  validateObjectId("taskId"),
  requireWorkspaceRole(["owner", "admin", "member"]),
  verifyProjectInWorkspace,
  verifyTaskInProject,
  updateTaskValidation,
  validateRequest,
  updateTask
);

router.delete(
  "/:taskId",
  validateObjectId("projectId"),
  validateObjectId("taskId"),
  requireWorkspaceRole(["owner", "admin"]),
  verifyProjectInWorkspace,
  verifyTaskInProject,
  deleteTask
);

module.exports = router;