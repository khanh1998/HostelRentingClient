<template>
  <div class="d-flex justify-center align-center px-3" style="height: 100%">
    <v-menu left :offset-y="true" :offset-x="true" @blur="this.notifications = []">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-badge
            color="red"
            :content="messages.length"
            bordered
            left
            overlap
            v-bind="attrs"
            v-on="on"
            v-if="messages.length !== 0"
          >
            <v-icon color="#727cf5">mdi-bell-outline</v-icon>
          </v-badge>
          <v-icon v-else color="#98a6ad">mdi-bell-outline</v-icon>
        </v-btn>
      </template>
      <v-list
        :dense="true"
        :two-line="true"
        :nav="true"
        :avatar="true"
        class="rounded-l"
        style="height: 405px; width: 300px"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in messages"
            :key="i"
            class="mb-2 pt-2"
            style="backgroundcolor: #f2f2f2"
            two-line
            :to="getDestination(item)"
          >
            <v-list-item-avatar>
              <v-img :src="item.data.icon"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="fontsize: 16px" class="py-1">
                {{ item.data.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.data.body }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import processFCMForegroundMixins from '../../mixins/processFCMForeground';
import action from '../../../config/pushNotificationActions';
import mobileMixin from '../../mixins/mobile';

export default {
  name: 'NotifyAndProfile',
  mixins: [processFCMForegroundMixins, mobileMixin],
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    getDestination(message) {
      switch (this.user.role.code) {
        case 'RENTER':
          return this.getDestinationForRenter(message);
        case 'VENDOR':
          return this.getDestinationForVendor(message);
        default:
          return Error('');
      }
    },
    getDestinationForRenter(message) {
      switch (message.data.action) {
        case action.NEW_CONTRACT:
          return '/contract';
        case action.UPDATE_CONTRACT:
          return '/contract';
        default:
          return '/';
      }
    },
    getDestinationForVendor(message) {
      switch (message.data.action) {
        case action.NEW_CONTRACT:
          return '/vendor/view-contract';
        case action.SCAN_CONTRACT:
          return '/vendor/view-contract';
        case action.NEW_MESSAGE:
          if (this.isMobile) {
            return '/vendor/mobile-message';
          }
          return '/vendor';
        case action.NEW_BOOKING:
          return '/vendor/booking';
        case action.SCAN_BOOKING:
          return '/vendor/booking';
        default:
          return '/';
      }
    },
  },
  mounted() {
    this.registerMessaging();
  },
  computed: {
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
    messages() {
      return this.$store.state.user.notifications.data;
    },
  },
  data: () => ({
    infoMenu: [
      {
        title: 'Thông tin',
        url: '',
      },
    ],
  }),
  created() {
    this.getUser();
  },
};
</script>