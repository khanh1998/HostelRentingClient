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
          <v-card-title class="headline" style="background-color: #98b7d7; color: white;">
            <span v-if="!bookings.success">Xác thực booking thất bại</span>
            <span v-if="bookings.success">Xác thực booking thành công</span>
          </v-card-title>
          <v-card-text class="d-flex justify-center mt-5">
            <span>{{ bookings.error }}</span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Đóng </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'QR-Reader',
  components: { QrcodeStream, QrcodeDropZone, QrcodeCapture },
  data: () => ({
    result: '',
    error: '',
    dialog: false,
    updating: false,
    noStreamApiSupport: false,
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getBookings: 'user/getBookings',
      updateBookingStatus: 'user/updateBookingStatus',
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
          console.log('contract', content);
          break;
        default:
          console.log('error');
      }
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
  },
  computed: {
    ...mapState('user', ['bookings', 'user']),
    isLoading() {
      return this.bookings.isLoading || this.user.isLoading;
    },
  },
  created() {
    this.getUser().then(() => this.getBookings());
  },
};
</script>
