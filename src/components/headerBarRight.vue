<template>
  <div>
    <div v-if="isLoggedIn">
      <q-avatar
        class="cursor-pointer q-mx-xs"
        rounded
        size="36px"
        icon="notifications"
        @click="readNotify"
      >
        <q-badge color="red" floating v-if="unreadNotify.length">{{unreadNotify.length}}</q-badge>
      </q-avatar>
      <q-avatar
        class="cursor-pointer q-px-md q-mr-md"
        rounded
        size="24px"
        @click="$router.push('/person/show/' + $store.state.user.userid)"
      >
        <img :src="$store.state.user.avatar || 'statics/user.svg'" />
      </q-avatar>
      <q-dialog v-model="showNotice" seamless position="top" @hide="hideNotice">
        <q-card>
          <q-card-section>
            <div class="row items-center no-wrap">
              系统通知
              <q-space />
              <q-btn flat round icon="close" v-close-popup />
            </div>
            <div v-if="unreadNotify.length===0">当前无未读通知。</div>
            <div
              v-for="notice in unreadNotify"
              :key="notice.id"
            >{{ notice.h_text }} - {{ $utils.timeStringToLocal(notice.create_at,'RelativeTime') }}</div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <q-btn v-else color="primary" flat label="快速登录" v-require-login-click />
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
    unreadNotify() {
      return this.notifications.filter(notice => notice.read === 1);
    },
    isLoggedIn() {
      return this.$store.state.user.userid !== '';
    },
  },
  methods: {
    async getNotifications(id = 0) {
      let url = '/protected/user/notifications/' + id;
      const resCode = await this.$axios.get(url);
      if (resCode.data.code == 0 && resCode.data.data.notifications.length) {
        let notifications = this.$q.localStorage.getItem('notifications') || [];
        notifications.unshift(...resCode.data.data.notifications);
        this.$q.localStorage.set('notifications', notifications);
        this.notifications = notifications;
      }
    },
    hideNotice() {
      if (!this.showNotice && this.unreadNotify.length) {
        let notifications = this.$q.localStorage.getItem('notifications') || [];
        notifications.map(notice => {
          notice.read = 2;
        });
        this.$q.localStorage.set('notifications', notifications);
        this.notifications = notifications;
      }
    },
    readNotify() {
      this.showNotice = !this.showNotice;
      // debugger;
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      let notifications = this.$q.localStorage.getItem('notifications');
      let rowid = 0;
      if (notifications && notifications.length) {
        this.notifications = notifications;
        rowid = notifications[0].id;
      }
      this.getNotifications(rowid);
    }
  },
};
</script>

