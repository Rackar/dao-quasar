<template>
  <div>
    <q-btn label="分享成功" color="primary" @click="show = true" />
    <ToastComponent
      v-model="show"
      :title="title"
      :content="content"
      :showInfo="true"
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
      title: '网址已复制到剪贴板',
      content: '',
    };
  },
  watch: {},
  computed: {},
  methods: {
    taost_cancel() {
      // this.$q.notify("已取消");
    },
    taost_confirm() {
      // this.$q.notify("删除成功");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
