import upload from '@/apis/uploadNew';
import { matClear } from '@quasar/extras/material-icons';
import asyncTryCatch from '@/utils/asyncTryCatch';
import { fasPaperPlane } from '@quasar/extras/fontawesome-v5';

export default {
  created() {
    this.removeIcon = matClear;
    this.sendIcon = fasPaperPlane;
  },
  props: {
    maxTextLength: { type: Number, default: 2000 },
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
    onEdit: { type: Function },
    shouldResetAfterClose: { type: Boolean, default: true },
    value: Boolean,
  },
  data() {
    return this.getDefaultData();
  },
  watch: {
    shouldShow(val) {
      if (!val && this.shouldResetAfterClose) {
        Object.assign(this, this.getDefaultData());
      }
    },
    content() {
      this.onChange();
    },
    videoList() {
      this.onChange();
    },
    imgList() {
      this.onChange();
    },
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
    canPublish() {
      const contentLength = this.content.trim().length;
      return (
        (contentLength > 0 || (contentLength === 0 && this.mediaLength > 0)) &&
        contentLength <= this.maxTextLength
      );
    },
    curUserAvatar() {
      return this.$store.state.user.avatar || 'statics/user.svg';
    },
    mediaLength() {
      return this.videoList.length > 0 ? this.videoList.length : this.imgList.length;
    },
    canUploadImg() {
      return this.videoList.length === 0 && this.imgList.length !== 4;
    },
    canUploadVideo() {
      return this.videoList.length === 0 && this.imgList.length === 0;
    },
  },
  methods: {
    onChange() {
      if (!this.onEdit) return;
      const data = {
        images: [...this.imgList, ...this.videoList],
        content: this.content,
      };
      this.onEdit(data);
    },
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
    warnTooManyFiles() {
      return this.$q.notify('只能上传四张图片，或一个视频');
    },
    onImgBtnClick() {
      if (this.imgList.length === 4 || this.videoList.length === 1) {
        return this.warnTooManyFiles();
      }
      this.$refs.imgInput.click();
    },
    onVideoBtnClick() {
      if (this.imgList.length > 0 || this.videoList.length === 1) {
        return this.warnTooManyFiles();
      }
      this.$refs.videoInput.click();
    },
    uploadImg(e) {
      const files = e.target.files;
      if (files.length === 0) return;
      if (this.imgList.length + files.length > 4) {
        return this.warnTooManyFiles();
      }
      const _files = [].map.call(files, (file, index) => {
        return {
          file,
          id: Date.now() + index,
          previewUrl: window.URL.createObjectURL(file),
        };
      });

      this.imgList = this.imgList.concat(_files);
      e.target.value = '';
    },
    uploadVideo(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size / 1000000 > 500) {
        e.target.value = '';
        return this.$q.notify('文件大小不能超过 500M');
      }
      this.videoList.push({
        file,
        id: Date.now(),
        previewUrl: window.URL.createObjectURL(file),
      });
      e.target.value = '';
    },
    publish: async function() {
      if (this.content.trim().length === 0 && this.mediaLength.length == 0) {
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
          const msg = typeof err === 'string' ? err : err.message;
          this.$q.notify('发布失败,' + msg);
        });
    },
  },
};
