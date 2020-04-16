const routes = [
  {
    path: '/',//首页模板
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/group/Index.vue') },
      { path: 'articleLists', component: () => import('pages/test/Articles.vue') },
      { path: 'edit', component: () => import('pages/test/ArticleCreate.vue') },
      { path: 'articles/:id', component: () => import('pages/test/ArticleSingle.vue') },
      { path: "userinfo", component: () => import('pages/test/Userinfo.vue') },
      { path: 'setting', component: () => import('pages/test/Setting.vue') },

    ]
  }, {
    path: '/person',//人物信息模板
    component: () => import('layouts/PersonLayout.vue'),
    children: [
      { path: '', component: () => import('pages/person/Index.vue') },]
    // { path: 'articleLists', component: () => import('pages/Articles.vue') }]
  }, {
    path: '/manage',//人物信息模板
    component: () => import('layouts/ManageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manage/Index.vue') },]
    // { path: 'articleLists', component: () => import('pages/manage/Articles.vue') }]
  }, { path: '/login', name: "login", component: () => import('pages/test/Login.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
