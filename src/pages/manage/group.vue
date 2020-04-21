<template>
  <div>
    <div>
      <div class="msgTop">
        <span class="bell"></span>
        <span class="user">
          <!-- <img src="../assets/image/avatar.jpeg" /> -->
        </span>
      </div>
      <div class="taskMain">
        <div class="chatInfor">
          <!-- <img src="../assets/image/avatar.jpeg" /> -->
          <span class="chatName">
            <input type="text" value="group" :readonly="!bj ? 'readonly' : false" />
            <!-- <i @click="bj=!bj" class="editMemberIcon"></i> -->
            <q-icon color="primary" @click="bj = !bj" name="edit" />
          </span>
        </div>
        <textarea
          class="editTextarea"
          :value="'描述'"
          :readonly="!bj ? 'readonly' : false"
        ></textarea>
        <div class="btnSet setChartContent" v-show="bj">
          <span class="btnCancel" @click="bj = !bj">取消</span>
          <span class="btnOk" @click="uploadGrp(grpinfo)">保存</span>
        </div>
        <div class="rewardMain">
          <div class="rewardTit postRead">
            帖子阅读
            <br />
            <label class="radioLabel">
              <input class="postRadio allPerson" type="radio" name="postRadio" checked />
              <span class="radioInput"></span>
              所有人
            </label>
            <label class="radioLabel onlyTeamlabel">
              <input class="postRadio onlyTeam" type="radio" name="postRadio" />
              <span class="radioInput"></span>
              仅限组员&nbsp;&nbsp;
              <input class="settingPws hide" type="password" placeholder="设置密码" />
            </label>
            <div class="btnSet hide">
              <span class="btnCancel">取消</span>
              <span class="btnOk">保存</span>
            </div>
          </div>
        </div>
        <div class="rewardMain">
          <div class="rewardTit">
            奖励机制
            <span>
              (单位：NES)
              <!-- <i class="editMemberIcon"></i> -->
              <q-icon color="primary" name="edit" />
            </span>
            <br />
            正数代表奖励，负数代表收费
          </div>
        </div>
        <div class="numberMain">
          <div class="left postReward">
            入群奖励
            <p>
              <span>56</span>
              <input class="hide" type="text" placeholder="56" />
            </p>
          </div>
          <div class="right respondReward">
            帖子被阅读奖励
            <p>
              <span>56</span>
              <input class="hide" type="text" placeholder="56" />
            </p>
          </div>
          <div class="left postReward">
            发帖奖励
            <p>
              <span>56</span>
              <input class="hide" type="text" placeholder="56" />
            </p>
          </div>
          <div class="right respondReward">
            帖子被回复奖励
            <p>
              <span>3444</span>
              <input class="hide" type="text" placeholder="3444" />
            </p>
          </div>
          <div class="left joinReward">
            邀请新成员奖励
            <p>
              <span>156</span>
              <input class="hide" type="text" placeholder="156" />
            </p>
          </div>
          <div class="clearfix"></div>
          <div class="btnSet hide">
            <span class="btnCancel">取消</span>
            <span class="btnOk">保存</span>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},

  watch: {},
  computed: {},

  mounted() {},
  data() {
    return {
      grpinfo: {},
      grpuser: [],
      bj: false,
    };
  },
  created() {
    // let grpid = this.$route.query.id;
    // this.getgrpinfo(grpid);
  },
  methods: {
    getgrpinfo: async function() {},
    getgrpuser: async function() {
      // let self = this;
      // let postapi = "user/members/" + id;
      // //注释掉接口
      // //   const getuser = await axios.get("/" + postapi, {});
      // const getuser = { code: 0, data: {} };
      // if (getuser.code == 0) {
      //   self.grpuser = getuser.data;
      // }
    },
    deleteGrp: async function() {},
    uploadGrp: async function() {},
  },
};
</script>
<style lang="scss">
input,
textarea {
  border: 1px solid #999;
}
input {
  padding: 10px;
}
textarea {
  padding: 20px;
}
input:read-only,
textarea:read-only {
  border: none;
}
.memberAvatar {
  position: relative;
}
.memberAvatar .delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 15px;
  height: 15px;
  color: #fff;
  background: #ee000c;
  border-radius: 50%;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
}
</style>
