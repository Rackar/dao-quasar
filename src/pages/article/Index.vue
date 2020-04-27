<template>
  <q-layout view="hHh lpR fFf" class="page">
    <q-page-container>
      <div class="header">
        <HeaderBarLeft />
        <HeaderBarRight />
      </div>
      <div class="body">
        <BodyLeft class="body_left" @getGroupId="setGroupId"/>
        <BodyRight v-if="groupId !== -1" class="body_right" :groupId="groupId" />
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
    return { groupId: -1 };
  },
  methods: {
    setGroupId(id) {
      this.groupId = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  background-color: #F8F8F8;
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
