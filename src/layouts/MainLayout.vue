<template>
  <q-layout view="lHh lpR fFf" class="main-layout">
    <div class="unfold xs">
      <q-btn color="primary" icon="展开" @click="leftDrawerOpen=true" />
    </div>
    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="390"
      bordered
      class="drawerContainer"
      :breakpoint="600"
      :mini="miniState"
      :mini-width="80"
    >-->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="drawerContainer"
      :breakpoint="600"
    >
      <q-scroll-area class="fit" :thumb-style="thumbStyle">
        <headerBarLeft />
        <grouplist />
        <!-- <div class="copyright">
          All rights reserved 2020 DAO Inc
          <br />A user owned company
          <br />Designed by Alina
        </div>-->
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import grouplist from 'pages/group/GroupList';
import headerBarLeft from 'components/headerBarLeft';
// import { debounce } from 'quasar';
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

  components: { grouplist, headerBarLeft },

  data() {
    return {
      leftDrawerOpen: false,
      menuList,
      link: '',
      miniState: false,
    };
  },
  computed: {
    thumbStyle() {
      return {
        right: '0px',
        borderRadius: '3px',
        backgroundColor: '#00d6c2',
        width: '3px',
        opacity: 0.5,
      };
    },
  },
  methods: {
    // resizeHandler() {
    // this.miniState = document.body.clientWidth < 1024;
    // },
  },
  mounted() {
    // window.addEventListener('resize', debounce(this.resizeHandler, 200), true);
  },
  destroyed() {
    // window.removeEventListener('resize', this.resizeHandler, true);
  },
};
</script>

<style lang="stylus" scoped>
.unfold {
  position: absolute;
  padding: 8px 0 0 16px;
  // top: 0;
  z-index: 2600;
  // position: absolute;
  top: 12px;

  // left: 27px;

  // z-index: 2300;
  /deep/ .q-icon {
    font-size: 14px !important;
  }
}

.main-layout {
  /deep/ .q-drawer {
    width: 390px !important;
  }

  .q-page-container {
    padding-left: 390px !important;
  }
}

@media only screen and (max-width: 1024px) {
  .main-layout {
    /deep/ .q-drawer {
      width: 280px !important;
    }

    .q-page-container {
      padding-left: 280px !important;
    }
  }
}

@media only screen and (max-width: 600px) {
  .main-layout {
    .q-page-container {
      padding-left: 0px !important;
    }
  }
}

.drawerContainer /deep/ aside {
  position: fixed;
  // background-color: #F8F8F8;
}

.copyright {
  padding: 18px 48px 30px;
  font-size: 12px;
  color: rgba(140, 144, 157, 0.58);
  text-align: right;
  line-height: 22px;

  @media only screen and (max-width: 1024px) {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
