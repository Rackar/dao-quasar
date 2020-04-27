<template>
    <q-btn outline color="primary" label="发言" @click="showAddArtrcle" icon="create" >
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
    return { shouldShowDialog: false  };
  },
  methods: {
    showAddArtrcle() {
      this.shouldShowDialog = true;
    },
  },
};
</script>
