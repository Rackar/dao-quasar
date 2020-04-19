import { axiosInstance } from 'boot/axios'
const apiPath = {
    getVerify: '/user/verify/:mail',
    postLogin: '/user/login'
}

export const get = (url, config) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, config).then((res) => {
            // debugger;
            if (res.data.code === 0) {
                resolve(res.data)
            } else {
                reject(res.data.message)
            }
        }).catch(err => {
            // debugger;
            reject(err)
        })
    })
}


// GET /user/verify/:mail（发送验证码）
// POST /user/login（登陆）
// GET /grp/:id （群信息）
// GET /user/members/:grp_id（群成员）
// GET /comments/:post_id（获取评论）
// GET /user/:id（用户信息）
// GET /protected/user/me（自己信息）
// POST /protected/grp/create（创建群）
// GET /protected/grp/joined（已加入的群）
// GET /grp/recommend (未登陆) || GET /protected/grp/recommend (已登陆) （群推荐）
// POST /protected/grp/join（加群）
// POST /protected/grp/detach（退群）
// POST /protected/post/create（发帖）
// POST /protected/post/like（点赞）
// POST /protected/post/likes（点赞状态）
// POST /protected/comment/create（评论）
// POST /protected/post/pull (已登陆) || POST /post/pull (未登陆) （获取帖子）
// POST /protected/post/my/pull（我发布的帖子）
// DELETE /protected/post（删帖）
// PUT /protected/post（更新帖子）
// PUT /protected/user/modify（修改个人信息）
// GET /protected/user/tokens（我的代币）
// POST /protected/user/token/transfer（转账）
// POST /protected/user/token/logs（转账日志）
// GET /protected/user/notifications/:base_notification（获取通知）
// POST /protected/grp/block（拉黑）
// POST /grp/against（搜索群）
// POST /protected/grp/pin（置顶群）