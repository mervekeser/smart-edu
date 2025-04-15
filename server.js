const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const connectDB = require("./db/connect");
const app = express();

// Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);

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
