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
  getProject
);

router.put(
  "/:projectId",
  validateObjectId("projectId"),
  requireWorkspaceRole(["owner", "admin"]),
  updateProjectValidation,
  validateRequest,
  updateProject
);

router.delete(
  "/:projectId",
  validateObjectId("projectId"),
  requireWorkspaceRole(["owner", "admin"]),
  deleteProject
);

module.exports = router;