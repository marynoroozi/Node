const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
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
  })
);
app.use(flash());

// set view
app.set("view engine", "ejs");

// middleware 1
app.use((req, res, next) => {
  console.log("mid1");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

// middleware 2
app.use((req, res, next) => {
  console.log("mid2");
  next();
});

// اینجا آدرس ها را میتونیم راحت مدیریت کنیم که روی کدوم روت باشه
app.use("/user", require("./routes/user"));

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
