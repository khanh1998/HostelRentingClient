<template>
  <v-app>
    <myAppBar style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06) !import" />
    <v-main
      :style="{
        width: '100%',
        backgroundColor: '#F3F5F8',
        _backgroundImage: 'linear-gradient(#fff, #F3F5F8)',
      }"
    >
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
<style>
.bg-primary {
  background-color: #727cf5 !important;
}
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.text-white-50 {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
