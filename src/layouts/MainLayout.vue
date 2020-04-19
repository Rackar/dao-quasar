<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="458"
      :breakpoint="800"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md menu-main" @click="showTip=!showTip" @mouseover="showTip=true">
          <q-icon name="menu" class="q-pa-md" />DAOChat
        </div>
        <div class="toolTip-left" v-if="showTip">
          <div class="commonBorder" @click="createGrp">创建一个群</div>
          <div class="commonBorder" @click="clearLogin">退出登录</div>
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

    <!--      创建群-->
    <q-dialog v-model="iscreate">
      <groupCreate />
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import grouplist from "pages/group/GroupList";
import groupCreate from "pages/group/GroupCreate";
const menuList = [
  {
    icon: "inbox",
    label: "首页",
    separator: true,
    path: "/"
  },
  {
    icon: "settings",
    label: "管理",
    separator: false,
    path: "/manage"
  },
  {
    icon: "people",
    label: "用户",
    separator: false,
    path: "/person"
  },
  {
    icon: "people",
    label: "测弹窗",
    separator: true,
    path: "/toast"
  },
  {
    icon: "send",
    label: "写文章",
    separator: false,
    path: "/edit"
  },

  {
    icon: "error",
    label: "看单篇文章",
    path: "/articles/1",
    separator: false
  }
];
export default {
  name: "MainLayout",

  components: { grouplist, groupCreate },

  data() {
    return {
      menuList,
      leftDrawerOpen: false,
      link: "",
      showTip: false,
      iscreate: false
    };
  },
  methods: {
    createGrp: function() {
      this.iscreate = true;
      this.showTip = false;
    },
    clearLogin: function() {
      this.showTip = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userinfo");
      this.$router.go(0);
    }
  }
};
</script>

<style lang="stylus" scoped>
.toolTip-left {
  position: absolute;
  top: 11px;
  left: 10%;
  margin-left: 100px;
  z-index: 1;
  width: 132px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 15px 0px rgba(42, 53, 66, 0.28);
  border: 1px solid rgba(241, 241, 241, 1);
  font-size: 16px;
  color: #8C909D;
}

.toolTip-left:after {
  content: '';
  display: block;
  position: absolute;
  left: -10px;
  top: 0px;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid #fff;
}

.toolTip-top .commonBorder, .toolTip-left .commonBorder {
  padding: 0 22px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: #F1F1F1 solid 1px;
  cursor: pointer;
}

.menu-main {
  cursor: pointer;
}
</style>
