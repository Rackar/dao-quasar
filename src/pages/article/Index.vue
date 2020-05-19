<template>
  <q-layout view="hHh lpR fFf" class="page">
    <q-page-container>
      <div class="header">
        <HeaderBarLeft />
        <HeaderBarRight class="right" />
      </div>
      <div class="body" :key="$route.params.id">
        <BodyLeft @getGroupInfo="setGroupInfo" />
        <BodyRight v-if="groupInfo !== null" :groupInfo="groupInfo" />
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
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  /deep/ .main {
    padding: unset;
  }
  /deep/ .right {
    position: unset;
  }

  @media only screen and (min-width: 1440px) {
    padding-left: 48px;
    padding-right: 48px;
    padding-top: 30px;
    padding-bottom: 50px;
  }
}
.right {
  position: absolute;
  top: 28px;
  right: 48px;
}
.body {
  padding-bottom: 15px;
  @media only screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: minmax(auto, 860px) minmax(auto, 535px);
    grid-gap: 15px;
    justify-content: center;
  }
}
</style>
