// services/userService.js
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const Image = require("../models/Image");
const imageService = require("../services/image.services")

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const getUserName = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    throw new Error("User not found")
  }
  return {
    _id: user._id,
    userName: user.username
  }
}

//adding image here
const createUser = async (userDetails) => {
  const { username, email, password } = userDetails;
  // change image into buffer
  let defaultImage = "../server/public/defautUser.jpeg";

  let imagedata = new ArrayBuffer(64);
  const imagetype = "image/jpeg";
  const promise = fs.promises.readFile(path.join(defaultImage));
  imagedata = (await promise).buffer;

  const avatar = {
    data: Buffer.from(imagedata),
    contentType: imagetype
  };

  const imageId = await imageService.saveImage(avatar);
  console.log(imageId);
  const user = await User.create({
    username,
    email,
    password,
    avatar: imageId._id.toString()
  });
  return user;
};

const updateAvatar = async (file,userId) => {
  const user = await User.findById(userId);
  const newAvatar = {
    data: file.buffer,
    contentType: file.mimetype
  };
  const imageId = await imageService.saveImage(newAvatar);
  
  // delete old avatar
  const deleteImage = await Image.findByIdAndDelete(user.avatar);
  user.avatar = imageId._id.toString();
  return await user.save();
};

const registerUser = async (userDetails) => {
  const existingUser = await findUserByEmail(userDetails.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }
  return await createUser(userDetails);
};

const updateProfile = async (userId, userDetails) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.username = userDetails.username || user.username;
  user.email = userDetails.email || user.email;

  return await user.save();
};

const resetPassword = async (email, newPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  user.password = newPassword
  return await user.save();
};

module.exports = {
  findUserByEmail,
  registerUser,
  updateProfile,
  resetPassword,
  getUserName,
  updateAvatar
};
