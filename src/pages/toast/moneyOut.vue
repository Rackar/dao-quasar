<template>
  <q-dialog v-model="shouldShow">
    <q-card style="width: 440px" class="q-pa-lg">
      <q-card-section class="items-center q-pb-none">钱包转账</q-card-section>

      <q-card-actions align="center" class="text-teal">
        <span>转出地址</span>
        <input
          type="text"
          v-model="user"
          @change="lookActive"
          placeholder="请输入 +ERC20 钱包地址/DAO ID"
        />
      </q-card-actions>
      <q-card-actions align="center" class="text-teal">
        <span>转出金额(单位NES)</span>
        <input
          type="text"
          v-model="val"
          @change="lookActive"
          :placeholder="layerInfo && '可转出余额' + totalMoney"
        />
        <i @click="val = totalMoney">全部</i>
      </q-card-actions>
      <q-card-actions align="center" class="text-teal">
        <div class="rollOutBtn" :class="{ active: val != '' && user != '' }" @click="payTo">
          确定
        </div>
        <div class="rollOutDes">所有基于区块链的交易都需要手续费，该手续费将自动扣除。</div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: { value: Boolean },
  data() {
    return {
      show: false,
      title: '转账成功',
      content: '你也可以在「我的主页」中查看刚刚转账的信息',
      val: '',
      contract: '',
      user: '',
      layerInfo: {},
      totalMoney: 0,
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
  },
  methods: {
    taost_cancel() {
      this.$q.notify('已取消');
    },
    taost_confirm() {
      this.$q.notify('删除成功');
    }, // 转账
    payTo: async function() {
      // let self = this;
      // console.log(this.layerInfo);
      // let url = 'protected/user/token/transfer';
      // 注释掉接口
      //   let dat = {
      //     contract: this.layerInfo.post.contract.contract,
      //     to_user: Number(this.user),
      //     value: this.val
      //   };
      //   const respay = await axios.post("//" + url, dat);
      // const respay = { code: 0 };
      // if (respay.code == 0) {
      // } else {
      // }
    },
    lookActive: function() {},
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
