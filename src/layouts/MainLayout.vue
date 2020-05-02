<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="458"
      bordered
      class="drawerContainer"
      :breakpoint="300"
      :mini="miniState"
      @mouseover="miniState = false"
    >
      <q-scroll-area class="fit">
        <GroupListHeader class="q-ma-md" />
        <grouplist />
        <span class="text-weight-bold">以下为测试跳转用</span>
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            v-ripple
            :to="menuItem.path"
            exact
            :active="link === menuItem.path"
            @click="link = menuItem.path"
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
import grouplist from 'pages/group/GroupList';
import GroupListHeader from 'components/headerBarLeft';
const menuList = [
  {
    icon: 'people',
    label: '测弹窗',
    separator: true,
    path: '/toast',
  },
];
export default {
  name: 'MainLayout',

  components: { grouplist, GroupListHeader },

  data() {
    return {
      leftDrawerOpen: false,
      menuList,
      link: '',
      miniState: false,
    };
  },
  methods: {},
  mounted() {
    window.addEventListener('resize', () => {
      this.miniState = document.body.clientWidth < 1024;
    });
  },
};
</script>

<style lang="stylus" scoped>
.drawerContainer /deep/ aside {
  position: fixed;
  background-color: #F8F8F8;
}

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
