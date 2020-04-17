<template>
  <div class="q-mx-xl q-pt-xl">
    <q-dialog v-model="addArticleShow">
      <addArticle />
    </q-dialog>
    <q-btn class="top-login" color="primary" flat @click="$router.push('/login')" label="快速登录" />
    <q-avatar rounded size="20px">
      <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
    </q-avatar>
    <span class="text-weight-bold">DAOChat官方讨论组</span>
    <q-btn
      flat
      rounded
      align="around"
      class="btn-fixed-width"
      color="grey"
      label="分享"
      icon="share"
    />
    <q-btn unelevated color="primary" class="q-mx-md" label="加入小组" icon="add" />
    <q-btn outline color="primary" class="q-mx-md" label="发言" @click="addArtrcle" icon="create" />
    <div>
      <div class="row q-pa-md info q-my-md">
        <div class="col-10">
          <span class="text-weight-bold">创建于2019-02-22 组长：绿岛雨</span>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <member class="col" :members="9" />
      <span class="col-2">
        <q-btn flat color="primary" no-caps size="13px" @click="$router.push('/manage')">
          查看更多
          <br />(11)
        </q-btn>
      </span>
    </div>

    <div v-for="n in 6" :key="n">
      <div class="q-pt-lg">
        <q-avatar rounded size="20px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
        <span>菜多多</span>
        <span>2020-03-06 40分钟之前</span>
      </div>

      <div
        class="q-py-lg"
      >见证了日本首富、互联网大佬是如何被喷的决定放弃捐赠的。我想针对这个话题聊聊，从孙正义，到比尔盖茨，再到中国。喷的人都认为自己见证了日本首富、互联网大佬是如何被喷的决定放弃捐赠的。我想针对这个话题聊聊，从孙正义，到比尔盖茨，再到中国。</div>
      <div class="row" style=" max-width: 600px; ">
        <q-img
          v-for="n in 4"
          :key="n"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587055116202&di=335bb3c60fd6ea78f4723d4b48f03de4&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190903%2F20%2F1567514043-wFhstfQLcd.jpg"
          spinner-color="white"
          style="height: 240px; max-width: 240px; margin:9px;"
        />
      </div>
      <div>
        <q-btn flat rounded color="primary" label="300" icon="thumb_up" />
        <q-btn flat rounded label="200" icon="chat_bubble_outline" />
        <q-btn flat rounded label="100" icon="share" />
      </div>
      <q-separator />
    </div>
  </div>
</template>

<script>
import addArticle from "pages/article/add";
import member from "components/member";
export default {
  components: { addArticle, member },
  props: {},
  data() {
    return {
      addArticleShow: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    addArtrcle() {
      this.addArticleShow = true;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.info {
  background-color: #d4f6f3;
  color: #8c909d;
}
.top-login {
  position: absolute;
  top: 20px;
  right: 40px;
}
</style>