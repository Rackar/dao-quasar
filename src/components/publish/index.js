import upload from '../../apis/upload';
import { matClear } from '@quasar/extras/material-icons';
import asyncTryCatch from '../../utils/asyncTryCatch';

export default {
  created() {
    this.removeIcon = matClear;
  },
  props: {
    placeholder: { type: String },
    publishBtnLabel: { type: String },
    // 修改时应提供 initialData 来显示默认值
    initialData: {
      type: Object,
      default() {
        return { content: '', images: [] };
      },
    },
    doPublish: { type: Function, required: true },
    value: Boolean,
  },
  data() {
    return this.getDefaultData();
  },
  computed: {
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
    publish: async function() {
      if (this.content.trim().length === 0) {
        return this.$q.notify('请输入内容');
      }

      this.isLoading = true;
      const awsUrls = await asyncTryCatch(
        Promise.all(
          [...this.imgList, ...this.videoList].map(function({ file, previewUrl }) {
            if (file === null) return Promise.resolve(previewUrl);
            return upload({ file, dispositionType: 'attachment' });
          })
        )
      );
      if (awsUrls instanceof Error) {
        this.isLoading = false;
        this.$q.notify('发布失败,' + awsUrls);
        return;
      }
      const data = {
        content: this.content,
        images: awsUrls,
      };
      this.doPublish(data)
        .then(() => {
          Object.assign(this, this.getDefaultData(), { shouldShow: false });
          this.$q.notify('发布成功');
        })
        .catch(err => {
          this.isLoading = false;
          const msg = typeof err === 'string'? err : err.message;
          this.$q.notify('发布失败,' + msg);
        });
    },
  },
};
