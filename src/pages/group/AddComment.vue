<template>
  <Publish
    publishBtnLabel="发布"
    placeholder="发布你的回复"
    v-bind="$attrs"
    v-model="shouldShow"
    :doPublish="publish"
  >
    <div class="container">
      <img class="avatar" :src="targetPost.creator.avatar || 'statics/user.svg'" />
      <div class="right">
        <div class="meta">
          <span class="name">{{ targetPost.creator.name }}</span>
          <span class="time">{{ $utils.timeStringToLocal(targetPost.post.create_at) }}</span>
        </div>
        <div class="content">
          {{ targetPost.post.content }}
        </div>
      </div>
    </div>
  </Publish>
</template>

<script>
import Publish from '@/components/publish/index.vue';
import { post } from '@/apis/request';

const createComment = function(data) {
  return post('/protected/comment/create', {
    ...data,
    ref_comment: null,
  }).then(res => res.comment);
};

export default {
  components: {
    Publish,
  },
  props: {
    targetPost: { type: Object, required: true },
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
        post: this.targetPost.post.id,
      }).then(res => {
        this.onSave && this.onSave(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped="true">
.container {
  padding-left: 29px;
  padding-right: 34px;
  padding-top: 28px;
  display: flex;
}
.meta {
  color: #8C909D;
  font-size: 16px;
  padding-top: 5px;
}
.name {
  font-size: 18px;
  margin-right: 7px;
}
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: block;
  margin-right: 10px;
}
.content {
  font-size: 16px;
}
</style>
