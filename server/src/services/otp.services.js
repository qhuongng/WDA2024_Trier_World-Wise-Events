const OTP = require("../models/otp");
const User = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSEMAIL,
  },
});

const saveOtp = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMail = await User.findOne({ email: email });
      if (!checkMail) {
        reject({
          status: 500,
          message: "User not found!"
        });
      }
      const otp = Math.floor(100000 + Math.random() * 900000);

      const mailOptions = {
        from: "Future Furniture Application",
        to: email,
        subject: "OTP for updating password",
        html: `
                <h3>Hello ${checkMail.userName},</h3>
                <p>You have chosen email: ${email} for updating password, The OTP code to update the account is:</p>
                <br>
                <h2 style="color: red;">${otp}</h2>
                <br>
                <p>Please do not share this OTP code with others</p>
                `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }
      });
      const checkOtp = await OTP.findOne({ email: email });
      if (!checkOtp) {
        const newOtp = await OTP.create({
          email: email,
          otp: otp,
        });
        if (newOtp) {
          resolve({
            data: newOtp,
          });
        }
      } else {
        const update = { $set: { otp: otp } };
        const updateOtp = await OTP.findOneAndUpdate({ email: email }, update, {
          new: true,
        });
        if (updateOtp) {
          resolve({
            data: updateOtp,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const checkAndDeleteOtp = (email, otpCheck) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOtp = await OTP.findOne({ email: email });
      if (!checkOtp) {
        reject({ message: "No OTP to check" });
      } else {
        if (checkOtp.otp !== parseInt(otpCheck)) {
          reject({ message: "OTP is not valid" });
        } else {
          await OTP.deleteOne({ email: email });
          resolve("true");
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  saveOtp,
  checkAndDeleteOtp,
};
