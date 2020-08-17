<template>
  <div
    v-if="!isLoading"
    class="d-flex justify-center"
  >
    <v-col cols="8">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-card
            style="background-color: coral; height: auto"
            class="mt-5"
          >
            <p class="error">{{ error }}</p>
            <p class="decode-result">Last result: <b>{{ result }}</b></p>
            <qrcode-drop-zone
              @decode="onDecode"
              @init="logErrors"
              v-on="on"
              v-bind="attrs"
            >
              <qrcode-stream
                @decode="onDecode"
                @init="onInit"
              />
            </qrcode-drop-zone>
            <qrcode-capture
              v-if="noStreamApiSupport"
              @decode="onDecode"
            />
          </v-card>
        </template>

        <v-card>
          <v-card-title
            class="headline"
            style="background-color: #98B7D7; color: white"
          >
            Xác nhận
          </v-card-title>

          <v-card-text class="d-flex justify-center mt-5">
            Xác nhận quét thành công !
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="doUpdateBookingStatus()"
            >
              Đóng
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import { mapActions } from 'vuex';

export default {
  name: 'QR-Reader',
  components: { QrcodeStream, QrcodeDropZone, QrcodeCapture },
  data: () => ({
    result: '',
    error: '',
    dialog: false,
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
      this.dialog = true;
    },
    doUpdateBookingStatus() {
      // alert(`số${Number(this.result)}`);
      // alert(`chữ${this.result}`);
      console.log('aaa');
      this.updateBookingStatus(Number(this.result));
      this.dialog = false;
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
    isLoading() {
      return this.$store.state.user.bookings.isLoading;
    },
    bookings() {
      return this.$store.state.user.bookings.data;
    },
  },
  created() {
    this.getUser().then(() => this.getBookings());
  },
};
</script>
