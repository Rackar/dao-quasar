<template>
  <div class="fit row">
    <div class="col-1 q-pa-md" v-for="n in members" :key="n">
      <div>
        <q-avatar size="lg" color="primary" text-color="white" icon="directions">
          <q-badge v-show="edit" color="red" floating style>x</q-badge>
        </q-avatar>
      </div>
      <div>姓名</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: {
      type: Number,
      default: 10
    },
    edit: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="stylus" scoped></style>