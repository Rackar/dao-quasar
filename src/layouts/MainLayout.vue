<template>
  <q-layout view="lHh lpR fFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>cms示例 使用 Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>-->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="458"
      :breakpoint="800"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <q-icon name="menu" class="q-pa-md" />DAOChat
        </div>

        <grouplist />

        <span class="text-weight-bold">以下为测试跳转用</span>
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            v-ripple
            :to="menuItem.path"
            exact
            :active="link === menuItem.path"
            @click="link=menuItem.path"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import grouplist from "pages/group/GroupList";
const menuList = [
  {
    icon: "inbox",
    label: "首页",
    separator: true,
    path: "/"
  },
  {
    icon: "send",
    label: "写文章",
    separator: false,
    path: "/edit"
  },
  {
    icon: "delete",
    label: "文章列表",
    separator: false,
    path: "/articleLists"
  },
  {
    icon: "error",
    label: "单篇文章",
    path: "/articles/1",
    separator: true
  },
  {
    icon: "settings",
    label: "设置",
    path: "/setting",
    separator: false
  },
  {
    icon: "feedback",
    label: "用户",
    path: "/userinfo",
    separator: false
  }
];
export default {
  name: "MainLayout",

  components: { grouplist },

  data() {
    return { menuList, leftDrawerOpen: false, link: "" };
  }
};
</script>
