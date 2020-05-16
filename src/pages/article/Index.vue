<template>
  <q-layout view="hHh lpR fFf" class="page">
    <q-page-container>
      <div class="header">
        <HeaderBarLeft />
        <HeaderBarRight class="right" />
      </div>
      <div class="row q-col-gutter-md" :key="$route.params.id">
        <BodyLeft class="col-sm-8 col-md-6 offset-md-1" @getGroupInfo="setGroupInfo" />
        <BodyRight class="col-sm-4 col-md-4" v-if="groupInfo !== null" :groupInfo="groupInfo" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderBarLeft from 'components/headerBarLeft';
import HeaderBarRight from 'components/headerBarRight';
import BodyLeft from './Left';
import BodyRight from './Right';

export default {
  components: { HeaderBarLeft, HeaderBarRight, BodyLeft, BodyRight },
  data() {
    return { groupInfo: null };
  },
  methods: {
    setGroupInfo(val) {
      this.groupInfo = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background-color: #f8f8f8;
}
.header {
  display: flex;
  padding: 0px 0px 80px;
  justify-content: space-between;
  // display: flex;
  // padding: 16px;
  // justify-content: space-between;
}
.right {
  position: absolute;
  top: 28px;
  right: 48px;
}
// .body {
//   // display: flex;
//   // justify-content: center;
// }
</style>
