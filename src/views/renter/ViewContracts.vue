<template>
  <!-- eslint-disable max-len -->
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="signing" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Đang ký hợp đồng
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="signingResult.show" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-title>
          <span v-if="signingResult.success"> Ký hợp đồng thành công </span>
          <span v-if="!signingResult.success"> Ký hợp đồng thất bại </span>
        </v-card-title>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-btn icon @click="signingResult.show = false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="payReserveFee.show" hide-overlay persistent width="300">
      <v-card v-if="!payReserveFee.showResult">
        <v-card-title class="primary"> Xác nhận thanh toán tiền cọc giữ chỗ </v-card-title>
        <v-card-text>
          Tải lên hình ảnh của biên lai đóng tiền giữ chỗ cho chủ trọ
          <image-editor :oldImages="[]" @newValues="receiveNewImages" />
        </v-card-text>
        <v-card-actions>
          <v-btn icon :disabled="payReserveFee.images.length === 0" @click="doPayReserveFee"
            ><v-icon>send</v-icon></v-btn
          >
          <v-btn icon @click="payReserveFee.show = false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="payReserveFee.showResult">
        <v-card-title class="primary">
          <span v-if="payReserveFee.success">Xác nhận thanh toán tiền giữ chỗ thành công</span>
          <span v-if="!payReserveFee.success">Xác nhận thanh toán tiền giữ chỗ thất bại</span>
        </v-card-title>
        <v-card-actions>
          <v-btn icon @click="payReserveFee.show = false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="signAndPay.show" persistent max-width="300">
      <v-card>
        <v-stepper v-model="signAndPay.step" vertical class="elevation-0 pt-3">
          <v-stepper-step :complete="signAndPay.step > 1" step="1"> Ký hợp đồng </v-stepper-step>
          <v-stepper-content step="1">
            <v-card>
              <v-card-text>
                <v-chip @click="doActivateContract">Nhấn vào đây</v-chip> để đọc và ký hợp đồng.
              </v-card-text>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :complete="signAndPay.step > 2" step="2">
            Thanh toán tiền cọc giữ chỗ
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-card>
              <v-card-text>
                Chuyển khoản tiền cọc giữ chỗ cho chủ trọ. Sau đó
                <v-chip @click="doPayReserveFee">Nhấn vào đây</v-chip> để gửi ảnh biên lai chuyển
                tiền cho chủ trọ.
              </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="signAndPay.show = false"> Đóng </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="contractOverlay.show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card v-if="contractOverlay.contract">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="contractOverlay.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Hợp đồng</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="d-flex flex-column justify-center pa-2">
          <div style="height: calc(100vh - 128px); overflow: hidden">
            <PDFDocument :url="contractOverlay.contract.contractUrl" :scale="scale" />
          </div>
          <div v-if="contractOverlay.action === 'activate'" class="d-flex justify-center">
            <v-btn class="ma-1" outlined color="red" text @click="doActivateContract">
              <v-icon>edit</v-icon> Ký hợp đồng
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-container v-if="!isLoading">
      <v-row justify="center" class="py-10">
        <v-col cols="11" sm="11" md="11" lg="11" xl="10">
          <v-row class="hidden-xs-only">
            <div class="d-flex px-4" style="width: 100%">
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
            </div>
          </v-row>
          <v-row class="mt-2">
            <div
              v-for="contract in contracts.data"
              v-bind:key="contract.contractId"
              style="width: 100%"
            >
              <contractItem
                :contract="contract"
                @view-detail="viewContractDetail"
                @activate="openActivateContract"
                @pay-reserve-fee="showPayReserveFee"
              />
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
import snackBarMixin from '../../components/mixins/snackBar';
import PDFDocument from '../../components/vendor/pdfviewer/PDFDocument.vue';
import mobileMixin from '../../components/mixins/mobile';
import ImageEditor from '../../components/vendor/hostel_management/ImageEditor.vue';

export default {
  name: 'ViewContracts',
  components: { contractItem, PDFDocument, ImageEditor },
  mixins: [snackBarMixin, mobileMixin],
  data: () => ({
    contractOverlay: {
      show: false,
      action: null, // view or activate
      contract: null,
    },
    signingResult: {
      show: false,
      success: null,
    },
    payReserveFee: {
      show: false,
      images: [],
      contractId: null,
      success: false,
      showResult: false,
    },
    signAndPay: {
      show: false,
      step: 1,
    },
  }),
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
      getUser: 'user/getUser',
      activateContract: 'user/activateContract',
      updateContract: 'user/updateContract',
      sendNotification: 'user/sendNotification',
    }),
    receiveNewImages(images) {
      this.payReserveFee.images = images.map((img) => ({ ...img, reserved: true }));
    },
    showPayReserveFee(contractId) {
      // this.payReserveFee.show = true;
      this.signAndPay.show = true;
      this.payReserveFee.contractId = contractId;
    },
    doPayReserveFee() {
      this.payReserveFee.showResult = false;
      this.payReserveFee.success = false;
      const contract = this.contracts.data.find(
        (c) => c.contractId === this.payReserveFee.contractId,
      );
      contract.roomId = contract.room.roomId;
      contract.paid = true;
      contract.images = this.payReserveFee.images;
      console.log(contract);
      this.updateContract(contract).then(() => {
        const { success } = this.contracts;
        this.payReserveFee.success = success;
        this.payReserveFee.showResult = true;
        const title = `${contract.renter.username} đóng tiền cọc giữ chân`;
        const body = `${contract.downPayment} triệu đồng`;
        const action = 'PAY_RESERVE_FEE';
        const id = contract.contractId;
        const vendorId = contract.vendor.userId;
        const renterId = null;
        const icon = contract.renter.avatar;
        const payload = {
          title,
          body,
          action,
          id,
          vendorId,
          renterId,
          icon,
        };
        if (success) {
          this.signAndPay.step += 1;
          this.sendNotification(payload);
        }
      });
    },
    doActivateContract() {
      console.log('doactivatecontract');
      const payload = {
        contractId: this.contractOverlay.contract.contractId,
        qrCode: this.contractOverlay.contract.qrCode,
      };
      this.activateContract(payload).then(() => {
        this.contractOverlay.show = false;
        this.signingResult.show = true;
        const { success, error } = this.contracts;
        if (success) {
          this.signingResult.success = true;
          console.log(success);
          this.showSnackBar('Kích hoạt hợp đồng thành công', { color: 'green' });
          this.signAndPay.step += 1;
        } else {
          this.signingResult.success = false;
          console.log(error);
          this.showSnackBar(`Kích hoạt hợp đồng thất bại ${error.message}`, { color: 'red' });
        }
      });
    },
    viewContractDetail(contractId) {
      console.log(contractId);
      this.contractOverlay.show = true;
      this.contractOverlay.action = 'view';
      this.contractOverlay.contract = this.contracts.data.find((c) => c.contractId === contractId);
    },
    openActivateContract(contractId) {
      console.log(contractId);
      this.contractOverlay.show = true;
      this.contractOverlay.action = 'activate';
      this.contractOverlay.contract = this.contracts.data.find((c) => c.contractId === contractId);
    },
  },
  created() {
    this.getUser().then(() => {
      this.getContracts();
    });
  },
  computed: {
    scale() {
      if (this.isMobile) {
        return 2;
      }
      return 1;
    },
    isLoading() {
      const loadingUser = this.$store.state.user.user.isLoading;
      const loadingContracts = this.$store.state.user.contracts.isLoading;
      const updatingContracts = this.$store.state.user.contracts.isUpdating;
      return loadingUser || loadingContracts || updatingContracts;
    },
    signing() {
      return this.$store.state.user.contracts.isUpdating;
    },
    contracts() {
      return this.$store.state.user.contracts;
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
