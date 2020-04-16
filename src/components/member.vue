<template>
  <div class="fit row">
    <div class="col-1 q-pa-md" v-for="n in members" :key="n">
      <div>
        <q-avatar size="lg" color="primary" text-color="white" icon="directions" />
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
    }
  }
};
</script>

<style lang="stylus" scoped></style>