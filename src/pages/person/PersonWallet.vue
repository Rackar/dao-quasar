<template>
  <q-card class="my-card">
    <moneyIn v-model="showMoneyIn" />
    <moneyOut v-model="showMoneyOut" :tokens="tokens" :currentToken="currentToken" />
    <q-card-section class="row no-wrap">
      我的钱包
      <q-space />
      <IconHover
        iconName="code"
        width="36px"
        class="cursor-pointer"
        @click.native="showMoneyIn = true"
      />
      <IconHover
        style="margin-left:60px;"
        iconName="zhuanzhang"
        width="36px"
        class="cursor-pointer"
        @click.native="showMoneyOut = true"
      />
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
      <div>$ 0.00</div>
    </q-card-section>
    <q-card-section>
      <q-list>
        <div v-for="item in log" :key="item.key">
          <q-item>
            <q-item-section>
              <q-item-label>{{ item.token_log.note }}</q-item-label>
              <q-item-label
                caption
              >{{$utils.timeStringToLocal(item.token_log.create_at,'Accurate') }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label>{{item.token_log.value}}</q-item-label>
              <q-item-label caption>$ 0</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </div>
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
      log: [],
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
      this.tokenLog(token.contract.contract);
    },
    tokenLog: async function(contract) {
      let url = 'protected/user/token/logs';
      let dat = {
        contract: contract,
        base_token_log: null,
      };
      const resLog = await this.$axios.post(url, dat);
      if (resLog.data.code == 0) {
        this.log = resLog.data.data.token_logs;
      } else {
        this.$q.notify(resLog.data.message);
      }
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
