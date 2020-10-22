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
      >
        <div class="d-flex align-center justify-center justify-md-left">
          <span class="text-h6 font-weight-bold text-center ml-3">Lịch hẹn xem phòng</span>
        </div>
        <v-row no-gutters class="d-flex justify-end">

          <v-col cols="12" md="5">
            <v-text-field
        class="ma-3"
        style=""
        hide-details
        label="Tìm theo tên"
        v-model="searchQuery"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
          </v-col>
        </v-row>
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
            v-if="booking.status !== 'CANCELLED'"
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
            <div class="text">
              <v-icon class="px-3 pl-3">home</v-icon>
              <span style="fontweight: bold;">{{ booking.group.groupName }}</span>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <v-card v-if="bookings.length === 0">
        <v-card-title> Không có dữ liệu lịch hẹn </v-card-title>
      </v-card>
      <v-divider />
      <div class="d-flex align-center justify-center justify-md-right">
          <span style="color: #818286;" v-if="bookings.length > 0" class="ml-2">
            <router-link to="booking" class="text-decoration-none">Xem thêm >></router-link>
          </span>
        </div>
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
      const cur = Date.now();
      // console.log(this.$store.state.user.bookings.data.filter((item) => item.meetTime >= cur).sort((a, b) => a - b));
      // console.log(this.searchQuery);
      if (this.searchQuery) {
        return this.$store.state.user.bookings.data.filter((item) => item.meetTime >= cur).filter((item2) => item2.renter.username.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1);
      }
      return this.$store.state.user.bookings.data.filter((item) => item.meetTime >= cur);
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
    getBookingsByRealTime() {
      const { length } = this.$store.state.user.bookings.data;
      for (let i = 0; i < length; i += 1) {
        const booking = this.bookings.data[i];
        const meetTime = new Date(booking.meetTime);
        console.log(meetTime);
        return meetTime;
      }
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
    searchQuery: null,
  }),
};
</script>
<style>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 1; /* number of lines to show */
   -webkit-box-orient: vertical;
}
</style>
