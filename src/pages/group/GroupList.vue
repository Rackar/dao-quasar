<template>
  <div class="container">
    <q-list class="rounded-borders" style="max-width: 550px">
      <div v-for="myGroup in myGroups" :key="myGroup.id">
        <q-item
          clickable
          @click="jumpToGroup(myGroup.grp.id)"
          @mouseover="showListId = myGroup.grp.id"
          @mouseout="handleMouseMoveout"
          v-ripple
          :class="[
            { isActive: isItemActive(myGroup.grp.id), pin: myGroup.pinned === 2 },
            'group-list',
          ]"
        >
          <span
            v-show="showListId == myGroup.grp.id"
            class="leftHideTool"
            @mouseover="handleMenuMouseMoveover(myGroup.grp.id)"
          >
            <!-- <q-icon name="icon_more"></q-icon> -->
            <img svg-inline src="@/statics/icons/icon_more.svg" class="svg-icon" />
            <div auto-close v-show="showMenu" @mouseout="showMenuId = 0" class="menu-hover">
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section
                    @click.stop="setGroupToTop(myGroup)"
                  >{{ myGroup.pinned === 2 ? '取消置顶' : '置顶群' }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section @click.stop="leaveGroup(myGroup.grp.id)">退出群</q-item-section>
                </q-item>
              </q-list>
            </div>
          </span>
          <q-item-section avatar>
            <q-avatar rounded size="50px">
              <img :src="myGroup.grp.avatar || 'statics/group.svg'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" style="margin-bottom:5px;">
              <span class="group-title">{{ myGroup.grp.name }}</span>
            </q-item-label>
            <q-item-label caption lines="1">{{ myGroup.grp.desc_text }}</q-item-label>
          </q-item-section>
          <q-item-section side top class="justify-between">
            <!-- <q-badge color="grey" :label="myGroup.unread" /> -->
            <q-item-label class="badge-num">{{ myGroup.unread }}</q-item-label>
            <q-item-label
              caption
            >{{ $utils.timeStringToLocal(myGroup.grp.last_post_at, 'RelativeDay') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="true" />
      </div>
      <q-item-label header style="padding: 35px 24px 6px;">
        <div class="tuijian">推荐</div>
      </q-item-label>
      <div v-for="grp in recommendGroups" :key="grp.id">
        <!-- <q-item
          clickable
          @click="jumpToGroup(grp.id)"
          @mouseover="showListId = grp.id"
          @mouseout="showListId = -1"
          v-ripple
          class="q-px-xl q-py-md"
        >-->
        <q-item
          clickable
          @click="jumpToGroup(grp.id)"
          v-ripple
          :class="[{ isActive: isItemActive(grp.id) }, 'q-px-xl', 'q-py-md']"
        >
          <!-- <span v-show="showListId == grp.id" class="leftHideTool" @click.stop="showListTool">...</span> -->
          <q-item-section avatar>
            <q-avatar rounded size="50px">
              <img :src="grp.avatar || 'statics/group.svg'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="group-title">{{ grp.name }}</span>
            </q-item-label>
            <q-item-label caption lines="1">{{ grp.desc_text }}</q-item-label>
          </q-item-section>
          <q-item-section side top class="justify-between">
            <q-icon
              v-if="grp.read_permission === 2"
              name="img:statics/icons/icon_suo_2.svg"
              size="xs"
            />
            <!-- <q-badge v-else color="grey" :label="grp.num_post" /> -->
            <q-item-label v-else class="badge-num">{{ grp.num_post }}</q-item-label>
            <q-item-label caption>{{ $utils.timeStringToLocal(grp.last_post_at, 'RelativeDay') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="true" />
      </div>
    </q-list>
    <quitGroup v-model="showQuitGroup" :groupId="quitGroupId" />
    <div></div>
  </div>
</template>
<script>
import { get, post } from 'src/apis/index.js';
import quitGroup from 'pages/toast/quitGroup';

let eventHandle = null;
export default {
  inject: ['reload'],
  components: { quitGroup },
  data() {
    return {
      myGroups: [],
      recommendGroups: [],
      showTooltip: false,
      showListId: 0,
      showMenuId: 0,
      showQuitGroup: false,
      quitGroupId: 0,
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to) {
      if (to.fullPath === '/') {
        this.init();
      }
    },
  },
  computed: {
    showMenu() {
      return this.showMenuId !== 0;
    },
    userid() {
      return this.$store.state.user.userid;
    },
    currentGroupId() {
      return this.$store.state.group.currentGroup.id;
    },
  },
  methods: {
    isItemActive(id) {
      return +id === +this.$route.params.id;
    },
    async init() {
      //同步执行了，待优化
      await this.getReCommendGroups();

      if (this.userid) {
        await this.getMyGroups();
      }

      // debugger;
      let activeGroupId = 0;
      // console.log(this.myGroups, this.recommendGroups);

      //如果地址里有群组id参数
      if (this.$route.params.id) {
        activeGroupId = this.$route.params.id;
      } else {
        if (this.myGroups && this.myGroups.length) {
          activeGroupId = this.myGroups[0].grp.id;
        } else if (this.recommendGroups && this.recommendGroups.length) {
          activeGroupId = this.recommendGroups[0].id;
        }
      }

      this.jumpToGroup(activeGroupId);
    },

    //
    jumpToGroup(id) {
      //跳转前检查是否已加入该组
      let ifJoined = this.myGroups.some(joined => {
        if (joined.grp.id == id) {
          joined.unread = 0;
        }
        return joined.grp.id == id;
      });
      this.$store.dispatch('group/jumpToGroup', { id: id, joined: ifJoined });
      if (this.$route.params.id != id) {
        this.$router.push('/group/' + id).catch(() => {});
      }
    },
    // 获取群信息
    getMyGroups: async function() {
      let apiCode = '/protected/grp/joined';
      //注释掉接口
      const getjoined = await get(apiCode);
      // debugger;
      if (getjoined) {
        if (getjoined.code == 0) {
          this.myGroups = getjoined.data.grps_joined;
        } else if (getjoined.code == 104) {
        }
      } else {
      }
    },
    // 获取推荐
    getReCommendGroups: async function() {
      let postUrl;
      if (this.userid) {
        postUrl = '/protected/grp/recommend';
      } else {
        postUrl = '/grp/recommend';
      }

      const getgrps = await get(postUrl);
      // debugger;
      if (getgrps.code == 0) {
        // console.log(getgrps.data);
        this.recommendGroups = getgrps.data.grps;
      } else {
      }
    },
    showListTool() {
      this.$q.notify('点击按钮');
    },
    async setGroupToTop(myGroup) {
      let pin = myGroup.pinned;
      let data = {
        grp: myGroup.grp.id,
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
        this.reload();
      }
    },
    leaveGroup(id) {
      this.showQuitGroup = true;
      this.quitGroupId = id;
    },
    handleMouseMoveout() {
      this.showListId = 0;
      // this.showMenuId = 0;
    },
    handleMenuMouseMoveover(id) {
      this.showMenuId = id;
      clearTimeout(eventHandle);
      eventHandle = setTimeout(() => {
        this.showMenuId = 0;
      }, 2000);
    },
  },
};
</script>
<style lang="stylus" scoped>
.container {
  padding-top: 20px;

  .group-list {
    padding: 18px 48px;
  }

  .group-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 25px;
    color: #5C6876;
  }

  .text-caption {
    font-size: 12px;
    color: #8C909D;
  }

  .badge-num {
    font-size: 12px;
    padding: 6px 7px 5px;
    background: rgb(228, 228, 228);
    border-radius: 13px;
    color: #2A3542;
    font-weight: 600;
  }
}

.tuijian {
  padding-left: 22px;
  font-size: 18px;
  font-weight: 600;
  color: rgb(42, 53, 66);
  line-height: 33px;
}

.isActive {
  background-color: #E4E4E4;

  .badge-num {
    background: #F1F1F1;
  }
}

.leftHideTool {
  position: absolute;
  left: 22px;
  top: 31px;
  z-index: 20;
  padding: 1px;
  font-size: 20px;
}

.pin {
  background-color: #dddddd;

  .badge-num {
    background: rgb(241, 241, 241);
  }
}

.menu-hover {
  position: absolute;
  font-size: 14px;
  background-color: white;
  top: 10px;
  left: 20px;
  border-radius: 4px;
}
</style>
