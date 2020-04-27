<template>
  <div>
    <q-btn flat no-caps icon="menu">
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
    </q-btn>
    <q-btn flat no-caps label="DAO" @click="$router.push('/')" />
    <!--      创建群-->
    <groupCreate v-model="showCreate" />
  </div>
</template>

<script>
import groupCreate from 'pages/group/GroupCreate';
export default {
  components: { groupCreate },
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
      this.$router.go(0);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
.clickable {
  cursor: pointer;
}
</style>
