<template>
  <div class="q-pa-md">
    <div>
      <q-icon name="menu" class="q-pa-md" />DAOChat
      <q-btn label="管理组员" color="primary" outline style="float:right; top:50px;" />
    </div>
    <div>
      <member :members="1" />
    </div>
    <div>
      <span class="text-weight-bold">所有成员</span>

      <member :members="18" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        :max="25"
        :max-pages="9"
        :boundary-numbers="true"
        color="black"
      ></q-pagination>
    </div>
    <div>
      <span class="text-weight-bold">小黑屋</span>
      <member :members="4" />
    </div>
  </div>
</template>

<script>
import member from "components/member";
export default {
  components: {
    member
  },
  data() {
    return {
      current: 3
    };
  }
};
</script>

<style>
</style>