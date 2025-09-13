const { createUser, findUser } = require("../models/user")
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../data/key");
exports.createUser=async(email,password)=>{
try {
    await createUser(email,password);
} catch (error) {
    throw error
}
}
exports.login=async(email,password)=>{
    try {
   const user=  await findUser(email) ;
   
   const result=await bcrypt.compare(password, user.password);
   if(result){
    var token = jwt.sign({ email }, SECRET_KEY);
    return {token}
   }
   return "invalid email or password!"
    } catch (error) {
        throw error
    }
}