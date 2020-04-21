<template>
  <div class="text-white q-pb-xl" style="background-color:#74D2C8;">
    <q-toolbar>
      <q-icon name="menu" class="q-pa-md" />DAOChat
      <q-space />
      <headerBarRight />
    </q-toolbar>
  </div>
</template>

<script>
import headerBarRight from "./headerBarRight";
export default {
  components: { headerBarRight },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
</style>