<template>
  <div class="main">
    <AddComment
      v-if="targetCommentPost !== null"
      :targetPost="targetCommentPost"
      v-model="addCommentShow"
      :onSave="onAddComment"
    />
    <Upload ref="upload" @uploaded="uploaded" @uploading="uploading" />
    <div class="hover-color"></div>
    <div class="row no-wrap items-end title">
      <q-avatar @click="changeAvatar" class="avatar">
        <q-icon v-show="editing" name="icon_paizhao" class="mask"></q-icon>
        <img
          :src="(editing?edit.avatar:userinfo.avatar) || 'statics/user.svg'"
          :class="{ masked: editing }"
        />
      </q-avatar>

      <div class="userinfo">
        <div class="row relative-position">
          <div v-show="editing">
            <q-input square outlined dense v-model="edit.name" />
          </div>
          <div v-show="editing">
            <q-btn outline color="primary" class="btn" label="取消" @click="editing = false" />
            <q-btn
              unelevated
              color="primary"
              class="btn"
              label="保存"
              @click="save"
              :disable="loadingVisible"
            />
          </div>
          <div
            v-show="!editing"
            class="username"
          >{{ this.userinfo.name || this.userinfo.mail_export }}</div>
          <div v-show="!editing">
            <!-- <q-icon name="edit" color="primary" v-show="isMyself" @click="clickEdit" size="24px" /> -->
            <!-- <q-btn dense flat icon="edit" color="primary" @click="clickEdit" v-show="isMyself" /> -->
            <IconHover
              iconName="bianji"
              width="16px"
              class="cursor-pointer"
              v-show="isMyself"
              @click.native="clickEdit"
              style="padding-top:8px;"
            />
          </div>
          <q-inner-loading :showing="loadingVisible">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </div>
        <div class="q-size-sm">DAO ID {{ id }} {{ userinfo.mail_export }}</div>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-sm-8 col-md-6 offset-md-1">
        <q-card flat class="my-card">
          <!-- <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="myPosts" label="我的帖子" />
            <q-tab name="recycle" label="回收站" />
          </q-tabs>-->

          <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade">
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

            <!-- <q-tab-panel name="recycle">
              <ArticleShow
                v-for="post in recycleList"
                :post="post"
                :key="post.post.id"
                :personPage="true"
                viewType="comment"
              />
            </q-tab-panel>-->
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-sm-4 col-md-4">
        <PersonWallet :tokens="tokens" v-if="isMyself" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
import AddComment from 'pages/group/AddComment';
import PersonWallet from './PersonWallet';
import Upload from 'components/Upload';
export default {
  components: { ArticleShow, PersonWallet, AddComment, Upload },
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
      pullList: [],
      userinfo: {},
      edit: {
        name: '',
        avatar: '',
      },

      addCommentShow: false,
      commentPostId: 0,
      targetCommentPost: null,

      editing: false,
      uploadAvatar: false,

      recycleInited: false,
      recycleList: [],

      loadingVisible: false,
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
          //是否拉取回车站内容
          // this.getMyRecycle();
        } else {
          userid = this.id;
          this.getOtherUser(userid);
          this.getOtherPosts(userid);
        }
      } else {
        this.$q.notify({
          message: '认证失效，请重新登录',
        });
        this.$showLogin();
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
    getLikes(posts) {
      return new Promise((resolve, reject) => {
        const postIds = posts.map(i => i.post.id);
        if (postIds.length === 0) {
          return resolve(posts);
        }
        this.$axios
          .post('/protected/post/likes', { posts: postIds })
          .then((res, err) => {
            if (err) {
              resolve(posts);
              return;
            }
            const likeStatus = res.data.data.likes;
            posts.forEach(function(item) {
              const status = likeStatus[item.post.id] === undefined ? 1 : likeStatus[item.post.id];
              item.likeStatus = status;
            });
            resolve(posts);
          })
          .catch(() => {
            reject(posts);
          });
      });
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
        this.pullList = await this.getLikes(resCode.data.data.posts);
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
    // tokenLog: async function() {
    //   let url = 'protected/user/token/logs';
    //   let dat = {
    //     contract: '',
    //     base_token_log: null,
    //   };
    //   const resLog = await this.$axios.post(url, dat);
    //   if (resLog.data.code == 0) {
    //     this.log = resLog.data.data.token_logs;
    //   } else {
    //     alert(resLog.data.message);
    //   }
    // },
    showAddComment(id) {
      this.targetCommentPost = this.pullList.find(i => i.post.id === id);
      this.addCommentShow = true;
    },
    onAddComment() {
      this.targetCommentPost.post.num_comment += 1;
    },
    postDeleted(id) {
      // 删除帖子回调后，直接清除本地数据数组中的值
      let index = this.pullList.findIndex(post => post.post.id === id);
      this.pullList.splice(index, 1);
    },
    clickEdit() {
      this.editing = !this.editing;
      this.edit.name = this.userinfo.name;
      this.edit.avatar = this.userinfo.avatar;
    },
    changeAvatar() {
      if (this.editing) {
        // this.$q.loading.show();
        // this.loadingVisible = true;
        this.$refs.upload.upload();
      }
    },
    uploading() {
      this.loadingVisible = true;
    },
    uploaded(data) {
      if (data.err) {
      } else {
        this.edit.avatar = data.url;
      }

      this.loadingVisible = false;
      this.$q.notify('头像上传成功');
    },
    async save() {
      let api = '/protected/user/modify';
      let data = {
        name: this.edit.name,
        avatar: this.edit.avatar,
      };
      let res = await this.$axios.put(api, data);
      if (res.data.code === 0) {
        this.$q.notify('资料修改成功');
        let user = { ...this.userinfo };
        user.name = data.name;
        user.avatar = data.avatar;
        this.$store.commit('user/setUserinfo', user);
      } else {
        this.$q.notify('资料修改失败');
      }
      this.editing = false;
    },
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  .hover-color {
    position: absolute;
    background-color: #74d2c8;
    height: 55px;
    width: 100%;
    top: 0;
    z-index: 0;
  }
}

.mask {
  position: absolute;
  // color: white;
}
.masked {
  opacity: 0.4;
  filter: alpha(opacity=40);
}

.avatar {
  width: 165px;
  height: 165px;
}
.title {
  margin-top: -30px;
  margin-left: 70px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 60px;
}

@media only screen and (max-width: 1024px) {
  .avatar {
    width: 65px;
    height: 65px;
  }
  .title {
    margin-top: -30px;
    margin-left: 10px;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 20px;
  }
}
.userinfo {
  padding: 14px 0 0 14px;
  .username {
    font-size: 24px;
    margin-right: 20px;
  }
  .btn {
    margin: 0px 10px;
  }
}
</style>
