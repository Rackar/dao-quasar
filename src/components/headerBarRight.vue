<template>
  <div class="header-bar-right">
    <div v-if="isLoggedIn">
      <q-avatar class="header-notify" size="36px" icon="notifications_none" @click="readNotify">
        <q-badge color="red" floating v-if="unreadNotify.length">{{unreadNotify.length}}</q-badge>
      </q-avatar>
      <q-avatar size="30px" class="header-avatar hoverable-avatar">
        <img :src="$store.state.user.avatar || 'statics/user.svg'" />
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="createGrp">新建一个群</q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-if="isInGroupPath">
              <q-item-section
                @click="setGroupToTop()"
              >{{ currentGroup.pinned === 2 ? '取消置顶本群' : '置顶本群' }}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-if="isInGroupPath">
              <q-item-section @click="leaveGroup()">退出本群</q-item-section>
            </q-item>

            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section
                @click="$router.push('/person/show/' + $store.state.user.userid)"
              >我的DAO @{{user.userid}}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="clearLogin">退出登录 ({{user.name}})</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
      <q-dialog
        content-class="notify-dialog"
        transition-show="fade"
        transition-hide="fade"
        v-model="showNotice"
        seamless
        position="top"
        @hide="hideNotice"
      >
        <q-card>
          <q-card-section>
            <!-- <div class="row items-center no-wrap">
              系统通知
              <q-space />
              <q-btn flat round icon="close" v-close-popup />
            </div>-->
            <div v-if="unreadNotify.length===0">当前无未读通知。</div>
            <div v-for="notice in unreadNotify" :key="notice.id" class="header-notify-detail">
              {{ notice.h_text }}
              <!-- - {{ $utils.timeStringToLocal(notice.create_at,'RelativeTime') }} -->
              <q-separator />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <q-btn v-else color="primary" flat label="快速登录" v-require-login-click />
    <groupCreate v-model="showCreate" />
    <quitGroup v-model="showQuitGroup" :groupId="quitGroupId" />
  </div>
</template>

<script>
import { post } from 'src/apis/index.js';
import groupCreate from 'pages/group/GroupCreate';
import quitGroup from 'pages/toast/quitGroup';
export default {
  name: 'headerBarRight',
  components: { groupCreate, quitGroup },
  props: {},
  data() {
    return {
      showNotice: false,
      showCreate: false,
      showQuitGroup: false,
      notifications: [],
      quitGroupId: 0,
    };
  },
  watch: {},
  computed: {
    isInGroupPath() {
      return /\/group\//.test(this.$route.fullPath);
    },
    unreadNotify() {
      return this.notifications.filter(notice => notice.read === 1);
    },
    user() {
      return this.$store.state.user;
    },
    isLoggedIn() {
      return this.$store.state.user.userid !== '';
    },
    currentGroupId() {
      return this.$store.state.group.currentGroup.id;
    },
    currentGroup() {
      return this.$store.state.group.currentGroup;
    },
  },
  methods: {
    createGrp: function() {
      this.showCreate = true;
    },
    clearLogin: function() {
      localStorage.clear();
      this.$router.push('/');
      this.$store.commit('user/resetUserinfo');
    },
    async setGroupToTop() {
      let myGroup = this.currentGroup;
      let pin = myGroup.pinned;
      let data = {
        grp: myGroup.id,
        pinned: pin === 1 ? 2 : 1,
      };
      let postUrl = '/protected/grp/pin';
      const res = await post(postUrl, data);
      if (res.code === 0) {
        if (pin === 1) {
          this.$q.notify('置顶成功');
        } else {
          this.$q.notify('取消置顶成功');
        }
        this.$router.go(0);
      }
    },
    leaveGroup() {
      this.showQuitGroup = true;
      this.quitGroupId = this.currentGroupId;
    },
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
<style lang="stylus" >
.header-bar-right {
  .header-notify {
    cursor: pointer;
    margin-right: 15px;

    // margin: 0 10px;
    &:hover {
      color: $primary;
      background-color: $dback;
    }
  }

  .header-avatar {
    margin-right: 20px;
  }
}

.notify-dialog {
  .q-dialog__inner {
    top: 70px;
    left: auto;
  }

  .header-notify-detail {
    font-size: 14px;
    font-weight: 600;
    line-height: 45px;
    // padding-top: 10px;
    // padding-bottom: 10px;
  }
}
</style>

