// routes/userRouter.js
const multer = require('multer');
const router = require("express").Router();
const {
  registerUserController,
  loginUserController,
  userProfileController,
  updateProfileController,
  resetPasswordController,
  getUserDetail,
  updateAvatarController
} = require("../controller/usersController");
const { authGuard, isAdmin } = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//---------------------------------------------
// CREATE
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/profile", authGuard, userProfileController);
// adding the authguard, this version for testing
router.put("/updateAvatar/:id", upload.single("image"), updateAvatarController)
router.put("/updateProfile", authGuard, updateProfileController);
router.post("/resetPassword", resetPasswordController);
router.get("/getUser/:id", getUserDetail);
// router.post("/admin-login", isAdmin, loginAdminController);
// router.post("/admin-register", registerAdminController);
//-----------------------------------------------------
module.exports = router;
