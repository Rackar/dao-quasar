<template>
  <div class="container">
    <deleteArticle
      v-model="showDeleteArticle"
      :postId="post.post.id"
      @deleteSuccess="$emit('del',post.post.id)"
    />
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
    <div class="row images" style=" max-width: 600px; " v-if="!hasVideo">
      <q-img
        v-for="(url, index) in post.post.images"
        :key="index"
        :src="url"
        spinner-color="white"
        style="height: 240px; max-width: 240px; margin:9px;"
      />
    </div>
    <div v-else style=" max-width: 500px; max-height: 400px; margin-bottom:20px;">
      <q-video :ratio="16/9" :src="post.post.images[0]" />
    </div>
    <div class="actions">
      <q-btn flat :class="{ isLiked }" :label="post.post.num_like" icon="thumb_up" @click="like" />
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
              <q-item-section @click="deletePost(post.post.id)">删除</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { post } from '../../apis/request';
import deleteArticle from 'pages/toast/deleteArticle';

// like状态和code：
const dict = {
  cancel: 1,
  like: 2,
  dislike: 3,
};

export default {
  components: { deleteArticle },
  props: {
    post: Object,
    personPage: { type: Boolean, default: false },
    addComment: { type: Function, required: true },
  },
  data() {
    return {
      showDeleteArticle: false,
    };
  },
  watch: {},
  computed: {
    isLiked() {
      return this.post.likeStatus === dict['like'];
    },
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
    hasVideo() {
      let list = this.post.post.images;
      //可能的视频格式，没有一一测试验证
      let videoExt = [
        '.mp4',
        '.avi',
        '.flv',
        '.mpeg',
        '.wmv',
        '.dat',
        '.asf',
        '.mov',
        '.3gp',
        '.rm',
        '.rmvb',
        '.divx',
        '.dv',
        '.mkv',
        '.qt',
        '.cpk',
        '.fli',
        '.f4v',
        '.m4v',
        '.mod',
        '.swf',
        '.webm',
      ];
      if (list.length) {
        return videoExt.some(v => list[0].indexOf(v) !== -1);
      } else {
        return false;
      }
      // return list.length && list[0].indexOf('mp4')!==-1
    },
  },
  methods: {
    async like() {
      let api = '/protected/post/like';
      let data = {
        post: this.id,
        op: this.isLiked ? dict['cancel'] : dict['like'],
      };
      post(api, data)
        .then(() => {
          this.post.likeStatus = data.op;
          if (data.op === dict['like']) {
            this.post.post.num_like = this.post.post.num_like + 1;
          } else {
            this.post.post.num_like = this.post.post.num_like - 1;
          }
        })
        .catch(err => {
          this.$q.notify(err.message);
        });
    },
    share() {},
    async deletePost() {
      this.showDeleteArticle = true;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.isLiked {
  color: var(--q-color-primary) !important;
}
.images {
  margin-bottom: 16px;
  .q-img {
    border-radius: 4px;
  }
}
.actions {
  .q-btn {
    color: #8c909d;
  }
}
.header {
  display: flex;
  color: #8c909d;
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
    background-color: #fafafa;
  }
  &::after {
    content: '';
    display: block;
    margin-top: 24px;
    height: 1px;
    width: calc(100% + 96px);
    background-color: #e4e4e4;
    margin-left: -48px;
  }
}
</style>
