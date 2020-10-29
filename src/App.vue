<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import './assets/css/style.css';
import pushNotificationMixins from './components/mixins/pushNotification';

export default {
  name: 'App',
  mixins: [pushNotificationMixins],
  components: {},
  mounted() {
    this.getUser().then(() => this.doGetMessagingToken());
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
  },
  computed: {},
};
</script>
