<template>
  <div>
    <deleteDraft />
    <deleteComment />
    <deleteArticle />
    <quitGroup />
    <successPublishArticle />
  </div>
</template>

<script>
import deleteDraft from "./deleteDraft";
import deleteComment from "./deleteComment";
import deleteArticle from "./deleteArticle";
import quitGroup from "./quitGroup";
import successPublishArticle from "./successPublishArticle";
export default {
  components: {
    deleteDraft,
    deleteComment,
    deleteArticle,
    quitGroup,
    successPublishArticle
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
</style>