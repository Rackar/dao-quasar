<template>
  <div>
    <div class="detailRight right">
      <div class="myMoney">
        <div class="moneyNes">我的钱包</div>
        <div class="scan" v-for="item in tokens" :key="item.key">
          <div class="left">
            <span class="moneyNumber">{{ item.token.value }}</span>
            <span>&nbsp;({{ item.contract.symbol }})</span>
          </div>
          <div class="right">
            <div class="img1"></div>

            <div class="img2"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="realtimeDynamic" v-for="item in log" :key="item.key">
        <div class="dynamicItem">
          <div class="dynamicTop">
            <div class="left">{{ item.token_log.note }}</div>
            <div class="right">{{ item.token_log.value }}</div>
            <div class="clearfix"></div>
          </div>
          <div class="dynamicBottom">
            <div class="left">{{ item.token_log.create_at }}</div>
            <div class="right">839</div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tokens: Array,
    log: Array,
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
