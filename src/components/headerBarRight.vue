<template>
  <div class="header-bar-right">
    <div v-if="isLoggedIn">
      <q-avatar class="header-notify" size="36px" icon="notifications_none">
        <q-badge color="red" floating v-if="unreadNotify.length">{{unreadNotify.length}}</q-badge>
        <q-menu transition-show="jump-down" transition-hide="jump-up" @hide="hideNotice">
          <div v-if="notificationsShow.length===0">近期无通知。</div>
          <q-list style="min-width:310px;">
            <div v-for="notice in notificationsShow" :key="notice.id">
              <q-item class="header-notify-detail" :class="{unread:notice.read==1}">
                <q-item-section v-if="notice.n_type===1 || !notice.n_type">
                  <q-item-label lines="2">{{ notice.h_text }}</q-item-label>
                </q-item-section>
                <q-item-section side avatar v-if="notice.n_type===2 ||notice.n_type===3">
                  <q-avatar size="35px">
                    <img :src="notice.creatorIn.avatar|| 'statics/user.svg'" />
                  </q-avatar>
                </q-item-section>
                <q-item-section v-if="notice.n_type===2">
                  <q-item-label lines="2">
                    <router-link :to="{ name: 'articles', params: { id: notice.post + '' } }">
                      {{ notice.h_text }}
                      <br />
                      <div class="content">{{notice.postIn.content.substr(0,30)}}</div>
                    </router-link>
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="notice.n_type===3">
                  <q-item-label lines="2">
                    <router-link
                      :to="{ name: 'articles', params: { id: notice.commentIn.post + '' } }"
                    >
                      {{ notice.h_text }}
                      <br />
                      <div class="content">“{{notice.commentIn.content.substr(0,30)}}”</div>

                      <br />
                    </router-link>
                  </q-item-label>
                </q-item-section>

                <!-- <q-item-section side>
                  <q-item-label
                    caption
                  >{{ $utils.timeStringToLocal(notice.create_at,'RelativeTime') }}</q-item-label>
                </q-item-section>-->
              </q-item>
              <q-separator />
            </div>
          </q-list>
        </q-menu>
      </q-avatar>
      <q-avatar size="30px" class="header-avatar hoverable-avatar">
        <img :src="$store.state.user.avatar || 'statics/user.svg'" />
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="createGrp">新建一个群</q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-if="isInGroupPath && groupJoined">
              <q-item-section @click="setGroupToTop()">{{ isPinned === 2 ? '取消置顶本群' : '置顶本群' }}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-if="isInGroupPath && groupJoined">
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
          <q-card-section style="max-width:310px;">
            <!-- <div class="row items-center no-wrap">
              系统通知
              <q-space />
              <q-btn flat round icon="close" v-close-popup />
            </div>-->
            <div v-if="notificationsShow.length===0">近期无通知。</div>
            <!-- <div
              v-for="notice in notificationsShow"
              :key="notice.id"
              class="header-notify-detail"
              :class="{unread:notice.read==1}"
            >
              <span class="content-span">{{ notice.h_text }}</span>

              <span
                class="time-span"
              >{{ $utils.timeStringToLocal(notice.create_at,'RelativeTime') }}</span>

              <q-separator />
            </div>-->

            <q-list>
              <div v-for="notice in notificationsShow" :key="notice.id">
                <q-item class="header-notify-detail" :class="{unread:notice.read==1}">
                  <q-item-section>
                    <q-item-label lines="2">{{ notice.h_text }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label
                      caption
                    >{{ $utils.timeStringToLocal(notice.create_at,'RelativeTime') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
              </div>
            </q-list>
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
    notificationsShow() {
      return this.notifications.slice(0, 6);
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
    groupJoined() {
      // return this.$store.state.group.currentGroup.joined;
      return this.$store.getters['group/ifCurrentGroupJoined'];
    },
    isPinned() {
      let pinObj = this.$store.state.group.joinedGroupPinnedList.find(
        group => group.id === this.currentGroupId
      );
      if (pinObj) {
        return pinObj.pinned;
      } else {
        return null;
      }
    },
  },
  methods: {
    createGrp: function() {
      this.showCreate = true;
    },
    clearLogin: function() {
      localStorage.clear();
      this.$store.commit('user/resetUserinfo');
      // this.$router.push('/');
      this.$q.notify('已退出登录');
      location.href = '/';
    },
    async setGroupToTop() {
      let myGroup = this.currentGroup;
      let pin = this.isPinned;
      if (pin) {
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
        let noti = resCode.data.data;
        let arr = noti.notifications.map(no => {
          if (no.n_type === 2) {
            //like
            let post = noti.posts.find(po => po.id === no.post);
            let creator = noti.users.find(user => user.id === no.post_user);
            no.postIn = post;
            no.creatorIn = creator;
          } else if (no.n_type === 3) {
            //comment
            let comment = noti.comments.find(com => com.id === no.comment);
            let creator = noti.users.find(user => user.id === comment.creator);
            no.commentIn = comment;
            no.creatorIn = creator;
          }
          return no;
        });

        notifications.unshift(...arr);
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

.header-notify-detail {
  font-size: 14px;
  line-height: 40px;

  .content-span {
    padding-right: 10px;
    color: $dblack;
    max-width: 100px;
  }

  .time-span {
    font-size: 12px;
    color: $dgrey;
    float: right;
    text-align: right;
  }

  .content {
    color: grey;
    padding-top: 8px;
  }
}

.unread {
  font-weight: 600;
}
</style>

