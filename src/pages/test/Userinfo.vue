<template>
  <q-page padding>
    <h2>用户信息</h2>
    <div>
      <h2>修改个人信息</h2>

      <!-- <a-row v-if="avatar" type="flex" justify="center">
        <a-tooltip>
          <template slot="title">清除头像</template>
          <img :src="avatar" alt="avatar" class="info-avatar" @click="avatar=''" />
        </a-tooltip>
      </a-row>
      <a-row v-else type="flex" justify="center">
        <upload @uploadedPic="finishUpload" />
      </a-row>
      <a-row>
        <a-col :span="2" :offset="10">修改密码：</a-col>
        <a-col :span="3">
          <a-input type="password" v-model="password1" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2" :offset="10">重复密码：</a-col>
        <a-col :span="3">
          <a-input type="password" v-model="password2" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2" :offset="10">修改昵称：</a-col>
        <a-col :span="3">
          <a-input type="text" v-model="nickname" />
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-button @click="sumitChange">确定提交</a-button>
      </a-row>-->
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Userinfo",

  data() {
    return {
      editor: "What you see is <b>what</b> you get."
    };
  }
};
</script>

<style lang="stylus" scoped></style>