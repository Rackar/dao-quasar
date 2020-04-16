<template>
  <div>
    <a-row type="flex" justify="center">
      <h3>登录</h3>
    </a-row>
    <a-row>
      <a-col :span="1" :offset="10">用户名：</a-col>
      <a-col :span="3">
        <a-input type="text" v-model="username" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="1" :offset="10">密码：</a-col>
      <a-col :span="3">
        <a-input type="password" v-model="password" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button @click="sumitLogin">提交</a-button>
    </a-row>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="age"
          label="Your age *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
      name: null,
      age: null,

      accept: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },

    sumitLogin() {
      if (this.username && this.password) {
        let obj = {
          username: this.username,
          password: this.password
        };
        this.$axiosezw
          .post("/api/users/login", obj)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
              let token = res.data.token;
              this.$store.commit("login_saveToken", token);
              this.$store.dispatch("getAvatar");
            }
          })
          .catch(err => {
            this.$message.error("登录失败");
          });
      } else {
        this.$message.error("输入项未填写完整");
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
</style>
