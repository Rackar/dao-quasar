<template>
  <div class="fit row">
    <div class="col-1 q-pa-md" v-for="member in members" :key="member.id">
      <div>
        <q-avatar size="lg" color="primary" text-color="white">
          <img :src="member.avatar" />
          <q-badge v-show="edit" color="red" floating style>x</q-badge>
        </q-avatar>
      </div>
      <div>{{member.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: Array,
    edit: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="stylus" scoped></style>