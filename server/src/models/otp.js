const mongoose = require('mongoose')
const otpSchema = new mongoose.Schema({
    email: String,
    otp: Number
})

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
