<template>
  <div class="d-flex flex-column">
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="headline" style="background-color: #98b7d7; color: white;">
          Mã quét
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-5">
          <div class="d-flex flex-column justify-center align-center">
            <p>Người xem phòng quét mã để xác nhận đã gặp mặt.</p>
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
    <!-- <div class="d-flex justify-md-space-between flex-column flex-md-row">
        <v-row no-gutters class="d-flex justify-end">
          <v-col cols="12" md="5">
            <v-text-field
              class="ma-3"
              style=""
              hide-details
              label="Tìm theo tên"
              v-model="searchQuery"
              prepend-inner-icon="search"
            ></v-text-field>
          </v-col>
        </v-row>
      </div> -->
    <!-- <v-divider /> -->
    <v-row class="d-flex justify-space-between ma-0">
      <v-col cols="12" md="4" class="pl-md-13 py-0 d-flex justify-center justify-md-start">
        <span class="div-title">Lịch hẹn xem phòng</span>
      </v-col>
      <v-col cols="12" md="4" class="pa-0 d-flex justify-center justify-md-end">
        <v-btn-toggle v-model="filterBooking" tile color="#4250f2" group>
          <v-btn value="day" small class="font-nunito">
            Hôm nay
          </v-btn>
          <v-btn value="week" small class="font-nunito">
            Tuần này
          </v-btn>
          <v-btn value="month" small class="font-nunito">
            Tháng này
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-slide-group v-if="bookings.length > 0" show-arrows>
      <v-slide-item
        v-for="booking in bookings"
        :key="booking.bookingId"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          class="ma-5 pa-3"
          :color="active ? 'indigo lighten-5' : 'white'"
          max-width="250"
          @click="toggle"
          v-if="booking.status !== 'CANCELLED'"
        >
          <span
            class="text-muted font-nunito d-flex"
            style="font-weight: 400 !important; color: #98a6ad !important; font-size: 0.9375rem;"
            ><span>{{ getDateString(Number(booking.meetTime)) }}</span>
            <span class="ml-auto">{{ getTimeString(Number(booking.meetTime)) }}</span></span
          >
          <v-list-item dense class="pa-0">
            <v-list-item-avatar>
              <v-img :src="booking.renter.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                _style="fontsize: 16px; fontweight: bold; color: #1f17ff;"
                class="font-nunito text-primary-dark"
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
                v-if="booking.status === 'DONE' && !booking.contractId"
                icon
                :to="`/vendor/contract?bookingId=${booking.bookingId}`"
              >
                <v-icon>far fa-handshake</v-icon></v-btn
              >
              <v-btn v-if="booking.status === 'DONE' && booking.contractId" icon>
                <v-icon>done_all</v-icon></v-btn
              >
            </v-list-item-action>
          </v-list-item>
          <div class="text d-flex align-center">
            <v-icon class="px-2">home</v-icon>
            <span class="size9rem font-nunito text-black">{{ booking.group.groupName }}</span>
          </div>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <v-card v-if="bookings.length === 0">
      <v-card-title> Không có dữ liệu lịch hẹn </v-card-title>
    </v-card>
    <span
      v-if="bookings.length > 0"
      class="ml-auto mr-8 font-nunito text-primary-hover size-sub-3 cursor"
      @click="viewBookings()"
    >
      Xem thêm
    </span>
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
    viewBookings() {
      this.$router.push('/vendor/booking');
    },
    getLastDayOfMonth(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getEndOfWeek(date) {
      const lastday = date.getDate() - (date.getDay() - 1) + 6;
      return new Date(date.setDate(lastday));
    },
    getStartOfWeek(date) {
      const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    },
  },
  computed: {
    bookings() {
      const today = new Date();
      let min = new Date(today);
      let max = new Date(today);
      switch (this.filterBooking) {
        case 'day':
          min.setHours(0, 0, 0, 0);
          max.setHours(23, 59, 59, 59);
          break;
        case 'week':
          min = new Date(
            this.getStartOfWeek(today).getUTCFullYear(),
            this.getStartOfWeek(today).getMonth(),
            this.getStartOfWeek(today).getDate(),
          );
          max = new Date(
            this.getEndOfWeek(today).getUTCFullYear(),
            this.getEndOfWeek(today).getMonth(),
            this.getEndOfWeek(today).getDate(),
          );
          min.setHours(0, 0, 0, 0);
          max.setHours(23, 59, 59, 59);
          break;
        case 'month':
          min = new Date(today.getUTCFullYear(), today.getMonth(), 1);
          max = new Date(
            today.getUTCFullYear(),
            today.getMonth(),
            this.getLastDayOfMonth(today.getUTCFullYear(), today.getMonth()),
          );
          min.setHours(0, 0, 0, 0);
          max.setHours(23, 59, 59, 59);
          break;

        default:
          break;
      }
      // if (this.searchQuery) {
      //   return this.$store.state.user.bookings.data
      //     .filter((item) => item.meetTime >= min.getTime() && item.meetTime <= max.getTime())
      //     .filter((item2) => {
      //       const res =
      //         item2.renter.username.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;
      //       return res;
      //     });
      // }
      return this.$store.state.user.bookings.data.filter(
        (item) => item.meetTime >= min.getTime() && item.meetTime <= max.getTime(),
      );
      // return this.$store.state.user.bookings.data;
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
    filterBooking: 'day',
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
