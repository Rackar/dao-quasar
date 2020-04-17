<template>
  <div class="body">
    <div class="title">
      <div>DAO论坛</div>
      <div class="slogn">一个由用户自治的论坛</div>
    </div>
    <div class="login_box">
      <div class="log">
        <div class="em" v-if="type==1">
          <div class="tit">欢迎来到DAO</div>
          <div class="email">
            <input type="text" class="val" v-model="email" name="email" placeholder="请输入您的邮箱" />
          </div>
          <div class="btn">
            <button :class="email!=''?'active':''" @click="next">下一步</button>
          </div>
          <div class="bei">DAO是一个由用户自治的论坛，该论坛所有社区规则由用户集体投票制定，登录使用DAO代表您同意该论坛的所有社区规则。</div>
        </div>
        <div class="code" v-if="type==2">
          <div class="back" @click="back()">
            <img class src="assets/icon_down.png" />
          </div>
          <div class="tit">
            <div>请输入验证码</div>
            <div class="setcode">验证码已发送至 {{email}}</div>
          </div>
          <div class="email">
            <input type="number" class="val" v-model="code" name="code" placeholder="四位数验证码" />
          </div>
          <div class="btn">
            <button :class="code!=''?'active':''" @click="login()">登录</button>
          </div>
          <div class="beizhu">
            <span>未收到验证码？</span>
            <span class="resetcode" @click="next()">重新发送</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      type: 1,
      email: "",
      code: ""
      // auth_token: this.$route.query.auth_token
    };
  },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ path: "/", query: {} });
    }
    // console.log(axios.commonApi);
  },
  methods: {
    next: async function() {
      let self = this;
      let email = self.email;
      let re = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
      if (!re.test(email)) {
        // self.$toast({
        //   text: "验证码格式不正确"
        // });
        this.$q.notify({ position: "center", message: "验证码格式不正确" });
      } else {
        let postapi = "/user/verify/" + self.email;
        const resDataPost = await this.$axios.get(postapi, {});
        if (resDataPost.code == 0) {
          self.type = 2;
          // self.$toast({
          //   text: "验证码发送成功"
          // });
          this.$q.notify({ position: "center", message: "验证码发送成功" });
        } else {
          // self.$toast({
          //   text: resDataPost.message
          // });
          this.$q.notify({ position: "center", message: resDataPost.message });
        }
      }
    },
    back: function() {
      this.type = 1;
    },
    login: async function() {
      localStorage.clear();
      let apiCode = "/user/login";
      // let token = md5(
      //   "apiKey=wft_web&" + apiCode + "&098f6bcd4621d373cade4e832627b4f6"
      // );
      let testData = {
        mail: this.email,
        code: this.code
      };
      const resData = await this.$axios.post("/" + apiCode + "/", testData);
      if (resData.code == 0) {
        let orignalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, newValue) {
          var setItemEvent = new Event("setItemEvent");
          setItemEvent.key = key;
          setItemEvent.newValue = newValue;
          window.dispatchEvent(setItemEvent);
          orignalSetItem.apply(this, arguments);
        };
        let token = resData.data.token;
        let userinfo = JSON.stringify(resData.data.user);
        localStorage.setItem("token", token);
        localStorage.setItem("userinfo", userinfo);
        setTimeout(() => {
          this.$router.push({ path: "/", query: { token: token } });
        }, 500);
      } else {
        // this.$toast({
        //   text:
        // });
        this.$q.notify({ position: "center", message: resData.message });
      }
    }
  }
};
</script>
<style scoped>
.body {
  /* min-width: 1440px; */
  /* min-height: 900px; */
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    rgba(0, 214, 194, 1) 0%,
    rgba(32, 180, 255, 1) 51%,
    rgba(62, 140, 246, 1) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.title {
  padding: 45px 0 0 53px;
  font-size: 24px;
  color: #fff;
}
.slogn {
  font-size: 18px;
}
.login_box {
  text-align: center;
  width: 395px;
  /* height: 447px; */
  background: rgba(255, 255, 255, 1);
  box-shadow: 10px 10px 16px 0px rgba(171, 204, 201, 1);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 50px;
}
.tit {
  color: #00d6c2;
  font-size: 30px;
  padding: 10px 0 40px;
  /* margin: 90px 0 55px 0; */
}
.email {
  width: 291px;
  height: 50px;
  background: rgba(241, 241, 241, 1);
  border-radius: 4px;
  margin-bottom: 20px;
}
.email input {
  height: 50px;
  line-height: 50px;
  padding: 0 13px;
  background: none;
  border: none;
  width: 265px;
}
input::-webkit-input-placeholder {
  color: #8c909d;
}
input::-moz-input-placeholder {
  color: #8c909d;
}
input::-ms-input-placeholder {
  color: #8c909d;
}
.btn {
  width: 291px;
  height: 50px;
  color: #ffffff;
  margin-bottom: 12px;
}
.btn button {
  width: 100%;
  height: 100%;
  background: rgba(199, 239, 236, 1);
  border-radius: 4px;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.btn button.active {
  background: #0fc179;
}
.bei {
  color: #8c909d;
  font-size: 12px;
  width: 100%;
  min-height: 40px;
  height: max-content;
}
.beizhu {
  color: #8c909d;
  font-size: 12px;
  width: 100%;
  min-height: 40px;
  height: max-content;
}
.bei text {
  display: inline-flex;
  justify-content: space-between;
}
.beizhu .resetcode {
  color: #00d6c2;
  cursor: pointer;
}
.setcode {
  font-size: 14px;
  color: #2a3542;
}
.back {
  position: absolute;
  left: -75px;
  margin-top: -60px;
  cursor: pointer;
}
.back img {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg);
}
.log {
  /* width: 100%; */
  /* height: 100%; */
  /* position: relative; */
}
.loginNow {
  margin-right: 25px;
  color: #00d6c2;
}
</style>