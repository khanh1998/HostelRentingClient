<template>
  <div>
    <v-overlay :value="isLoadingBooking" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoadingBooking">
      <v-row justify="center">
        <v-col cols="0" md="4"></v-col>
        <v-col cols="10" md="8">
          <v-btn-toggle mandatory tile v-model="buttonGroup.selectedBookingStatus">
            <v-btn outlined color="grey">
              SẮP TỚI
              <span class="amber--text">({{counter.incomming}})</span>
            </v-btn>
            <v-btn outlined color="grey">
              ĐÃ XEM PHÒNG
              <span class="amber--text">({{counter.done}})</span>
            </v-btn>
            <v-btn outlined color="grey">
              BỎ LỠ
              <span class="amber--text">({{counter.cancel}})</span>
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
<style scoped>
</style>
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
    }),
  },
  mounted() {
    this.arrayEvents = [...Array(10)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },
  created() {
    this.getBookings();
  },
  computed: {
    bookings() {
      const list = this.$store.state.user.bookings.data;
      const result = list.filter((booking) => {
        const { statusId } = booking.status;
        const selectedId = this.buttonGroup.selectedBookingStatus + 1;
        return statusId === selectedId;
      });
      return result;
    },
    isLoadingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
    counter() {
      let incomming = 0;
      let done = 0;
      let cancel = 0;
      this.bookings.forEach((booking) => {
        switch (booking.status.statusId) {
          case 1: incomming += 1;
            break;
          case 2: done += 1;
            break;
          case 3: cancel += 1;
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
