<template>
  <!--      创建群-->
  <q-dialog v-model="shouldShow">
    <q-card full-width style="width: 700px; max-width: 80vw;" class="q-pa-lg">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">创建一个群</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row  items-top">
        <div class="col  q-pa-md">
          <q-form class="q-gutter-xs">
            <q-input
              v-model="title"
              label="群名称"
              lazy-rules
              :rules="[val => (val && val.length > 0) || '群名不能为空']"
            />

            <q-input
              maxlength="200"
              placeholder="描述下你的话题，引起大家的兴趣"
              type="textarea"
              v-model="desc_text"
              counter
              rows="4"
              @keyup.enter.stop
            />
            <q-radio v-model="read_permission" checked val="1" label="任何人" />
            <q-radio v-model="read_permission" val="2" label="仅限组员" />
            <div v-if="read_permission == 2">
              <!-- <label class="setingLabel">设置密码</label> -->
              <q-input label="设定密码" v-model="password" type="password" placeholder="" />
            </div>
          </q-form>
        </div>
        <div class="col-5  q-pa-md">
          创建群之后你还可以设置以下参数：入群奖励、阅读奖励、回复奖励等。
          <br />
          <br />
          请注意，所有的这些奖励的代币将不经过你的确认直接从你的钱包扣掉。
          若你的钱包余额不够支付奖励，则该群的所有奖励设置将自动归零。
          <br />
          <br />
          创建群代表你为群内所有言论负责。你若退群，则系统将自动接替你做群主。
        </div>
      </q-card-section>
      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn
          unelevated
          class="q-px-xl"
          color="primary"
          label="完成"
          @click="createGroup"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  components: {},
  props: { value: Boolean },
  data() {
    return {
      title: '',
      desc_text: '',
      read_permission: '',
      password: '',
    };
  },
  watch: {},
  computed: {
    shouldShow: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
  methods: {
    async createGroup() {
      let data = {
        name: this.title,
        desc_text: this.desc_text,
        read_permission: Number(this.read_permission),
        password: this.password,
        avatar: '',
      };
      if (data.name == '' || data.desc_text == '' || data.read_permission == '') {
        this.$q.notify('信息不完整，请完善信息');
      } else {
        let apiCode = '/protected/grp/create';
        const result = await this.$axios.post(apiCode, data);
        if (result.data.code == 0) {
          this.shouldShow = false;
          this.$q.notify('创建成功，需手动刷新页面');
        } else {
          this.$q.notify(result.data.message);
        }
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss"></style>
