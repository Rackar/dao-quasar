<template>
  <div class="body">
    <div class="title">
      <div>DAO论坛</div>
      <div class="content">
        <Content :onLoggedIn="redirect" />
      </div>
    </div>
  </div>
</template>

<script>
import Content from './Content';
export default {
  components: { Content },
  methods: {
    redirect(token) {
      this.$router.push({
        path: '/', query: { token: token }
      });
    }
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
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
</style>
