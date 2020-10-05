<template>
  <v-app>
    <myAppBar style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06) !import;" />
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
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
  border-radius: 0.15rem !important;
}
.bg-danger {
  background-color: #fa5c7c !important;
}
.bg-danger-lighten {
  background-color: rgba(250, 92, 124, 0.25) !important;
}
.bt-primary-hover:hover {
  color: #fff;
  background-color: #4250f2 !important;
  border-color: #3645f1 !important;
}
.primary-hover:hover {
  color: #fff !important;
  background-color: #727cf5 !important;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
  cursor: pointer;
}
.btn-success {
  color: #fff !important;
  background-color: #0acf97 !important;
  border-color: #0acf97 !important;
  box-shadow: 0 2px 6px 0 rgba(10, 207, 151, 0.5) !important;
  letter-spacing: 0.01rem !important;
}
.btn-warning {
  color: #313a46 !important;
  background-color: #ffbc00 !important;
  border-color: #ffbc00 !important;
  box-shadow: 0 2px 6px 0 rgba(255, 188, 0, 0.5) !important;
  letter-spacing: 0.01rem !important;
}
.text-primary {
  color: #727cf5 !important;
}
.text-primary-dark {
  color: #4250f2 !important;
}
.text-gray {
  color: #6c757d !important;
}
.text-warning {
  color: #ffbc00 !important;
}
.text-muted {
  color: #98a6ad !important;
}
.text-gray-dark {
  color: #343a40;
}
.text-danger {
  color: #fa5c7c !important;
}
.bg-secondary {
  color: #727cf5 !important;
  background-color: rgba(114, 124, 245, 0.18) !important;
  font-weight: 700 !important;
}
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.text-white-50 {
  color: rgba(255, 255, 255, 0.5) !important;
}
.line-blue {
  width: 150px;
  background-color: #727cf5;
  height: 2px;
}
.content {
  background-color: #fafbfe;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  -webkit-box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important;
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important;
}
.cursor:hover {
  cursor: pointer;
}
</style>
