<template>
  <ToastComponent
    v-model="shouldShow"
    :title="title"
    :content="content"
    @taost_cancel="taost_cancel"
    @taost_confirm="taost_confirm"
  />
</template>

<script>
import ToastComponent from './ToastComponent';
export default {
  name: 'deleteArticle',
  components: { ToastComponent },
  props: { value: Boolean, postId: Number },
  data() {
    return {
      title: '确定要删除这个帖子吗？',
      content: '',
    };
  },
  watch: {},
  computed: {
    shouldShow: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
  methods: {
    taost_cancel() {
      this.$q.notify('已取消');
    },
    async taost_confirm() {
      let api = '/protected/post';
      let data = {
        post: this.postId,
      };
      const result = await this.$axios.delete(api, { data });
      if (result.data.code == 0) {
        this.$q.notify('删除成功');
        this.$emit('deleteSuccess');
      } else {
        this.$q.notify('删除失败');
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
