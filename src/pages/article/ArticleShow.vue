<template>
  <div class="container" :data-type="viewType">
    <deleteArticle
      v-model="showDeleteArticle"
      :postId="postId"
      @deleteSuccess="$emit('del', postId)"
    />
    <EditArticle
      v-if="canEdit"
      v-model="shouldShowEdit"
      :postId="postId"
      :initialData="post.post"
      :onSave="afterEdit"
    />
    <div class="q-pt-lg header" v-if="post.creator">
      <q-avatar rounded size="35px" v-show="!personPage">
        <img :src="post.creator.avatar || 'statics/user.svg'" />
      </q-avatar>
      <span
        class="authorName q-px-md cursor-pointer"
        v-show="!personPage"
        @click="$router.push('/person/show/' + post.creator.id)"
      >
        {{ post.creator.name }}
      </span>
      <span>{{ $utils.timeStringToLocal(post.post.create_at) }}</span>
    </div>

    <div class="q-py-lg body" @click="onContentClick">{{ post.post.content }}</div>
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
      <q-video :ratio="16 / 9" :src="post.post.images[0]" />
    </div>
    <div class="actions" v-if="shouldShowActions">
      <q-btn v-require-login-click flat :class="{ isLiked }" :label="post.post.num_like" icon="thumb_up" @click="like" />
      <q-btn v-require-login-click flat :label="post.post.num_comment" icon="chat_bubble_outline" @click="addComment" />
      <q-btn flat :label="post.post.num_share" icon="share" @click="share" />
      <!-- <q-btn flat rounded icon="settings" @click="showSetting" /> -->
      <q-btn flat icon="settings" v-if="shouldShowSetting">
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <q-item v-if="canEdit" clickable>
              <q-item-section @click="edit">编辑</q-item-section>
            </q-item>
            <q-separator />
            <q-item v-if="canDelete" clickable>
              <q-item-section @click="deletePost(postId)">删除</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { post } from '@/apis/request';
import deleteArticle from 'pages/toast/deleteArticle';
import EditArticle from './PublishArticle';

// like状态和code：
const dict = {
  cancel: 1,
  like: 2,
  dislike: 3,
};

export default {
  components: { deleteArticle, EditArticle },
  props: {
    // 组件在不同的场景展示，行为有不同
    viewType: {
      type: String,
      default: 'group', // article | comment
    },
    groupCreatorId: Number,
    post: Object,
    personPage: { type: Boolean, default: false },
    addComment: { type: Function },
  },
  data() {
    return {
      shouldShowEdit: false,
      showDeleteArticle: false,
    };
  },
  computed: {
    canEdit() {
      if (this.viewType === 'comment') return false;
      return this.userid === this.post.post.creator;
    },
    canDelete() {
      if (this.viewType === 'comment') return false;
      return this.userid === this.post.post.creator || this.userid === this.groupCreatorId;
    },
    shouldShowSetting() {
      return this.canEdit || this.canDelete;
    },
    shouldShowActions() {
      return this.viewType !== 'comment';
    },
    isLiked() {
      return this.post.likeStatus === dict['like'];
    },
    postId() {
      return this.post.post.id;
    },
    userid() {
      return this.$store.state.user.userid;
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
    edit() {
      this.shouldShowEdit = true;
    },
    afterEdit(_, newContent) {
      this.$emit('edit', newContent);
    },
    onContentClick() {
      if (this.viewType === 'group') {
        this.$router.push(`/articles/${this.postId}`);
      }
    },
    async like() {
      let api = '/protected/post/like';
      let data = {
        post: this.postId,
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
  .q-img {
    border-radius: 4px;
  }
}
.actions {
  margin-left: -16px;
  padding-top: 16px;
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
  display: block;
  font-size: 16px;
}
.container {
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  padding-left: 42px;
  padding-right: 42px;
  padding-bottom: 16px;
}

[data-type='group'] {
  &:hover {
    background-color: #fafafa;
  }
  .body {
    cursor: pointer;
  }
}

[data-type='article'] {
}

[data-type='comment'] {
  // &:hover {
  //   background-color: #fafafa;
  // }
}
</style>
