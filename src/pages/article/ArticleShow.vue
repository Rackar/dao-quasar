<template>
  <div>
    <div class="q-pt-lg" v-if="post.creator">
      <q-avatar rounded size="20px" v-show="!personPage">
        <img :src="post.creator.avatar || 'statics/user.svg'" />
      </q-avatar>
      <span
        class="q-px-md cursor-pointer"
        v-show="!personPage"
        @click="$router.push('/person/show/' + post.creator.id)"
      >{{ post.creator.name }}</span>
      <span>{{ $utils.timeStringToLocal(post.post.create_at) }}</span>
    </div>

    <div class="q-py-lg">{{ post.post.content }}</div>
    <div class="row" style=" max-width: 600px; ">
      <q-img
        v-for="(url, index) in post.post.images"
        :key="index"
        :src="url"
        spinner-color="white"
        style="height: 240px; max-width: 240px; margin:9px;"
      />
    </div>
    <div>
      <q-btn flat color="primary" :label="post.post.num_like" icon="thumb_up" @click="like" />
      <q-btn flat :label="post.post.num_comment" icon="chat_bubble_outline" @click="addComment" />
      <q-btn flat :label="post.post.num_share" icon="share" @click="share" />
      <!-- <q-btn flat rounded icon="settings" @click="showSetting" /> -->
      <q-btn flat icon="settings" v-show="modifyPermition">
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>编辑</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section @click="deletePost">删除</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <q-separator />
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
    userid() {
      return this.$store.state.user.userid;
    },
    owner() {
      return this.$store.state.group.currentGroupOwner;
    },
    modifyPermition() {
      return this.post.post.creator === this.userid || this.userid === this.owner.id;
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
        this.$q.notify('点赞成功');
      }
    },
    share() {},
    async deletePost(id) {
      let api = '/protected/post';
      let data = {
        post: id,
      };
      const result = await this.$axios.post(api, data);
      if (result.data.code == 0) {
        this.$q.notify('删除成功');
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
