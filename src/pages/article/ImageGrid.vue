<template>
  <div class="grid" :data-length="images.length">
    <q-img
      class="grid_item cursor-pointer"
      v-for="(url, index) in images"
      :key="index"
      :src="url"
      spinner-color="white"
      @click="showBigPic(index)"
    />
    <q-dialog v-model="dialog">
      <q-carousel
        swipeable
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        style="width: 70vw;height: 80vh;max-height: 90vh; max-width: 95vw;"
      >
        <q-carousel-slide
          v-for="(url, index) in images"
          :name="index"
          :key="index"
          style="padding:0;"
        >
          <q-img :src="url" />
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    images: { required: true, type: Array },
  },
  data() {
    return {
      slide: 0,
      dialog: false,
    };
  },
  methods: {
    showBigPic(index) {
      this.slide = index;
      this.dialog = true;
    },
  },
};
</script>

<style scoped="true" lang="scss">
@import '@/components/publish/_imageGrid.scss';
</style>