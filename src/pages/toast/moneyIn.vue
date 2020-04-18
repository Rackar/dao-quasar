<template>
  <div>
    <q-btn label="向我转账" color="primary" @click="show = true" />
    <q-dialog v-model="show">
      <div>
        <div class="scanTop">
          <div class="popupSureInfor">扫一扫，向我转账</div>
          <div class="scanImg" id="qrcode"></div>
          <div class="rollOutDes">此钱包仅限接受ERC20代币，转入其它代币会造成永久损失</div>
        </div>
        <div class="scanBottom">
          <p>钱包地址</p>
          <span>
            ERTET¥%#¥%#FDG%8787rerHH4
            <i class="copy">复制</i>
          </span>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      show: false,
      title: "转账成功",
      content: "你也可以在「我的主页」中查看刚刚转账的信息"
    };
  },
  watch: {},
  computed: {},
  methods: {
    taost_cancel() {
      this.$q.notify("已取消");
    },
    taost_confirm() {
      this.$q.notify("删除成功");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
</style>