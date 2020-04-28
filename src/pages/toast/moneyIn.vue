<template>
  <q-dialog v-model="shouldShow">
    <div class="main text-center">
      <div class="top">
        <div class="text-h5">扫一扫，向我转账</div>
        <div>此钱包仅限接受ERC20代币，转入其它代币会造成永久损失</div>
        <qrcode-vue :value="address" :size="size" level="H"></qrcode-vue>
      </div>

      <div class="bottom">
        <div>钱包地址</div>
        <div>
          {{ address }}
          <q-btn flat color="primary" label="复制" @click="copy" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { copyToClipboard } from 'quasar';
export default {
  components: { QrcodeVue },
  props: { value: Boolean },
  data() {
    return {
      size: 200,
    };
  },
  watch: {},
  computed: {
    address() {
      return this.$store.state.user.address;
    },
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
    copy() {
      copyToClipboard(this.address)
        .then(() => {
          this.$q.notify('钱包地址已复制到剪切板');
          // 成功!
        })
        .catch(() => {
          this.$q.notify('浏览器不支持，请手动复制地址');
          // 失败
        });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.main {
  max-width: 490px;
  background-color: white;

  div {
    padding: 5px 0 5px;
  }
  .top {
    padding: 28px;
  }
  .bottom {
    background-color: grey;
    color: white;
    padding: 14px;
  }
}
</style>
