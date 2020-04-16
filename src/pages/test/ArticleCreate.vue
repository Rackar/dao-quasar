<template>
  <q-page padding>
    <h2>编写文章</h2>
    <q-input outlined v-model="title" label="标题" :dense="false" />
    <q-editor v-model="editor" min-height="25rem" />
    <q-btn color="primary" label="提交" v-on:click="submitContent" />
    <q-btn color="primary" label="添加头图" v-on:click="addPic" />
  </q-page>
</template>

<script>
export default {
  name: "ArticleCreate",

  data() {
    return {
      editor: "What you see is <b>what</b> you get.",
      title: ""
    };
  },
  methods: {
    submitContent() {
      let obj = {
        username: this.$store.state.username,
        userid: this.$store.state.userid,
        title: this.title,
        content: this.editorContent
      };
      if (this.editMode) {
        this.$axios
          .put("/api/articles/" + this.aid, obj)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error("修改失败");
          });
      } else {
        this.$axios
          .post("/api/articles", obj)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error("发表失败");
          });
      }
    },
    addPic() {}
  }
};
</script>

<style lang="stylus" scoped></style>