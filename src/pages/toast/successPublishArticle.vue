<template>
  <div>
    <q-btn label="发布成功" color="primary" @click="show = true" />
    <q-dialog v-model="show">
      <ToastComponent
        :title="title"
        :content="content"
        :showInfo="true"
        @taost_cancel="taost_cancel"
        @taost_confirm="taost_confirm"
      />
    </q-dialog>
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
      title: '发布成功',
      content: '你也可以在「我的主页」中查看刚刚发布的内容',
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
