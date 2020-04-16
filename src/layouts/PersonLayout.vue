<template>
  <q-layout view="lHR lpR fFf">
    <headerbar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import headerbar from "components/headerBar";
export default {
  name: "PersonLayout",
  components: {
    headerbar
  },
  data() {
    return {};
  }
};
</script>
