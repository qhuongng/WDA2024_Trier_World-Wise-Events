// services/userService.js
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const Image = require("../models/Image");
const imageService = require("./image.services");
const { use } = require("../routes/userRouter");

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
  let defaultImage = `${process.env.SERVER_PUBLIC_URL}/defaultUser.jpeg`;

  let buffer;
  try {
    const response = await fetch(defaultImage);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${defaultImage}: ${response.statusText}`);
    }
    buffer = await response.arrayBuffer();
  } catch (error) {
    console.error('Error fetching default image:', error);
    throw new Error('Default image fetch failed');
  }

  const imagetype = "image/jpeg";
  const avatar = {
    data: Buffer.from(buffer),
    contentType: imagetype
  };

  const imageId = await imageService.saveImage(avatar);
  const user = await User.create({
    username,
    email,
    password,
    avatar: imageId._id.toString()
  });
  return user;
};

const updateAvatar = async (file, userId) => {
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

const updateProfile = async (userId, username, email) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.username = username || user.username;
  user.email = email || user.email;

  return await user.save();
};

const resetPassword = async (id, oldPassword, newPassword) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  if (await user.comparePassword(oldPassword)) {
    user.password = newPassword
    return await user.save();
  } else {
    throw new Error("Invalid Password");
  }
};

module.exports = {
  findUserByEmail,
  registerUser,
  updateProfile,
  resetPassword,
  getUserName,
  updateAvatar
};
