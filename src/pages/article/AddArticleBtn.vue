<template>
  <q-btn v-require-login-click outline color="primary" class="btn" @click="showAddArtrcle">
    <img
      svg-inline
      src="@/statics/icons/icon_bianji_normal.svg"
      class="svg-icon svg-icon--primary mr5"
    />
    <span>发言</span>
    <Dialog :groupId="groupId" v-model="shouldShowDialog" :onSave="onSave" />
    <JoinGroup v-model="showJoinGroup" :groupId="groupId" @wantJoin="wantJoin" />
  </q-btn>
</template>

<script>
import Dialog from 'pages/article/CreateArticle';
import JoinGroup from 'pages/toast/JoinGroup';

export default {
  components: { Dialog, JoinGroup },
  props: {
    groupId: { type: Number, required: true },
    onSave: { type: Function },
  },
  computed: {
    groupJoined() {
      return this.$store.state.group.currentGroup.joined;
    },
  },
  data() {
    return { shouldShowDialog: false, showJoinGroup: false };
  },
  methods: {
    showAddArtrcle() {
      if (this.groupJoined) {
        this.shouldShowDialog = true;
      } else {
        this.showJoinGroup = true;
      }
    },
    wantJoin() {
      this.$emit('wantJoin');
      // this.$q.notify('想要加入小组');
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
