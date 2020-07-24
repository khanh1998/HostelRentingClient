<template>
  <div>
    <v-sheet class="mx-auto rounded-l" elevation="1" max-width="100%">
      <v-overlay :value="isLoadingBooking" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div class="d-flex justify-space-between text-center">
        <div style="font-size:20px; fontWeight:bold" class="pt-3 pl-2">Lịch hẹn xem phòng</div>
        <div>
          <v-chip class="ma-2">Hôm nay</v-chip>

          <v-chip class="ma-2">Tuần này</v-chip>

          <v-chip class="ma-2">Tháng này</v-chip>
        </div>
      </div>
      <v-slide-group>
        <v-slide-item
          v-for="booking in bookings"
          :key="booking.bookingId"
          v-slot:default="{ active, toggle }"
        >
          <v-card class="ma-3 rounded-xl" height="180" width="319" @click="toggle">
            <v-col
              cols="12"
              style="background-color: #98B7D7; height: 28%; width: 100%"
              class="d-flex justify-end"
            >
              <v-text
                style="fontWeight:bold; color:white"
              >{{getDateString(Number(booking.startTime))}}</v-text>
              <v-divider vertical class="mx-3"></v-divider>
              <v-text
                style="fontWeight:bold; color:white"
              >{{getTimeString(Number(booking.startTime))}}</v-text>
            </v-col>
            <v-list-item class="mb-2 pt-2">
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="pl-4">
                <v-list-item-title
                  style="fontSize:16px; fontWeight:bold; color:#1F17FF"
                  class="py-1"
                >{{booking.renter.username}}</v-list-item-title>
                <v-list-item-subtitle style="color: coral; fontSize:18px">
                  {{booking.renter.phone}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <div>
              <v-icon class="px-3 pl-7">home</v-icon>
              <span style="fontWeight:bold">{{booking.group.groupName}}</span>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <div class="d-flex justify-end">
        <v-card-text style="color:#818286">Xem thêm >></v-card-text>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'SlideBooking',
  components: {},
  data: () => ({}),
  methods: {
    ...mapActions({
      getBookings: 'user/getBookings',
    }),
    getDateString(milisecond) {
      const d = new Date(milisecond);
      return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
    },
    getTimeString(milisecond) {
      const d = new Date(milisecond);
      return `${d.getHours()}:${
        d.getMinutes() < 10 ? '0' : ''
      }${d.getMinutes()}`;
    },
  },
  computed: {
    bookings() {
      return this.$store.state.user.bookings.data;
    },
    isLoadingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
  },
  created() {
    this.getBookings();
  },
};
</script>
