<template>
  <div>
    <deleteDraft />
    <deleteComment />
    <deleteArticle />
    <quitGroup />
    <successPublishArticle />
    <successTransfer />
    <moneyIn />
    <moneyOut />
  </div>
</template>

<script>
import deleteDraft from "./deleteDraft";
import deleteComment from "./deleteComment";
import deleteArticle from "./deleteArticle";
import quitGroup from "./quitGroup";
import successPublishArticle from "./successPublishArticle";
import successTransfer from "./successTransfer";
import moneyIn from "./moneyIn";
import moneyOut from "./moneyOut";
export default {
  components: {
    deleteDraft,
    deleteComment,
    deleteArticle,
    quitGroup,
    successPublishArticle,
    successTransfer,
    moneyIn,
    moneyOut
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