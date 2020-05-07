<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" />
    </p>
    <p class="text-faded">
      Sorry, nothing here...
      <strong>(404)</strong>
      <br />页面无法找到，请退回首页重试
    </p>
    <q-btn color="secondary" style="width:200px;" to="/" label="返回首页" />
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>
