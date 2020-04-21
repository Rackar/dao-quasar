<template>
  <q-card class="my-card">
    <q-card-section class="row no-wrap">
      我的钱包
      <q-space />
      转 二
    </q-card-section>
    <q-card-section class="text-center">
      <q-btn flat label="总金额 (NES)▽">
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>Ethereum ETH</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>DAO NES</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
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
