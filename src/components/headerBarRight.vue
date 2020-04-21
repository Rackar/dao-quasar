<template>
  <div>
    <q-avatar class="clickable q-mx-xs" rounded size="36px" icon="notifications">
      <q-badge color="red" floating>4</q-badge>
    </q-avatar>
    <q-avatar
      class="clickable q-px-md q-mr-md"
      rounded
      size="24px"
      @click="$router.push('/person/show/'+$store.state.user.userid)"
    >
      <img :src="$store.state.user.avatar||'statics/user.svg'" />
    </q-avatar>
  </div>
</template>

<script>
export default {
  components: {},
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
.clickable {
  cursor: pointer;
}
</style>