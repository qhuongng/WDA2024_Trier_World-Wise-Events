const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const {
  errorResposerHandler,
  invalidPathHandler,
} = require("./middleware/errorHandler");
require("express-async-errors");
require("dotenv").config();

//-----------------------------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOption = {
  origin: [process.env.SELLER_URL, process.env.USER_URL],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.options('*', cors(corsOption));
app.use(cors(corsOption)); // sau này chỉnh lại thành đg dẫn mặc định

//-----------------------------------
//routes & controller
const userRoute = require('./routes/userRouter');
const otpRoute = require('./routes/otpRouter');
const eventRoute = require('./routes/eventRouter');
const imageRoute = require('./routes/imageRouter');
const postRoute = require('./routes/postRouter');
const postPeplyRoute = require('./routes/postReplyRouter');
//-----------------------------------

app.use('/api/user', userRoute);
app.use('/api/otp', otpRoute);
app.use('/api/event', eventRoute);
app.use('/api/image', imageRoute);
app.use('/api/post', postRoute);
app.use('/api/postReply', postPeplyRoute);
app.use('/api/picture', express.static('public'));
app.use(invalidPathHandler);
app.use(errorResposerHandler);
//-----------------------------------

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//-----------------------------------
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

module.exports = app;
