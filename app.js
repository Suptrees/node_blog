/*
引入相关模块
*/
// 引入express框架
const express = require("express");
// 引入路径模块
const path = require("path");

// 实例化一个express对象
let app = express();

/*
配置模板引擎
*/
// 设置模板引擎的存放目录为当前被执行的js文件的相对目录views
app.set("views", path.join(__dirname, "/views"));
// 设置模板引擎为ejs
app.set("view engine", "ejs");

// 使用中间件设置静态资源库的目录
app.use("/public", express.static(path.join(__dirname, "/public")));

// 给app绑定路由，所有通过"/"的url都将通过以下方法
app.get("/", (req, res, next) => {
    // 渲染admin/index模板
    res.render("main/index");
});

// 监听8080端口
app.listen(8080);
