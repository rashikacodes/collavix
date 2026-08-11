const { body } = require("express-validator");

exports.createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 2, max: 80 })
    .withMessage("Title must be 2-80 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be under 500 characters"),

  body("status")
    .optional()
    .isIn(["todo", "in_progress", "review", "done"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "critical"])
    .withMessage("Invalid priority"),

  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Invalid deadline"),

  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid assigned user"),
];

exports.updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Title must be 2-80 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be under 500 characters"),

  body("status")
    .optional()
    .isIn(["todo", "in_progress", "review", "done"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "critical"])
    .withMessage("Invalid priority"),

  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Invalid deadline"),

  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid assigned user"),
];

// TODO: Verify assigned user belongs to the workspace.