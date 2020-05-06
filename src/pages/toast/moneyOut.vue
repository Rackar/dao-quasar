<template>
  <q-dialog v-model="shouldShow">
    <div class="main">
      <div class="text-h5">钱包转账</div>
      <div>转出地址</div>
      <div>
        <q-input
          class="myinput"
          outlined
          v-model="user"
          dense
          placeholder="请输入 +ERC20 钱包地址/DAO ID"
        />
      </div>

      <div>
        转出金额
        <q-btn no-caps flat :label="'单位 (' + currentToken.contract.name + ')▽'">
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <div v-for="(token,index) in tokens" :key="token.id">
                <q-item clickable @click="pickToken(index)">
                  <q-item-section>{{ token.contract.symbol }}</q-item-section>
                </q-item>
                <q-separator />
              </div>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <div>
        <q-input
          class="col"
          outlined
          v-model="val"
          dense
          :placeholder=" '可转出余额' + currentToken.token.value"
        >
          <template v-slot:append>
            <q-btn flat color="white" text-color="black" label="全部" @click="inputAll" />
          </template>
        </q-input>
      </div>
      <div>
        <q-btn
          class="col"
          color="primary"
          label="确定"
          @click="sentMoney"
          :disable="this.user===''||this.val===''"
        />
      </div>

      <div class="col">所有基于区块链的交易都需要手续费，该手续费将自动扣除。</div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    tokens: Array,
  },
  data() {
    return {
      val: '',
      contract: '',
      user: '',
      totalMoney: 0,
      tokenIndex: 0,
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
    currentToken() {
      return this.tokens[this.tokenIndex];
    },
  },
  methods: {
    inputAll() {
      this.val = this.currentToken.token.value;
    },
    async sentMoney() {
      let url = 'protected/user/token/transfer';
      let data = {
        contract: this.currentToken.contract.contract,
        to_user: this.user,
        value: this.val,
      };
      if (!this.val || isNaN(Number(this.val)) || Number(this.val) === 0) {
        this.$q.notify('金额不合法');
        return;
      }

      if (this.val > this.currentToken.token.value) {
        this.$q.notify('余额不足');
        return;
      }

      if (this.user.length >= 5 || this.user.substring(0, 2) === '0x') {
      } else {
        this.$q.notify('地址不合法');
        return;
      }
      const res = await this.$axios.post(url, data);
      if (res.data.code === 0) {
        this.$q.notify({
          message: '转账成功',
        });
      } else if (res.data.code === 100) {
        this.$q.notify('错误' + res.data.message);
      } else if (res.data.code === 104) {
        this.$q.notify({
          message: '认证失效，请重新登录',
        });
        this.$showLogin();
      }
    },

    pickToken(index) {
      this.tokenIndex = index;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.main {
  max-width: 440px;
  background-color: white;
  padding: 28px;
  div {
    padding: 5px 0 5px;
  }
}
</style>
