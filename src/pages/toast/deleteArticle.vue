<template>
  <div>
    <q-btn label="删除帖子" color="primary" @click="show = true" />
    <ToastComponent
      v-model="show"
      :title="title"
      :content="content"
      @taost_cancel="taost_cancel"
      @taost_confirm="taost_confirm"
    />
  </div>
</template>

<script>
import ToastComponent from './ToastComponent';
export default {
  components: { ToastComponent },
  props: {},
  data() {
    return {
      show: false,
      title: '你确定要删除自己的帖子吗？',
      content: '',
    };
  },
  watch: {},
  computed: {},
  methods: {
    taost_cancel() {
      this.$q.notify('已取消');
    },
    taost_confirm() {
      this.$q.notify('删除成功');
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
