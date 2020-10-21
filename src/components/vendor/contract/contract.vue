<template>
  <v-card class="overflow-y-auto" max-height="100%" ref="contractView" id="contractView">
    <v-dialog v-model="contracts.isCreating" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Hợp đồng đang được tạo
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showQRDialog" width="350">
      <v-card>
        <v-card-title style="background-color: #98b7d7; color: white;">Mã quét</v-card-title>
        <v-card-text>
          <p>Người xem phòng quét mã để xem lại và kích hoạt hợp đồng.</p>
          <div class="d-flex justify-center align-center">
            <QrcodeVue :value="qrCodeValue" v-if="contracts.newlyCreated" :size="200" level="H" />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="d-flex justify-center" style="font-size: 45px;">{{ heading }}</div>
    <v-tabs v-model="tabs.index">
      <v-tab>
        1. Thông tin hai bên
      </v-tab>
      <v-tab>
        2. Điều khoản
      </v-tab>
      <v-tab-item>
        <div class="d-flex flex-column justify-center align-center">
          <InfomationSection :renter="booking.renter" :vendor="booking.vendor" />
          <v-btn color="primary" large class="ma-2" @click="goToNextTab"
            >Tiếp tục <v-icon>arrow_forward_ios</v-icon></v-btn
          >
        </div>
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
    heading: 'HỢP ĐỒNG THUÊ PHÒNG TRỌ',
    contract: {},
    showQRDialog: false,
    tabs: {
      index: 0,
    },
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
      this.contract.duration = Number(this.contract.duration);
      console.log(this.contract);
      this.createContract(this.contract);
    },
    goToNextTab() {
      this.tabs.index += 1;
      document.getElementById('contractView').scrollTop = 0;
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
