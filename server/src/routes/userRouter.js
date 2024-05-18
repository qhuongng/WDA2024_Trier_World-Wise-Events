// routes/userRouter.js

const router = require("express").Router();
const {
  registerUserController,
  loginUserController,
  userProfileController,
  updateProfileController,
  loginAdminController,
  registerAdminController,
  resetPasswordController,
  getUserDetail
} = require("../controller/usersController");
const { authGuard, isAdmin } = require("../middleware/authMiddleware");

//---------------------------------------------
// CREATE
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/admin-login", isAdmin, loginAdminController);
router.post("/admin-register", registerAdminController);
router.get("/profile", authGuard, userProfileController);
router.put("/updateProfile", authGuard, updateProfileController);
router.post("/resetPassword", resetPasswordController);
router.get("/getUser/:id", getUserDetail);

//-----------------------------------------------------
module.exports = router;
