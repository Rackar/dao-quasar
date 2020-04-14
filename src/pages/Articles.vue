<template>
  <q-page padding>
    <h2>文章列表</h2>

    <q-card class="my-card q-mb-md" v-for="n in 3" :key="n">
      <q-card-section horizontal>
        <q-img class="col-5 img" src="https://cdn.quasar.dev/img/parallax1.jpg" />

        <q-card-section>{{ lorem }}</q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "ArticleLists",

  data() {
    return {
      cardHover: false,
      time: "10:56",
      timeWithSeconds: "09:24:10",
      lorem:
        "Lorem ipsum dolor sit am enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  transition: all 0.5s;

  & :hover {
    .img {
      transform: scale(1.1) translateX(-10px);
    }
  }
}

.img {
  transition: all 0.5s;
}
</style>