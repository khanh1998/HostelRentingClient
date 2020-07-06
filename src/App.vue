<template>
  <v-app>
    <myAppBar/>
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
    </v-footer>
    <backToTopButton/>
  </v-app>

</template>

<script>
import myAppBar from './components/core_layout/navigationBar.vue';
import backToTopButton from './components/core_layout/backToTopButton.vue';

export default {
  name: 'App',
  components: {
    myAppBar,
    backToTopButton,
  },
  data: () => ({}),
};
</script>
<style>

</style>
