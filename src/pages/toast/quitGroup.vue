<template>
  <div>
    <q-btn label="退组" color="primary" @click="show = true" />
    <!-- <q-dialog v-model="show"> -->
    <ToastComponent
      v-model="show"
      :title="title"
      :content="content"
      @taost_cancel="taost_cancel"
      @taost_confirm="taost_confirm"
    />
    <!-- </q-dialog> -->
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
      title: '真的要退出小组？',
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
