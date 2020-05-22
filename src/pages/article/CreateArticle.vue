<template>
  <Publish
    placeholder="有什么新鲜事告诉大家…"
    v-bind="$attrs"
    v-model="shouldShow"
    publishBtnLabel="快速发帖"
    :initialData="draft"
    :shouldResetAfterClose="false"
    :doPublish="publish"
    :onEdit="onEdit"
    :maxTextLength="5000"
  />
</template>

<script>
import Publish from '@/components/publish/index.vue';
import { post } from '@/apis/request';
import canUseLocalStorage from '@/utils/canUseLocalStorage';

const createPost = function(data) {
  const src = '/protected/post/create';
  return post(src, { ...data, title: '' }).then(res => res.post);
};

const getDraft = function() {
  if (!canUseLocalStorage()) return { content: '', images: [] };
  return {
    content: localStorage.getItem('draft_createArticle') || '',
    images: [],
  };
};

const setDraft = function(content) {
  if (!canUseLocalStorage()) return;
  localStorage.setItem('draft_createArticle', content);
};

export default {
  components: {
    Publish,
  },
  props: {
    groupId: { type: Number, required: true },
    onSave: { type: Function },
    value: Boolean,
  },
  data() {
    return {
      draft: getDraft(),
    };
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
    onEdit(data) {
      setDraft(data.content);
    },
    publish(data) {
      return createPost({ ...data, grp: this.groupId }).then(res => {
        this.onSave && this.onSave(res);
      });
    },
  },
};
</script>