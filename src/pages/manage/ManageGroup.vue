<template>
  <div>
    <div class="top-login">
      <headerBarRight />
    </div>
    <div class="q-ma-lg main">
      <div class="main-title" v-if="!editing.title">
        <div class="group-name">
          <q-avatar size="30px">
            <img :src="tempGroupData.avatar || 'statics/group.svg'" />
          </q-avatar>
          <span class="text-weight-bold q-px-md">{{ tempGroupData.name }}</span>
          <q-btn flat icon="edit" color="primary" @click="startEditTitle()" v-show="isOwner" />
        </div>
        <div class="desc">{{ tempGroupData.desc_text }}</div>
      </div>
      <div class="main-title" v-if="editing.title">
        <div class="group-name">
          <q-avatar size="30px">
            <img :src="owner.avatar || 'statics/user.svg'" />
          </q-avatar>
          <q-input outlined v-model="editGroupData.name" dense />
        </div>
        <q-input v-model="editGroupData.desc_text" filled type="textarea" />
        <q-btn outline color="primary" label="取消" @click="editing.title=false" />
        <q-btn unelevated color="primary" label="保存" @click="saveTitle" />
      </div>
      <div class="read_permission">
        <div class="title">
          帖子阅读
          <q-btn
            flat
            icon="edit"
            color="primary"
            @click="startEditReadPermission()"
            v-show="isOwner"
            v-if="!editing.read_permission"
          />
        </div>
        <div class="q-gutter-sm">
          <div v-if="!editing.read_permission">
            <q-radio disable v-model="tempGroupData.read_permission" :val="1" label="任何人" />
            <q-radio disable v-model="tempGroupData.read_permission" :val="2" label="仅限组员" />
          </div>
          <div v-if="editing.read_permission">
            <q-radio v-model="editGroupData.read_permission" :val="1" label="任何人" />
            <q-radio v-model="editGroupData.read_permission" :val="2" label="仅限组员" />
            <q-input
              outlined
              v-model="editGroupData.password"
              dense
              v-if="editing.read_permission&&editGroupData.read_permission===2"
            />
          </div>

          <div v-if="editing.read_permission">
            <q-btn outline color="primary" label="取消" @click="editing.read_permission=false" />
            <q-btn unelevated color="primary" label="保存" @click="saveReadPermission" />
          </div>
        </div>
      </div>
      <div class="reward">
        <span class="title">奖励机制</span>
        <span class="subtitle">(单位：NES)</span>
        <q-btn
          flat
          icon="edit"
          color="primary"
          @click="startEditReward()"
          v-show="isOwner"
          v-if="!editing.reward"
        />
        <div class="comment">正数代表奖励，负数代表收费</div>

        <div class="row text-center q-ma-md">
          <div class="col">入群奖励</div>
          <div class="col">发帖奖励</div>
        </div>
        <div class="row text-center text-h6 q-ma-md" v-if="!editing.reward">
          <div class="col">{{tempGroupData.reward_join}}</div>
          <q-separator vertical />
          <div class="col">{{tempGroupData.reward_post}}</div>
        </div>
        <div class="row text-center text-h6 q-ma-md" v-if="editing.reward">
          <div class="col">
            <q-input outlined v-model="editGroupData.reward_join" dense />
          </div>
          <q-separator vertical />
          <div class="col">
            <q-input outlined v-model="editGroupData.reward_post" dense />
          </div>
        </div>

        <div v-if="editing.reward">
          <q-btn outline color="primary" label="取消" @click="editing.reward=false" />
          <q-btn unelevated color="primary" label="保存" @click="saveReward" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBarRight from 'components/headerBarRight';
export default {
  components: { headerBarRight },
  props: {},

  watch: {
    groupId() {
      this.init();
    },
  },
  computed: {
    owner() {
      return this.$store.state.group.currentGroupOwner;
    },
    group() {
      return this.$store.state.group.currentGroup;
    },
    groupId() {
      return this.$store.state.group.currentGroup.id;
    },
    isOwner() {
      return this.owner.id === this.$store.state.user.userid;
    },
  },

  mounted() {},
  data() {
    return {
      editing: { title: false, read_permission: false, reward: false },
      tempGroupData: {
        id: 0,
        name: '',
        desc_text: '',
        password: null,
        read_permission: 1,
        avatar: '',
        reward_contract: '',
        reward_join: '0',
        reward_post: '0',
      },
      editGroupData: {
        id: 0,
        name: '',
        desc_text: '',
        password: null,
        read_permission: 1,
        avatar: '',
        reward_contract: '',
        reward_join: '0',
        reward_post: '0',
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.tempGroupData = { ...this.group };
    },

    startEditTitle() {
      this.editing.title = true;
      this.editGroupData.name = this.tempGroupData.name;
      this.editGroupData.desc_text = this.tempGroupData.desc_text;
    },
    startEditReadPermission() {
      this.editing.read_permission = true;
      this.editGroupData.read_permission = this.tempGroupData.read_permission;
      this.editGroupData.password = this.tempGroupData.password;
    },
    startEditReward() {
      this.editing.reward = true;
      this.editGroupData.reward_contract = this.tempGroupData.reward_contract;
      this.editGroupData.reward_join = this.tempGroupData.reward_join;
      this.editGroupData.reward_post = this.tempGroupData.reward_post;
    },
    saveTitle() {
      this.tempGroupData.name = this.editGroupData.name;
      this.tempGroupData.desc_text = this.editGroupData.desc_text;
      this.editing.title = false;
      this.saveToServer(this.tempGroupData);
    },
    saveReadPermission() {
      this.tempGroupData.read_permission = this.editGroupData.read_permission;
      this.tempGroupData.password = this.editGroupData.password || null;
      this.editing.read_permission = false;
      this.saveToServer(this.tempGroupData);
    },
    saveReward() {
      // this.tempGroupData.reward_contract = this.editGroupData.reward_contract;
      // this.tempGroupData.reward_join = this.editGroupData.reward_join;
      // this.tempGroupData.reward_post = this.editGroupData.reward_post;
      // this.editing.reward = false;
      // this.saveToServer(this.tempGroupData);
    },
    async saveToServer(data) {
      let api = '/protected/grp';
      let res = await this.$axios.put(api, data);
      if (res.data && res.data.code === 0) {
        this.$q.notify('修改成功');
      } else {
        this.$q.notify('修改失败');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.top-login {
  position: absolute;
  top: 20px;
  right: 40px;
}
.group-name {
  margin-top: 50px;
  padding: 30px;
}
.desc {
  height: 250px;
  background-color: rgb(221, 221, 221);
  border-radius: 10px;
  padding: 15px;
}
.comment {
  color: #8c909d;
  font-size: 14px;
}

.title {
  padding-top: 10px;
  color: #2a3542;
  font-size: 20px;
}
.subtitle {
  color: #2a3542;
  font-size: 14px;
}
</style>
