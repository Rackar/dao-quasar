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
        class="slide"
        swipeable
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        style="min-width: 20vw;height: 80vh;max-height: 90vh; max-width: 95vw;"
      >
        <q-carousel-slide
          v-for="(url, index) in images"
          :name="index"
          :key="index"
          style="padding:0;"
        >
          <img :src="url" class="slideImg" />
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
.slide {
  background-color: transparent;
  // box-shadow: none;
  /deep/ .q-carousel__slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .q-carousel__arrow button {
    background-color: rgba(black, 0.7);
  }
}
.slideImg {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>