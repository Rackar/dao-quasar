<template>
  <div class="q-gutter-y-md" style="max-width: 600px">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3 text-grey-7"
        active-color="primary"
        indicator-color="purple"
        align="justify"
      >
        <q-tab name="buy" label="Buy" />
        <q-tab name="sell" label="Sell" />
        <q-tab name="orders" label="Orders" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-primary text-white">
        <q-tab-panel name="buy">
          <div class="q-gutter-md relative" style="max-width: 200px">
            <q-input v-model="text" label="Pay" />
            <q-select class="right-select" borderless v-model="model" :options="options" label="" />
          </div>
          <div class="q-gutter-md relative" style="max-width: 200px">
            <q-input v-model="text" label="Pay" />
            <q-select
              class="right-select"
              borderless
              v-model="model2"
              :options="options"
              label=""
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="sell">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="orders">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 'buy',
      model: 'CNY',
      model2: 'CNY',
      options: ['CNY', 'USD'],
    };
  },
};
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
.right-select {
  width: 90px;
  font-size: 8px;
  position: absolute;
  right: 5px;
  top: 3px;
}
</style>
