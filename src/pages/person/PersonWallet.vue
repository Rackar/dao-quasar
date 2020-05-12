<template>
  <q-card flat class="my-card">
    <moneyIn v-model="showMoneyIn" />
    <moneyOut v-model="showMoneyOut" :tokens="tokens" :currentToken="currentToken" />
    <q-card-section class="row no-wrap title">
      <span class="title-name">我的钱包</span>

      <q-space />
      <IconHover
        iconName="code"
        width="30px"
        class="cursor-pointer"
        @click.native="showMoneyIn = true"
      />
      <IconHover
        style="margin-left:60px;"
        iconName="zhuanzhang"
        width="30px"
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
      <div class="value1">{{ currentToken.value }}</div>
      <div class="value2">$ {{priceOf(currentToken)}}</div>
    </q-card-section>
    <q-card-section>
      <q-list class="money-detail">
        <div v-for="item in log" :key="item.key">
          <q-item>
            <q-item-section>
              <q-item-label class="detail-big">{{ item.token_log.note }}</q-item-label>
              <q-item-label
                class="detail-small"
                caption
              >{{ $utils.timeStringToLocal(item.token_log.create_at, 'Accurate') }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label class="detail-big">{{ item.token_log.value }}</q-item-label>
              <q-item-label
                caption
                class="detail-small"
              >$ {{priceOf({name:item.contract.name,value:item.token_log.value})}}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-separator inset /> -->
        </div>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import moneyIn from 'pages/toast/moneyIn';
import moneyOut from 'pages/toast/moneyOut';
// import axios from 'axios';
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
      quotes: [],
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
    priceOf({ name, value }) {
      return Number(value) * this.getPrice(name);
    },
    getPrice(name) {
      if (!this.quotes) {
        let obj = [
          {
            name: 'Ethereum',
            value: 200,
          },
        ];
        this.quotes = obj;
        this.$q.localStorage.set('quotes', obj);
      }
      let quote = this.quotes.find(quoted => quoted.name === name);
      return (quote && quote.value) || 0;
    },
    // pullPriceFromOutside() {
    //   return new Promise((resolve, reject) => {
    //     let id = 1027;
    //     const instance = axios.create({
    //       timeout: 10000,
    //       headers: { 'X-CMC_PRO_API_KEY': '64e6c84a-b974-4572-83a7-e9e1f81264a5' },
    //     });
    //     instance
    //       .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=' + id)
    //       .then(res => {
    //       });
    //   });
    // },
  },
  created() {
    if (this.tokens && this.tokens.length) {
      this.pickToken(this.tokens[0]);
    }
    this.quotes = this.$q.localStorage.getItem('quotes');
  },
  mounted() {},
};
</script>
<style lang="stylus" scoped>
.my-card {
  padding: 40px;

  .q-card__section--vert {
    padding: 10px 0;
  }
}

.value1 {
  font-size: 24px;
  color: #2A3542;
}

.value2 {
  font-size: 20px;
  color: #8C909D;
}

.title {
  .title-name {
    font-size: 20px;
    color: #2A3542;
  }
}

.money-detail {
  .q-item {
    padding: 20px 0;
  }

  .detail-big {
    font-size: 18px;
    color: #2A3542;
  }

  .detail-small {
    color: #8C909D;
  }
}
</style>
