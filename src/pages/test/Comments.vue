<template>
  <div>
    <!-- <a-list
      v-if="comments.length"
      :dataSource="comments"
      :pagination="pagination"
      :header="`共 ${comments.length} 个回复`"
      itemLayout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment
          :author="item.username"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.createdAt"
        ></a-comment>
      </a-list-item>
    </a-list>
    <a-comment>
      <a-avatar slot="avatar" :src="$store.state.avatar" alt="user" />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" @change="handleChange" :value="value"></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="handleSubmit"
            type="primary"
          >提交评论</a-button>
        </a-form-item>
      </div>
    </a-comment>-->
    <q-list bordered class="rounded-borders" style="max-width: 550px">
      <q-item-label header>Friends</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-bold">Janet</span>
          </q-item-label>
          <q-item-label caption lines="2">
            I'll be in your neighborhood doing errands this
            weekend. Do you want to grab brunch?
          </q-item-label>
        </q-item-section>

        <q-item-section side top>1 min ago</q-item-section>
      </q-item>

      <q-separator inset="item" />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-bold">John</span>
          </q-item-label>
          <q-item-label caption lines="2">Can we schedule a call for tomorrow?</q-item-label>
        </q-item-section>

        <q-item-section side top>1 min ago</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments: [],
      submitting: false,
      value: "",
      pagination: {
        pageSize: 10,
        position: "both"
      }
    };
  },
  created() {
    // this.getComments();
  },
  props: {
    aid: {
      type: String,
      default: ""
    }
  },
  methods: {
    getComments() {
      this.$axios
        .get("/api/comments/articles/" + this.aid)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.comments = res.data.body;
          }
        })
        .catch(err => {
          this.$message.error("获取失败");
        });
    },
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;
      let obj = {
        username: this.$store.state.username,
        userid: this.$store.state.userid,
        content: this.value,
        avatar: this.$store.state.avatar
      };

      this.$axios
        .post("/api/comments/" + this.aid, obj)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.submitting = false;
            this.comments.push(obj);
            this.value = "";
          }
        })
        .catch(err => {
          this.submitting = false;
          this.$message.error("评论失败");
        });
    },
    handleChange(e) {
      this.value = e.target.value;
    }
  }
};
</script>