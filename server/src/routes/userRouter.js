// routes/userRouter.js
const multer = require('multer');
const router = require("express").Router();
const {
  registerUserController,
  loginUserController,
  userProfileController,
  updateProfileController,
  resetPasswordController,
  updateAvatarController
} = require("../controller/usersController");
const { authGuard } = require("../middleware/authMiddleware");
const passport = require('passport');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//---------------------------------------------
// CREATE
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/profile/:id", userProfileController);
// adding the authguard, this version for testing
router.put("/updateAvatar/:id", upload.single("image"), updateAvatarController);
router.put("/updateProfile", updateProfileController);
router.put("/resetPassword", resetPasswordController);
//-----------------------------------------------------


module.exports = router;
