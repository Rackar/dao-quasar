<template>
  <div>
    <deleteDraft />
    <deleteComment />

    <successPublishArticle />
    <successTransfer />测试上传接口
    <input ref="file" id="file-chooser" @change="testChange" type="file" accept="*" />
  </div>
</template>

<script>
import deleteDraft from './deleteDraft';
import deleteComment from './deleteComment';
import successPublishArticle from './successPublishArticle';
import successTransfer from './successTransfer';
import axios from 'axios';
export default {
  components: {
    deleteDraft,
    deleteComment,
    successPublishArticle,
    successTransfer,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    // 文件上传测试
    testChange: async function(e) {
      let file = e.target.files[0];

      var reader = new FileReader();
      reader.onload = async evt => {
        let dataString = evt.target.result;
        const type = file.type;
        let l, array;
        l = dataString.length;
        array = new Uint8Array(l);
        for (var i = 0; i < l; i++) {
          array[i] = dataString.charCodeAt(i);
        }
        var blob = new Blob([array], { type: type });

        let api = '/protected/oss/presign';
        let data = {
          key: file.name,
        };
        const res = await this.$axios.post(api, data);
        if (res.data.code == 0) {
          let upurl = res.data.data.presigned_url;
          let head = res.data.data.headers;
          head['Content-Type'] = type;

          const instance = axios.create({
            timeout: 30000,
            headers: head,
          });

          let upres = await instance({
            url: upurl,
            method: 'put',
            data: blob,
            processData: false, // 告诉axios不要去处理发送的数据(重要参数)
          });
          if (upres.status === 200) {
            this.$q.notify('上传成功');
            console.log(upurl.split('?')[0]);
          }
        } else {
          this.$q.notify('认证失败');
        }
      };
      reader.readAsBinaryString(file);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
