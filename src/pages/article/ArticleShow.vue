<template>
  <div class="container">
    <div class="q-pt-lg header" v-if="post.creator">
      <q-avatar rounded size="35px" v-show="!personPage">
        <img :src="post.creator.avatar || 'statics/user.svg'" />
      </q-avatar>
      <span
        class="authorName q-px-md cursor-pointer"
        v-show="!personPage"
        @click="$router.push('/person/show/' + post.creator.id)"
      >{{ post.creator.name }}</span>
      <span>{{ $utils.timeStringToLocal(post.post.create_at) }}</span>
    </div>

    <div class="q-py-lg body">{{ post.post.content }}</div>
    <div class="row images" style=" max-width: 600px; ">
      <q-img
        v-for="(url, index) in post.post.images"
        :key="index"
        :src="url"
        spinner-color="white"
        style="height: 240px; max-width: 240px; margin:9px;"
      />
    </div>
    <div class="actions">
      <q-btn flat color="primary" :label="post.post.num_like" icon="thumb_up" @click="like" />
      <q-btn flat :label="post.post.num_comment" icon="chat_bubble_outline" @click="addComment" />
      <q-btn flat :label="post.post.num_share" icon="share" @click="share" />
      <!-- <q-btn flat rounded icon="settings" @click="showSetting" /> -->
      <q-btn flat icon="settings">
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>编辑</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>删除</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    post: Object,
    personPage: { type: Boolean, default: false },
    addComment: { type: Function, required: true },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    id() {
      return this.post.post.id;
    },
  },
  methods: {
    async like() {
      let api = '/protected/post/like';
      let data = {
        post: this.id,
        op: 1,
      };
      const result = await this.$axios.post(api, data);
      if (result.data.code == 0) {
        this.post.post.num_like = this.post.post.num_like + 1;
        this.$q.notify('点赞成功');
      }
    },
    share() {},
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
  .images {
    margin-bottom: 16px;
    .q-img {
      border-radius: 4px;
    }
  }
  .actions {
    .q-btn {
      i {

      }
      color: #8C909D;
    }
  }
  .header {
    display: flex;
    color: #8C909D;
    align-items: center;
    font-size: 16px;
  }
  .body {
    font-size: 16px;
  }
  .container {
    position: relative;
    margin-left: -48px;
    margin-right: -48px;
    padding-left: 48px;
    padding-right: 48px;
    &:hover {
      background-color: #FAFAFA;
    }
    &::after {
      content: '';
      display: block;
      margin-top: 24px;
      height: 1px;
      width: calc(100% + 96px);
      background-color: #E4E4E4;
      margin-left: -48px;
    }
  }
</style>
