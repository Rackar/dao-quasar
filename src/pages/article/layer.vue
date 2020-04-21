<style scoped>
.rollOutModal .active {
  background: #00d6c2;
}
</style>
<template>
  <div class="popupBody" style="position: relative; width: 100%; height: 100%;" v-show="show">
    <!--  发帖成功-->
    <div class="popupModal" v-if="layerInfo.type == 'setabb'">
      <div class="popupMain">
        <div class="closeModal" @click="closeModel"></div>
        <div class="popupTitle">发布成功</div>
        <p>你也可以在「我的主页」中查看刚刚发布的内容</p>
        <router-link :to="{ name: 'personal', query: { id: layerInfo.post } }">
          <div class="popupBtn">查看详情</div>
        </router-link>
      </div>
    </div>
    <div class="popupModal" v-if="layerInfo.type == 'payed'">
      <div class="popupMain">
        <div class="closeModal" @click="closeModel"></div>
        <div class="popupTitle">转账成功</div>
        <p>你也可以在「我的主页」中查看刚刚转账的信息</p>
        <router-link :to="{ name: 'personal', query: { id: layerInfo.post } }">
          <div class="popupBtn">查看详情</div>
        </router-link>
      </div>
    </div>
    <!--    转账-->
    <div class="popupModal rollOutModal" v-if="layerInfo.type == 'repay'">
      <div class="popupMain">
        <div class="closeModal" @click="closeModel"></div>
        <div class="popupSureInfor">钱包转账</div>
        <div class="rollOut rollOutAddress">
          <span>转出地址</span>
          <input
            type="text"
            v-model="user"
            @change="lookActive"
            placeholder="请输入 +ERC20 钱包地址/DAO ID"
          />
        </div>
        <div class="rollOut rollOutMoney">
          <span>转出金额(单位NES)</span>
          <input
            type="text"
            v-model="val"
            @change="lookActive"
            :placeholder="layerInfo && '可转出余额' + layerInfo.post.token.value"
          />
          <i @click="val = layerInfo.post.token.value">全部</i>
        </div>
        <div class="rollOutBtn" :class="{ active: val != '' && user != '' }" @click="payTo">
          确定
        </div>
        <div class="rollOutDes">所有基于区块链的交易都需要手续费，该手续费将自动扣除。</div>
      </div>
    </div>
    <!--   收款二维码-->
    <div class="popupModal rollOutModal scanModal" v-if="layerInfo.type == 'getcode'">
      <div class="popupMain">
        <div class="closeModal" @click="closeModel"></div>
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
    </div>
    <!--    删帖-->
    <div class="popupModal" v-else-if="layerInfo.type == 'deladd'">
      <div class="popupMain">
        <div class="popupTitle">删除草稿</div>
        <p>删除后无法恢复，是否确定要删除这篇草稿？</p>
        <div class="popupBtnMain center">
          <div class="popupBtn popupCancelBtn" @click="closeModel">取消</div>
          <div class="popupBtn popupOkBtn">确定</div>
        </div>
      </div>
    </div>
    <!--    删除评论-->
    <div class="popupModal" v-else-if="layerInfo.type == 'delspk'">
      <div class="popupMain">
        <div class="popupSureInfor">你确定要删除这条评论嘛？</div>
        <div class="popupBtnMain center">
          <div class="popupBtn popupCancelBtn" @click="closeModel">取消</div>
          <div class="popupBtn popupOkBtn">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../http/axios';
export default {
  name: 'layer',
  data() {
    return {
      show: false,
      post: '',
      infos: {},
      val: '',
      contract: '',
      user: '',
    };
  },
  props: ['layerInfo'],
  watch: {
    chartData: function(newVal) {
      console.log(newVal);
      this.infos = newVal; //newVal即是chartData
      // this.drawChart();
    },
  },
  methods: {
    closeModel: function() {
      this.show = false;
    },
    showModel: function() {
      this.show = true;
    },

    // 转账
    payTo: async function() {
      let self = this;
      console.log(this.layerInfo);
      let url = 'protected/user/token/transfer';
      let dat = {
        contract: this.layerInfo.post.contract.contract,
        to_user: Number(this.user),
        value: this.val,
      };
      const respay = await axios.post('//' + url, dat);
      if (respay.code == 0) {
        self.closeModel();
        self.$toast({
          text: '转账成功！',
          // type:""
        });
      } else {
        // this.closeModel();
        // alert(respay.message);
      }
    },
    lookActive: function() {},
    // confirmCancel: function () {
    //   this.show = false;
    //   if(typeof (this.confirmModalOptions.btnCancelFunction)==='function'){
    //     this.confirmModalOptions.btnCancelFunction()
    //   }
    // },
    // confirmSubmit: function () {
    //   this.show = false;
    //   if(typeof (this.confirmModalOptions.btnSubmitFunction)==='function'){
    //     this.confirmModalOptions.btnSubmitFunction()
    //   }
    // 二维码
  },
};
</script>

<style scoped></style>
