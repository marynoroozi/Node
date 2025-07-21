const express = require("express");
const path = require("path");

global.config = require("./config");

const app = express();
const methodOverride = require("method-override");

// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
// اگر بخایم که داده از نوع json بدیم باید این خط رو بنویسیم وگرنه ریکوییست پست ما کار نمیکنه
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("method"));

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
