<template>
  <div class="q-pa-md">
    <div>
      <member :members="[owner]" />
    </div>
    <div>
      <span class="text-weight-bold">所有成员</span>

      <member :members="aliveMember" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="25"
        :max-pages="9"
        :boundary-numbers="true"
        color="black"
      ></q-pagination>
    </div>
    <div>
      <span class="text-weight-bold">小黑屋</span>
      <member :members="blockMember" />
    </div>
  </div>
</template>

<script>
import member from 'components/member';
export default {
  components: {
    member,
  },
  props: { id: String },
  computed: {
    owner() {
      return this.$store.state.group.currentGroupOwner;
    },
  },
  data() {
    return {
      currentPage: 3,
      aliveMember: [],
      blockMember: [],
    };
  },
  created() {
    this.$store.dispatch('group/jumpToGroup', { id: this.id });
    this.getMembers(this.id);
  },
  methods: {
    async getMembers(id) {
      let url = '/user/members/' + id;
      const members = await this.$axios.get(url);
      if (members.data.code == 0) {
        this.aliveMember = members.data.data.alive;
        this.blockMember = members.data.data.blocked;
      }
    },
  },
};
</script>

<style></style>
