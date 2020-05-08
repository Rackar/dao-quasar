<template>
  <q-btn
    v-require-login-click
    outline
    color="primary"
    class="btn"
    @click="showAddArtrcle"
  >
    <img svg-inline src="@/statics/icons/icon_bianji_normal.svg" class="svg-icon svg-icon--primary mr5">
    <span>发言</span>
    <Dialog :groupId="groupId" v-model="shouldShowDialog" :onSave="onSave" />
  </q-btn>
</template>

<script>
import Dialog from 'pages/article/PublishArticle';

export default {
  components: { Dialog },
  props: {
    groupId: { type: Number, required: true },
    onSave: { type: Function },
  },
  data() {
    return { shouldShowDialog: false };
  },
  methods: {
    showAddArtrcle() {
      this.shouldShowDialog = true;
    },
  },
};
</script>

<style scoped="true" lang="scss">
.btn {
  width: 96px;
  height: 34px;
}
</style>
