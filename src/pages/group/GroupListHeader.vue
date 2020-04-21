<template>
  <div>
    <div class="q-pa-md menu-main" @click="showTip = !showTip" @mouseover="showTip = true">
      <q-icon name="menu" class="q-pa-md" />
      DAOChat
    </div>
    <div class="toolTip-left" v-if="showTip" @mouseout="showTip = false">
      <div class="commonBorder" @click="createGrp">创建一个群</div>
      <div class="commonBorder" @click="clearLogin">退出登录</div>
    </div>
    <!--      创建群-->
    <q-dialog v-model="showCreate">
      <groupCreate />
    </q-dialog>
  </div>
</template>

<script>
import groupCreate from 'pages/group/GroupCreate';

export default {
  components: { groupCreate },
  props: {},
  data() {
    return { showTip: false, showCreate: false };
  },
  watch: {},
  computed: {},
  methods: {
    createGrp: function() {
      this.showCreate = true;
      this.showTip = false;
    },
    clearLogin: function() {
      this.showTip = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userinfo');
      this.$router.go(0);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
// .menu-main {
//   width: 170px;
//   z-index: 10;
// }
</style>
