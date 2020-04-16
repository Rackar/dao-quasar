<template>
  <div class="q-mx-xl">
    <q-avatar rounded size="20px">
      <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
    </q-avatar>
    <span class="text-weight-bold">DAOChat官方讨论组</span>
    <q-btn
      flat
      rounded
      align="around"
      class="btn-fixed-width"
      color="grey"
      label="分享"
      icon="share"
    />
    <q-btn unelevated color="primary" label="加入小组" icon="add" />
    <q-btn outline color="primary" label="发言" icon="create" />
    <div>
      <div class="row q-pa-md info">
        <div class="col-10">
          <span class="text-weight-bold">创建于2019-02-22 组长：绿岛雨</span>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
          <!-- <q-scroll-area
            :thumb-style="thumbStyle"
            :content-style="contentStyle"
            :content-active-style="contentActiveStyle"
            style="height: 200px; max-width: 600px;"
          >
            <div v-for="n in 100" :key="n" class="q-pa-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </q-scroll-area>-->
        </div>
      </div>
    </div>

    <div>
      <span v-for="n in 8" :key="n">
        <q-avatar size="40px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>name
      </span>
    </div>
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
  computed: {
    // contentStyle() {
    //   return {
    //     backgroundColor: "rgba(0,0,0,0.02)",
    //     color: "#555"
    //   };
    // },
    // contentActiveStyle() {
    //   return {
    //     backgroundColor: "#eee",
    //     color: "black"
    //   };
    // },
    // thumbStyle() {
    //   return {
    //     right: "2px",
    //     borderRadius: "5px",
    //     backgroundColor: "#d4f6f3",
    //     width: "5px",
    //     opacity: 0.75
    //   };
    // }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.info {
  background-color: #d4f6f3;
  color: #8c909d;
}
</style>