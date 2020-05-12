<template>
  <div>
    <q-btn
      v-require-login-click
      unelevated
      :disabled="isJoined"
      color="primary"
      :label="label"
      @click="onClick"
      icon="add"
    />
    <JoinGroupNeedPay v-model="showJoinGroupNeedPay" @wantjoin="checkPass" />
  </div>
</template>

<script>
import { post } from '@/apis/request';
import JoinGroupNeedPay from 'pages/toast/JoinGroupNeedPay';
const joinGroup = function(groupId, password) {
  return post('/protected/grp/join', { grp: groupId, password });
};

export default {
  props: {
    groupInfo: { type: Object, required: true },
    onJoined: { type: Function },
  },
  components: {
    JoinGroupNeedPay,
  },
  computed: {
    label() {
      return this.isJoined ? '已加入' : '加入小组';
    },
  },
  data() {
    return {
      isJoined: false,
      showJoinGroupNeedPay: false,
    };
  },
  methods: {
    onClick() {
      if (Number(this.groupInfo.reward_join) < 0) {
        this.showJoinGroupNeedPay = true;
      } else {
        this.checkPass();
      }
    },
    checkPass() {
      const hasPassword = this.groupInfo.password !== '';
      if (hasPassword) {
        return this.requestPassword();
      } else {
        this.joinGroup();
      }
    },
    requestPassword() {
      this.$q
        .dialog({
          title: '加密群组',
          message: '请输入群组密码',
          prompt: {
            model: '',
            type: 'text', // optional
          },
          cancel: true,
        })
        .onOk(this.joinGroup);
    },
    joinGroup(password = '') {
      this.$q.loading.show();

      joinGroup(this.groupInfo.id, password)
        .then(() => {
          this.isJoined = true;
          this.$q.notify({ message: '加入成功！' });
          this.$router.go(0);
        })
        .catch(err => {
          const message = (() => {
            if (err.code === 100) return '加入群失败！密码错误';
            if (err.code === 104) return '加入群失败！请重新登录';
            return err.message;
          })();
          this.$q.notify({ message });
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    },
  },
};
</script>
