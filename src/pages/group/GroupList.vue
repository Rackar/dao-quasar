<template>
  <div>
    <q-list class="rounded-borders" style="max-width: 550px">
      <q-item clickable v-ripple class="q-px-xl q-py-md">
        <q-item-section avatar>
          <q-avatar rounded size="40px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-bold">DAOChat官方讨论组</span>
          </q-item-label>
          <q-item-label caption lines="2">跨文化，大小对印度的成见</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-badge color="grey" label="1000" />
          <q-item-label caption>5:20 PM</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset="true" />

      <q-item clickable v-ripple class="q-px-xl q-py-md">
        <q-item-section avatar>
          <q-avatar rounded size="40px">
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

      <q-item-label header class="q-px-xl">推荐</q-item-label>
      <q-item clickable v-ripple class="q-px-xl q-py-md">
        <q-item-section avatar>
          <q-avatar rounded size="40px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-bold">DAOChat官方讨论组</span>
          </q-item-label>
          <q-item-label caption lines="2">跨文化，大小对印度的成见</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-badge color="grey" label="1000" />
          <q-item-label caption>5:20 PM</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset="true" />

      <q-item clickable v-ripple class="q-px-xl q-py-md">
        <q-item-section avatar>
          <q-avatar rounded size="40px">
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