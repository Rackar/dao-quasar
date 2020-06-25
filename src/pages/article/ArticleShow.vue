<template>
  <div class="container" :data-type="viewType" ref="article">
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
    <div class="header" v-if="post.creator">
      <router-link :to="{ name: 'person', params: { id: post.creator.id + '' } }">
        <q-avatar size="35px" v-show="!personPage" class="hoverable-avatar">
          <img :src="post.creator.avatar || 'statics/user.svg'" />
        </q-avatar>
      </router-link>
      <router-link :to="{ name: 'person', params: { id: post.creator.id + '' } }">
        <span class="authorName" v-show="!personPage">{{ post.creator.name }}</span>
      </router-link>
      <span>{{ $utils.timeStringToLocal(post.post.create_at, 'RelativeTime') }}</span>
    </div>
    <div class="main-body">
      <router-link
        :to="{ name: 'articles', params: { id: postId + '' } }"
        v-if="viewType === 'group'"
      >
        <div class="body">
          <div v-for="line in content_breakLines" :key="line.id">{{ line || '&nbsp;' }}</div>
          <div v-show="content_showMore">(点击查看更多...)</div>
        </div>
      </router-link>
      <div class="body" v-else>
        <div v-for="line in content_breakLines" :key="line.id">{{ line || '&nbsp;' }}</div>
        <div v-show="content_showMore">(点击查看更多...)</div>
      </div>
      <ImageGrid :images="post.post.images" class="images" v-if="!hasVideo" />
      <div v-else class="video-wraper" :class=" {'video-wraper-squar':videoRadioNormal==false}">
        <!-- <q-video :ratio="16 / 9" :src="post.post.images[0]" /> -->
        <q-media-player
          :data-id="post.post.id"
          v-intersection="obOptions"
          ref="videoPlayer"
          :muted="true"
          type="video"
          background-color="white"
          radius="1rem"
          hide-volume-slider
          dense
          :show-big-play-button="true"
          :source="post.post.images[0]"
          @ready="readyToPlayVideo"
          preload="none"
          @loadeddata="testloaded"
        >
          <!-- <template v-slot:overlay>
          <div>
            <img
              src="statics/app-logo-128x128.png"
              style="width: 30vw; max-width: 50px; opacity: 0.25;"
            />
          </div>
          </template>-->
        </q-media-player>
      </div>
      <div class="actions">
        <q-btn
          v-require-login-click
          flat
          :class="{ isLiked }"
          @click="like"
          v-if="shouldShowActions"
        >
          <img
            svg-inline
            class="svg-icon svg-icon--light-grey svg-icon--hover-middle-grey mr10"
            src="@/statics/icons/icon_like_normal.svg"
          />
          <span>{{ post.post.num_like }}</span>
        </q-btn>

        <q-btn v-require-login-click flat @click="addComment" v-if="shouldShowActions">
          <img
            svg-inline
            class="svg-icon svg-icon--light-grey svg-icon--hover-middle-grey mr10"
            src="@/statics/icons/icon_comment_normal.svg"
          />
          <span>{{ post.post.num_comment }}</span>
        </q-btn>

        <q-btn v-require-login-click flat @click="share(post.post.id)" v-if="shouldShowActions">
          <img
            svg-inline
            class="svg-icon svg-icon--light-grey svg-icon--hover-middle-grey mr10"
            src="@/statics/icons/icon_share1_normal.svg"
          />
          <!-- <span>{{ post.post.num_share }}</span> -->
        </q-btn>

        <q-btn flat v-if="shouldShowSetting">
          <img
            svg-inline
            class="svg-icon svg-icon--light-grey svg-icon--hover-middle-grey mr10"
            src="@/statics/icons/icon_shezhi_normal.svg"
          />
          <!-- <span>设置</span> -->
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item v-if="canPinTop" clickable>
                <q-item-section @click="pinTopPost(postId)">置顶</q-item-section>
              </q-item>
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
  </div>
</template>

<script>
import { post } from '@/apis/request';
import { copyToClipboard } from 'quasar';
// import { scroll } from 'quasar';
// const { getScrollPosition, setScrollPosition, getScrollTarget } = scroll;
import deleteArticle from 'pages/toast/deleteArticle';
import EditArticle from './EditArticle';
import ImageGrid from './ImageGrid';

const thresholds = [];
for (let i = 0; i <= 1.0; i += 0.2) {
  thresholds.push(i);
}

// like状态和code：
const dict = {
  cancel: 1,
  like: 2,
  dislike: 3,
};

export default {
  components: { deleteArticle, EditArticle, ImageGrid },
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
      videoRadioNormal: true,
      obOptions: {
        handler: this.onIntersection,
        cfg: {
          threshold: thresholds,
        },
      },
      lastPercent: 0,
    };
  },
  computed: {
    content_sub() {
      return this.viewType === 'group'
        ? this.post.post.content.substr(0, 300)
        : this.post.post.content;
    },
    content_showMore() {
      return this.post.post.content.length > 300 && this.viewType === 'group';
    },
    content_breakLines() {
      return this.content_sub.split('\n');
    },
    canEdit() {
      // if (this.viewType === 'comment') return false;
      return this.userid === this.post.post.creator;
    },
    canDelete() {
      // if (this.viewType === 'comment') return false;
      return this.userid === this.post.post.creator || this.userid === this.groupCreatorId;
    },
    canPinTop() {
      if (this.viewType === 'comment') return false;
      return this.userid === this.groupCreatorId;
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
    autoPlayWhenDesktop() {
      return this.$q.platform.is.desktop;
      // return false;
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
        return videoExt.some(v => list[0].toLowerCase().indexOf(v) !== -1);
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
    afterEdit(newContent) {
      this.$emit('edit', newContent);
    },
    onContentClick() {
      if (this.viewType === 'group') {
        // let elScrollParent = getScrollTarget(this.$refs.article);
        // let scrollPosition = getScrollPosition(elScrollParent);
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
    share(id) {
      let t = this.$router.mode === 'hash' ? '/#/' : '/';
      let url = window.location.protocol + '//' + window.location.host + t + 'articles/' + id;
      // debugger;
      copyToClipboard(url)
        .then(() => {
          this.$q.notify('帖子地址已复制到剪切板');
          // 成功!
        })
        .catch(() => {
          this.$q.notify('浏览器不支持，请手动复制地址');
          // 失败
        });
    },
    async deletePost() {
      this.showDeleteArticle = true;
    },
    pinTopPost() {
      this.$q.notify('置顶功能尚在开发');
    },
    onIntersection(entry) {
      if (!this.autoPlayWhenDesktop) {
        return;
      }
      let ob = this.$store.state.group.previewVideoDom;
      // debugger;
      if (entry.isIntersecting === true) {
        if (entry.intersectionRatio > 0.7 && entry.intersectionRatio > this.lastPercent) {
          if (ob != this.$refs.videoPlayer.$media) {
            if (ob && !ob.paused && ob.pause) {
              ob.pause();
            }
            this.$store.commit('group/playVideoUnique', this.$refs.videoPlayer.$media);
            if (this.$refs.videoPlayer.$media.paused && this.$refs.videoPlayer.$media.play) {
              this.$refs.videoPlayer.$media.play();
            }
          }
          // this.$refs.videoPlayer.play();
        }
        this.lastPercent = entry.intersectionRatio;
      } else {
        this.$refs.videoPlayer.pause();
      }
    },
    readyToPlayVideo() {
      // console.log(this.$refs.videoPlayer.$media.videoHeight);
      // console.log(this.$refs.videoPlayer.$media.videoWidth);
      let height = this.$refs.videoPlayer.$media.videoHeight;
      let width = this.$refs.videoPlayer.$media.videoWidth;
      this.videoRadioNormal = width > height * 1.1;
    },
    testloaded() {
      // console.log('loaded');
    },
  },
  created() {},
  mounted() {},
  // meta() {
  //   return {
  //     // sets document title
  //     title: this.post.post.content.substr(0, 20),
  //     // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  //     titleTemplate: title => `Articles in DAO - ${title}`,

  //     // meta tags
  //     meta: {
  //       description: { name: 'description', content: this.post.post.content.substr(0, 60) },
  //       keywords: { name: 'keywords', content: 'DAO Decentralized Autonomous Organization' },
  //       equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  //     },

  //     noscript: {
  //       default: 'Please enable JS or change to other explorer.',
  //     },
  //   };
  // },
};
</script>
<style lang="scss" scoped>
.main-body {
  padding-left: 45px;
}
.isLiked {
  color: var(--q-color-primary) !important;
  .svg-icon {
    color: inherit;
  }
}
.images {
  max-width: 510px;
  max-height: 310px;
  &:empty {
    display: none;
  }
}
.actions {
  margin-left: -16px;
  // padding-top: 10px;
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
  }
  .q-btn {
    color: #8c909d;
    @media only screen and (min-width: 768px) {
      margin-right: 24px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.video-wraper {
  display: flex;
  max-width: 510px;
  max-height: 310px;
  /deep/ .q-media--big-button-icon {
    position: absolute;
    top: 8px;
    left: 8px;
    margin-left: 0;
    margin-bottom: 0;
  }
}
.video-wraper-squar {
  max-height: 510px;
}
.header {
  display: flex;
  padding-top: 15px;
  color: #8c909d;
  align-items: center;
  font-size: 16px;
}
.authorName {
  padding: 0 10px;
}
.body {
  padding-top: 5px;
  padding-bottom: 15px;
  display: block;
  font-size: 15px;
  word-break: break-word;
  overflow: overlay;
  line-height: 26px;
}
.container {
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;

  @media only screen and (min-width: 1024px) {
    padding-left: 25px;
    padding-right: 25px;
  }
}

[data-type='group'] {
  &:hover {
    background-color: #fafafa;
  }
  .body {
    cursor: pointer;
  }
}
</style>
