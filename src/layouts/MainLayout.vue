<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="390"
      bordered
      class="drawerContainer"
      :breakpoint="300"
      :mini="miniState"
      :mini-width="80"
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
import { debounce } from 'quasar';
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
  methods: {
    resizeHandler() {
      this.miniState = document.body.clientWidth < 1024;
    },
  },
  mounted() {
    window.addEventListener('resize', debounce(this.resizeHandler, 200), true);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler, true);
  },
};
</script>

<style lang="stylus" scoped>
.drawerContainer /deep/ aside {
  position: fixed;
  background-color: #F8F8F8;
}
</style>
