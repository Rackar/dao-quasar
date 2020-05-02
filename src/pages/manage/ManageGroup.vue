<template>
  <div>
    <div class="top-login">
      <headerBarRight />
    </div>
    <Upload ref="upload" @uploaded="uploaded" />
    <div class="main">
      <div class="main-title" v-if="!editing.title">
        <div class="group-name">
          <q-avatar class="avatar" size="60px">
            <img :src="tempGroupData.avatar || 'statics/group.svg'" />
          </q-avatar>
          <span class="name-text">{{ tempGroupData.name }}</span>
          <q-btn
            dense
            flat
            icon="edit"
            color="primary"
            @click="startEditTitle()"
            v-show="isOwner"
          />
        </div>
        <div class="desc" v-html="desc"></div>
      </div>
      <div class="main-title" v-if="editing.title">
        <div class="group-name">
          <q-avatar size="60px" class="avatar-edit" @click="changeAvatar">
            <q-icon name="camera" class="mask" />
            <img :src="tempGroupData.avatar || 'statics/group.svg'" class="masked" />
            <q-inner-loading :showing="loadingVisible">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
          </q-avatar>
          <div class="name-input">
            <q-input outlined v-model="editGroupData.name" dense />
          </div>
        </div>
        <q-input v-model="editGroupData.desc_text" filled type="textarea" />
        <div class="text-right">
          <q-btn outline color="primary" label="取消" @click="editing.title = false" />
          <q-btn unelevated color="primary" label="保存" @click="saveTitle" />
        </div>
      </div>
      <div class="read_permission">
        <div class="name-text">
          帖子阅读
          <q-btn
            flat
            dense
            icon="edit"
            color="primary"
            @click="startEditReadPermission()"
            v-show="isOwner"
            v-if="!editing.read_permission"
          />
        </div>
        <div class="q-gutter-sm">
          <div v-if="!editing.read_permission" class="select-read">
            <q-radio disable v-model="tempGroupData.read_permission" :val="1" label="任何人" />
            <q-radio disable v-model="tempGroupData.read_permission" :val="2" label="仅限组员" />
          </div>
          <div v-if="editing.read_permission" class="row select-read">
            <q-radio v-model="editGroupData.read_permission" :val="1" label="任何人" />
            <q-radio v-model="editGroupData.read_permission" :val="2" label="仅限组员" />
            <div
              style="width:140px; margin-left:30px;"
              v-if="editing.read_permission && editGroupData.read_permission === 2"
            >
              <q-input
                outlined
                v-model="editGroupData.password"
                dense
                placeholder="6位数字或字母"
              />
            </div>
          </div>

          <div v-if="editing.read_permission" class="text-right">
            <q-btn outline color="primary" label="取消" @click="editing.read_permission = false" />
            <q-btn unelevated color="primary" label="保存" @click="saveReadPermission" />
          </div>
        </div>
      </div>
      <div class="reward">
        <span class="name-text">奖励机制</span>
        <span class="subtitle">
          (单位：
          <span v-if="!editing.reward">{{ tokenSelect.symbol }}</span>
          <q-btn no-caps flat :label="tokenSelect.symbol + '▽'" v-if="editing.reward">
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <div v-for="(token, index) in tokens" :key="index">
                  <q-item clickable @click="pickToken(token)">
                    <q-item-section>{{ token.symbol }}</q-item-section>
                  </q-item>
                  <q-separator />
                </div>
              </q-list>
            </q-menu>
          </q-btn>
          )
        </span>
        <q-btn
          flat
          dense
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
          <div class="col">{{ tempGroupData.reward_join }}</div>
          <q-separator vertical />
          <div class="col">{{ tempGroupData.reward_post }}</div>
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

        <div v-if="editing.reward" class="text-right">
          <q-btn outline color="primary" label="取消" @click="editing.reward = false" />
          <q-btn unelevated color="primary" label="保存" @click="saveReward" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBarRight from 'components/headerBarRight';
import Upload from 'components/Upload';
export default {
  components: { headerBarRight, Upload },
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
    desc() {
      return this.tempGroupData.desc_text.replace(/\n/g, '<br/>');
    },
  },

  mounted() {},
  data() {
    return {
      loadingVisible: false,
      editing: { title: false, read_permission: false, reward: false },
      tokens: [{ contract: '', symbol: 'ETH' }],
      tokenSelect: {
        contract: '',
        symbol: '',
        name: '',
      },
      tokenIndex: 0,

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
      this.getTokenInfo();
    },
    async getTokenInfo() {
      let url = '/contracts';
      const resCode = await this.$axios.get(url);
      if (resCode.data.code == 0) {
        this.tokens = resCode.data.data.contracts;
        for (let index = 0; index < this.tokens.length; index++) {
          const element = this.tokens[index];
          if (element.contract === this.group.reward_contract) {
            this.tokenSelect = element;
          }
        }
      } else if (resCode.data.code == 104) {
      }
    },
    changeAvatar() {
      this.loadingVisible = true;
      this.$refs.upload.upload();
    },
    uploaded(data) {
      if (data.err) {
      } else {
        this.editGroupData.avatar = data.url;
      }

      this.loadingVisible = false;
      this.$q.notify('头像上传成功');
    },
    pickToken(token) {
      console.log(token);
      this.tokenSelect = token;
    },

    startEditTitle() {
      this.editing.title = true;
      this.editGroupData.name = this.tempGroupData.name;
      this.editGroupData.desc_text = this.tempGroupData.desc_text;
    },
    startEditReadPermission() {
      this.editing.read_permission = true;
      this.editGroupData.read_permission = this.tempGroupData.read_permission;
      this.editGroupData.password = null;
    },
    startEditReward() {
      this.editing.reward = true;
      this.editGroupData.reward_contract = this.tempGroupData.reward_contract;
      this.editGroupData.reward_join = this.tempGroupData.reward_join;
      this.editGroupData.reward_post = this.tempGroupData.reward_post;
    },
    saveTitle() {
      this.tempGroupData.avatar = this.editGroupData.avatar;
      this.tempGroupData.name = this.editGroupData.name;
      this.tempGroupData.desc_text = this.editGroupData.desc_text;
      this.editing.title = false;
      this.saveToServer(this.tempGroupData);
    },
    saveReadPermission() {
      this.tempGroupData.read_permission = this.editGroupData.read_permission;
      this.tempGroupData.password = this.editGroupData.password;
      this.editing.read_permission = false;
      if (this.tempGroupData.read_permission === 1) {
        //如果公开群，清空密码
        this.tempGroupData.password = '';
      } else if (
        this.tempGroupData.read_permission === 2 &&
        (this.tempGroupData.password === '' || this.tempGroupData.password === '****')
      ) {
        // 没有修改密码
        this.tempGroupData.password = null;
      }
      this.saveToServer(this.tempGroupData);
    },
    saveReward() {
      this.tempGroupData.reward_contract = this.tokenSelect.contract;
      this.tempGroupData.reward_join = this.editGroupData.reward_join;
      this.tempGroupData.reward_post = this.editGroupData.reward_post;
      this.editing.reward = false;
      this.saveToServer(this.tempGroupData);
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
.main {
  margin: 40px;
  .name-text {
    font-size: 20px;
    // line-height: 26px;
    font-weight: bold;
    color: #2a3542;
    margin: 40px 0 10px;
    // padding-left: 14px;
  }
  .main-title {
    .group-name {
      margin-top: 50px;
      padding: 20px 0;
      .name-input {
        width: 200px;
      }
      .avatar {
        margin-right: 15px;
      }
      .avatar-edit {
        background-color: #000000;
        .mask {
          position: absolute;
          color: white;
        }
        .masked {
          opacity: 0.6;
          filter: alpha(opacity=60);
        }
      }
    }
    .desc {
      // height: 250px;
      // background-color: rgb(221, 221, 221);
      border-radius: 10px;
      color: #8c909d;
      // padding: 20px 0 0;
      font-size: 16px;
    }
  }
}

.read_permission {
  .select-read {
    font-size: 16px;
  }
}

.reward {
  margin: 30px 0 0;
  .subtitle {
    color: #2a3542;
    font-size: 14px;
  }
  .comment {
    color: #8c909d;
    font-size: 14px;
  }
}
</style>
