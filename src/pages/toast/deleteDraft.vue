<template>
  <div>
    <q-btn label="删除帖子框" color="primary" @click="show = true" />
    <q-dialog v-model="show">
      <ToastComponent
        :title="title"
        :content="content"
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
      title: '删除草稿',
      content: '删除后无法恢复，确定？',
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
