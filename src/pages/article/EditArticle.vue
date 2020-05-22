<template>
  <Publish
    placeholder="有什么新鲜事告诉大家…"
    v-bind="$attrs"
    v-model="shouldShow"
    publishBtnLabel="确认修改"
    :doPublish="publish"
    :maxTextLength="5000"
  />
</template>

<script>
import Publish from '@/components/publish/index.vue';
import { put } from '@/apis/request';

const updatePost = function(data) {
  const src = '/protected/post';
  return put(src, { ...data, title: '' });
};

export default {
  components: {
    Publish,
  },
  props: {
    postId: { type: Number },
    onSave: { type: Function },
    value: Boolean,
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
  },
  methods: {
    publish(data) {
      return updatePost({ ...data, id: this.postId }).then(() => {
        this.onSave && this.onSave({ ...data, id: this.postId });
      });
    },
  },
};
</script>