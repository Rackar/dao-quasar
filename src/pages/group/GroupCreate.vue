<template>
  <!--      创建群-->
  <div class="popupModal createGroupModal">
    <div></div>
    <div class="popupMain">
      <div class="popupTitle row items-center q-pb-none">
        <div class="text-h6 q-pl-lg q-pt-lg">创建一个群</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
      <div class="createGroupMain">
        <div class="createGroupLeft left">
          <div class="groupName">
            <label class="left">小组名称</label>
            <!-- <input class="left" v-model="title" type="text" placeholder="" /> -->
            <q-input square outlined v-model="title" label="必填" />
            <div class="clearfix"></div>
          </div>
          <div class="groupDescription">
            <label class="left">小组介绍</label>
            <textarea
              class="left"
              v-model="desc_text"
              maxlength="200"
              placeholder="描述下你的话题，引起大家的兴趣"
            ></textarea>
            <i>
              <span class="count-change">0</span>/200
            </i>
            <div class="clearfix"></div>
          </div>
          <div class="rewardTit postRead">
            帖子阅读
            <label class="radioLabel">
              <input
                class="postRadio allPerson"
                v-model="read_permission"
                type="radio"
                value="1"
                name="postRadio"
                checked
              />
              <span class="radioInput"></span>所有人
            </label>
            <label class="radioLabel onlyTeamlabel">
              <input
                class="postRadio onlyTeam"
                type="radio"
                v-model="read_permission"
                value="2"
                name="postRadio"
              />
              <span class="radioInput"></span>仅限组员&nbsp;&nbsp;
            </label>
          </div>
          <div class="settingContent" v-if="read_permission==2">
            <label class="setingLabel">设置密码</label>
            <input class="settingPws" v-model="password" type="password" placeholder="6位数字或字母" />
          </div>
          <div class="popupBtn" @click="createGroup">完成</div>
        </div>
        <div class="createGroupRight right">
          创建群之后你还可以设置以下参数：入群奖励、阅读奖励、回复奖励等。
          <br />
          <br />请注意，所有的这些奖励的代币将不经过你的确认直接从你的钱包扣掉。
          若你的钱包余额不够支付奖励，则该群的所有奖励设置将自动归零。
          <br />
          <br />创建群代表你为群内所有言论负责。你若退群，则系统将自动接替你做群主。
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      title: "",
      desc_text: "",
      read_permission: "",
      password: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    async createGroup() {
      let data = {
        name: this.title,
        desc_text: this.desc_text,
        read_permission: Number(this.read_permission),
        password: this.password,
        avatar: ""
      };
      if (
        data.name == "" ||
        data.desc_text == "" ||
        data.read_permission == ""
      ) {
        this.$q.notify("信息不完整，请完善信息");
      } else {
        let apiCode = "/protected/grp/create";
        const result = await this.$axios.post(apiCode, data);
        if (result.data.code == 0) {
          this.$q.notify("创建成功，需手动刷新页面");
        } else {
          this.$q.notify(result.massage);
        }
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
</style>