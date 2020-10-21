<template>
  <v-card class="overflow-y-auto" max-height="100%">
    <v-dialog v-model="contracts.isCreating" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Hợp đồng đang được tạo
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showQRDialog" width="300">
      <p class="text-h6">Quét mã để kích hoạt hợp đồng</p>
      <QrcodeVue :value="qrCodeValue" v-if="contracts.newlyCreated" :size="200" level="H" />
    </v-dialog>
    <div class="d-flex justify-center" style="font-size: 45px;">{{ heading }}</div>
    <v-tabs>
      <v-tab>
        Thông tin hai bên
      </v-tab>
      <v-tab>
        Điều khoản
      </v-tab>
      <v-tab-item>
        <InfomationSection :renter="booking.renter" :vendor="booking.vendor" />
      </v-tab-item>
      <v-tab-item>
        <TermsOfContractSection
          @newValue="receiveNewTermsOfContract"
          :type="booking.type"
          :group="booking.group"
          @clickCreateContract="doCreateContract"
        />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import QrcodeVue from 'qrcode.vue';
import InfomationSection from './InfomationSection.vue';
import TermsOfContractSection from './TermsOfContractSection.vue';

export default {
  name: 'contract',
  components: { InfomationSection, TermsOfContractSection, QrcodeVue },
  data: () => ({
    heading: 'THÔNG TIN HỢP ĐỒNG',
    contract: {},
    showQRDialog: false,
  }),
  methods: {
    ...mapActions({
      getBooking: 'user/getOneBooking',
      getOneBooking: 'user/getOneBooking',
      createContract: 'user/createContract',
    }),

    ...mapGetters({
      findBookingById: 'user/findBookingById',
    }),
    receiveNewTermsOfContract(terms) {
      this.contract = { ...terms };
    },
    doCreateContract() {
      this.contract.bookingId = this.bookingId;
      const { deal } = this.booking;
      this.contract.dealId = deal ? deal.dealId : null;
      this.contract.renterId = this.booking.renter.userId;
      this.contract.vendorId = this.booking.vendor.userId;
      this.contract.startTime = this.contract.startTime.getTime();
      this.contract.duration = Number(this.contract.duration);
      console.log(this.contract);
      this.createContract(this.contract);
    },
  },
  computed: {
    ...mapState({
      bookings: (state) => state.user.bookings,
      contracts: (state) => state.user.contracts,
    }),
    bookingId() {
      return this.$route.query.bookingId;
    },
    booking() {
      return this.findBookingById()(this.bookingId);
    },
    qrCodeValue() {
      return `contract: ${this.contracts.newlyCreated.contractId}, ${this.contracts.newlyCreated.qrCode}`;
    },
    newlyCreatedContract() {
      return this.contracts.newlyCreated;
    },
  },
  created() {
    if (this.bookings.data.length === 0) {
      this.getOneBooking(this.bookingId);
    }
  },
  watch: {
    newlyCreatedContract: {
      handler() {
        this.showQRDialog = true;
      },
      deep: true,
    },
  },
};
</script>
<style>
.headline {
  text-align: center;
}
</style>
