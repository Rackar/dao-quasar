<template>
  <img :src="url" alt srcset @mouseenter="hover=true" @mouseleave="hover=false" />
</template>

<script>
export default {
  name: 'IconHover',
  components: {},
  props: {
    folder: {
      type: String,
      default: 'statics/icons',
    },
    iconName: { type: String, required: true },
  },
  data() {
    return {
      hover: false,
    };
  },
  watch: {},
  computed: {
    normalUrl() {
      return this.iconName ? `${this.folder}/icon_${this.iconName}_normal.svg` : null;
    },
    hoverUrl() {
      return this.iconName ? `${this.folder}/icon_${this.iconName}_hover.svg` : null;
    },
    url() {
      return this.hover ? this.hoverUrl : this.normalUrl;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
</style>