<template>
  <div class="main">
    <AddComment
      v-if="targetCommentPost !== null"
      :targetPost="targetCommentPost"
      v-model="addCommentShow"
      :onSave="onAddComment"
    />
    <q-btn
      v-if="!userid"
      class="top-login"
      color="primary"
      flat
      v-require-login-click
      label="快速登录"
    />
    <div class="top-login" v-else>
      <headerBarRight />
    </div>
    <div class="groupinfo">
      <q-avatar rounded size="50px">
        <img :src="group.avatar || 'statics/group.svg'" />
      </q-avatar>
      <span class="groupname" @click="$router.push('/manage/' + group.id)">{{ group.name }}</span>
      <q-btn flat align="around" class="btn-fixed-width shareBtn" @click="shareUrl">
        <img
          svg-inline
          src="@/statics/icons/icon_share_hover.svg"
          class="svg-icon svg-icon--light-grey svg-icon--hover-middle-grey mr5"
        />
        <span>分享</span>
      </q-btn>
      <JoinGroupBtn v-if="!group.joined" :groupInfo="group" />
      <AddArticleBtn :groupId="groupId" :onSave="onAddArticle" v-if="!blocked" />
      <q-btn unelevated rounded dense text-color="red-7" color="red-1" label="已被禁言" v-else disable />
    </div>
    <div class="warper">
      <div class="q-pa-md info q-my-md">
        <span class="infotitle">创建于{{ $utils.timeStringToLocal(group.create_at,'Accurate') }}</span>
        <span class="infotitle">组长：{{ owner.name }}</span>
        <span class="reward">入群奖励{{ group.reward_join }} {{ reward_type }}</span>
        <span class="reward">发帖奖励{{ group.reward_post }} {{ reward_type }}</span>
        <!-- <div v-html="group.desc_text.replace(/\n/g, '<br/>')" class="desc"></div> -->
        <div class="desc">
          <div v-for="line in desc_breakLines" :key="line.id">{{line || '&nbsp;'}}</div>
        </div>
      </div>

      <div class="members">
        <member class="members_content" :members="grpMembers" size="35px" />
        <span class="members_action">
          <q-btn
            flat
            color="primary"
            no-caps
            size="13px"
            @click="$router.push('/manage/' + group.id)"
          >
            查看更多
            <br />
            ({{ grpMembers.length }})
          </q-btn>
        </span>
      </div>

      <q-infinite-scroll class="listContainer" v-if="hasPermission" @load="loadMore" :offset="250">
        <div v-for="post in posts" :key="post.post.id">
          <ArticleShow
            :post="post"
            :addComment="() => showAddComment(post.post.id)"
            :groupCreatorId="owner.id"
            @del="postDeleted"
            @edit="postEdited"
          />
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
      <div v-else class="noPermission">
        <img class="noPermission_icon" src="~assets/icon_suo_1@2x.png" />
        <div class="noPermission_tip">加入小组才能查看</div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
import headerBarRight from 'components/headerBarRight';
import AddArticleBtn from 'pages/article/AddArticleBtn';
import JoinGroupBtn from 'pages/article/JoinGroupBtn';
import AddComment from './AddComment';
import member from 'components/member';
import { copyToClipboard } from 'quasar';
import getPosts from '@/apis/getPosts';

export default {
  components: { AddComment, AddArticleBtn, JoinGroupBtn, member, ArticleShow, headerBarRight },
  props: {},
  data() {
    return this.getInitData();
  },
  watch: {
    groupId: function() {
      Object.assign(this, this.getInitData());
      this.$nextTick(this.getPageData);
    },
  },
  computed: {
    userid() {
      return this.$store.state.user.userid;
    },
    groupId() {
      return +this.$route.params.id;
    },
    group() {
      return this.$store.state.group.currentGroup;
    },
    owner() {
      return this.$store.state.group.currentGroupOwner;
    },
    reward_type() {
      return this.$store.state.group.currentGroup.contractSymbol;
    },
    blocked() {
      return this.blockedMembers.some(member => member.id === this.userid);
    },
    desc_breakLines() {
      return this.group.desc_text.split('\n');
    },
  },
  methods: {
    getInitData() {
      return {
        isReady: false,
        hasPermission: true,
        hasMore: true,
        posts: [],
        lastPostId: null,
        targetCommentPost: null,
        addCommentShow: false,
        grpMembers: [],
        password: '',
        blockedMembers: [],
      };
    },
    loadMore(_, done) {
      if (!this.hasMore) return done();
      if (!this.isReady) return done();
      this.getPosts().then(done);
    },
    showAddComment(id) {
      this.targetCommentPost = this.posts.find(i => i.post.id === id);
      this.addCommentShow = true;
    },
    onAddArticle() {
      this.reloadList();
    },
    onAddComment() {
      this.targetCommentPost.post.num_comment += 1;
    },
    reloadList() {
      Object.assign(this, {
        isReady: false,
        hasMore: true,
        posts: [],
        lastPostId: null,
      });
      this.$nextTick(this.getPosts);
    },
    getPageData() {
      return Promise.all([this.getGroupMembers(), this.getPosts()])
        .then(() => {
          this.isReady = true;
        })
        .catch(err => {
          if (err.code === 100) {
            this.hasPermission = false;
          } else {
            this.$q.notify(err.message);
          }
        });
    },
    // async getContracts() {
    //   let url = '/contracts';
    //   const resCode = await this.$axios.get(url);
    //   if (resCode.data.code == 0) {
    //     let tokens = resCode.data.data.contracts;
    //     console.log(tokens, this.group);
    //     for (let index = 0; index < tokens.length; index++) {
    //       const element = tokens[index];
    //       if (element.contract === this.group.reward_contract) {
    //         this.reward_type = element.symbol;
    //       }
    //     }
    //   } else if (resCode.data.code == 104) {
    //   }
    // },
    getPosts() {
      const { groupId, userid, lastPostId } = this;
      return getPosts({ userid, groupId, lastPostId }).then(res => {
        const newPosts = res.posts;
        this.posts = this.posts.concat(newPosts);
        if (newPosts.length > 0) {
          this.lastPostId = newPosts[newPosts.length - 1].post.id;
        } else {
          this.hasMore = false;
        }
      });
    },
    // 获取群组员
    getGroupMembers: async function() {
      let postapi = '/user/members/' + this.groupId;
      const members = await this.$axios.get(postapi);
      if (members.data.code == 0) {
        this.grpMembers = members.data.data.alive.reverse();
        this.blockedMembers = members.data.data.blocked;
      }
    },
    async shareUrl() {
      let url = window.location.href;
      copyToClipboard(url)
        .then(() => {
          this.$q.notify('地址已复制到剪切板');
          // 成功!
        })
        .catch(() => {
          this.$q.notify('浏览器不支持，请手动复制地址');
          // 失败
        });
      // navigator.clipboard.writeText(url).then(
      //   () => {
      //     /* success */ this.$q.notify('地址已复制到剪切板');
      //   },
      //   err => {
      //     /* failure */ this.$q.notify('浏览器不支持，请手动复制地址');
      //     console.log(err);
      //   }
      // );
    },
    postDeleted(id) {
      // 删除帖子回调后，直接清除本地数据数组中的值
      let index = this.posts.findIndex(post => post.post.id === id);
      this.posts.splice(index, 1);
    },
    postEdited(newContent) {
      const targetPost = this.posts.find(i => i.post.id === newContent.id);
      Object.assign(targetPost.post, newContent);
    },
  },
  mounted() {
    this.getPageData();
  },
};
</script>
<style lang="stylus" scoped>
.listContainer {
  margin-left: -42px;
  margin-right: -42px;
}

.members {
  display: flex;
  align-items: center;

  // margin-left: -16px;
  // margin-right: -16px;
  // &_content {
  // flex-wrap: nowrap;
  // overflow: hidden;

  // /deep/ .col-1 {
  // width: unset;
  // }
  // }
  &_action {
    white-space: nowrap;
  }
}

.noPermission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;

  &_tip {
    font-size: 18px;
  }

  &_icon {
    width: 26px;
    height: 34px;
    margin-bottom: 10px;
  }
}

.info {
  background-color: #d4f6f346;
  color: $dgrey;
  font-size: 14px;

  .infotitle {
    font-weight: bold;
    padding-right: 15px;
    line-height: 20px;
  }

  .reward {
    font-size: 12px;
    margin-left: 8px;
    padding: 3px 11px;
    border-radius: 6px;
    color: #FF6262;
    background-color: #FFEAE4;
  }

  .desc {
    margin-top: 10px;
  }
}

.top-login {
  position: absolute;
  top: 20px;
  right: 40px;
}

.main {
  padding-top: 80px;

  .warper {
    padding: 0 42px;
  }

  .groupinfo {
    position: sticky;
    padding: 8px 42px;
    top: 0;
    z-index: 2500;
    background-color: white;
    display: flex;
    align-items: center;

    /deep/ .q-btn {
      margin-right: 24px;
    }

    /deep/ .q-btn__wrapper {
      padding-left: 8px;
      padding-right: 12px;

      .q-icon {
        margin-right: 4px;
        font-size: 22px;
      }
    }

    .groupname {
      // line-height: 30px;
      font-size: 18px;
      cursor: pointer;
      color: #2A3542;
      // margin-top: 5px;
      padding: 0 12px 0;
      font-weight: bold;
    }
  }

  @media only screen and (max-width: 600px) {
    .groupinfo {
      padding: 8px 12px 4px 100px;
    }
  }
}
</style>
