const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User Not Found!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid Password");
    }
    req.session.userID = user._id;
    res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "failed", err });
  }
};
