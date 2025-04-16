const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const connectDB = require("./db/connect");
const app = express();

// Template Engine
app.set("view engine", "ejs");

//Global variable
global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
  })
);

//Routes
app.use((req, res, next) => {
  global.userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server has started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
