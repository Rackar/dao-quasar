<template>
  <div class="container">
    <q-list class="rounded-borders" style="max-width: 550px">
      <div v-for="myGroup in myGroups" :key="myGroup.id">
        <q-item
          clickable
          @click="jumpToGroup(myGroup.grp.id)"
          @mouseover="showListId = myGroup.grp.id"
          @mouseout="showListId = 0"
          v-ripple
          :class="[{ isActive: isItemActive(myGroup.grp.id), pin: myGroup.pinned === 2 }, 'q-px-xl', 'q-py-md']"
        >
          <!-- <span
            v-show="showListId == myGroup.grp.id"
            class="leftHideTool"
            @click.stop="showListTool"
          >
            ...
          </span>-->
          <q-btn
            flat
            no-caps
            icon="menu"
            v-show="showListId == myGroup.grp.id"
            class="leftHideTool"
          >
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section @click.stop="setGroupToTop(myGroup.grp.id)">置顶群</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section @click.stop="leaveGroup(myGroup.grp.id)">退出群</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-item-section avatar>
            <q-avatar rounded size="40px">
              <img :src="myGroup.grp.avatar || 'statics/group.svg'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-bold">{{ myGroup.grp.name }}</span>
            </q-item-label>
            <q-item-label caption lines="2">{{ myGroup.grp.desc_text }}</q-item-label>
          </q-item-section>
          <q-item-section side top class="justify-between">
            <q-badge color="grey" :label="myGroup.grp.num_post" />
            <q-item-label caption>{{ $utils.timeStringToLocal(myGroup.grp.last_post_at) }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="true" />
      </div>
      <q-item-label header class="q-pa-lg">
        <div class="text-h6 text-weight-bold">推荐</div>
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
            <q-avatar rounded size="40px">
              <img :src="grp.avatar || 'statics/group.svg'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-bold">{{ grp.name }}</span>
            </q-item-label>
            <q-item-label caption lines="2">{{ grp.desc_text }}</q-item-label>
          </q-item-section>
          <q-item-section side top class="justify-between">
            <q-badge color="grey" :label="grp.num_post" />
            <q-item-label caption>{{ $utils.timeStringToLocal(grp.last_post_at) }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="true" />
      </div>
    </q-list>
    <quitGroup v-model="showQuitGroup" :groupId="quitGroupId" />
  </div>
</template>
<script>
import { get, post } from 'src/apis/index.js';
import quitGroup from 'pages/toast/quitGroup';
export default {
  components: { quitGroup },
  data() {
    return {
      myGroups: [],
      recommendGroups: [],
      showTooltip: false,
      showListId: 0,
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
    async setGroupToTop(id) {
      let data = {
        grp: id,
        pinned: 2,
      };
      let postUrl = '/protected/grp/pin';
      const res = await post(postUrl, data);
      if (res.code === 0) {
        this.$q.notify('置顶成功');
      }
    },
    leaveGroup(id) {
      this.showQuitGroup = true;
      this.quitGroupId = id;
    },
  },
};
</script>
<style lang="stylus" scoped>
.isActive {
  background-color: #E4E4E4;
}

.leftHideTool {
  position: absolute;
  left: 0px;
  top: 20px;
  z-index: 30;
}

.pin {
  background-color: #dddddd;
}
</style>
