<style scoped>
.scan {
  display: flex;
  justify-content: space-between;
}
.scan .left,
.scan .right {
  width: max-content;
}
.myMoney .scan div {
  display: flex;
}
.scanModal .scanBottom span {
  font-size: 14px;
}
.dynamicList {
  margin-top: 80px;
  margin-left: -39px;
}
</style>
<template>
  <div class="personalBody">
    <!-- <div class="personalHeader">
      <div class="chatHeader left">
        <i></i>
        <span>DAOChat</span>
      </div>
      <div class="msgTop right">
        <span class="bell" @click="tach">
          <i>8</i>
        </span>
        <span class="al">AL</span>
        <div class="toolTip-top" v-if="istach">
          <p class="joinSucess commonBorder">
            成功加入&nbsp;
            <span class="blueColor">芭芭拉小组</span>
          </p>
          <p class="respondTip commonBorder">
            <span class="blueColor">小王子、魔鬼的秘密、吧哈哈</span>
            等3位组员回应了你的帖子
            <span class="blueColor">写文章的时候总犯困</span>
          </p>
          <div class="otherMsg commonBorder">恭喜你，获得2个代币</div>
          <div class="otherMsg commonBorder">恭喜你，获得2个代币</div>
          <a href="javascript:;" class="messageMore">查看更多</a>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>-->
    <div class="personalInfo">
      <div class="left">
        <div class="personalAvatar left">
          <div v-show="bianji" @click="$refs.file.click()"></div>
          <!-- <img v-show="isShow" :src="files" @error="doError" alt /> -->
          <img v-show="isShow" :src="userinfo.avatar || 'statics/user.svg'" />

          <span v-show="!isShow">AL</span>
          <input type="file" ref="file" @change="fileChange" accept="image/*" hidden="hidden" />
        </div>
        <div class="personalTxt left">
          <div class="nameTxt" v-show="!bianji">
            {{ userinfo.name }}
            <i @click="bianji = !bianji"></i>
          </div>
          <div class="nameTxt" v-show="bianji">
            <input v-model="userinfo.name" type="text" />
            <button class="cancel" @click="bianji = !bianji">取消</button>
            <button @click="uploadUserinfo(userinfo.name)" class="sure">确认</button>
          </div>
          <div class="numberTxt">
            DAO ID {{ userinfo.id }}
            <span>{{ userinfo.mail_export }}</span>
          </div>
        </div>
      </div>
      <div class="personalEdit right" @click="bianji = !bianji">
        <i></i>
        编辑个人资料
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="personalDetail">
      <div class="detailLeft left">
        <div class="personalNavTab">
          <ul>
            <li :class="tab == 0 ? 'active' : ''" @click="(tab = 0), getmyabb(false)">我的帖子</li>
            <li :class="tab == 1 ? 'active' : ''" @click="(tab = 1), getmyabb(true)">回收站</li>
          </ul>
        </div>
        <div class="personalTabCard clearfix">
          <div class="personalTab dynamicList">
            <ArticleShow
              v-for="post in pullList"
              :post="post"
              :key="post.post.id"
              :personPage="true"
            />
          </div>
        </div>
      </div>

      <wallet :tokens="tokens" :log="log" />

      <div class="clearfix"></div>
    </div>
    <!-- <layer-box v-bind:layerInfo="layer" ref="showLayer"></layer-box> -->
    <!--   收款二维码-->
    <div class="popupBody" style="position: relative; width: 100%; height: 100%;" v-show="show">
      <div class="popupModal rollOutModal scanModal">
        <div class="popupMain">
          <div class="closeModal" @click="show = false"></div>
          <div class="scanTop">
            <div class="popupSureInfor">扫一扫，向我转账</div>
            <div class="scanImg" id="qrcode"></div>
            <div class="rollOutDes">此钱包仅限接受{{ text.name }}代币，转入其它代币会造成永久损失</div>
          </div>
          <div class="scanBottom">
            <p>钱包地址</p>
            <span>
              {{ text.contract }}
              <!-- <i
                v-clipboard:copy="text.contract"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                class="copy"
              >复制</i>-->
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticleShow from 'pages/article/ArticleShow';
import wallet from './wallet';
export default {
  components: { ArticleShow, wallet },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      userName: '',
      bianji: false,
      show: false,
      userinfo: {},
      mycode: [],
      tokens: [],
      istach: false,
      log: [],
      files: '',
      isShow: true,
      userid: '',
      tab: 0,
      text: {},
      layer: {
        type: '',
        show: false,
        post: '',
      },
      pullList: [],
    };
  },
  created() {
    let userid = this.$store.state.user.userid;
    if (userid) {
      //注释掉接口初始化
      this.getuserinfo();
      this.getmycode();
      this.tokenLog();
      this.getmyabb(false);
      //   this.$nextTick(function() {
      //     this.doImg();
      //     this.hideinfo();
      //   });
    } else {
      this.$router.push({ path: '/login', query: {} });
    }
  },
  methods: {
    childfn: function() {
      this.getmyabb(this.tab == 0 ? false : true);
    },
    hideinfo: function() {
      this.$refs.updinfo.hideMe();
    },
    repays: function(text) {
      this.layer = {
        type: 'repay',
        post: text,
      };
      this.$refs.showLayer.showModel();
    },

    // 个人信息
    getuserinfo: async function() {
      let url = '/protected/user/me';
      const resData = await this.$axios.get(url, {});
      if (resData.data.code == 0) {
        this.userinfo = resData.data.data.me;
        this.$emit('setUserinfo', this.userinfo);
      } else if (resData.code == 104) {
        this.$router.push({ path: '/login', query: {} });
      }
    },
    // 我的代币
    getmycode: async function() {
      let url = 'protected/user/tokens';
      const resCode = await this.$axios.get(url, {});
      if (resCode.data.code == 0) {
        this.tokens = resCode.data.data.tokens;
      } else if (resCode.data.code == 104) {
      }
    },
    // 我的帖子
    getmyabb: async function(del) {
      let url = 'protected/post/my/pull';
      const resCode = await this.$axios.post(url, {
        base_post: null,
        deleted: del,
      });
      if (resCode.data.code == 0) {
        this.pullList = [];
        this.pullList = resCode.data.data.posts;
        // if (!this.pullList.length) {
        // }
      }
    },
    // 转账日志
    tokenLog: async function() {
      let url = 'protected/user/token/logs';
      let dat = {
        contract: '',
        base_token_log: null,
      };
      const resLog = await this.$axios.post(url, dat);
      if (resLog.data.code == 0) {
        this.log = resLog.data.data.token_logs;
      } else {
        alert(resLog.data.message);
      }
    },
    tach: function() {
      this.istach = !this.istach;
    },
    // 转账
    payTo: async function() {
      let url = 'protected/user/token/transfer';
      let dat = {
        contract: '',
        to_user: 10000,
        value: '10.2',
      };
      const respay = await this.$axios.post(url, dat);
      if (respay.data.code == 0) {
        // this.log=resLog.data.token_logs;
      } else {
        alert(respay.data.message);
      }
    },
    // 监听图片加载
    doError: function() {
      console.log('fail');
      this.isShow = false;
    },

    //  生成二维码
    qrcode(text) {
      // let qrcode = new QRCode("qrcode", {
      //   width: 200,
      //   height: 200, // 高度
      //   text: text.contract // 二维码内容
      //   // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      //   // background: '#f0f'
      //   // foreground: '#ff0'
      // });
      this.show = true;
      this.text = text;
    },
    onCopy: function() {
      alert('复制成功！');
    },
    onError: function() {
      alert('复制失败！');
    },
    uploadUserinfo: async function(name) {
      let url = 'protected/user/modify';
      let postdata = {
        name: name,
      };
      const respons = await this.$axios.put(url, postdata);
      if (respons.data.code == 0) {
        this.$q.nofity({
          message: '更新成功！',
        });
        this.getuserinfo();
        this.bianji = false;
      } else {
        this.$q.nofity({
          message: respons.data.message,
        });
      }
    },
  },
};
</script>
