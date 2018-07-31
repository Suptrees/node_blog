// 引入相关模块
const express = require("express");
const userModel = require("../models/user");
const categoryModel = require("../models/category");
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
    // 从数据库中查询所有注册用户(已弃用，用了下面分页渲染方法)
    /*userModel.find({}, (err, users) => {
        if (!err) {
            // 渲染用户管理模板
            res.render("admin/user/index", {
                userInfo: req.userInfo,
                docs: users
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
        ejs: "admin/user/index",
        // 查询的条件
        where: {},
        // 给模板绑定参数的名称
        res: res,
        req: req
    });
});

// 文章分类管理首页
router.get("/category", (req, res, next) => {
    // 调用自定义的分页渲染方法
    pagination({
        // 每页显示的条数
        limit: 10,
        // 需要操作的数据库模型
        model: categoryModel,
        // 需要控制分页的url
        url: "/admin/category",
        // 渲染的模板页面
        ejs: "admin/category/index",
        // 查询的条件
        where: {},
        docs: "users",
        res: res,
        req: req
    });
});

// 分类添加的首页
router.get("/category/add", (req, res, next) => {
    // 渲染分类添加模板
    res.render("admin/category/add", {
        userInfo: req.userInfo
    });
});

// 分类的保存
router.post("/category/add", (req, res, next) => {
    // 获取分类名称，默认为""
    let name = req.body.name || "";

    // 如果名称为空
    if (name === "") {
        // 渲染一个错误提示
        res.render("admin/error", {
            userInfo: req.userInfo,
            url: null,
            message: "分类名称不能为空！"
        });
        return;
    }
    // 从数据库中查询该名称是否已存在
    categoryModel.findOne({name: name}, (err, docs) => {
        // 如果数库库中已存在该名称
        if (docs) {
            // 渲染一个错误提示
            res.render("admin/error", {
                userInfo: req.userInfo,
                url: null,
                message: "该分类名称已存在！"
            });
            return;
        } else {
            // 不存在则新建一个数据
            categoryModel.create({
                name: name
            }, (err) => {
                if (!err) {
                    // 渲染一个错误提示
                    res.render("admin/success", {
                        userInfo: req.userInfo,
                        message: "添加成功！",
                        // 跳转到该路由
                        url: "/admin/category"
                    });
                    return;
                }
            });
        }
    });
});

// 将其暴露给外部
module.exports = router;
