<template>
  <v-card
    height="100%"
    class="overflow-hidden rounded-0 d-flex align-strench"
    v-if="!user.isLoading"
  >
    <v-list nav class="py-0 rounded-1" height="100%" dense>
      <v-list-item> </v-list-item>
      <v-list-item v-if="!hasMessagingToken" class="d-flex align-center justify-center">
        <v-btn dark rounded color="amber" @click="getMessagingToken">
          <v-icon>notifications_none</v-icon>Bật thông báo
        </v-btn>
      </v-list-item>

      <div class="text-display mt-3 mb-3 ml-7">Danh mục</div>
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
        <v-list-item-content>
          <v-list-item-title class="item-text-display flex-1 text-h6 font-weight-regular">{{
            item.title
          }}</v-list-item-title>
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

        <v-list-item-content>
          <v-list-item-title class="item-text-display flex-1 text-h6 font-weight-regular">{{
            itemadd.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import firebase from '../../config/firebase';

const { messaging } = firebase;

export default {
  name: 'SideMenuBar',
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
          link: '/vendor/management',
        },
      ],

      itemadds: [
        { title: 'Tài khoản', icon: 'menu_profile', link: '#' },
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
      updateUser: 'user/updateUser',
    }),
    getMessagingToken() {
      messaging
        .getToken()
        .then(async (token) => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem('messagingToken');
            console.log('token will be updated', currentMessageToken !== token);
            if (currentMessageToken !== token) {
              await this.saveToken(token);
            }
          } else {
            console.log('No Instance ID token available. Request permission to generate one.');
            this.notificationsPermisionRequest();
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    },
    notificationsPermisionRequest() {
      messaging
        .requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch((err) => {
          console.log('Unable to get permission to notify.', err);
        });
    },
    saveToken(token) {
      console.log('tokens', token);
      const newUser = { ...this.user.data };
      newUser.firebaseToken = token;
      this.updateUser(newUser)
        .then((response) => {
          window.localStorage.setItem('messagingToken', token);
          console.log(response);
        })
        .catch((err) => {
          window.localStorage.setItem('messagingToken', token);
          console.log(err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem('messagingToken');
      console.log('currentMessageToken', currentMessageToken);
      if (!currentMessageToken) {
        messaging.onTokenRefresh(() => {
          messaging
            .getToken()
            .then((token) => {
              this.saveToken(token);
            })
            .catch((err) => {
              console.log('Unable to retrieve refreshed token ', err);
            });
        });
      }
    },
    logout() {
      this.$cookies.remove('role');
      this.$cookies.remove('userId');
      this.$cookies.remove('jwt');
      this.clearUserData();
      this.$router.push('/');
    },
  },
  mounted() {
    if (messaging) {
      this.getMessagingToken();
    }
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
</style>
