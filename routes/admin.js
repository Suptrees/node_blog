// 引入相关模块
const express = require("express");
const userModel = require("../models/user");

// 实例化一个Routr对象
const router = express.Router();

// 进行管理员验证
router.use((req, res, next) => {
    if (req.userInfo.isadmin) {
        // 如果当前登录用户是管理员
        // 则继续向下一个中间件执行
        next();
    } else {
        // 不是管理员
        res.send("无权限！");
    }
});

// 后台首页路由
router.get("/", (req, res, next) => {
    // 渲染后台模板页面
    res.render("admin/index", {
        userInfo: req.userInfo
    });
});

// 将其暴露给外部
module.exports = router;
