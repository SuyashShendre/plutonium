const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length !== 0) {
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: savedData });
    } else {
      res.status(400).send({ msg: "Body cannot be empty" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err.message });
  }
};

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ msg: "Body cannot be empty" });
    }
    let userName = data.emailId;
    let password = data.password;

    let user = await userModel.findOne({
      emailId: userName,
      password: password,
    });
    if (!user)
      return res.status(404).send({
        status: false,
        msg: "E-mailiId or password is not corerct",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "plutonium",
        organisation: "FunctionUp",
      },
      "functionup-plutonium"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, token: token });
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message });
  }
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res
        .status(404)
        .send({ status: false, msg: "No such user exists" });

    res.send({ status: true, data: userDetails });
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err.message });
  }
};

const updateUser = async function (req, res) {
  try {
    if (!req.params.userId) res.status(400).send({ msg: "Enter USerId" });
    let userId = req.params.userId;
    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("No such user exists");
    }
    let userData = req.body;
    if (Object.keys(data).length === 0) {
      res.status(400).send({ msg: "Body cannot be empty" });
    }
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res.status(201).send({ status: true, data: updatedUser });
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    if (!req.params.userId) res.status(400).send({ msg: "Enter UserId" });
    let userId = req.params.userId;
    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("No such user exists");
    }
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true }
    );
    res.status(201).send({ status: updatedUser, data: updatedUser });
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;