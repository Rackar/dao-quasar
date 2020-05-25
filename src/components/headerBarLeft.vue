<template>
  <div class="main">
    <!-- <span class="hover-wraper">
      <img
        svg-inline
        src="@/statics/icons/icon_more1.svg"
        class="svg-icon"
        v-if="$store.state.user.userid !== ''"
      />
      <q-menu auto-close>
        <q-list style="min-width: 100px">
          <q-item clickable>
            <q-item-section @click="createGrp">创建一个群</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section @click="clearLogin">退出登录</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </span>-->
    <router-link :to="{path:'/'}">
      <q-btn flat dense class="mainpage-btn">DAO</q-btn>
    </router-link>
    <!--      创建群-->
    <!-- <groupCreate v-model="showCreate" /> -->
  </div>
</template>

<script>
// import groupCreate from 'pages/group/GroupCreate';
export default {
  name: 'headerBarLeft',
  // components: { groupCreate },
  props: {},
  data() {
    return { showCreate: false };
  },
  watch: {},
  computed: {},
  methods: {
    createGrp: function() {
      this.showCreate = true;
    },
    clearLogin: function() {
      localStorage.removeItem('token');
      localStorage.removeItem('userinfo');
      localStorage.removeItem('notifications');
      this.$router.go(0);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="stylus" scoped>
.main {
  padding-top: 35px;
  padding-left: 48px;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
}

.mainpage-btn {
  cursor: pointer;
  margin-left: 8px;
  // padding: 3px;
  // border-radius: 4px;
  // margin: 6px 0 0 5px;
  font-size: 18px;
  font-weight: 600;
  color: rgba(42, 53, 66, 1);

  &:hover {
    color: $primary;
    background-color: $dback;
  }
}
</style>

