<template>
  <v-card
    height="100%"
    class="overflow-hidden rounded-0 d-flex align-strench pt-3"
    v-if="!user.isLoading"
  >
    <v-list nav class="py-0 rounded-1" height="100%">
      <v-list-item class="d-flex">
        <router-link to="/">
          <v-img
            alt="Hostel Renting"
            class="shrink mr-2"
            contain
            src="@/assets/logo-sac.png"
            transition="scale-transition"
            max-width="40"
            max-height="40"
          />
        </router-link>
        <v-spacer></v-spacer>
        <v-btn
          @click="doGetMessagingToken"
          v-if="!hasMessagingToken"
          class="bg-warning-lighten elevation-0 text-warning font-nunito size9rem d-flex justify-start"
          style="letter-spacing: 0.01rem !important"
        >
          <v-icon small class="mr-1">notifications_none</v-icon>Bật thông báo
        </v-btn>
      </v-list-item>

      <span class="mt-10 text-gray side-nav-title font-nunito">DANH MỤC</span>
      <v-list-item to="/vendor/mobile-message" v-if="isMobile">
        <v-list-item-icon>
          <v-img :src="require('@/assets/menu_chat.png')" max-height="20" max-width="20" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="item-text-display flex-1 text-h6 font-weight-regular"
            >Tin nhắn</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="item in itemsplus" :key="item.title" :to="item.link">
        <v-list-item-icon>
          <v-img :src="require('@/assets/' + item.icon + '.png')" max-height="20" max-width="20" />
        </v-list-item-icon>
        <v-list-item-content class="item-text-display flex-1 text-h6 font-weight-regular">
          {{ item.title }}
        </v-list-item-content>
      </v-list-item>

      <div class="text-display mt-3 mb-3 ml-7">Mở rộng</div>
      <v-list-item v-for="itemadd in itemadds" :key="itemadd.title" link :to="itemadd.link">
        <v-list-item-icon>
          <v-img
            :src="require('@/assets/' + itemadd.icon + '.png')"
            max-height="20"
            max-width="20"
          />
        </v-list-item-icon>

        <v-list-item-content class="item-text-display flex-1 text-h6 font-weight-regular"
          >{{ itemadd.title }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import pushNotificationMixins from '../mixins/pushNotification';
import authenticationMixins from '../mixins/authentication';

export default {
  name: 'SideMenuBar',
  mixins: [pushNotificationMixins, authenticationMixins],
  data() {
    return {
      drawer: true,
      itemsplus: [
        { title: 'Tổng quan', icon: 'menu_dashboard', link: '/vendor/overview' },
        { title: 'Lịch xem phòng', icon: 'my_schedule', link: '/vendor/booking' },
        { title: 'Lịch rảnh', icon: 'menu_chart', link: '/vendor/schedule' },
        {
          title: 'Quản lý nhà trọ',
          icon: 'menu_room',
          link: '/vendor/groups',
        },
        {
          title: 'Quản lý hợp đồng',
          icon: 'contract',
          link: '/vendor/view-contract',
        },
      ],

      itemadds: [
        { title: 'Tài khoản', icon: 'menu_profile', link: '/user' },
        { title: 'Liên hệ', icon: 'menu_contact', link: '#' },
      ],
      color: 'success',
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
    };
  },
  methods: {
    showItem(itemadd) {
      return !itemadd.mobile || (itemadd.mobile && this.isMobile);
    },
    ...mapActions({
      clearUserData: 'user/clearUserData',
      getUser: 'user/getUser',
    }),
  },
  created() {
    this.getUser().then(() => {
      console.log('get fcm token at sideMenuBar.vue');
      this.doGetMessagingToken();
    });
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    hasMessagingToken() {
      return localStorage.getItem('messagingToken') != null;
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        case 'sm':
          return true;
        default:
          return false;
      }
    },
  },
};
</script>
<style>
.item-image {
  height: 200px;
}
.item-text-display {
  color: #031d5f;
}
.text-display {
  color: #b4b7c8;
}
.side-nav-title {
  font-size: 0.6875rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  font-weight: 700 !important;
}
</style>
