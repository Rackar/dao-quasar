<template>
  <q-dialog v-model="shouldShow">
    <q-card style="width: 440px" class="q-pa-lg">
      <q-card-section class="items-center q-pb-none">
        <div class>扫一扫，向我转账</div>
        <div class id="qrcode"></div>
        <div class>此钱包仅限接受ERC20代币，转入其它代币会造成永久损失</div>
      </q-card-section>
      <q-card-actions align="center" class="text-teal">
        <div>钱包地址</div>
        <div>ERTET¥%#¥%#FDG%8787rerHH4 复制</div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: { value: Boolean },
  data() {
    return {
      show: false,
      title: '转账成功',
      content: '你也可以在「我的主页」中查看刚刚转账的信息',
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
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.main {
  background-color: white;
}
</style>
