<template>
  <q-layout view="hHr lpR fFf">
    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-avatar rounded size="20px">
        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
      </q-avatar>
      <span class="text-weight-bold">DAOChat官方讨论组</span>

      <div>
        <div class="row q-pa-md info">
          <div class="col-10">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>

            <div>奖励机制（单位：）</div>
            <div>正数代表奖励，负数代表收费</div>
            <div>
              <div>发帖奖励</div>
              <div>9</div>
            </div>
            <div>
              <div>帖子回复奖励</div>
              <div>10</div>
            </div>
            <div>
              <div>邀请成员奖励</div>
              <div>12</div>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "ManageLayout",
  data() {
    return {
      right: false
    };
  }
};
</script>