const routes = [
  {
    path: '/', //首页模板

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'main', component: () => import('pages/group/GroupMain.vue') },
      {
        path: 'group/:id',
        name: 'group',
        component: () => import('pages/group/GroupMain.vue'),
      },
      {
        path: 'articles/:id',
        name: 'articles',
        component: () => import('pages/article/Left.vue'),
      },
    ],
  },
  {
    path: '/grouplist',
    name: 'grouplist',
    component: () => import('pages/group/GroupListMore.vue'),
  },
  // {
  //   path: '/articles/:id',
  //   name: 'articles',
  //   component: () => import('pages/article/Index.vue'),
  // },
  {
    path: '/person', //人物信息模板

    component: () => import('layouts/PersonLayout.vue'),
    children: [
      { path: '', name: 'personmain', component: () => import('pages/person/PersonDetails.vue') },
      {
        path: 'show/:id',
        name: 'person',
        props: true,
        component: () => import('pages/person/PersonDetails.vue'),
      },
    ],
  },
  {
    path: '/manage', //管理模板

    component: () => import('layouts/ManageLayout.vue'),
    children: [
      { path: '', name: 'managemain', component: () => import('pages/manage/ManageMember.vue') },
      {
        path: ':id',
        name: 'manage',
        props: true,
        component: () => import('pages/manage/ManageMember.vue'),
      },
    ],
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: () => import('pages/transfer/buy.vue'),
  },
  {
    path: '/toast', //测试弹窗模板
    component: () => import('pages/toast/index.vue'),
    name: 'toast',
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
