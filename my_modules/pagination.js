const pagination = (object) => {
    /*
        实现分页
            limit(Number): 限制获取的数据条数
            skip(Numer): 跳过数据的条数
        每页显示2条
    */
    // 当前页数,使用get获取前端传递的当前页数
    let page = object.req.query.page || 1;
    // 每页显示数据条数
    let limit = object.limit;
    // 总页数
    let pages = 0;
    object.model.countDocuments(object.where).then((count) => {
        // 根据总条数计算总页数
        pages = Math.ceil(count / limit);
        // 限制当前页数，避免溢出
        // page不能超过pages
        page = Math.min(page, pages);
        // page不能小于1
        page = Math.max(page, 1);
        // 跳过数据的条数
        let skip = (page - 1) * limit;
        object.model.find(object.where).skip(skip).limit(limit).then((users) => {
            object.res.render(object.ejs, {
                userInfo: object.req.userInfo,
                users: users,
                page: page,
                pages: pages,
                limit: limit,
                url: object.url,
                count: count
            });
        });
    });
};

/*class Pagination {
    constructor() {

  }
}*/

// 暴露给外部使用
module.exports = pagination;
