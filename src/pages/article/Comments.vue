<template>
  <div>
    <div class="header" :data-is-empty="postLikeComments.length === 0">{{ comments.length }}条评论</div>
    <div v-for="item in postLikeComments" :key="item.comment.id" class="body">
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
  font-size: 18px;
  padding: 15px;
  padding-bottom: 0;

  @media only screen and (min-width: 1024px) {
    padding-left: 42px;
    padding-right: 42px;
  }

  &[data-is-empty="true"] {
    padding-bottom: 15px;
  }
}


</style>
