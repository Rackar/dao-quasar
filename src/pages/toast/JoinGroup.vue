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
  components: { ToastComponent },
  props: { value: Boolean, groupId: Number },
  data() {
    return {
      title: '发言需要先加入群组',
      content: '是否现在加入？',
      reward: '',
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
    taost_confirm() {
      this.$emit('wantJoin');
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
