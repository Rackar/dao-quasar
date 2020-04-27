<template>
  <div class="container" :data-type="viewType">
    <deleteArticle
      v-model="showDeleteArticle"
      :postId="post.post.id"
      @deleteSuccess="$emit('del', post.post.id)"
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

    <div class="q-py-lg body" @click="onContentClick">
      {{ post.post.content }}
    </div>
    <div class="row images" style=" max-width: 600px; ">
      <q-img
        v-for="(url, index) in post.post.images"
        :key="index"
        :src="url"
        spinner-color="white"
        style="height: 240px; max-width: 240px; margin:9px;"
      />
    </div>
    <div class="actions" v-if="shouldShowActions">
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
import { post } from '@/apis/request';
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
    // 组件在不同的场景展示，行为有不同
    viewType: {
      type: String,
      default: 'group', // article | comment
    },
    post: Object,
    personPage: { type: Boolean, default: false },
    addComment: { type: Function },
  },
  data() {
    return {
      showDeleteArticle: false,
    };
  },
  watch: {},
  computed: {
    shouldShowActions() {
      return this.viewType !== 'comment';
    },
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
  },
  methods: {
    onContentClick() {
      if (this.viewType === 'group') {
        this.$router.push(`/articles/${this.id}`);
      }
    },
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
  .q-img {
    border-radius: 4px;
  }
}
.actions {
  margin-left: -16px;
  padding-top: 16px;
  .q-btn {
    i {
    }
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

[data-type="group"] {
  &:hover {
    background-color: #fafafa;
  }
  .body {
    cursor: pointer;
  }
}

[data-type="article"] {
}

[data-type="comment"] {
  // &:hover {
  //   background-color: #fafafa;
  // }
}
</style>
