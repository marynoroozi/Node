const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
require("dotenv").config();

//اگر آدرس دیگه ای میخاستم روت دابرکتوری من باشه فقط
// require("app-module-path").addPath(__dirname + /yourDesiredFolder);
require("app-module-path").addPath(__dirname);

mongoose.connect("mongodb://127.0.0.1:27017/nodeStart");

global.config = require("./config");

const app = express();

// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
// اگر بخایم که داده از نوع json بدیم باید این خط رو بنویسیم وگرنه ریکوییست پست ما کار نمیکنه
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("method"));
// هر رشته ای خواستیم پاس میدیم بهش به عنوان secret
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    //expires in 100 days
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/nodeStart",
    }),
  })
);
app.use(flash());

require("./passport/passport-local");
app.use(passport.initialize());
app.use(passport.session());

// set view
app.set("view engine", "ejs");

app.use((req, res, next) => {
  // passport let use to access the user data in req
  // console.log(req.user);
  res.locals = { errors: req.flash("errors"), req };
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

// اینجا آدرس ها را میتونیم راحت مدیریت کنیم که روی کدوم روت باشه
app.use("/", require("./routes/index"));

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
