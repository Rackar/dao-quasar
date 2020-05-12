<template>
  <q-layout class="manage-layout">
    <div>
      <headerBarLeft />
    </div>
    <div class="lt-md fold">
      <q-btn color="primary" label="展开" @click="right=true" />
    </div>
    <q-drawer elevated v-model="right" side="right" :width="480">
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
    };
  },
};
</script>
<style lang="stylus" scoped>
.manage-layout {
  background-color: rgb(248, 248, 248);
  padding: 0;
  margin: 0;
}

.fold {
  position: absolute;
  top: 30px;
  right: 40px;
}
</style>
