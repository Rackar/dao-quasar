<template>
  <div>
    <div class="header">{{ comments.length }}条评论</div>
    <div v-for="item in postLikeComments" :key="item.comment.id">
      <Article viewType="comment" :post="item" />
    </div>
  </div>
</template>

<script>
import Article from './ArticleShow';
export default {
  components: { Article },
  props: { comments: { type: Array, required: true } },
  computed: {
    postLikeComments() {
      return this.comments.map(i => ({ ...i, post: i.comment }));
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 31px;
  padding-top: 27px;
  padding-left: 42px;
  font-size: 18px;
  font-weight: bold;
}
</style>
