const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport")
const mongoose = require('mongoose');

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require("./models/user");
//--------------
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
const quizRoute = require("./routes/quizRouter");
const postRoute = require('./routes/postRouter');
const postPeplyRoute = require('./routes/postReplyRouter');

//-----------------------------------
app.use('/api/user', userRoute);
app.use('/api/otp', otpRoute);
app.use('/api/event', eventRoute);
app.use('/api/image', imageRoute);
app.use('/api/quiz', quizRoute);
app.use('/api/post', postRoute);
app.use('/api/postReply', postPeplyRoute);
app.use('/api/picture', express.static('public'));
//-----------------------------------
// google api
app.use(session({
  secret: "121212121",
  resave: false,
  saveUninitialized: true
}))

app.use(passport.session());
app.use(passport.initialize());

passport.use(
  new OAuth2Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleID: profile.id });
        if (user) {
          return done(null, user);
        }
        else {
          user = new User({
            googleID: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            password: "ahihi"
          });

          await user.save();
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  console.log("Serialize");
  done(null, user);
})

passport.deserializeUser((user, done) => {
  console.log("Deserilize");
  done(null, user);
});

// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: `${process.env.USER_URL}`,
  failureRedirect: `${process.env.USER_URL}/login`
}))

app.get("/login/success", async (req, res) => {
  if (req.user) {
    const user = req.user;
    const existUser = await User.findById(user._id);
    const currentUser = {
      ...user,
      token: await existUser.generateJWT()
    }
    //res.status(200).json({ message: "user Login", user: currentUser })
    res.status(200).json({ message: "user Login", user: currentUser })
  } else {
    res.status(400).json({ message: "Not Authorized" })
  }
})
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.status(200).json({ message: "logout success" });
  })
})
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
