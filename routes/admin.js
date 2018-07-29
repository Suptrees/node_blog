// 引入相关模块
const express = require("express");
const userModel = require("../models/user");
// 引入自定义的分页渲染模块
const pagination = require("../my_modules/pagination");

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

// 用户管理首页
router.get("/user", (req, res, next) => {
    // 从数据库中查询所有注册用户
    /*userModel.find({}, (err, users) => {
        if (!err) {
            // 渲染用户管理模板
            res.render("admin/user/index", {
                userInfo: req.userInfo,
                users: users
            });
        } else {
            // 抛出错误
            throw err;
        }
    });*/

    // 调用自定义的分页渲染方法
    pagination({
        // 每页显示的条数
        limit: 10,
        // 需要操作的数据库模型
        model: userModel,
        // 需要控制分页的url
        url: "/admin/user",
        // 渲染的模板页面
        ejs: "admin/user",
        res: res,
        req: req,
        // 查询的条件
        where: {}
    });
});

// 将其暴露给外部
module.exports = router;
