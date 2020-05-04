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
  props: { value: Boolean, userId: Number, blocked: Boolean },
  data() {
    return {
      title: '确定拉黑该用户？',
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
      let url = '/protected/grp/block';

      let data = {
        grp: this.$store.state.group.currentGroup.id,
        user: this.userId,
        block: this.blocked ? 1 : 2,
      };
      const res = await this.$axios.post(url, data);
      if (res.data.code === 0) {
        this.$q.notify({
          message: this.blocked ? '已解除拉黑' : '已拉黑该用户',
        });
      } else if (res.data.code === 104) {
        this.$q.notify({
          message: '认证失效，请重新登录',
        });
        this.$showLogin();
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
