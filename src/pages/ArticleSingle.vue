<template>
  <q-page padding>
    <h2>文章标题</h2>
    <q-card flat bordered>
      <q-card-section v-html="editor" />
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Article",
  props: { id: String },
  data() {
    return {
      editor: "What you see is <b>what</b> you get."
    };
  }
};
</script>

<style lang="stylus" scoped></style>