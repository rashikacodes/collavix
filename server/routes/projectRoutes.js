const express = require("express");
const taskRoutes = require("./taskRoutes");

const router = express.Router({
  mergeParams: true,
});

const { protect } = require("../middlewares/authMiddleware");
const { requireWorkspaceRole } = require("../middlewares/workspaceAuth");
const validateObjectId = require("../middlewares/validateObjectId");
const validateRequest = require("../middlewares/validateRequest");

const {
  verifyProjectInWorkspace,
} = require("../middlewares/resourceOwnership");

const {
  createProjectValidation,
  updateProjectValidation,
} = require("../validators/projectValidators");

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.use(protect);

router.use("/:projectId/tasks", taskRoutes);

router.post(
  "/",
  requireWorkspaceRole(["owner", "admin"]),
  createProjectValidation,
  validateRequest,
  createProject
);

router.get(
  "/",
  requireWorkspaceRole([
    "owner",
    "admin",
    "member",
    "viewer",
  ]),
  getProjects
);

router.get(
  "/:projectId",
  validateObjectId("projectId"),
  requireWorkspaceRole([
    "owner",
    "admin",
    "member",
    "viewer",
  ]),
  verifyProjectInWorkspace,
  getProject
);

router.put(
  "/:projectId",
  validateObjectId("projectId"),
  requireWorkspaceRole(["owner", "admin"]),
  verifyProjectInWorkspace,
  updateProjectValidation,
  validateRequest,
  updateProject
);

router.delete(
  "/:projectId",
  validateObjectId("projectId"),
  requireWorkspaceRole(["owner", "admin"]),
  verifyProjectInWorkspace,
  deleteProject
);

module.exports = router;