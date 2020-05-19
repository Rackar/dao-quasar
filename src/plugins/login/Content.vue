<template>
  <div class="login_box">
    <div class="log">
      <div class="em" v-if="type == 1">
        <div class="tit">欢迎来到DAO</div>
        <div class="email">
          <input type="text" class="val" v-model="email" name="email" placeholder="请输入您的邮箱" />
        </div>
        <div class="btn">
          <!-- <button :class="email!=''?'active':''" @click="sumitEmail">下一步</button> -->
          <q-btn color="primary" :disable="!email" @click="sumitEmail" label="下一步" />
        </div>
        <div class="bei">DAO是一个由用户自治的论坛，该论坛所有社区规则由用户集体投票制定，登录使用DAO代表您同意该论坛的所有社区规则。</div>
      </div>
      <div class="code" v-if="type == 2">
        <div class="back" @click="back()">
          <img class src="~assets/icon_down.png" />
        </div>
        <div class="tit">
          <div>请输入验证码</div>
          <div class="setcode">验证码已发送至 {{ email }}</div>
        </div>
        <div class="email">
          <input
            class="val"
            :rules="[val => !!val || '验证码不能为空']"
            v-model="code"
            name="code"
            placeholder="四位数验证码"
          />
        </div>
        <div class="btn">
          <!-- <button :class="code!=''?'active':''" @click="login()">登录</button> -->
          <q-btn color="primary" :disable="!code" @click="login" label="登录" />
        </div>
        <div class="beizhu">
          <span>未收到验证码？</span>
          <span class="resetcode" @click="sumitEmail">重新发送</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from 'src/store';
export default {
  name: 'Login',
  props: {
    onLoggedIn: { type: Function, required: true },
  },
  data() {
    return {
      type: 1,
      email: '',
      code: '',
      // auth_token: this.$route.query.auth_token
    };
  },
  created() {
    // let token = localStorage.getItem('token');
    // if (token) {
    //   this.$router.push({ path: '/', query: {} });
    // }
    // console.log(axios.commonApi);
  },
  methods: {
    async sumitEmail() {
      let re = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
      if (!re.test(this.email)) {
        this.$q.notify({ message: '邮箱格式不正确' });
      } else {
        //调试，注释掉注册接口
        let postapi = '/user/verify/' + this.email;
        this.$q.loading.show();
        const resDataPost = await this.$axios.get(postapi, {});
        this.$q.loading.hide();
        // let resDataPost = { code: 0 };
        let res = resDataPost.data;
        // debugger;
        if (res.code == 0) {
          this.type = 2;
          this.$q.notify({ message: '验证码发送成功' });
        } else {
          this.$q.notify({ message: res.message });
        }
      }
    },

    back: function() {
      this.type = 1;
    },
    login: async function() {
      localStorage.clear();
      let apiCode = '/user/login';
      let testData = {
        mail: this.email,
        code: this.code,
      };
      //调试，注释掉注册接口
      this.$q.loading.show();
      const resData = await this.$axios.post(apiCode, testData);
      this.$q.loading.hide();
      // const resData = { code: 0, token: "xx0p", data: { user: "test" } };
      let res = resData.data;
      if (res.code === 0) {
        let token = res.data.token;
        let userinfo = JSON.stringify(res.data.user);
        localStorage.setItem('token', token);
        localStorage.setItem('userinfo', userinfo);
        store.commit('user/login_saveToken', token);
        setTimeout(() => this.onLoggedIn(token), 100);
      } else {
        // this.$toast({
        //   text:
        // });
        this.$q.notify({ position: 'center', message: res.message });
      }
    },
  },
};
</script>

<style scoped>
.login_box {
  text-align: center;
  width: 395px;
  /* height: 447px; */
  background: rgba(255, 255, 255, 1);
  box-shadow: 10px 10px 16px 0px rgba(171, 204, 201, 1);
  border-radius: 10px;
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
  width: 100%;
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

.loginNow {
  margin-right: 25px;
  color: #00d6c2;
}
</style>
