<template>
  <q-layout class="manage-layout">
    <div>
      <headerBarLeft />
    </div>
    <div class="lt-md fold">
      <q-btn color="primary" label="展开" @click="unfold" />
    </div>
    <q-drawer elevated v-model="right" side="right">
      <ManageGroup />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import headerBarLeft from 'components/headerBarLeft';
import ManageGroup from 'pages/manage/ManageGroup';
export default {
  name: 'ManageLayout',
  components: { ManageGroup, headerBarLeft },
  data() {
    return {
      right: true,
      mini: false,
    };
  },
  methods: {
    unfold() {
      this.right = true;
      this.mini = true;
    },
  },
};
</script>
<style lang="stylus" scoped>
.manage-layout {
  background-color: rgb(248, 248, 248);
  padding: 0;
  margin: 0;

  /deep/ .q-drawer {
    width: 480px !important;
  }
}

@media only screen and (max-width: 600px) {
  .manage-layout {
    /deep/ .q-drawer {
      width: 280px !important;
    }
  }
}

.fold {
  position: absolute;
  top: 30px;
  right: 40px;
}
</style>
