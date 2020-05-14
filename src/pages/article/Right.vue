<template>
  <div class="container">
    <div class="info" v-if="isReady">
      <router-link class="link" :to="groupLink">
        <q-avatar class="avatar" rounded size="65px">
          <img :src="groupInfo.avatar || 'statics/group.svg'" />
        </q-avatar>
        <div class="name">{{ groupInfo.name }}</div>
      </router-link>

      <div class="popup">
        <div class="popup_body">
          <div class="popup_data">
            <div class="popup_data_label">小组成员</div>
            <div class="popup_data_value">{{ groupInfo.num_member }}</div>
          </div>
          <div class="popup_data">
            <div class="popup_data_label">小组文章</div>
            <div class="popup_data_value">{{ groupInfo.num_post }}</div>
          </div>
          <div class="popup_data">
            <div class="popup_data_label">发帖奖励(单位)</div>
            <div class="popup_data_value">1000</div>
          </div>
        </div>
        <div class="popup_actions">
          <JoinGroupBtn v-if="!isJoined" :groupInfo="groupInfo" />
          <AddArticleBtn :groupId="groupId" :onSave="onAddArticle" />
        </div>
      </div>
    </div>

    <div class="postList" v-if="isReady">
      <div class="postList_header">相关内容</div>
      <div class="postList_body">
        <router-link
          :to="`/articles/${item.post.id}`"
          class="post"
          v-for="item in topPosts"
          :key="item.post.id"
        >
          <q-avatar class="post_avatar" rounded size="50px">
            <img :src="item.creator.avatar || 'statics/user.svg'" />
          </q-avatar>
          <div class="post_title" :title="item.post.content">{{ item.post.content }}</div>
          <div class="post_num">{{ item.post.num_like }}赞</div>
          <div class="post_time">{{ formatDate(item.post.create_at) }}</div>
        </router-link>
      </div>
    </div>

    <div class="spinner" v-else>
      <q-spinner color="primary" size="3em" />
    </div>
  </div>
</template>
<script>
import { get, post } from '@/apis/request';
import AddArticleBtn from './AddArticleBtn';
import JoinGroupBtn from './JoinGroupBtn';

const getTopPosts = function(groupId, isLoggedIn) {
  if (!isLoggedIn) {
    return post('/post/top', { grp: groupId }).then(res => res.posts);
  }
  return post('/post/top', { grp: groupId }).then(res => res.posts);
};

const checkIsGroupJoined = function(groupId) {
  return get('/protected/grp/joined').then(function(res) {
    return res.grps_joined.some(i => i.grp.id === groupId);
  });
};

export default {
  components: { AddArticleBtn, JoinGroupBtn },
  props: {
    groupInfo: { type: Object, required: true },
  },
  data() {
    return {
      isReady: false,
      isJoined: false,
      topPosts: [],
    };
  },
  computed: {
    groupId() {
      return this.groupInfo.id;
    },
    groupLink() {
      return `/group/${this.groupId}`;
    },
    isLoggedIn() {
      return this.$store.state.user.userid !== '';
    },
  },
  methods: {
    formatDate(time) {
      return this.$utils.timeStringToLocal(time, 'RelativeDay');
    },
    onAddArticle() {
      this.$router.push(this.groupLink);
    },
  },
  mounted: async function() {
    try {
      this.topPosts = await getTopPosts(this.groupId, this.isLoggedIn);
      if (this.isLoggedIn) {
        this.isJoined = await checkIsGroupJoined(this.groupInfo.id);
      }
      this.isReady = true;
    } catch (err) {
      this.$q.notify(err.message);
    }
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: center;
}
.info {
  background-color: #fff;
  box-shadow: 0px 4px 15px 0px rgba(176, 176, 176, 0.09);
  padding: 36px 42px 44px 42px;
  margin-bottom: 14px;
  position: relative;
}
.link {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
}
.info:hover .popup {
  visibility: visible;
}
.popup {
  position: absolute;
  z-index: 1;
  visibility: hidden;
  top: 80%;
  background-color: #fff;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
  padding: 16px 22px;

  &_body {
    display: flex;
    margin-bottom: 14px;
  }
  &_data {
    margin-right: 30px;
    &_label {
      color: #8c909d;
      font-size: 14px;
      white-space: nowrap;
    }
    &_value {
      font-size: 16px;
      text-align: center;
    }
  }
  &_actions {
    display: flex;
    button {
      flex: 1;
      &:nth-child(2) {
        margin-left: 16px;
      }
    }
  }
}
.avatar {
  margin-right: 12px;
}
.name {
  font-size: 20px;
}
.postList {
  background-color: #fff;
  box-shadow: 0px 4px 15px 0px rgba(176, 176, 176, 0.09);
  padding: 37px 40px;
  &_header {
    font-size: 24px;
    margin-bottom: 37px;
  }
}
.post {
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'avatar title time'
    'avatar num time';
  grid-column-gap: 16px;
  align-items: center;
  margin-bottom: 39px;
  &_avatar {
    grid-area: avatar;
  }
  &_title {
    grid-area: title;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &_num {
    grid-area: num;
    font-size: 16px;
    color: #8c909d;
  }
  &_time {
    align-self: baseline;
    grid-area: time;
    font-size: 14px;
    color: #8c909d;
  }
}
</style>
