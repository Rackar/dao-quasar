<template>
  <div
    class="grid"
    :data-length="images.length"
    v-viewer="{
      inline: false,
      button: true,
      navbar: false,
      title: false,
      toolbar: false,
      tooltip: false,
      movable: false,
      zoomable: false,
      reset: false,
      rotatable: false,
      scalable: false,
      transition: true,
      fullscreen: true,
      keyboard: true,
    }"
  >
    <div v-for="(url, index) in images" :key="index" class="grid_item cursor-pointer">
      <img class="image" :src="url" />
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
Vue.use(Viewer);
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
  // min-width: 10vw;
  height: 80vh;
  min-height: 20vh;
  max-height: 90vh;
  max-width: 95vw;
  @media only screen and (max-width: 768px) {
    height: auto;
    width: 80vw;
  }
  background-color: transparent;
  box-shadow: none;
  overflow: visible;
  /deep/ .q-carousel__slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .q-carousel__arrow button {
    background-color: rgba(black, 0.7);
  }
  /deep/ .q-panel {
    overflow: visible;
  }
}
.slideImg {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
