if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");

const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const initialize = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");


initialize(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);
// endast för test
users = [user={ email: "test@testemail.com", password: "admin" ,id:23}];

var indexRouter = require("./routes/index");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var adminRouter = require("./routes/admin");

var app = express();
app.set("view-engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: "admin",
    resave: false,
    saveUninitialized: false,
    
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Startsidan
app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("index.ejs");
});

// När användaren loggar in
app.post(
  "/",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/",
    failureFlash: true,
    session: false
  })
);

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

// Koppla till mongoose
async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.connect(
      `mongodb+srv://milab:${process.env.MONGO_PASSWORD}@cluster0.uz16p.mongodb.net/?retryWrites=true&w=majority`,
      options
    );
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}
init();

module.exports = app;
