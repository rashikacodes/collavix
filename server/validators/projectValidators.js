const { body } = require("express-validator");

exports.createProjectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ min: 2, max: 80 })
    .withMessage("Title must be 2-80 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be under 500 characters"),
];

exports.updateProjectValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 80 }),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }),

  body("status")
    .optional()
    .isIn([
      "active",
      "on_hold",
      "completed",
      "archived",
    ])
    .withMessage("Invalid status"),
];