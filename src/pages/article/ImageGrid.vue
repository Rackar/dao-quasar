<template>
  <div class="grid" :data-length="images.length">
    <q-img
      class="img"
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
.img {
  border-radius: 4px;
}
.grid {
  max-width: 600px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
[data-length="1"] .img {
  &:nth-child(1) {
    grid-row: 1 / 3;
    grid-column: 1 / 3;
  }
}
[data-length="2"] .img {
  &:nth-child(1) {
    grid-row: 1 / 3;
    // grid-column: 1 / 3;
  }
  &:nth-child(2) {
    grid-row: 1 / 3;
    // grid-column: 1 / 3;
  }
}
[data-length="3"] .img {
  &:nth-child(1) {
    grid-row: 1 / 3;
  }
}
</style>