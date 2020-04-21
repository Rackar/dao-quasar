<style scoped>
.error {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.error imgWalp {
  display: flex;
}
.error p {
  display: flex;
  font: 14px/35px '宋体';
}
.error p a {
  color: #333;
  text-decoration: none;
}
</style>
<template>
  <div class="error">
    <div class="imgWalp">
      <!--      <img src="../assets/image/404.png" alt="未找到相关作品">-->
    </div>
    <p>用户非法操作</p>
    <p>
      <a href="javascript:;" class="sea-feedback-btn">请联系我们</a>
      告知错误内容吧
    </p>
  </div>
</template>

<script>
export default {
  name: 'AuthError',
  data() {
    return {
      msg: '',
    };
  },
};
</script>
