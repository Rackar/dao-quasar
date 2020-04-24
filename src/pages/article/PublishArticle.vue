<template>
  <Publish
    publishBtnLabel="快速发帖"
    placeholder="有什么新鲜事告诉大家…"
    v-bind="$attrs"
    v-model="shouldShow"
    :doPublish="publish"
  ></Publish>
</template>

<script>
import Publish from '../../components/publish/index.vue';
import { post, put } from '../../apis/request';

const createPost = function(data) {
  const src = '/protected/post/create';
  return post(src, { ...data, title: '' }).then(res => res.post);
};

const updatePost = function(data) {
  const src = '/protected/post';
  return put(src, { ...data, title: '' });
};

export default {
  components: {
    Publish,
  },
  props: {
    // 提供 postId 时是修改。 否则是创建，此时需要 groupId。
    postId: { type: Number },
    groupId: { type: Number },
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
    create(data) {
      return createPost({ ...data, grp: this.groupId });
    },
    update(data) {
      return updatePost({ ...data, id: this.postId });
    },
    publish(data) {
      const apiCall = this.postId === undefined ? this.create : this.update;
      return apiCall(data).then(res => {
        this.onSave && this.onSave(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
