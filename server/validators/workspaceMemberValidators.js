const { body } = require("express-validator");

exports.addMemberValidation = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("A valid email is required"),

  body("role")
    .optional()
    .isIn(["admin", "member", "viewer"])
    .withMessage(
      "Role must be admin, member, or viewer"
    ),
];

exports.updateRoleValidation = [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "member", "viewer"])
    .withMessage(
      "Role must be admin, member, or viewer"
    ),
];