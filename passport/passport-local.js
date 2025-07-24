const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  try {
    if (user) done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// implementing strategies for registeration

passport.use(
  "local.register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return done(
            null,
            false,
            req.flash("errors", "This user already exists.")
          );
        }
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        return done(error, false, { message: error });
      }
    }
  )
);

passport.use(
  "local.login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
          return done(
            null,
            false,
            req.flash("errors", "Username or Password is not correct")
          );
        }
        done(null, user);
      } catch (error) {
        return done(error, false, { message: error });
      }
    }
  )
);
