<template>
  <v-app>
    <chatDetail/>
  </v-app>
</template>

<script>
import chatDetail from '../views/vendor/ChatDetail.vue';

export default {
  name: 'VendorView',
  components: {
    chatDetail,
  },
  data: () => ({}),
};
</script>
