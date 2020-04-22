<template>
  <div>
    <div class="top-login">
      <headerBarRight />
    </div>
    <div class="q-ma-lg">
      <div class="group-name">
        <q-avatar size="30px">
          <img :src="owner.avatar || 'statics/user.svg'" />
        </q-avatar>
        <span class="text-weight-bold q-px-md">{{ group.name }}</span>
        <q-btn flat icon="edit" @click="edit" />
      </div>
      <div class="desc">{{ group.desc_text }}</div>
      <div class="title">帖子阅读</div>
      <div class="q-gutter-sm">
        <q-radio v-model="readPermition" val="public" label="任何人" />
        <q-radio v-model="readPermition" val="member" label="仅限组员" />
      </div>
      <div>
        <span class="title">奖励机制</span>
        <span class="subtitle">(单位：NES)</span>
      </div>
      <div class="comment">正数代表奖励，负数代表收费</div>

      <div class="row text-center q-ma-md">
        <div class="col">入群奖励</div>
        <div class="col">帖子被阅读奖励</div>
      </div>
      <div class="row text-center text-h6 q-ma-md">
        <div class="col">5</div>
        <q-separator vertical />
        <div class="col">12</div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBarRight from 'components/headerBarRight';
export default {
  components: { headerBarRight },
  props: {},

  watch: {},
  computed: {
    owner() {
      return this.$store.state.group.currentGroupOwner;
    },
    group() {
      return this.$store.state.group.currentGroup;
    },
  },

  mounted() {},
  data() {
    return {
      readPermition: 'public',
    };
  },
  created() {
    // let grpid = this.$route.query.id;
    // this.getgrpinfo(grpid);
  },
  methods: {
    edit() {},
  },
};
</script>
<style lang="scss" scoped>
.top-login {
  position: absolute;
  top: 20px;
  right: 40px;
}
.group-name {
  margin-top: 50px;
  padding: 30px;
}
.desc {
  height: 250px;
  background-color: rgb(221, 221, 221);
  border-radius: 10px;
  padding: 15px;
}
.comment {
  color: #8c909d;
  font-size: 14px;
}

.title {
  padding-top: 10px;
  color: #2a3542;
  font-size: 20px;
}
.subtitle {
  color: #2a3542;
  font-size: 14px;
}
</style>
