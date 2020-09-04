<template>
  <div class="d-flex flex-row justify-center align-center pa-2">
    <v-menu left :offset-y="true" :offset-x="true" @blur="this.notifications = []">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-badge
            color="red"
            :content="notifications.length"
            bordered
            overlap
            v-bind="attrs"
            v-on="on"
          >
            <v-img :src="require('@/assets/notification.svg')" height="30" width="30"></v-img>
          </v-badge>
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
            v-for="(item, i) in notifications"
            :key="i"
            class="mb-2 pt-2"
            style="backgroundcolor: #f2f2f2"
            @click="$emit('clickedItem', getItemSelected(item))"
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="fontsize: 16px" class="py-1">
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>Đã đặt lịch hẹn ngày {{ item.message }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <div class="d-flex flex-nowrap align-center ml-3">
      <v-menu left :offset-y="true" v-if="!isLoadingUser">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <v-avatar>
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
            <p class="font-weight-medium mb-0 ml-2">{{ user.username }}</p>
          </v-btn>
        </template>
        <v-list two-line>
          <template v-for="(item, index) in infoMenu">
            <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>
            <v-list-item v-else :key="item.title" :to="item.url">
              <v-list-item-content>
                <v-list-item-title style="color: #1f17ff; fontsize: 18px">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import firebase from '../../config/firebase';

const { messaging } = firebase;

export default {
  name: 'NotifyAndProfile',
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      clearUserData: 'user/clearUserData',
      getNewCommingBooking: 'user/getOneBooking',
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
      window.axios
        .post('https://us-central1-cropchien.cloudfunctions.net/GeneralSubscription', { token })
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
    addNewNotificaton(payload) {
      const noti = {
        avatar: payload.notification.icon,
        message: payload.notification.body,
        title: payload.data ? payload.data.renterName : 'Bạn có thông báo mới.',
      };
      this.notifications.unshift(noti);
    },
    receivePayload(payload) {
      console.log(this);
      console.log(payload);
      if (payload.data) {
        this.getNewCommingBooking(payload.data.bookingId);
        this.addNewNotificaton(payload);
      }
    },
    changePage() {},
  },
  mounted() {
    messaging.onMessage(this.receivePayload);
  },
  computed: {
    listBookChange() {
      return this.items.filter((items) => {
        if (items.book) {
          return true;
        }
        return false;
      });
    },
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
  },
  data: () => ({
    notifications: [],
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Bùi Quốc Khánh',
        message: '2.500.000',
        bargain: true,
        book: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Trang',
        message: '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Trang',
        message: '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Thỳ',
        message: '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Trí',
        message: '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: true,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Chung',
        message: '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: true,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Trần Tiến Dực',
        message: 'Phòng trọ ở đây có thể ở được hơn bốn người không ạ?',
        bargain: false,
        book: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Trần Tiến Duật',
        message: 'Phòng trọ ở đây có thể ở được hơn bốn người không ạ?',
        bargain: false,
        book: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Trần Tiến Duật',
        message: 'Phòng trọ ở đây có thể ở được hơn bốn người không ạ?',
        bargain: false,
        book: false,
      },
    ],
    infoMenu: [
      {
        title: 'Thông tin',
        url: '',
      },
      { divider: true, inset: false },
      {
        title: 'Xem mã QR',
        url: '/vendor/qrgeneration',
      },
      { divider: true, inset: false },
      {
        title: 'Đổi mật khẩu',
        url: '',
      },
    ],
  }),
  created() {
    this.getUser();
  },
};
</script>
