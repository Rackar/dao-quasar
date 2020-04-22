<template>
  <div>
    <div class="row no-wrap items-end q-mt-md q-px-lg title">
      <q-avatar rounded size="100px" class="dimmed">
        <img :src="userinfo.avatar || 'statics/user.svg'" />
      </q-avatar>
      {{ this.userinfo.name || this.userinfo.mail_export }}
      <div class="column">
        <div class="cursor-pointer col" style="width: 100px">
          {{ edit.name }}
          <q-icon name="edit" color="primary" />

          <q-popup-edit v-model="edit.name" :cover="false" :offset="[0, 10]">
            <q-input color="primary" v-model="edit.name" dense autofocus counter>
              <template v-slot:prepend>
                <q-icon name="record_voice_over" color="primary" />
              </template>
            </q-input>
          </q-popup-edit>
        </div>
        <div class="q-size-sm">10234 xxx@qq.com</div>
      </div>

      <q-space />
      <q-btn outline color="primary" icon="menu" label="编辑资料" />
    </div>
    <div class="row q-gutter-lg">
      <div class="col-6 offset-md-1">
        <q-card flat class="my-card">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="myPosts" label="我的帖子" />
            <q-tab name="recycle" label="回收站" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="myPosts" class="posts">
              <ArticleShow
                v-for="post in pullList"
                :post="post"
                :key="post.post.id"
                :personPage="true"
              />
            </q-tab-panel>

            <q-tab-panel name="recycle">
              <div class="text-h6">回收站</div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-4">
        <wallet :tokens="tokens" :log="log" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
import wallet from './wallet';
export default {
  components: { ArticleShow, wallet },
  props: {},
  data() {
    return {
      tab: 'myPosts',
      // userinfo: {},
      mycode: [],
      tokens: [],
      log: [],
      pullList: [],
      edit: {
        name: '111',
      },
    };
  },
  watch: {},
  computed: {
    userinfo() {
      return this.$store.state.user;
    },
  },
  methods: {
    // 个人信息
    getuserinfo: async function() {
      // let url = '/protected/user/me';
      // const resData = await this.$axios.get(url, {});
      // if (resData.data.code == 0) {
      //   this.userinfo = resData.data.data.me;
      //   this.$emit('setUserinfo', this.userinfo);
      // } else if (resData.code == 104) {
      //   this.$router.push({ path: '/login', query: {} });
      // }
    },
    // 我的代币
    getmycode: async function() {
      let url = 'protected/user/tokens';
      const resCode = await this.$axios.get(url, {});
      if (resCode.data.code == 0) {
        this.tokens = resCode.data.data.tokens;
      } else if (resCode.data.code == 104) {
      }
    },
    // 我的帖子
    getmyabb: async function(del) {
      let url = 'protected/post/my/pull';
      const resCode = await this.$axios.post(url, {
        base_post: null,
        deleted: del,
      });
      if (resCode.data.code == 0) {
        this.pullList = [];
        this.pullList = resCode.data.data.posts;
        // if (!this.pullList.length) {
        // }
      }
    }, // 转账日志
    tokenLog: async function() {
      let url = 'protected/user/token/logs';
      let dat = {
        contract: '',
        base_token_log: null,
      };
      const resLog = await this.$axios.post(url, dat);
      if (resLog.data.code == 0) {
        this.log = resLog.data.data.token_logs;
      } else {
        alert(resLog.data.message);
      }
    },
  },
  created() {
    let userid = this.$store.state.user.userid;
    if (userid) {
      //注释掉接口初始化
      this.getuserinfo();
      this.getmycode();
      this.tokenLog();
      this.getmyabb(false);
      //   this.$nextTick(function() {
      //     this.doImg();
      //     this.hideinfo();
      //   });
    } else {
      this.$router.push({ path: '/login', query: {} });
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.posts {
  height: 500px;
}
.my-card {
  max-width: 580px;
}
.title {
  margin-top: -40px;
}
</style>
