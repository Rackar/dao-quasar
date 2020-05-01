<template>
  <div class="q-pa-md">
    <div class="row no-wrap items-center">
      <member :members="[owner]" />
      <q-space />
      <div>
        <q-btn outline label="管理组员" color="primary" @click="edit" v-if="canManage" />
      </div>
    </div>
    <div>
      <span class="text-weight-bold">所有成员</span>

      <member :members="pagedAliveMember" :edit="editMember" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="maxPage"
        :max-pages="9"
        :boundary-numbers="true"
        :direction-links="true"
        color="primary"
      ></q-pagination>
      <span class="total">共{{this.aliveMember.length}}人</span>
    </div>
    <div>
      <span class="text-weight-bold">小黑屋</span>
      <member :members="blockMember" :edit="editMember" :blocked="true" />
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
    canManage() {
      return this.$store.state.group.currentGroupOwner.id === this.$store.state.user.userid;
    },
    maxPage() {
      return this.aliveMember.length && Math.floor(this.aliveMember.length / this.pageSize) + 1;
    },
    pagedAliveMember() {
      return this.aliveMember.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  data() {
    return {
      currentPage: 1,
      aliveMember: [],
      blockMember: [],
      editMember: false,
      pageSize: 30,
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

        // //test page
        // this.aliveMember.push(...this.aliveMember);
        // this.aliveMember.push(...this.aliveMember);
        // this.aliveMember.push(...this.aliveMember);
        // this.aliveMember.push(...this.aliveMember);
        // this.aliveMember.push(...this.aliveMember);
        // this.aliveMember.push(...this.aliveMember);
        // this.aliveMember.push(...this.aliveMember);
      }
    },
    edit() {
      this.editMember = !this.editMember;
    },
  },
};
</script>


 <style lang="stylus" scoped>
 .total {
   color: $primary;
   padding-left: 15px;
 }
</style>