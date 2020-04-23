<template>
  <q-dialog v-model="shouldShow" :persistent="isLoading">
    <div class="container">
      <div v-if="isLoading" class="waiting">
        <q-spinner color="primary" size="3em" />
      </div>

      <div class="body">
        <textarea
          ref="textarea"
          maxlength="200"
          v-model="content"
          placeholder="有什么新鲜事告诉大家…"
        ></textarea>
      </div>

      <div class="footer">
        <div class="left">
          <!-- <img class="imgBtn" src="~assets/expression.png" /> -->
          <img class="imgBtn" @click="onImgBtnClick" src="~assets/picture.png" />
          <img class="imgBtn" @click="onVideoBtnClick" src="~assets/video.png" />
        </div>
        <div>
          <div class="wordLength" v-if="!hasMaxText">{{ content.length }}/200</div>
          <div class="maxTextErr" v-else>已超出200字</div>
        </div>
      </div>

      <div class="media">
        <div
          class="imgItem"
          v-for="item in imgList"
          :key="item.id"
          :style="{ backgroundImage: `url(${item.previewUrl})` }"
        >
          <div class="close removeBtn" @click="removeMedia('imgList', item.id)">
            <q-icon :name="removeIcon" />
          </div>
        </div>

        <div class="videoItem" v-for="item in videoList" :key="item.id">
          <video controls="true" :src="item.previewUrl" />
          <div class="close removeBtn" @click="removeMedia('videoList', item.id)">
            <q-icon :name="removeIcon" />
          </div>
        </div>
      </div>

      <div class="sendPostBtn" @click="publish">快速发帖</div>

      <input
        hidden="hidden"
        ref="imgInput"
        id="file-chooser"
        @change="uploadImg"
        type="file"
        accept="image/*"
      />
      <input
        hidden="hidden"
        ref="videoInput"
        id="vadio-chooser"
        @change="uploadVideo"
        type="file"
        accept="video/*"
      />
    </div>
  </q-dialog>
</template>

<script>
import { post, put } from '../../apis/';
import upload from '../../apis/upload';
import { matClear } from '@quasar/extras/material-icons';

const createPost = async function(data) {
  const src = '/protected/post/create';
  const awsUrls = await Promise.all(
    data.images.map(function({ file }) {
      return upload({ file, dispositionType: 'attachment' });
    })
  );
  return post(src, { ...data, title: '', images: awsUrls }).then(res => res.post);
};

const updatePost = async function(data) {
  const src = '/protected/post';
  const awsUrls = await Promise.all(
    data.images.map(function({ file, previewUrl }) {
      if (file === null) return Promise.resolve(previewUrl);
      return upload({ file, dispositionType: 'attachment' });
    })
  );
  return put(src, { ...data, title: '', images: awsUrls });
};

export default {
  created() {
    this.removeIcon = matClear;
  },
  props: {
    // 提供 postId 时是修改。 否则是创建，此时需要 groupId。
    postId: { type: Number },
    // groupId 从vuex中获取
    // groupId: { type: Number },
    // 修改时应提供 initialData 来显示默认值
    initialData: {
      type: Object,
      default() {
        return { content: '', images: [] };
      },
    },
    onSave: { type: Function },
    value: Boolean,
  },
  data() {
    return this.getDefaultData();
  },
  computed: {
    groupId() {
      return this.$store.state.group.currentGroup.id;
    },
    shouldShow: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
    hasMaxText() {
      return this.content.length >= 200;
    },
  },
  methods: {
    getDefaultData() {
      const { images, ...otherData } = this.initialData;
      const ret = {
        isLoading: false,
        videoList: [], // [{ id, file, preview }]
        imgList: [],
        content: '',
        ...otherData,
      };
      if (!images || images.length === 0) return ret;
      const list = images.map(i => ({ file: null, previewUrl: i, id: i }));
      if (images[0].match(/\.(png|jpe?g|gif)/i)) {
        return { ...ret, imgList: list };
      }
      return { ...ret, videoList: list };
    },
    removeMedia(type, id) {
      this[type] = this[type].filter(i => i.id !== id);
    },
    onImgBtnClick() {
      if (this.imgList.length === 4 || this.videoList.length === 1) {
        return this.$q.notify('只能上传四张图片，或一个视频');
      }
      this.$refs.imgInput.click();
    },
    onVideoBtnClick() {
      if (this.imgList.length > 0 || this.videoList.length === 1) {
        return this.$q.notify('只能上传四张图片，或一个视频');
      }
      this.$refs.videoInput.click();
    },
    uploadMedia(e, type) {
      const file = e.target.files[0];
      if (!file) return;
      this[type + 'List'].push({
        file,
        id: Date.now(),
        previewUrl: window.URL.createObjectURL(file),
      });
      e.target.value = '';
    },
    uploadImg(e) {
      this.uploadMedia(e, 'img');
    },
    uploadVideo(e) {
      this.uploadMedia(e, 'video');
    },
    create() {
      const data = {
        grp: this.groupId,
        content: this.content,
        images: [...this.imgList, ...this.videoList],
      };
      return createPost(data);
    },
    update() {
      const data = {
        id: this.postId,
        content: this.content,
        images: [...this.imgList, ...this.videoList],
      };
      return updatePost(data);
    },
    publish() {
      if (this.content.trim().length === 0) {
        return this.$q.notify('请输入帖子内容');
      }
      this.isLoading = true;
      const apiCall = this.postId === undefined ? this.create : this.update;
      apiCall()
        .then(res => {
          Object.assign(this, this.getDefaultData(), { shouldShow: false });
          this.$q.notify('发布成功');
          this.onSave && this.onSave(res);
        })
        .catch(err => {
          this.isLoading = false;
          this.$q.notify('发布失败' + (err.message || ''));
        });
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  outline: none;
  border: none;
}

.waiting {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
}

.container {
  position: fixed;
  width: 680px;
  background: #fff;
  padding: 50px;
}

.body {
  margin-bottom: 23px;
  background: rgba(241, 241, 241, 1);
  border-radius: 4px;
  textarea {
    padding: 18px;
    height: 120px;
    width: 100%;
    resize: none;
    background: rgb(241, 241, 241);
  }
}

.sendPostBtn {
  width: 245px;
  height: 34px;
  margin: 0 auto;
  line-height: 34px;
  background: rgba(0, 214, 194, 1);
  border-radius: 4px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  img {
    margin-top: 0;
    margin-right: 6px;
    width: 14px;
    height: 14px;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 27px;
}

.imgBtn {
  margin-right: 26px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
}

.media {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-bottom: 40px;
}

.media:empty {
  display: none;
}

.imgItem {
  position: relative;
  height: 100px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  overflow: hidden;
}

.videoItem {
  position: relative;
  video {
    display: block;
    height: 100px;
  }
}

.removeBtn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  right: 5px;
  top: 5px;
  color: white;
  background: #ff6262;
  border-radius: 50%;
  font-size: 14px;
}

.maxTextErr {
  color: red;
}

.wordLength {
  color: #8c909d;
}
</style>
