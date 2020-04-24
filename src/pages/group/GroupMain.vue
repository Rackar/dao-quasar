<template>
  <div class="q-mx-xl main">
    <addArticle v-model="addArticleShow" />
    <q-btn
      v-if="!userid"
      class="top-login"
      color="primary"
      flat
      @click="$router.push('/login')"
      label="快速登录"
    />
    <div class="top-login" v-else>
      <headerBarRight />
    </div>

    <div class="groupinfo">
      <q-avatar rounded size="40px">
        <img :src="group.avatar || 'statics/group.svg'" />
      </q-avatar>
      <span class="groupname" @click="$router.push('/manage/' + group.id)">{{ group.name }}</span>
      <q-btn flat align="around" class="btn-fixed-width" label="分享" icon="share" @click="shareUrl" />
      <q-btn
        v-if="!group.joined"
        unelevated
        color="primary"
        class="q-mx-md"
        label="加入小组"
        @click="joinGrp(group.id)"
        icon="add"
      />
      <q-btn outline color="primary" class="q-mx-md" label="发言" @click="addArtrcle" icon="create" />
    </div>

    <div>
      <div class="q-pa-md info q-my-md">
        <!-- <div class="col-10"> -->
        <span class="infotitle">创建于{{ $utils.timeStringToLocal(group.create_at) }}</span>
        <span class="infotitle">组长：{{ owner.name }}</span>
        <div>{{ group.desc_text }}</div>
      </div>
      <!-- </div> -->
    </div>

    <div class="row">
      <member class="col" :members="grpMembers" />
      <span class="col-2">
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

    <div v-for="post in posts" :key="post.post.id">
      <ArticleShow :post="post" />
    </div>
  </div>
</template>

<script>
import ArticleShow from 'pages/article/ArticleShow';
import headerBarRight from 'components/headerBarRight';

import addArticle from 'pages/article/add';
import member from 'components/member';

import { copyToClipboard } from 'quasar';
export default {
  components: { addArticle, member, ArticleShow, headerBarRight },
  props: {},
  data() {
    return {
      addArticleShow: false,
      // groupID: 0,
      posts: [],
      grpMembers: [],
    };
  },
  watch: {
    groupId: function(newVal) {
      this.getGroupUserAndList(newVal);
    },
  },
  computed: {
    userid() {
      return this.$store.state.user.userid;
    },
    groupId() {
      return this.group.id;
    },
    group() {
      return this.$store.state.group.currentGroup;
    },
    owner() {
      return this.$store.state.group.currentGroupOwner;
    },
  },
  methods: {
    addArtrcle() {
      this.addArticleShow = true;
    },
    // 加入组
    joinGrp: async function(id) {
      let data = {
        grp: id,
        password: '',
      };
      let postapi = '/protected/grp/join';
      this.$q.loading.show();
      const postjoin = await this.$axios.post(postapi, data);
      this.$q.loading.hide();
      if (postjoin.data.code == 0) {
        this.$q.notify({
          message: '加入成功！',
        });
      } else if (postjoin.data.code == 104) {
        this.$router.push({ path: '/login' });
      }
    },
    // 跳转时某群组
    async getGroupUserAndList(id) {
      // debugger;
      this.getGroupMembers(id);
      this.getPosts(id);
    },
    // 获取群组员
    getGroupMembers: async function(id) {
      let postapi = '/user/members/' + id;
      const members = await this.$axios.get(postapi);
      if (members.data.code == 0) {
        this.grpMembers = members.data.data.alive;
      }
    },
    // 获取帖子
    getPosts: async function(id, pageNumber = null) {
      let data = {
        grp: id,
        base_post: pageNumber,
      };
      let url;
      if (this.userid) {
        url = '/protected/post/pull';
      } else {
        url = '/post/pull';
      }
      const result = await this.$axios.post(url, data);
      if (result.data.code == 0) {
        this.posts = result.data.data.posts;
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
  },
  created() {},
  mounted() {},
};
</script>
<style lang="stylus" scoped>
.info {
  background-color: #d4f6f346;
  color: $dgrey;

  .infotitle {
    font-weight: bold;
    padding-right: 30px;
    line-height: 20px;
  }
}

.top-login {
  position: absolute;
  top: 20px;
  right: 40px;
}

.main {
  padding-top: 80px;

  .groupinfo {
    vertical-align: top;

    .groupname {
      // line-height: 30px;
      font-size: 20px;
      cursor: pointer;
      // margin-top: 5px;
      padding: 0 12px 0;
      font-weight: bold;
    }
  }
}
</style>
