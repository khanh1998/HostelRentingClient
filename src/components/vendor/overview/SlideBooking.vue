<template>
  <div>
    <v-sheet class="rounded" elevation="0" height="30%" max-width="100%">
      <v-dialog v-model="dialog" width="400">
        <v-card>
          <v-card-title class="headline" style="background-color: #98b7d7; color: white;">
            Mã quét
          </v-card-title>
          <v-card-text class="d-flex justify-center mt-5">
            <div>
              <qrcode-vue :value="qrvalue" :size="200" level="H"></qrcode-vue>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Đóng </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div
        class="d-flex justify-md-space-between flex-column flex-md-row"
        v-if="bookings.length > 0"
      >
        <div class="d-flex align-center justify-center justify-md-left">
          <span class="text-h6 font-weight-thin text-center ml-3">Lịch hẹn xem phòng</span>
          <span style="color: #818286;" v-if="bookings.length > 0" class="ml-2">
            <router-link to="vendor/booking" class="text-decoration-none">Xem thêm >></router-link>
          </span>
        </div>
      </div>
      <v-divider />
      <v-slide-group v-if="bookings.length > 0" center-active show-arrows>
        <v-slide-item
          v-for="booking in bookings"
          :key="booking.bookingId"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            class="ma-3 rounded-l"
            elevation="1"
            width="250"
            :color="active ? 'indigo lighten-5' : 'white'"
            @click="toggle"
          >
            <v-col
              cols="12"
              style="background-color: #98b7d7; height: 28%; width: 100%;"
              class="d-flex justify-end"
            >
              <span style="fontweight: bold; color: white;">
                {{ getDateString(Number(booking.meetTime)) }}
              </span>
              <v-divider vertical class="mx-3"></v-divider>
              <span style="fontweight: bold; color: white;">
                {{ getTimeString(Number(booking.meetTime)) }}
              </span>
            </v-col>
            <v-list-item dense class="">
              <v-list-item-avatar>
                <v-img :src="booking.renter.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="pl-4">
                <v-list-item-title
                  style="fontsize: 16px; fontweight: bold; color: #1f17ff;"
                  class="py-1"
                  >{{ booking.renter.username }}</v-list-item-title
                >
                <v-list-item-subtitle style="color: coral;">
                  {{ booking.renter.phone }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  v-if="booking.status === 'INCOMING'"
                  icon
                  @click="changeToString(booking.bookingId)"
                >
                  <v-icon> mdi-qrcode </v-icon>
                </v-btn>
                <v-btn
                  v-if="booking.status === 'DONE'"
                  icon
                  :to="`/vendor/contract?bookingId=${booking.bookingId}`"
                >
                  <v-icon>far fa-handshake</v-icon></v-btn
                >
              </v-list-item-action>
            </v-list-item>
            <div>
              <v-icon class="px-3 pl-7">home</v-icon>
              <span style="fontweight: bold;">{{ booking.group.groupName }}</span>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <v-card v-if="bookings.length === 0">
        <v-card-title> Bạn không có lịch hẹn nào </v-card-title>
      </v-card>
    </v-sheet>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
import { mapActions } from 'vuex';

export default {
  name: 'SlideBooking',
  components: {
    QrcodeVue,
  },
  methods: {
    ...mapActions({
      getBookings: 'user/getBookings',
    }),
    getDateString(milisecond) {
      const d = new Date(milisecond);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },
    getTimeString(milisecond) {
      const d = new Date(milisecond);
      return `${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}${d.getMinutes()}`;
    },
    changeToString(bookingId) {
      this.dialog = true;
      this.qrvalue = `booking:${bookingId}`;
    },
  },
  computed: {
    bookings() {
      return this.$store.state.user.bookings.data;
    },
    incommingBookings() {
      return this.bookings.filter((booking) => booking.status === 'INCOMING');
    },
    isLoadingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
    filteredBookings() {
      if (!this.timeDiff) {
        return this.bookings;
      }
      // this.bookings.
      return null;
    },
  },
  created() {
    if (this.bookings.length === 0) {
      this.getBookings();
    }
  },
  data: () => ({
    chipItems: ['Hôm nay', 'Tuần này', 'Tháng này'],
    timeDiff: null,
    dialog: false,
    qrvalue: null,
  }),
};
</script>
