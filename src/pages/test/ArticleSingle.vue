<template>
  <q-page padding>
    <h2>文章标题</h2>
    <q-btn color="primary" label="修改删除" v-on:click="edit" />
    <q-card flat bordered>
      <q-card-section v-html="editor" />
    </q-card>
    <comments />
  </q-page>
</template>

<script>
import Comments from "pages/test/Comments";
export default {
  name: "Article",
  components: {
    Comments
  },
  props: { id: String },
  data() {
    return {
      editor: "What you see is <b>what</b> you get."
    };
  },
  methods: {
    edit() {},
    del() {}
  }
};
</script>

<style lang="stylus" scoped></style>