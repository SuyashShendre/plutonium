const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    req.body["isFreeAppUser"]= req.isFreeAppUser
    let data= req.body;
    let savedData= await UserModel.create(data)
    res.send({msg:savedData})    
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData