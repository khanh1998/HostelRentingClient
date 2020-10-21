<template>
  <!-- eslint-disable max-len -->
  <div style="height: 100%; overflow-y:auto">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading" style="height: 98%">
      <v-row justify="center" class="py-10">
        <v-col cols="11" sm="11" md="11" lg="11" xl="10">
          <v-row class="d-flex px-4">
            <v-col cols="3" class="d-flex align-center pl-0">
              <span class="font-nunito text-gray size-sub-2">Chủ trọ</span>
            </v-col>
            <v-col cols="3" class="d-flex align-center pl-0">
              <span class="font-nunito text-gray size-sub-2">Nhà trọ</span>
            </v-col>
            <v-col cols="1" class="d-flex justify-center align-center">
              <span class="font-nunito text-gray size-sub-2">Phòng</span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center align-center">
              <span class="font-nunito text-gray size-sub-2">Ngày bắt đầu</span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center align-center">
              <span class="font-nunito text-gray size-sub-2">Ngày hết hạn</span>
            </v-col>
            <v-col cols="1" class="d-flex justify-center align-center">
              <span class="font-nunito text-gray size-sub-2">Trạng thái</span>
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <div
              v-for="contract in allContracts"
              v-bind:key="contract.contractId"
              style="width: 100%;"
            >
              <contractItem :contract="contract" />
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped></style>
<script>
import { mapActions } from 'vuex';
import contractItem from '@/components/view_contracts/contractItem.vue';

export default {
  name: 'ViewContractVendor',
  components: { contractItem },
  data: () => ({}),
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
      getUser: 'user/getUser',
    }),
  },
  created() {
    // this.getUser().then(() => {
    //   this.getBookings()
    //     .then(() => {
    //       const bookings = this.allBooking;
    //       this.arrayEvents = bookings.map(
    //         (booking) => new Date(booking.meetTime).toISOString().substr(0, 10), // eslint-disable-line
    //       ); // eslint-disable-line
    //     })
    //     .then(() => this.initDateRange());
    // });
    this.getUser().then(() => {
      this.getContracts();
    });
  },
  computed: {
    isLoading() {
      const loadingUser = this.$store.state.user.user.isLoading;
      const loadingContracts = this.$store.state.user.contracts.isLoading;
      // const loadingDeals = this.$store.state.user.deals.isLoading;
      // const loadingProvinces = this.$store.state.renter.common.provinces.isLoading;
      return loadingUser || loadingContracts;
    },
    allContracts() {
      return this.$store.state.user.contracts.data;
    },
    bookings() {
      const list = this.allBooking;
      let filteredDate = [];
      filteredDate = list.filter((booking) => {
        let min = new Date(`${this.date[0]}T00:00:00`).getTime();
        let max = new Date(`${this.date[0]}T23:59:59`).getTime();
        if (this.date.length === 2 && this.date[0] !== this.date[1]) {
          max = new Date(`${this.date[1]}T23:59:59`).getTime();
          if (min > max) {
            max = new Date(`${this.date[1]}T00:00:00`).getTime();
            min = new Date(`${this.date[0]}T23:59:59`).getTime();
            return booking.meetTime <= min && booking.meetTime >= max;
          }
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
      return { result, filteredDate };
    },
    dateRange() {
      const start = new Date(this.date[0]);
      const end = new Date(this.date[1]);
      if (start.getTime() === end.getTime()) {
        return `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
      }
      if (start.getTime() > end.getTime()) {
        return `${end.getDate()}/${end.getMonth() + 1}${
          this.date[1] === undefined // eslint-disable-next-line
            ? `/${end.getFullYear()}` // eslint-disable-next-line
            : `${
                // eslint-disable-line
                end.getFullYear() === start.getFullYear() // eslint-disable-line
                  ? ` - ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}` // eslint-disable-line
                  : `/${end.getFullYear()}` // eslint-disable-line
              }` // eslint-disable-line
        }`;
      }
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
    isLoadingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
    counter() {
      let incomming = 0;
      let done = 0;
      let cancel = 0;
      this.bookings.filteredDate.forEach((booking) => {
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
