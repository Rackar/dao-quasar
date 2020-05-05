<template>
  <div class="grid" :data-length="images.length">
    <q-img
      class="grid_item"
      v-for="(url, index) in images"
      :key="index"
      :src="url"
      spinner-color="white"
    />
  </div>
</template>

<script>
export default {
  props: {
    images: { required: true, type: Array },
  },
};
</script>

<style scoped="true" lang="scss">
@import '@/components/publish/_imageGrid.scss';
</style>