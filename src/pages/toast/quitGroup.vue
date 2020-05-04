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
      title: '真的要退出小组？',
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
      let url = '/protected/grp/detach';
      let data = {
        grp: this.groupId,
      };
      const res = await this.$axios.post(url, data);
      if (res.data.code === 0) {
        this.$q.notify({
          message: '已退出本群。',
        });
        this.$router.go(0);
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
