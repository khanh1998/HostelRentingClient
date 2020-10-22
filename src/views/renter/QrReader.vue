<template>
  <div v-if="!isLoading" class="d-flex justify-center" style="height: calc(100vh - 120px);">
    <v-col cols="12" md="6">
      <v-card style="height: 90%;">
        <p></p>
        <p class="error text-center">{{ error }}</p>
        <!-- <p class="decode-result">
              Last result: <b>{{ result }}</b>
            </p> -->
        <qrcode-drop-zone @decode="onDecode" @init="onInit" style="height: 100%;">
          <qrcode-stream @decode="onDecode" @init="onInit" />
        </qrcode-drop-zone>
        <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
      </v-card>
      <v-dialog v-model="bookings.isUpdating" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Đang xác thực
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline">
            <span v-if="!bookings.success" class="red--text"
              ><v-icon>report</v-icon> Xác thực booking thất bại</span
            >
            <span v-if="bookings.success" class="green--text"
              ><v-icon>done_outline</v-icon>Xác thực booking thành công</span
            >
          </v-card-title>
          <v-card-text v-if="bookings.error" class="d-flex justify-center mt-5">
            <span>{{ bookings.error }}</span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Đóng </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog :value="true" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card :loading="contracts.isLoading">
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <!-- <v-toolbar-title>Xem lại hợp đồng</v-toolbar-title> -->
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="activateContract">
                Kích hoạt hợp đồng
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!-- <v-progress-linear :value="previewDialog.pdfProgress"></v-progress-linear>
          <pdf :src="previewDialog.pdf" :page="1" @progress="progressPdf" /> -->
          <!-- {{ previewDialog.constract.type.title }} -->
        </v-card>
      </v-dialog>
      <v-dialog v-model="contracts.isUpdating" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Đang kích hoạt hợp đồng
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
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
          <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </div>
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
// import pdf from 'vue-pdf';
import { mapActions, mapState, mapGetters } from 'vuex';
import snackBarMixin from '../../components/mixins/snackBar';

export default {
  name: 'QR-Reader',
  mixins: [snackBarMixin],
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    // pdf,
  },
  data: () => ({
    result: '',
    error: '',
    dialog: false,
    updating: false,
    noStreamApiSupport: false,
    previewDialog: {
      show: false,
      pdf: null,
      contractId: null,
      contractSecret: null,
      pdfProgress: 0,
      constract: null,
    },
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getBookings: 'user/getBookings',
      updateBookingStatus: 'user/updateBookingStatus',
      getContracts: 'user/getContracts',
      updateContract: 'user/updateContract',
    }),
    ...mapGetters({
      findContractById: 'user/findContractById',
    }),
    onDecode(result) {
      this.result = result;
      const [type, content] = this.result.split(':');
      console.log(type, content);
      switch (type) {
        case 'booking':
          console.log('booking', content);
          this.updateBookingStatus(Number(content)).then(() => {
            this.dialog = true;
          });
          break;
        case 'contract':
          this.showPreviewDialog(content);
          break;
        default:
          console.log('error');
      }
    },
    showPreviewDialog(content) {
      const [contractId, contractSecret] = content.split(',');
      this.previewDialog.show = true;
      this.previewDialog.contractId = contractId;
      this.previewDialog.contractSecret = contractSecret;
      this.getContracts(); // get new created contract
      const createdContract = this.findContractById()(contractId);
      this.previewDialog.constract = createdContract;
      this.previewDialog.pdf = 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'; // createdContract.pdf;
    },
    activateContract() {
      const payload = {
        contractId: this.previewDialog.contractId.trim(),
        qrCode: this.previewDialog.contractSecret.trim(),
      };
      this.updateContract(payload).then(() => {
        this.previewDialog.show = false;
        const { success, error } = this.contracts;
        if (success) {
          console.log(success);
          this.showSnackBar('Kích hoạt hợp đồng thành công', { color: 'green' });
          this.$router.push('/contract');
        } else {
          console.log(error);
          this.showSnackBar(`Kích hoạt hợp đồng thất bại ${error.message}`, { color: 'red' });
        }
      });
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson';
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        }
      }
    },
    progressPdf(progress) {
      this.previewDialog.pdfProgress = Math.ceil(progress * 100);
    },
  },
  computed: {
    ...mapState('user', ['bookings', 'user', 'contracts']),
    isLoading() {
      return this.bookings.isLoading || this.user.isLoading;
    },
  },
  created() {
    this.getUser().then(() => {
      this.getBookings();
      this.getContracts();
    });
  },
};
</script>
