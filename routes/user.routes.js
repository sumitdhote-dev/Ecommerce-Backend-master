const express = require("express");
const { body, param } = require("express-validator");
const {
  createUser,
  getMyProfile,
  updateProfile,
  updateUser,
  getUsers,
  getUser,
  updateUserRole,
  deleteUser,
  getUserRole,
} = require("../controller/user.controller.js");
const { authorizeRoles } = require("../util/middlewares/auth.js");
const {
  requestValidator,
} = require("../util/middlewares/express-validator.js");

const router = new express.Router();

router.get("/", async (_, res) => {
  res.send({
    message: "User API",
    success: true,
  });
});

// User Routes
router.post(
  "/user/new",
  [
    body("name", "Invalid Name").isLength({ min: 3, max: 100 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 6, max: 30 }),
    body("phone", "Invalid Phone Number").isMobilePhone(),
  ],
  requestValidator,
  createUser
);
router.get("/profile", getMyProfile);
router.patch("/profile/update", updateProfile);
router.patch(
  "/user/:uid",
  authorizeRoles("admin"),
  [param("uid", "Invalid userId").isMongoId(), requestValidator],
  updateUser
);

// Admin Route
router.get("/users", authorizeRoles("admin"), getUsers);

router.delete(
  "/user/:uid",
  authorizeRoles("admin"),
  [param("uid", "Invalid userId").isMongoId(), requestValidator],
  deleteUser
);

router.get(
  "/get-user/:uid",
  authorizeRoles("admin"),
  [param("uid", "Invalid userId").isMongoId(), requestValidator],
  getUser
);

router.get(
  "/get-user-role/:uid",
  authorizeRoles("admin"),
  [param("uid", "Invalid userId").isMongoId(), requestValidator],
  getUserRole
);

router.patch(
  "/update-role/:uid",
  authorizeRoles("admin"),
  [param("uid", "Invalid userId").isMongoId(), requestValidator],
  updateUserRole
);

module.exports = router;
