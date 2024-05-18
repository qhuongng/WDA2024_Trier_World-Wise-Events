const OtpService = require("../services/otp.services");

const saveOtp = async (req, res, next) => {
  try {
    const email = req.body.resetEmail;
    if (!email) {
      throw new Error("Input is required");
    }
    const checkOtp = await OtpService.saveOtp(email);
    if (checkOtp) {
      res.status(200).json(checkOtp.data.email);
    }
  } catch (e) {
    next(e);
  }
};

const checkOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new Error("Inputs is required");
    }
    const checkOtp = await OtpService.checkAndDeleteOtp(email, otp);
    if (checkOtp) {
      res.status(200).json(checkOtp);
    }
  } catch (e) {
    next(e);
  }
};
module.exports = {
  saveOtp,
  checkOtp,
};
