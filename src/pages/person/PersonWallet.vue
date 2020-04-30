<template>
  <q-card class="my-card">
    <moneyIn v-model="showMoneyIn" />
    <moneyOut v-model="showMoneyOut" :tokens="tokens" :currentToken="currentToken" />
    <q-card-section class="row no-wrap">
      我的钱包
      <q-space />
      <q-btn flat @click="showMoneyIn = true">
        <q-icon name="img:statics/icons/icon_code_normal.svg" />
      </q-btn>
      <q-btn flat @click="showMoneyOut = true">
        <q-icon name="img:statics/icons/icon_zhuanzhang_normal.svg" />
      </q-btn>
    </q-card-section>
    <q-card-section class="text-center">
      <q-btn no-caps flat :label="'总金额 (' + currentToken.name + ')▽'">
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <div v-for="token in tokens" :key="token.id">
              <q-item clickable @click="pickToken(token)">
                <q-item-section>{{ token.contract.name }}</q-item-section>
              </q-item>
              <q-separator />
            </div>
          </q-list>
        </q-menu>
      </q-btn>
      <div>{{ currentToken.value }}</div>
    </q-card-section>
    <q-card-section>
      <q-list style="min-width: 100px">
        <q-item v-for="item in log" :key="item.key">
          <q-item-section>{{ item.token_log.note }} --{{ item.token_log.value }}</q-item-section>
          <q-item-section>{{ item.token_log.create_at }}-- $848</q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import moneyIn from 'pages/toast/moneyIn';
import moneyOut from 'pages/toast/moneyOut';
export default {
  components: { moneyIn, moneyOut },
  props: {
    tokens: Array,
    log: Array,
  },
  data() {
    return {
      currentToken: {
        name: '',
        contract: '',
        value: '0.00',
      },
      showMoneyIn: false,
      showMoneyOut: false,
    };
  },
  watch: {
    tokens(newToken) {
      if (newToken && newToken.length) {
        this.pickToken(newToken[0]);
      }
    },
  },
  computed: {},
  methods: {
    pickToken(token) {
      this.currentToken = {
        name: token.contract.name,
        symbol: token.contract.symbol,
        contract: token.contract.contract,
        value: token.token.value,
      };
    },
  },
  created() {
    if (this.tokens && this.tokens.length) {
      this.pickToken(this.tokens[0]);
    }
  },
  mounted() {},
};
</script>
