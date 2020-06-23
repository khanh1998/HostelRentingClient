<template>
  <v-app>
    <myAppBar/>
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
    <!-- -->
  </v-footer>
  </v-app>

</template>

<script>
import myAppBar from './components/core_layout/navigationBar.vue';

export default {
  name: 'App',
  components: {
    myAppBar,
  },
  data: () => ({}),
};
</script>
<style>

</style>
