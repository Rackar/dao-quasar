<template>
  <div>
    <q-btn label="删除框" color="primary" @click="show = true" />
    <q-dialog v-model="show">
      <q-card style="width: 440px" class="q-pa-lg">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">删除草稿</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">删除后无法恢复，确定？</q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn outline class="q-px-xl q-mr-lg" color="primary" label="取消" v-close-popup />
          <q-btn unelevated class="q-px-xl" color="primary" label="确定" v-close-popup />
        </q-card-actions>
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
      show: false,
      small: ""
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
</style>