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
            <input class="left" v-model="crtgrp.tit" type="text" placeholder="必填" />
            <div class="clearfix"></div>
          </div>
          <div class="groupDescription">
            <label class="left">小组介绍</label>
            <textarea
              class="left"
              v-model="crtgrp.desc_text"
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
                v-model="crtgrp.read_permission"
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
                v-model="crtgrp.read_permission"
                value="2"
                name="postRadio"
              />
              <span class="radioInput"></span>仅限组员&nbsp;&nbsp;
            </label>
          </div>
          <div class="settingContent" v-if="crtgrp.read_permission==2">
            <label class="setingLabel">设置密码</label>
            <input
              class="settingPws"
              v-model="crtgrp.password"
              type="password"
              placeholder="6位数字或字母"
            />
          </div>
          <div class="popupBtn" @click="creategrp">完成</div>
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
      crtgrp: { tit: "", desc_text: "", read_permission: "", password: "" }
    };
  },
  watch: {},
  computed: {},
  methods: {
    async creategrp() {
      let apiCode = "/protected/grp/create";
      let val = this.crtgrp;
      val["name"] = val.tit;
      val.read_permission = Number(val.read_permission);
      if ((val.tit = "" || val.desc_text == "" || val.read_permission == "")) {
        this.$q.notify("信息不完整，请完善信息");
      } else {
        const putgrps = await this.$axios.post("/" + apiCode, val);
        if (putgrps.code == 0) {
          this.getgrp();
          this.iscrtgrp();
        } else {
          this.$q.notify(putgrps.massage);
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