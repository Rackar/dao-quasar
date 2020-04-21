<template>
  <div>
    <div>
      <q-avatar rounded>
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      用户ID
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
            <q-tab-panel name="myPosts">
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
        <q-card>我的钱包</q-card>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
export default {
  components: { ArticleShow },
  props: {},
  data() {
    return {
      tab: 'myPosts',
      userinfo: {},
      mycode: [],
      tokens: [],
      log: [],

      pullList: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 个人信息
    getuserinfo: async function() {
      let url = '/protected/user/me';
      const resData = await this.$axios.get(url, {});
      if (resData.data.code == 0) {
        this.userinfo = resData.data.data.me;
        this.$emit('setUserinfo', this.userinfo);
      } else if (resData.code == 104) {
        this.$router.push({ path: '/login', query: {} });
      }
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
.my-card {
  max-width: 400px;
}
</style>
