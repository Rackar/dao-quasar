<template>
  <div class="fit row q-gutter-lg q-mt-xs">
    <div class="main" v-for="member in members" :key="member.id">
      <div>
        <q-avatar class="cursor-pointer avatar">
          <img :src="member.avatar || 'statics/user.svg'" @click="jumpToMember(member.id)" />
          <q-badge v-show="edit" color="red" floating style @click.stop="setMember(member.id)">x</q-badge>
        </q-avatar>
      </div>
      <div @click="jumpToMember(member.id)" class="cursor-pointer name">{{ member.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: Array,
    edit: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    mainpage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showBlock: false,
      clickedMemberId: 0,
    };
  },
  methods: {
    jumpToMember(id) {
      this.$router.push('/person/show/' + id);
    },
    setMember(id) {
      this.showBlock = true;
      this.blockMember(id);
    },
    async blockMember(userId) {
      let url = '/protected/grp/block';

      let data = {
        grp: this.$store.state.group.currentGroup.id,
        user: userId,
        block: this.blocked ? 1 : 2,
      };
      const res = await this.$axios.post(url, data);
      if (res.data.code === 0) {
        this.$q.notify({
          message: this.blocked ? '已解除拉黑' : '已拉黑该用户',
        });
        this.$emit('changeBlockStatus', {
          userId: userId,
          type: this.blocked ? 'unblock' : 'block',
        });
        // this.$router.go(0);
      } else if (res.data.code === 104) {
        this.$q.notify({
          message: '认证失效，请重新登录',
        });
        this.$showLogin();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.main {
  text-align: center;
  margin: 20px;
}

.avatar {
  height: 55px;
  width: 55px;
}

.name {
  margin-top: 10px;
  font-size: 14px;
  color: $dgrey;
}
</style>
