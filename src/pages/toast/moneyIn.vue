<template>
  <div>
    <q-btn label="向我转账" color="primary" @click="show = true" />
    <q-dialog v-model="show">
      <q-card style="width: 440px" class="q-pa-lg">
        <q-card-section class="items-center q-pb-none">
          <div class>扫一扫，向我转账</div>
          <div class id="qrcode"></div>
          <div class>此钱包仅限接受ERC20代币，转入其它代币会造成永久损失</div>
        </q-card-section>

        <!-- <q-card-section class="q-pt-none">{{content}}</q-card-section> -->

        <q-card-actions align="center" class="text-teal">
          <p>钱包地址</p>
          <span>
            ERTET¥%#¥%#FDG%8787rerHH4
            <i class="copy">复制</i>
          </span>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      show: false,
      title: '转账成功',
      content: '你也可以在「我的主页」中查看刚刚转账的信息',
    };
  },
  watch: {},
  computed: {},
  methods: {
    taost_cancel() {
      this.$q.notify('已取消');
    },
    taost_confirm() {
      this.$q.notify('删除成功');
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.main {
  background-color: white;
}
</style>
