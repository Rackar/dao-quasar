const routes = [
  {
    path: '/', //首页模板
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/group/Index.vue') },
      { path: 'edit', component: () => import('pages/test/ArticleCreate.vue') },
      { path: 'articles/:id', component: () => import('pages/test/ArticleSingle.vue') },
      { path: 'group/:id', component: () => import('pages/group/GroupMain.vue') },
    ],
  },
  {
    path: '/person', //人物信息模板
    component: () => import('layouts/PersonLayout.vue'),
    children: [
      { path: '', component: () => import('pages/person/Index.vue') },
      { path: 'show/:id', props: true, component: () => import('pages/person/ReDetails.vue') },
      { path: 'showr/:id', props: true, component: () => import('pages/person/Index.vue') },
    ],
    // { path: 'articleLists', component: () => import('pages/Articles.vue') }]
  },
  {
    path: '/manage', //管理模板
    component: () => import('layouts/ManageLayout.vue'),
    children: [{ path: '', component: () => import('pages/manage/member.vue') }],
    // { path: 'articleLists', component: () => import('pages/manage/Articles.vue') }]
  },
  {
    path: '/toast', //测试弹窗模板
    component: () => import('pages/toast/index.vue'),
    name: 'toast',
    // { path: 'articleLists', component: () => import('pages/manage/Articles.vue') }]
  },
  { path: '/login', name: 'login', component: () => import('pages/test/Login.vue') },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
