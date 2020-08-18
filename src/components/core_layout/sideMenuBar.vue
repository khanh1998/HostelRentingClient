<template>
  <v-card
    height="100%"
    class="overflow-hidden rounded-0 d-flex align-strench"
    v-if="!user.isLoading"
  >
    <v-list nav class="py-0 rounded-1" height="100%">
      <v-list-item class="item-image">
        <v-img
          alt="Hostel Renting"
          class="shrink mr-2"
          contain
          src="@/assets/logo2.png"
          transition="scale-transition"
          max-width="300"
          max-height="300"
        />
      </v-list-item>
      <v-list-item v-if="!hasMessagingToken">
        <v-btn dark rounded color="amber" large @click="getMessagingToken">
          <v-icon large>notifications_none</v-icon>Bật thông báo
        </v-btn>
      </v-list-item>

      <div class="text-display mt-3 mb-3 ml-7">Danh mục</div>

      <v-list-item
        v-for="item in itemsplus"
        :key="item.title"
        link
        :to="item.link"
      >
        <v-list-item-icon class="ml-5">
          <v-img
            :src="require('@/assets/' + item.icon + '.png')"
            max-height="30"
            max-width="30"
          />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="item-text-display flex-1 px-4 py-2 m-2 text-h6 font-weight-regular"
            >{{ item.title }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <div class="text-display mt-3 mb-3 ml-7">Mở rộng</div>

      <v-list-item
        v-for="itemadd in itemadds"
        :key="itemadd.title"
        link
        :to="itemadd.link"
      >
        <v-list-item-icon class="ml-5">
          <v-img
            :src="require('@/assets/' + itemadd.icon + '.png')"
            max-height="30p"
            max-width="30"
          />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            class="item-text-display flex-1 px-4 py-2 m-2 text-h6 font-weight-regular"
            >{{ itemadd.title }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <div class="bottom-item">
        <v-list-item link>
          <v-list-item-icon class="ml-5">
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              @click="logout"
              class="item-text-display text-h6"
            >
              Đăng xuất
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
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
        { title: 'Tổng quan', icon: 'menu_dashboard', link: '/vendor' },
        { title: 'Lịch xem phòng', icon: 'menu_calendar', link: '/vendor' },
        { title: 'Thống kê', icon: 'menu_chart', link: '/vendor' },
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
    ...mapActions({
      clearUserData: 'user/clearUserData',
      updateUser: 'user/updateUser',
    }),
    getMessagingToken() {
      messaging
        .getToken()
        .then(async (token) => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem(
              'messagingToken',
            );
            console.log('token will be updated', currentMessageToken !== token);
            if (currentMessageToken !== token) {
              await this.saveToken(token);
            }
          } else {
            console.log(
              'No Instance ID token available. Request permission to generate one.',
            );
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
    this.getMessagingToken();
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    hasMessagingToken() {
      return localStorage.getItem('messagingToken') != null;
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
.bottom-item {
  margin-top: 110px;
  background-color: ghostwhite;
}
</style>
