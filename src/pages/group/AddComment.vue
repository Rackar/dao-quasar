<template>
  <Publish
    publishBtnLabel="发布"
    placeholder="发布你的回复"
    v-bind="$attrs"
    v-model="shouldShow"
    :doPublish="publish"
  ></Publish>
</template>

<script>
import Publish from '../../components/publish/index.vue';
import { post } from '../../apis/request';

const createComment = function(data) {
  return post('/protected/comment/create', {
    ...data, ref_comment: null,
  }).then(res => res.comment);
};

export default {
  components: {
    Publish,
  },
  props: {
    postId: { type: Number, required: true },
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
      return createComment({
        ...data,
        post: this.postId,
      }).then(res => {
        this.onSave && this.onSave(res);
      });
    },
  },
};
</script>
