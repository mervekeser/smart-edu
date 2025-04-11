const express = require("express");
require("dotenv").config();
const pageRoute = require("./routes/pageRoute");
const connectDB = require("./db/connect");
const app = express();

// Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);

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
