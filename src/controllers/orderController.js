const UserModel = require("../models/userModel");
const ProductModel = require("../models/ProductModel");
const OrderModel = require("../models/orderModel");
const moment = require('moment')

const createOrder = async function (req, res) {
  req.body["isFreeAppUser"] = req.isFreeAppUser;
  let data = req.body;

  if (!data.userId) { return res.send("Enter UserId") }
  if (!data.productId) { return res.send("Enter ProductId") }

  let user = await UserModel.find().select({ _id: 1 });
  let usersId = user.map(function (x) {
    return x._id.toString();
  });

  if (!(usersId.includes(data.userId))) {
    return res.send("User Id is not valid");
  }

  let product = await ProductModel.find().select({ _id: 1 });
  let productsId = product.map(function (x) {
    return x._id.toString();
  });

  if (!(productsId.includes(data.productId))) {
    return res.send("Product Id is not valid");
  }

  let thisUser = await UserModel.findById(data.userId);
  let thisProduct = await ProductModel.findById(data.productId);
  const date = moment().format('DD/MM/YYYY');
  let amount = 0;

  if (data["isFreeAppUser"] === "true") {
    amount = 0;
  } else {
    amount = thisProduct.price;

    if (thisUser.balance < amount) {
      return res.send("User has insufficient balance");
    } else {
      user = await UserModel.findById(data.userId).updateOne({
        $inc: { balance: -amount },
      });
    }
  }
  data["amount"] = amount;
  data["date"] = date;
  const savedData = await OrderModel.create(data);
  res.send({ msg: savedData });
};

module.exports.createOrder = createOrder;