<template>
  <div class="main">
    <AddComment :postId="commentPostId" v-model="addCommentShow" :onSave="onAddComment" />
    <Upload ref="upload" />
    <div class="row no-wrap items-end q-mt-md q-px-lg title">
      <q-avatar rounded size="100px" :class="{ dimmed: editing }" @click="changeAvatar">
        <img :src="userinfo.avatar || 'statics/user.svg'" />
      </q-avatar>

      <div class="column">
        <div class="cursor-pointer col" style="width: 100px">
          {{ this.userinfo.name || this.userinfo.mail_export }}
          <!-- <q-icon name="edit" color="primary" />

          <q-popup-edit v-model="edit.name" :cover="false" :offset="[0, 10]">
            <q-input color="primary" v-model="edit.name" dense autofocus counter>
              <template v-slot:prepend>
                <q-icon name="record_voice_over" color="primary" />
              </template>
            </q-input>
          </q-popup-edit>-->
        </div>
        <div class="q-size-sm">DOA ID {{ id }} {{ userinfo.mail_export }}</div>
      </div>

      <q-space />
      <q-btn
        outline
        color="primary"
        icon="menu"
        label="编辑资料"
        v-show="isMyself"
        @click="clickEdit"
      />
    </div>
    <div class="row ">
      <div class="col-7 offset-md-1">
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
                :addComment="() => showAddComment(post.post.id)"
                @del="postDeleted"
              />
            </q-tab-panel>

            <q-tab-panel name="recycle">
              <ArticleShow
                v-for="post in recycleList"
                :post="post"
                :key="post.post.id"
                :personPage="true"
                viewType="comment"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-2  offset-md-1">
        <wallet :tokens="tokens" :log="log" v-if="isMyself" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
import AddComment from 'pages/group/AddComment';
import wallet from './wallet';
import Upload from 'components/Upload';
export default {
  components: { ArticleShow, wallet, AddComment, Upload },
  props: {
    id: String,
  },
  data() {
    return {
      tab: 'myPosts',
      // userinfo: {},
      mycode: [],
      tokens: [
        {
          contract: {
            contract: '',
            name: '',
            symbol: '',
          },
          token: {
            contract: '',
            user: 0,
            value: '0.00',
          },
        },
      ],
      log: [],
      pullList: [],
      userinfo: {},
      edit: {
        name: '111',
      },

      addCommentShow: false,
      commentPostId: 0,

      editing: false,
      uploadAvatar: false,

      recycleInited: false,
      recycleList: [],
    };
  },
  watch: {
    id() {
      this.init();
    },
  },
  computed: {
    myUserinfo() {
      return this.$store.state.user;
    },
    isMyself() {
      return this.myUserinfo.userid == this.id;
    },
    // currentUserId() {
    //   return this.$route.params.id;
    // },
  },
  methods: {
    init() {
      let userid = this.$store.state.user.userid;
      if (userid) {
        //判断是否进入本人信息页
        if (this.isMyself) {
          this.userinfo = this.myUserinfo;
          this.getMyPosts();
          this.getmycode();
          this.tokenLog();
          this.getMyRecycle();
        } else {
          userid = this.id;
          this.getOtherUser(userid);
          this.getOtherPosts(userid);
        }
      } else {
        this.$router.push({ path: '/login', query: {} });
      }
    },
    async getMyRecycle() {
      let url = 'protected/post/my/pull';
      const resCode = await this.$axios.post(url, {
        base_post: null,
        deleted: true,
      });
      if (resCode.data.code == 0) {
        this.recycleList = [];
        this.recycleList = resCode.data.data.posts;
      }
    },

    // 个人信息
    getOtherUser: async function(id) {
      let url = '/user/' + id;
      const resData = await this.$axios.get(url);
      if (resData.data.code == 0) {
        this.userinfo = resData.data.data.user;
      } else if (resData.code == 104) {
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
    getMyPosts: async function() {
      let url = 'protected/post/my/pull';
      const resCode = await this.$axios.post(url, {
        base_post: null,
        deleted: false,
      });
      if (resCode.data.code == 0) {
        this.pullList = [];
        this.pullList = resCode.data.data.posts;
        // if (!this.pullList.length) {
        // }
      }
    },
    async getOtherPosts(uid) {
      // 判断是否登录
      let url = this.userinfo.userid ? '/protected/post/other/pull' : '/post/other/pull';
      let data = {
        base_post: null,
        creator: uid - 0,
      };
      const resCode = await this.$axios.post(url, data);
      if (resCode.data.code == 0) {
        this.pullList = [];
        this.pullList = resCode.data.data.posts;
        // if (!this.pullList.length) {
        // }
      }
    },
    // 转账日志
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
    showAddComment(id) {
      this.commentPostId = id;
      this.addCommentShow = true;
    },
    onAddComment() {
      const targetPost = this.pullList.find(i => i.post.id === this.commentPostId);
      targetPost.post.num_comment = targetPost.post.num_comment + 1;
    },
    postDeleted(id) {
      // 删除帖子回调后，直接清除本地数据数组中的值
      let index = this.pullList.findIndex(post => post.post.id === id);
      this.pullList.splice(index, 1);
    },
    clickEdit() {
      this.editing = !this.editing;
    },
    changeAvatar() {
      if (this.editing) {
        this.$refs.upload.upload();
      }
    },
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.posts {
  height: 550px;
}
.my-card {
  // max-width: 780px;
}
.title {
  margin-top: -40px;
  padding-bottom: 60px;
  // background-color: #f8f8f8;
}
.main {
  // background-color: #f8f8f8;
}
</style>
