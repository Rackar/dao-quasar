<template>
  <div class="fit row">
    <div class="col-1 q-pa-md" v-for="member in members" :key="member.id">
      <div>
        <q-avatar size="lg" color="primary" text-color="white" class="clickable">
          <img :src="member.avatar || 'statics/user.svg'" @click="jumpToMember(member.id)" />
          <q-badge v-show="edit" color="red" floating style @click.stop="setMember(member.id)">
            x
          </q-badge>
        </q-avatar>
      </div>
      <div @click="jumpToMember(member.id)" class="clickable">{{ member.name }}</div>
    </div>
    <blockMember v-model="showBlock" :userId="clickedMemberId" :blocked="blocked" />
  </div>
</template>

<script>
import blockMember from 'pages/toast/blockMember';
export default {
  components: { blockMember },
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
      this.clickedMemberId = id;
    },
  },
};
</script>

<style lang="stylus" scoped>
.clickable {
  cursor: pointer;
}
</style>
