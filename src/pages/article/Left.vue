<template>
  <div class="container">
    <div class="back-btn">
      <q-btn outline color="primary" icon="keyboard_return" @click="$router.back()" />
    </div>
    <!-- <IconHover
      iconName="fanhui"
      width="16px"
      class="cursor-pointer"
      style="padding-top:8px;"
      @click.native="$router.back()"
    />-->
    <!-- <q-btn v-require-login-click outline class="btn" @click="$router.back()">
      <img svg-inline src="@/statics/icons/icon_fanhui.svg" class="svg-icon mr5" />
    </q-btn>-->
    <Article
      class="article"
      viewType="article"
      v-if="isReady"
      :post="post"
      :groupCreatorId="groupCreatorId"
      :addComment="showAddComment"
      @edit="afterEdit"
      @del="afterDelete"
    />
    <Comments class="comments" v-if="isReady" :comments="comments" />
    <AddComment
      v-if="isReady"
      :targetPost="post"
      v-model="shouldShowAddComment"
      :onSave="onAddComment"
    />
    <div class="spinner" v-else>
      <q-spinner color="primary" size="3em" />
    </div>
  </div>
</template>

<script>
import Article from './ArticleShow';
import Comments from './Comments';
import { get, post } from '@/apis/request';
import AddComment from '../group/AddComment';

const getPost = function({ postId, isLoggedIn }) {
  if (isLoggedIn) {
    return Promise.all([
      post('/protected/post/info', { post_id: postId }),
      post('/protected/post/likes', { posts: [postId] }),
    ]).then(function([{ post }, { likes }]) {
      post.likeStatus = likes[postId] === undefined ? 1 : likes[postId];
      return post;
    });
  }
  return post('/post/info', { post_id: postId }).then(function(res) {
    return { ...res.post, likeStatus: 1 };
  });
};

const getGroupInfo = function(groupId) {
  return get(`/grp/${groupId}`).then(res => res.grp);
};

const getComments = function(postId) {
  return get(`/comments/${postId}`).then(res => res.comments);
};

export default {
  components: { Article, Comments, AddComment },
  data() {
    return {
      post: null,
      groupInfo: null,
      comments: [],
      isReady: false,
      shouldShowAddComment: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.userid !== '';
    },
    postId() {
      return +this.$route.params.id;
    },
    groupCreatorId() {
      return this.groupInfo.creator;
    },
  },
  methods: {
    showAddComment() {
      this.shouldShowAddComment = true;
    },
    onAddComment() {
      getComments(this.postId).then(res => {
        this.comments = res;
        this.post.post.num_comment = res.length;
      });
    },
    afterEdit(newContent) {
      Object.assign(this.post.post, newContent);
    },
    afterDelete() {
      this.$router.replace(`/group/${this.groupInfo.id}`);
    },
  },
  mounted() {
    const { isLoggedIn, postId } = this;
    Promise.all([getPost({ postId, isLoggedIn }), getComments(postId)])
      .then(([post, comments]) => {
        this.post = post;
        this.comments = comments;
        return getGroupInfo(post.post.grp);
      })
      .then(groupInfo => {
        //   return get('/protected/grp/joined').then(res => {
        //     let isJoined = res.grps_joined.some(i => i.grp.id === groupInfo.id);
        //     groupInfo.joined = isJoined;
        //     return groupInfo;
        //   });
        // })
        // .then(groupInfo => {
        //   debugger;
        this.groupInfo = groupInfo;
        this.isReady = true;
        this.$emit('getGroupInfo', groupInfo);
      })
      .catch(err => {
        this.$q.notify(err.message);
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  // width: 860px;
  // margin-right: 16px;
  padding-bottom: 16px;
  .back-btn {
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 75px;
    padding-right: 15px;

    @media only screen and (min-width: 600px) {
      padding-left: 15px;
      padding-right: 15px;
    }
    @media only screen and (min-width: 1024px) {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
}

.spinner {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.article,
.comments {
  box-shadow: 0px 4px 15px 0px rgba(176, 176, 176, 0.09);
  border-radius: 4px;
  background-color: #fff;
}
.article {
  /deep/ .header {
    margin-bottom: 15px;
  }
  /deep/ .main-body {
    padding-left: 0;
  }
}
.article {
  margin-bottom: 20px;
}
</style>
