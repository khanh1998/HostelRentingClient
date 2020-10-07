<template>
  <!-- eslint-disable max-len -->
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row justify="center" class="py-10">
        <v-col cols="10" sm="11" md="9" lg="9" xl="8">
          <v-row class="mb-10 d-flex white justify-space-around align-center">
            <v-btn class="bg-primary font-nunito text-subtitle-2 my-4" dark @click="date = [today]"
              >Hôm nay</v-btn
            >
            <v-btn-toggle v-model="buttonGroup.selectedBookingStatus">
              <v-btn
                class="btn-primary font-nunito text-subtitle-2 px-5"
                style="
                  border-top-left-radius: 0 !important;
                  border-bottom-left-radius: 0 !important;
                  border-top-right-radius: 0 !important;
                  border-bottom-right-radius: 0 !important;
                "
                >Sắp tới <span class="amber--text">({{ counter.incomming }})</span></v-btn
              >
              <v-btn
                class="btn-primary font-nunito text-subtitle-2 px-5"
                style="
                  border-top-left-radius: 0 !important;
                  border-bottom-left-radius: 0 !important;
                  border-top-right-radius: 0 !important;
                  border-bottom-right-radius: 0 !important;
                "
              >
                Đã xem phòng <span class="amber--text">({{ counter.done }})</span></v-btn
              >
              <v-btn
                class="btn-primary font-nunito text-subtitle-2 px-5"
                style="
                  border-top-left-radius: 0 !important;
                  border-bottom-left-radius: 0 !important;
                  border-top-right-radius: 0 !important;
                  border-bottom-right-radius: 0 !important;
                "
              >
                Bỏ lỡ <span class="amber--text">({{ counter.cancel }})</span></v-btn
              >
            </v-btn-toggle>
            <span
              class="text-gray font-nunito font-weight-bold"
              style="font-size: 1.25rem !important;"
              >{{ dateRange }}</span
            >
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              max-width="350px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon class="bg-danger-lighten my-4" v-model="date" v-bind="attrs" v-on="on"
                  ><v-icon color="#fa5c7c">mdi-calendar-edit</v-icon></v-btn
                >
              </template>
              <v-date-picker
                v-model="date"
                scrollable
                full-width
                locale="vi-vn"
                :event-color="'red'"
                :events="arrayEvents"
                _first-day-of-week="1"
                color="#727cf5"
                :show-current="today"
                range
                :title-date-format="titleDateFormat"
              >
                <v-spacer></v-spacer>
                <v-btn
                  small
                  outlined
                  color="#9e9fa7"
                  class="text-caption px-4 py-2 mx-2"
                  depressed
                  @click="modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  small
                  color="#4F60C9"
                  class="text-caption px-4 py-2 mx-2 white--text"
                  depressed
                  @click="$refs.dialog.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-row>
          <v-row>
            <div v-for="booking in bookings" v-bind:key="booking.bookingId" style="width: 100%;">
              <bookingItem :booking="booking" />
            </div>
          </v-row>
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
    date: '',
    modal: false,
    selectedDate: [],
    // eslint-disable-next-line
    titleDateFormat: (date) =>
      // eslint-disable-next-line
      `${new Date(date[0]).getDate()}/${new Date(date[0]).getMonth() + 1}${
        date[1] === undefined
          ? '' // eslint-disable-line
          : ` đến ${new Date(date[1]).getDate()}/${new Date(date[1]).getMonth() + 1}` // eslint-disable-line
      }`,
    buttonGroup: {
      selectedBookingStatus: 0,
    },
    today: new Date().toISOString().substr(0, 10),
  }),
  methods: {
    ...mapActions({
      getBookings: 'user/getBookings',
      getUser: 'user/getUser',
      getProvinces: 'renter/common/getProvinces',
    }),
    initDateRange() {
      const list = this.$store.state.user.bookings.data;
      console.log(list);
      const startDay = new Date(list[0].meetTime);
      const endDay = new Date(list[list.length - 1].meetTime);
      // const today = new Date();
      // const endDay = new Date(today);
      // endDay.setDate(endDay.getDate() + 7);
      this.date = [startDay.toISOString().substr(0, 10), endDay.toISOString().substr(0, 10)];
      console.log(this.date);
    },
    getTileDateFormat(date) {
      return `${date[0]} đến ${date[1]}`;
    },
  },
  created() {
    this.getUser().then(() => {
      this.getBookings()
        .then(() => {
          const bookings = this.$store.state.user.bookings.data;
          this.arrayEvents = bookings.map(
            (booking) => new Date(booking.meetTime).toISOString().substr(0, 10), // eslint-disable-line
          ); // eslint-disable-line
        })
        .then(() => this.initDateRange());
    });
  },
  computed: {
    isLoading() {
      const loadingUser = this.$store.state.user.user.isLoading;
      const loadingBookings = this.$store.state.user.bookings.isLoading;
      const loadingDeals = this.$store.state.user.deals.isLoading;
      const loadingProvinces = this.$store.state.renter.common.provinces.isLoading;
      return loadingUser || loadingBookings || loadingDeals || loadingProvinces;
    },
    bookings() {
      const list = this.$store.state.user.bookings.data;

      let filteredDate = [];
      filteredDate = list.filter((booking) => {
        const min = new Date(`${this.date[0]}T00:00:00`).getTime();
        let max = new Date(`${this.date[0]}T23:59:59`).getTime();
        if (this.date.length === 2) {
          max = new Date(`${this.date[1]}T23:59:59`).getTime();
        }
        return booking.meetTime <= max && booking.meetTime >= min;
      });

      const result = filteredDate.filter((booking) => {
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
    dateRange() {
      const start = new Date(this.date[0]);
      const end = new Date(this.date[1]);
      return `${start.getDate()}/${start.getMonth() + 1}${
        this.date[1] === undefined // eslint-disable-next-line
          ? `/${start.getFullYear()}` // eslint-disable-next-line
          : `${
              // eslint-disable-line
              start.getFullYear() === end.getFullYear() // eslint-disable-line
                ? ` - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}` // eslint-disable-line
                : `/${start.getFullYear()}` // eslint-disable-line
            }` // eslint-disable-line
      }`;
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
      // const bookings = this.$store.state.user.bookings.data;
      let incomming = 0;
      let done = 0;
      let cancel = 0;
      this.bookings.forEach((booking) => {
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
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.btn-primary {
  color: #6c757d !important;
  background-color: #eef2f7 !important;
  border-color: #727cf5 !important;
  /* box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important; */
  border-radius: 0.15rem !important;
  height: 2.5rem !important;
  opacity: 1 !important;
}
.v-btn-toggle > .v-btn.v-btn {
  opacity: 1 !important;
  border-style: none !important;
}
.v-btn-toggle > .v-btn.v-btn--active {
  color: #fff !important;
  background-color: #727cf5 !important;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
  opacity: 1 !important;
}
</style>
