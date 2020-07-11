<template>
  <v-app class="mt-0" style="height: 100%">
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
