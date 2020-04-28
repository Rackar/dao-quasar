<template>
  <q-layout view="hHh lpR fFf" class="page">
    <q-page-container>
      <div class="header">
        <HeaderBarLeft />
        <HeaderBarRight />
      </div>
      <div class="body" :key="$route.params.id">
        <BodyLeft class="body_left" @getGroupInfo="setGroupInfo" />
        <BodyRight class="body_right" v-if="groupInfo !== null"  :groupInfo="groupInfo" />
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
  padding: 16px;
  justify-content: space-between;
}
.body {
  display: flex;
  justify-content: center;
}
</style>
