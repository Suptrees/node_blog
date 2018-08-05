// 引入相关模块
const express = require("express");
const categoryModel = require("../models/category");
const contentModel = require("../models/content");
// 引入自定义的分页渲染模块
const pagination = require("../my_modules/pagination");

// 实例化Router对象
const router = express.Router();

// 首页路由配置
router.get("/", (req, res) => {
    // 从数据库中查询分类信息
    categoryModel.find({}, (err, categories) => {
        if (!err) {
            // 如果不出错
            // 调用分页渲染模块渲染内容
            pagination({
                // 每页显示的条数
                limit: 10,
                // 需要操作的数据库模型
                model: contentModel,
                // 需要控制分页的url
                url: "/",
                // 渲染的模板页面
                ejs: "main/index",
                // 查询的条件
                where: {},
                // 给模板绑定参数的名称
                res: res,
                req: req,
                populate: ["category", "author"],
                // 其他数据
                other: categories
            });
        } else {
            throw err;
        }
    });
});

// 将其暴露给外部使用
module.exports = router;
