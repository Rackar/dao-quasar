<template>
  <div>
    <a-upload
      name="file"
      listType="picture-card"
      class="avatar-uploader"
      :headers="headers"
      :showUploadList="false"
      :action="$serverUrl + '/api/uploads/image'"
      @change="handleChange"
      :beforeUpload="beforeUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
    };
  },
  computed: {
    headers() {
      return { Authorization: `Bearer ${this.$store.state.token}` };
    },
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        let pathString = this.$serverUrl + '/' + info.file.response.data.filename;
        this.$emit('uploadedPic', pathString);
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },

    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      let isPIC = isJPG || isPNG || isGIF;
      if (!isPIC) {
        this.$message.error('只能上传 jpg/png/gif 格式!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('文件需要小于 2MB!');
      }
      return isPIC && isLt2M;
    },
  },
};
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.avatar-uploader > .ant-upload img {
  width: 128px;
  height: 128px;
  object-fit: contain;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
