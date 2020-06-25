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
      <div class="groupinfo_row">
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
      </div>
      <div class="groupinfo_row">
        <JoinGroupBtn v-if="!groupJoined" :groupInfo="group" ref="join" />
        <AddArticleBtn
          :groupId="groupId"
          :onSave="onAddArticle"
          v-if="!blocked"
          @wantJoin="wantJoin"
        />
        <q-btn
          unelevated
          rounded
          dense
          text-color="red-7"
          color="red-1"
          label="已被禁言"
          v-else
          disable
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="info">
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
    <JoinGroup v-model="showJoinGroup" :groupId="groupId" @wantJoin="wantJoin" />
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
import headerBarRight from 'components/headerBarRight';
import AddArticleBtn from 'pages/article/AddArticleBtn';
import JoinGroupBtn from 'pages/article/JoinGroupBtn';
import JoinGroup from 'pages/toast/JoinGroup';
import AddComment from './AddComment';
import member from 'components/member';
import { copyToClipboard } from 'quasar';
import getPosts from '@/apis/getPosts';

export default {
  components: {
    AddComment,
    AddArticleBtn,
    JoinGroupBtn,
    JoinGroup,
    member,
    ArticleShow,
    headerBarRight,
  },
  props: {},
  data() {
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
      showJoinGroup: false,
    };
  },
  watch: {
    groupId: function() {
      this.fetchGroupData();
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
    groupJoined() {
      // return this.$store.state.group.currentGroup.joined;
      return this.$store.getters['group/ifCurrentGroupJoined'];
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
        showJoinGroup: false,
      };
    },
    resetData() {
      this.isReady = false;
      this.hasPermission = true;
      this.hasMore = true;
      this.posts = [];
      this.lastPostId = null;
      this.targetCommentPost = null;
      this.addCommentShow = false;
      this.grpMembers = [];
      this.password = '';
      this.blockedMembers = [];
      this.showJoinGroup = false;
    },
    async fetchGroupData() {
      // Object.assign(this, this.getInitData());
      this.resetData();
      // this.$q.loading.show();
      this.$q.loadingBar.start();
      await this.getPageData();
      this.$q.loadingBar.stop();
      // await this.$store.dispatch('group/jumpToGroup', { id: this.groupId });
      // this.$q.loading.hide();
    },
    loadMore(_, done) {
      if (!this.hasMore) return done();
      if (!this.isReady) return done();
      this.getPosts().then(done);
    },
    showAddComment(id) {
      if (this.groupJoined) {
        this.targetCommentPost = this.posts.find(i => i.post.id === id);
        this.addCommentShow = true;
      } else {
        this.showJoinGroup = true;
      }
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
      return Promise.all([
        this.getGroupMembers(),
        this.getPosts(),
        this.$store.dispatch('group/jumpToGroup', { id: this.groupId }),
      ])
        .then(() => {
          this.isReady = true;
        })
        .catch(err => {
          if (err && err.code === 100) {
            this.hasPermission = false;
          } else if (err) {
            this.$q.notify(err && err.message);
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
      if (!groupId) {
        return Promise.reject();
      }
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
      if (!this.groupId) {
        return Promise.reject();
      }
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
    wantJoin() {
      this.$refs.join.onClick();
    },
  },
  mounted() {
    this.fetchGroupData();
  },
  meta() {
    return {
      // sets document title
      title: this.group.name.substr(0, 20),
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: title => ` ${title} - Group in DAO (Decentralized Autonomous Organization)`,

      // meta tags
      meta: {
        description: { name: 'description', content: this.group.desc_text.substr(0, 60) },
        keywords: { name: 'keywords', content: 'DAO Decentralized Autonomous Organization' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      },

      noscript: {
        default: 'Please enable JS or change to other explorer.',
      },
    };
  },
};
</script>

<style src="./GroupMain.scss" lang="scss" scoped/>
