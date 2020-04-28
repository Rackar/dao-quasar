<template>
  <div class="container">
    <Article
      class="article"
      viewType="article"
      v-if="isReady"
      :post="post"
      :addComment="showAddComment"
    />
    <Comments class="comments" v-if="isReady" :comments="comments" />
    <AddComment
      v-if="isReady"
      :postId="post.post.id"
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

const getComments = function(postId) {
  return get(`/comments/${postId}`).then(res => res.comments);
};

export default {
  components: { Article, Comments, AddComment },
  data() {
    return {
      post: null,
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
  },
  methods: {
    showAddComment() {
      this.shouldShowAddComment = true;
    },
    onAddComment() {
      getComments(this.postId).then(res => this.comments = res);
    },
  },
  mounted() {
    const { isLoggedIn, postId } = this;
    Promise.all([getPost({ postId, isLoggedIn }), getComments(postId)])
      .then(([post, comments]) => {
        this.post = post;
        this.comments = comments;
        this.isReady = true;
        this.$emit('getGroupId', post.post.grp);
      })
      .catch(err => {
        this.$q.notify(err.message);
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 860px;
  margin-right: 16px;
  padding-bottom: 16px;
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
  margin-bottom: 20px;
}
</style>
