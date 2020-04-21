<template>
  <div>
    <q-avatar
      class="clickable q-mx-xs"
      rounded
      size="36px"
      icon="notifications"
      @click="showNotice=!showNotice"
    >
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
    <q-dialog v-model="showNotice">
      <q-card>
        <q-card-section>
          <div class="text-h6">show Notice</div>
          <div
            v-for="notice in notifications"
            :key="notice.id"
          >{{notice.h_text}} - {{$utils.timeStringToLocal(create_at)}}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showNotice: false,
      notifications: [
        {
          create_at: "2020-04-11T20:36:04+08:00",
          h_text: "恭喜你，10个ETH",
          id: 1,
          user: 1,
          read: 1
        }
      ]
    };
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