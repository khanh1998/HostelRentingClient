<template>
  <v-app>
    <myAppBar style="box-shadow: 0 10px 20px rgba(0, 0, 0, .06) !import;" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app></v-footer>
    <backToTopButton />
  </v-app>
</template>
<script>
import myAppBar from '../components/core_layout/navigationBar.vue';
import backToTopButton from '../components/core_layout/backToTopButton.vue';

export default {
  name: 'RenterView',
  components: {
    myAppBar,
    backToTopButton,
  },
  data: () => ({}),
};
</script>
