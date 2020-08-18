<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row justify="center">
        <v-col cols="0" md="4"></v-col>
        <v-col cols="10" md="8">
          <v-btn-toggle
            mandatory
            tile
            v-model="buttonGroup.selectedBookingStatus"
          >
            <v-btn outlined color="grey">
              SẮP TỚI
              <span class="amber--text">({{ counter.incomming }})</span>
            </v-btn>
            <v-btn outlined color="grey">
              ĐÃ XEM PHÒNG
              <span class="amber--text">({{ counter.done }})</span>
            </v-btn>
            <v-btn outlined color="grey">
              BỎ LỠ
              <span class="amber--text">({{ counter.cancel }})</span>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-date-picker
            no-title
            v-model="date"
            :event-color="'red'"
            :events="arrayEvents"
            locale="vi-vn"
            first-day-of-week="1"
          ></v-date-picker>
        </v-col>
        <v-col cols="12" md="8">
          <div v-for="booking in bookings" v-bind:key="booking.bookingId">
            <bookingItem :booking="booking" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped></style>
<script>
import bookingItem from '@/components/view_cart/bookingItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ViewCard',
  components: { bookingItem },
  data: () => ({
    arrayEvents: null,
    date: new Date().toISOString().substr(0, 10),
    buttonGroup: {
      selectedBookingStatus: 0,
    },
  }),
  methods: {
    ...mapActions({
      getBookings: 'user/getBookings',
      getUser: 'user/getUser',
    }),
  },
  created() {
    this.getUser().then(() => {
      this.getBookings().then(() => {
        const bookings = this.$store.state.user.bookings.data;
        this.arrayEvents = bookings.map((booking) =>
          new Date(booking.meetTime).toISOString().substr(0, 10),
        );
      });
    });
  },
  computed: {
    isLoading() {
      const loadingUser = this.$store.state.user.user.isLoading;
      const loadingBookings = this.$store.state.user.bookings.isLoading;
      const loadingDeals = this.$store.state.user.deals.isLoading;
      return loadingUser || loadingBookings || loadingDeals;
    },
    bookings() {
      const list = this.$store.state.user.bookings.data;
      const result = list.filter((booking) => {
        const selectedIdx = this.buttonGroup.selectedBookingStatus;
        switch (selectedIdx) {
          case 0:
            return booking.status === 'INCOMING';
          case 1:
            return booking.status === 'DONE';
          case 2:
            return booking.status === 'CANCELLED';
          default:
            return true;
        }
      });
      return result;
    },
    incommingBooking() {
      return this.bookings.filter((booking) => booking.status === 'INCOMING');
    },
    doneBookings() {
      return this.bookings.filter((booking) => booking.status === 'DONE');
    },
    cancelledBookings() {
      return this.bookings.filter((booking) => booking.status === 'CANCELLED');
    },
    isLoadingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
    counter() {
      const bookings = this.$store.state.user.bookings.data;
      let incomming = 0;
      let done = 0;
      let cancel = 0;
      bookings.forEach((booking) => {
        switch (booking.status) {
          case 'INCOMING':
            incomming += 1;
            break;
          case 'DONE':
            done += 1;
            break;
          case 'CANCELLED':
            cancel += 1;
            break;
          default:
            console.log('error in counter computed');
        }
      });
      return { incomming, done, cancel };
    },
  },
};
</script>
