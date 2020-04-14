const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'articleLists', component: () => import('pages/Articles.vue') },
      { path: 'edit', component: () => import('pages/ArticleCreate.vue') },
      // { path: 'articleCreate/:aid', component: () => import('pages/Articles.vue') },
      { path: 'articles/:id', component: () => import('pages/ArticleSingle.vue') },
      { path: "userinfo", component: () => import('pages/Userinfo.vue') },
      { path: 'setting', component: () => import('pages/Setting.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
