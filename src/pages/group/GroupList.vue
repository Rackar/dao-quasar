<template>
  <div>
    <q-list class="rounded-borders" style="max-width: 550px">
      <div v-for="grp in myGroups" :key="grp.id">
        <q-item clickable v-ripple class="q-px-xl q-py-md">
          <q-item-section avatar>
            <q-avatar rounded size="40px">
              <img :src="grp.avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-bold">{{grp.name}}</span>
            </q-item-label>
            <q-item-label caption lines="2">{{grp.desc_text}}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-badge color="grey" :label="grp.num_post" />
            <q-item-label caption>{{grp.last_post_at}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="true" />
      </div>
      <q-item-label header class="q-px-xl">推荐</q-item-label>
      <div v-for="grp in recommendGroups" :key="grp.id">
        <q-item clickable v-ripple class="q-px-xl q-py-md">
          <q-item-section avatar>
            <q-avatar rounded size="40px">
              <img :src="grp.avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-bold">{{grp.name}}</span>
            </q-item-label>
            <q-item-label caption lines="2">{{grp.desc_text}}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-badge color="grey" :label="grp.num_post" />
            <q-item-label caption>{{grp.last_post_at}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="true" />
      </div>
    </q-list>
  </div>
</template>
<script>
let testList = [
  {
    avatar: "",
    create_at: "2020-03-29T13:00:47+00:00",
    creator: 10001,
    desc_text:
      "创建群之后你还可以设置以下参数：入群奖励、阅读奖励、回复奖励等。\n\n请注意，所有的这些奖励的代币将不经过你的确认直接从你的钱包扣掉。 若你的钱包余额不够支付奖励，则该群的所有奖励设置将自动归零。\n\n创建群代表你为群内所有言论负责。你若退群，则系统将自动接替你做群主。",
    id: 10009,
    last_post_at: "2020-03-29T13:00:47+00:00",
    name: "哗哗的最强战队",
    num_member: 1,
    num_post: 0,
    password: "",
    read_permission: 1
  }
];

import { get } from "src/apis/index.js";
export default {
  data() {
    return {
      myGroups: [],
      recommendGroups: []
    };
  },
  created() {
    this.mylist = testList;
    this.init();
  },
  props: {
    aid: {
      type: String,
      default: ""
    }
  },
  computed: {
    userid() {
      return this.$store.state.user.userid;
    }
  },
  methods: {
    async init() {
      //同步执行了，待优化
      await this.getReCommendGroups();
      await this.getMyGroups();

      debugger;
      let activeGroupId = 0;
      if (this.myGroups && this.myGroups.length) {
        activeGroupId = this.myGroups[0].id;
      } else if (this.recommendGroups && this.recommendGroups.length) {
        activeGroupId = this.recommendGroups[0].id;
      }
      this.$emit("getGroupInfo", { id: activeGroupId });
    },
    // 获取群信息
    getMyGroups: async function() {
      let datasss = {};
      let apiCode = "/protected/grp/joined";
      //注释掉接口
      const getjoined = await get(apiCode, datasss);
      // debugger;
      if (getjoined) {
        if (getjoined.code == 0) {
          this.myGroups = getjoined.data.grps;
        } else if (getjoined.code == 104) {
        }
      } else {
      }
    },
    // 获取推荐
    getReCommendGroups: async function() {
      let postUrl;
      if (this.userid) {
        postUrl = "/protected/grp/recommend";
      } else {
        postUrl = "/grp/recommend";
      }
      let datasss = {};
      const getgrps = await get(postUrl, datasss);
      // debugger;
      if (getgrps.code == 0) {
        console.log(getgrps.data);
        this.recommendGroups = getgrps.data.grps;
      } else {
      }
    }
  }
};
</script>