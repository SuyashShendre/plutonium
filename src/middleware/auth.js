const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    //If no token is present in the request header return error
    if (!token)
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "functionup-plutonium");
    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "Token is invalid" });
    else {
      next();
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err.message });
  }
};
const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    let decodedToken = jwt.verify(token, "functionup-plutonium");
    if (decodedToken.userId !== req.params.userId) {
      return res
        .status(403)
        .send({ status: false, msg: "UserId or Token is Wrong" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err)
    res.status(500).res.send({ error: err.message });
  }
};

module.exports.authentication = authentication;
module.exports.authorization = authorization;