<template>
  <div>
    <div v-if="isLoggedIn">
      <q-avatar
        class="clickable q-mx-xs"
        rounded
        size="36px"
        icon="notifications"
        @click="showNotice = !showNotice"
      >
        <q-badge color="red" floating>{{unreadNotifyLength}}</q-badge>
      </q-avatar>
      <q-avatar
        class="clickable q-px-md q-mr-md"
        rounded
        size="24px"
        @click="$router.push('/person/show/' + $store.state.user.userid)"
      >
        <img :src="$store.state.user.avatar || 'statics/user.svg'" />
      </q-avatar>
      <q-dialog v-model="showNotice" seamless position="top">
        <q-card>
          <q-card-section>
            <div class="row items-center no-wrap">
              系统通知
              <q-space />
              <q-btn flat round icon="close" v-close-popup />
            </div>
            <div
              v-for="notice in notifications"
              :key="notice.id"
            >{{ notice.h_text }} - {{ $utils.timeStringToLocal(notice.create_at) }}</div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <q-btn
      v-else
      color="primary"
      flat
      @click="$router.push('/login')"
      label="快速登录"
    />
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showNotice: false,
      notifications: [],
    };
  },
  watch: {},
  computed: {
    unreadNotifyLength() {
      return this.notifications.length;
    },
    isLoggedIn() {
      return this.$store.state.user.userid !== '';
    },
  },
  methods: {
    async getNotifications(id = 0) {
      let url = '/protected/user/notifications/' + id;
      const resCode = await this.$axios.get(url);
      if (resCode.data.code == 0) {
        this.notifications = [];
        this.notifications = resCode.data.data.notifications;
        // if (!this.pullList.length) {
        // }
      }
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.getNotifications(0);
    }
  },
};
</script>
<style lang="scss">
.clickable {
  cursor: pointer;
}
</style>
