<template>
  <div class="fit row">
    <div class="col-1 q-pa-md" v-for="member in members" :key="member.id">
      <div>
        <q-avatar
          size="lg"
          color="primary"
          text-color="white"
          @click="jumpToMember(member.id)"
          class="clickable"
        >
          <img :src="member.avatar || 'statics/user.svg'" />
          <q-badge v-show="edit" color="red" floating style>x</q-badge>
        </q-avatar>
      </div>
      <div @click="jumpToMember(member.id)" class="clickable">{{ member.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: Array,
    edit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    jumpToMember(id) {
      this.$router.push('/person/show/' + id);
    },
  },
};
</script>

<style lang="stylus" scoped>
.clickable {
  cursor: pointer;
}
</style>
