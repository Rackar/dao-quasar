<template>
  <q-dialog v-model="shouldShow" persistent>
    <div class="container">
      <q-btn class="closeIcon" icon="close" flat round dense v-close-popup />
      <Content :onLoggedIn="refresh"/>
    </div>
  </q-dialog>
</template>

<script>
import Content from './Content';
export default {
  components: { Content },
  props: { value: Boolean },
  computed: {
    shouldShow: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
  methods: {
    refresh() {
      location.reload();
    }
  },
};
</script>

<style scoped="true">
.container {
  position: absolute;
}
.closeIcon {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
}
</style>