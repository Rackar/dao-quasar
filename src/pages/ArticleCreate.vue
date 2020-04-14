<template>
  <q-page padding>
    <h2>编写文章</h2>
    <q-editor v-model="editor" min-height="25rem" />提交
  </q-page>
</template>

<script>
export default {
  name: "ArticleCreate",

  data() {
    return {
      editor: "What you see is <b>what</b> you get."
    };
  }
};
</script>

<style lang="stylus" scoped></style>