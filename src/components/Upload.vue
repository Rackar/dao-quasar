<template>
  <input hidden="hidden" ref="imgInput" @change="uploadImg" type="file" accept="image/*" />
</template>

<script>
import upload from '../apis/uploadNew.js';
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    upload() {
      this.$refs.imgInput.click();
    },

    async uploadImg(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size / 1000000 > 5) {
        e.target.value = '';
        return this.$q.notify('头像大小不能超过 5M');
      }
      this.$emit('uploading');
      // let previewUrl = window.URL.createObjectURL(file);
      let result = await upload({ file });
      if (result instanceof Error) {
        this.$q.notify('头像上传失败，' + result);
        this.$emit('uploaded', { err: result });
      } else {
        //上传成功
        // this.updateUserAvatar(result);
        this.$emit('uploaded', { url: result });
      }
      e.target.value = '';
    },
    async updateUserAvatar(image_url) {
      let api = '/protected/user/modify';
      let data = {
        name: this.$store.state.user.name,
        avatar: image_url,
      };
      let res = await this.$axios.put(api, data);
      if (res.data.code === 0) {
        this.$q.notify('头像修改成功');
      } else {
        this.$q.notify('头像修改失败');
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
</style>