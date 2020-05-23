<template>
  <div>
    <q-dialog v-model="shouldShow">
      <q-card style="width: 440px" class="q-pa-lg">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">{{ content }}</q-card-section>

        <q-card-actions align="center" class="bg-white text-teal" v-if="!showInfo">
          <q-btn
            outline
            class="btn-sumit q-mr-lg"
            color="primary"
            label="取消"
            @click="cancel"
            v-close-popup
          />
          <q-btn
            unelevated
            class="btn-sumit"
            color="primary"
            label="确定"
            @click="comfirm"
            v-close-popup
          />
        </q-card-actions>

        <q-card-actions align="center" class="bg-white text-teal" v-if="showInfo">
          <q-btn
            unelevated
            class="q-px-xl"
            color="primary"
            label="查看详情"
            @click="comfirm"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '弹框默认标题',
    },
    content: {
      type: String,
      default: '弹框默认备注',
    },
    showInfo: {
      type: Boolean,
      default: false,
    },
    value: Boolean,
  },
  data() {
    return {
      show: false,
      small: '',
    };
  },
  watch: {},
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
    comfirm() {
      this.$emit('taost_confirm');
    },
    cancel() {
      this.$emit('taost_cancel');
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.btn-sumit {
  padding-left: 48px;
  padding-right: 48px;
  @media only screen and (max-width: 600px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
