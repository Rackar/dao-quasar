<template>
  <div class="main">
    <AddArticle :groupId="groupId" v-model="addArticleShow" :onSave="onAddArticle" />
    <AddComment :postId="commentPostId" v-model="addCommentShow" :onSave="onAddComment" />
    <q-btn
      v-if="!userid"
      class="top-login"
      color="primary"
      flat
      @click="$router.push('/login')"
      label="快速登录"
    />
    <div class="top-login" v-else>
      <headerBarRight />
    </div>
    <div class="groupinfo">
      <q-avatar rounded size="40px">
        <img :src="group.avatar || 'statics/group.svg'" />
      </q-avatar>
      <span class="groupname" @click="$router.push('/manage/' + group.id)">{{ group.name }}</span>
      <q-btn flat align="around" class="btn-fixed-width" label="分享" icon="share" @click="shareUrl" />
      <q-btn
        v-if="!group.joined"
        unelevated
        color="primary"
        label="加入小组"
        @click="joinGrp(group.id)"
        icon="add"
      />
      <q-btn outline color="primary" label="发言" @click="showAddArtrcle" icon="create" />
    </div>
    <div class="warper">
      <div class="q-pa-md info q-my-md">
        <span class="infotitle">创建于{{ $utils.timeStringToLocal(group.create_at) }}</span>
        <span class="infotitle">组长：{{ owner.name }}</span>
        <div>{{ group.desc_text }}</div>
      </div>

      <div class="members">
        <member class="members_content" :members="grpMembers" />
        <span class="members_action">
          <q-btn
            flat
            color="primary"
            no-caps
            size="13px"
            @click="$router.push('/manage/' + group.id)"
          >
            查看更多
            <br />
            ({{ grpMembers.length }})
          </q-btn>
        </span>
      </div>

      <q-infinite-scroll v-if="hasPermission" @load="loadMore" :offset="250">
        <div v-for="post in posts" :key="post.post.id">
          <ArticleShow
            :post="post"
            :addComment="() => showAddComment(post.post.id)"
            @del="postDeleted"
          />
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
      <div v-else class="noPermission">
        <img class="noPermission_icon" src="~assets/icon_suo_1@2x.png" />
        <div class="noPermission_tip">加入小组才能查看</div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
import headerBarRight from 'components/headerBarRight';
import AddArticle from 'pages/article/PublishArticle';
import AddComment from './AddComment';
import member from 'components/member';
import { copyToClipboard } from 'quasar';
import getPosts from '../../apis/getPosts';

export default {
  components: { AddComment, AddArticle, member, ArticleShow, headerBarRight },
  props: {},
  data() {
    return this.getInitData();
  },
  watch: {
    groupId: function() {
      Object.assign(this, this.getInitData());
      this.$nextTick(this.getPageData);
    },
  },
  computed: {
    userid() {
      return this.$store.state.user.userid;
    },
    groupId() {
      return +this.$route.params.id;
    },
    group() {
      return this.$store.state.group.currentGroup;
    },
    owner() {
      return this.$store.state.group.currentGroupOwner;
    },
  },
  methods: {
    getInitData() {
      return {
        isReady: false,
        hasPermission: true,
        hasMore: true,
        posts: [],
        lastPostId: null,
        commentPostId: -1,
        addArticleShow: false,
        addCommentShow: false,
        grpMembers: [],
        password: '',
      };
    },
    loadMore(_, done) {
      if (!this.hasMore) return done();
      if (!this.isReady) return done();
      this.getPosts().then(done);
    },
    showAddArtrcle() {
      this.addArticleShow = true;
    },
    showAddComment(id) {
      this.commentPostId = id;
      this.addCommentShow = true;
    },
    onAddArticle() {
      this.reloadList();
    },
    onAddComment() {
      const targetPost = this.posts.find(i => i.post.id === this.commentPostId);
      targetPost.post.num_comment = targetPost.post.num_comment + 1;
    },
    reloadList() {
      Object.assign(this, {
        isReady: false,
        hasMore: true,
        posts: [],
        lastPostId: null,
      });
      this.$nextTick(this.getPosts);
    },
    showPass(id) {
      this.$q
        .dialog({
          title: '加密群组',
          message: '请输入群组密码',
          prompt: {
            model: '',
            type: 'text', // optional
          },
          cancel: true,
          // persistent: true,
        })
        .onOk(data => {
          this.password = data;
          this.joinGrp(id);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    // 加入组
    joinGrp: async function(id) {
      let password = '';
      if (this.group.password === '****' && this.password === '') {
        this.showPass(id);
        return;
      }
      let data = {
        grp: id,
        password: password,
      };
      let postapi = '/protected/grp/join';
      this.$q.loading.show();
      const postjoin = await this.$axios.post(postapi, data);
      this.$q.loading.hide();
      this.password = '';
      if (postjoin.data.code == 0) {
        this.$q.notify({
          message: '加入成功！',
        });
      } else if (postjoin.data.code == 100) {
        this.$q.notify({
          message: '加入群失败！密码错误',
        });
      } else if (postjoin.data.code == 104) {
        this.$q.notify({
          message: '加入群失败！请重新登录',
        });
      }
    },
    getPageData() {
      return Promise.all([this.getGroupMembers(), this.getPosts()])
        .then(() => {
          this.isReady = true;
        })
        .catch(err => {
          if (err.code === 100) {
            this.hasPermission = false;
          } else {
            this.$q.notify(err.message);
          }
        });
    },
    getPosts() {
      const { groupId, userid, lastPostId } = this;
      return getPosts({ userid, groupId, lastPostId }).then(res => {
        const newPosts = res.posts;
        this.posts = this.posts.concat(newPosts);
        if (newPosts.length > 0) {
          this.lastPostId = newPosts[newPosts.length - 1].post.id;
        } else {
          this.hasMore = false;
        }
      });
    },
    // 获取群组员
    getGroupMembers: async function() {
      let postapi = '/user/members/' + this.groupId;
      const members = await this.$axios.get(postapi);
      if (members.data.code == 0) {
        this.grpMembers = members.data.data.alive;
      }
    },
    async shareUrl() {
      let url = window.location.href;
      copyToClipboard(url)
        .then(() => {
          this.$q.notify('地址已复制到剪切板');
          // 成功!
        })
        .catch(() => {
          this.$q.notify('浏览器不支持，请手动复制地址');
          // 失败
        });
      // navigator.clipboard.writeText(url).then(
      //   () => {
      //     /* success */ this.$q.notify('地址已复制到剪切板');
      //   },
      //   err => {
      //     /* failure */ this.$q.notify('浏览器不支持，请手动复制地址');
      //     console.log(err);
      //   }
      // );
    },
    postDeleted(id) {
      // 删除帖子回调后，直接清除本地数据数组中的值
      let index = this.posts.findIndex(post => post.post.id === id);
      this.posts.splice(index, 1);
    },
  },
  mounted() {
    this.getPageData();
  },
};
</script>
<style lang="stylus" scoped>
.members {
  display: flex;
  align-items: center;

  &_content {
    flex-wrap: nowrap;
    overflow: hidden;

    /deep/ .col-1 {
      width: unset;
    }
  }

  &_action {
    white-space: nowrap;
  }
}

.noPermission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;

  &_tip {
    font-size: 18px;
  }

  &_icon {
    width: 26px;
    height: 34px;
    margin-bottom: 10px;
  }
}

.info {
  background-color: #d4f6f346;
  color: $dgrey;

  .infotitle {
    font-weight: bold;
    padding-right: 30px;
    line-height: 20px;
  }
}

.top-login {
  position: absolute;
  top: 20px;
  right: 40px;
}

.main {
  padding-top: 80px;

  .warper {
    padding: 0 42px;
  }

  .groupinfo {
    position: sticky;
    padding: 8px 42px;
    top: 0;
    z-index: 9999;
    background-color: white;
    display: flex;
    align-items: center;

    /deep/ .q-btn {
      margin-right: 24px;
    }

    /deep/ .q-btn__wrapper {
      padding-left: 8px;
      padding-right: 12px;

      .q-icon {
        margin-right: 4px;
        font-size: 22px;
      }
    }

    .groupname {
      // line-height: 30px;
      font-size: 20px;
      cursor: pointer;
      // margin-top: 5px;
      padding: 0 12px 0;
      font-weight: bold;
    }
  }
}
</style>
