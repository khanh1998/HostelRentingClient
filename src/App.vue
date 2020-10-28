<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import './assets/css/style.css';
import pushNotificationMixins from './components/mixins/pushNotification';

export default {
  name: 'App',
  mixins: [pushNotificationMixins],
  components: {},
  mounted() {
    this.doGetMessagingToken();
  },
  methods: {},
};
</script>
