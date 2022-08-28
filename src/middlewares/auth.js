const jwt = require("jsonwebtoken");

const jwtvalidation = async function (req, res,next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    let decodedToken = jwt.verify(token, "secret-key");
    if (!decodedToken){
      return res.send({ status: false, msg: "Token is invalid" });
    }
    let userid= req.params.userId
    if (decodedToken.userId!==userid) return res.send({status: false,msg:"User ID or token is Wrong"})
    else {next()}
}

module.exports.jwtvalidation=jwtvalidation;