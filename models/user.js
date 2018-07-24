// 引入mongoose模块
const mongoose = require("mongoose");
// 引入user的schema
const userSchema = require("../schemas/users.js");

// 创建user对象模型，并暴露出去
module.exports = mongoose.model("user", userSchema);
