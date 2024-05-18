// controller/usersController.js

const {
    findUserByEmail,
    registerUser,
    updateProfile,
    resetPassword,
    getUserName
} = require("../services/users.services");

const registerUserController = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        return res.status(201).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: await user.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
};

const getUserDetail = async (req, res, next) => {
    try {
        const userId = req.params.id;
        if (!userId) throw new Error("UserId is required")
        const user = await getUserName(userId);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error("Email not found");
        }

        if (await user.comparePassword(password)) {
            return res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: await user.generateJWT(),
            });
        } else {
            throw new Error("Invalid password");
        }
    } catch (error) {
        next(error);
    }
};

const userProfileController = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            });
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        next(error);
    }
};

const updateProfileController = async (req, res, next) => {
    try {
        const updatedUser = await updateProfile(req.user._id, req.body);
        return res.status(201).json({
            _id: updatedUser._id,
            userName: updatedUser.userName,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
        });
    } catch (error) {
        next(error);
    }
};

const resetPasswordController = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            throw new Error("Inputs are required");
        }
        const updatedUser = await resetPassword(email, newPassword);
        return res.status(200).json("true");
    } catch (e) {
        next(e);
    }
};

const loginAdminController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error("Email not found");
        }

        if (await user.comparePassword(password)) {
            return res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: await user.generateJWTSeller(),
            });
        } else {
            throw new Error("Invalid password");
        }
    } catch (error) {
        next(error);
    }
};

const registerAdminController = async (req, res, next) => {
    try {
        const { userName, email, phoneNumber, password } = req.body;
        const user = await findUserByEmail(email);
        if (user) {
            throw new Error("Admin already exists");
        }

        const admin = await User.create({
            userName,
            email,
            phoneNumber,
            password,
            role: "admin",
        });

        return res.status(201).json({
            _id: admin._id,
            userName: admin.userName,
            email: admin.email,
            phoneNumber: admin.phoneNumber,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUserController,
    loginUserController,
    userProfileController,
    updateProfileController,
    loginAdminController,
    registerAdminController,
    resetPasswordController,
    getUserDetail
};
