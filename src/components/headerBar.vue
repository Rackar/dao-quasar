<template>
  <div class="text-white q-pb-xl" style="background-color:#74D2C8;">
    <q-toolbar>
      <headerBarLeft />
      <q-space />
      <headerBarRight />
    </q-toolbar>
  </div>
</template>

<script>
import headerBarLeft from './headerBarLeft';
import headerBarRight from './headerBarRight';
export default {
  components: { headerBarLeft, headerBarRight },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
