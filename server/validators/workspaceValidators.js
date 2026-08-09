const { body } = require("express-validator");

exports.createWorkspaceValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Workspace name is required")
    .isLength({ min: 2, max: 60 })
    .withMessage("Name must be 2-60 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description must be under 300 characters"),
];