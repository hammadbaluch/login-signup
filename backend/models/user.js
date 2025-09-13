const fs = require("fs");
const path = require("path");
const bcrypt=require('bcrypt')
const jsonFilePath = path.join(process.cwd(), "data", "users.json");
const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};
const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
exports.createUser = async (email, password) => {
    try {
        const users = await readData();
        const matched = users.find((u) => u.email === email);
        if (matched) {
          throw new Error("user already exists");
        } else {
          const userId = Date.now();
        const encPass=await  bcrypt.hash(password, 12);
          writeData([...users, { email, password:encPass, userId }]);
        }
    } catch (error) {
        throw error;
    }
 
};
exports.findUser=async(email)=>{
try {
    const users = await readData();
    const matched = users.find((u) => u.email === email);
    return matched;
} catch (error) {
    throw error;
}
    
}