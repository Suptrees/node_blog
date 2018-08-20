# Node.js 博客

---

## 项目介绍

这是我在学习 Node.js 的过程中在暑假所写的一个博客系统，其中数据库采用非关系型数据库 mongodb ，WEB 框架则使用 express@4.16.3，前端 UI 库则使用 Bootstrap。同时使用 ES6 的语法进行编写。

---

## 项目过程

在做这个项目的时候，我同时将其过程整理到我的博客中，有输入有产出的学习，方便查阅。

[**Node.js_Blog系列**](http://tflin.com/categories/%E5%90%8E%E7%AB%AF/Node-js/%E5%8D%9A%E5%AE%A2%E5%AE%9E%E6%88%98%E7%B3%BB%E5%88%97/)

---

## 项目结构

```
node_blog
│
│   app.js // 入口文件
│
│   package.json // 项目依赖配置文件
│
│───models // 数据库的模型，提供相应的数库操作
│
│───node_modules // 存放各种node模块和express框架
│
│───my_modules // 自己编写的模块
│
│———routes // 存放路由文件
│
│———schemas // 数据库里要存储的数据结构
│   
│———public // 静态资源库，用于存放静态资源的
│
└───views // 视图文件，也就是模板
```

---

## 安装

```
npm install

node app
```

注意：在使用 node app 启动项目之前，需要启动 mongdb 服务

客户端地址：http://localhost:8080/

---

## 技术栈

Node.js + Express + mongodb + Bootstrap + jQuery + ES6语法

---

## 常见问题

1.管理员用户并没有进行初始化，自己注册一个账户后，在操作数据库将 isadmin 置为 true

---

## 项目截图

![首页](http://p29pm1n7z.bkt.clouddn.com/node_blog_18.jpg)

![后台](http://p29pm1n7z.bkt.clouddn.com/node_blog_28.gif)

![评论](http://p29pm1n7z.bkt.clouddn.com/node_blog_27.gif)
