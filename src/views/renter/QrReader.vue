<template>
  <div
    v-if="!isLoading"
    class="d-flex justify-center"
  >
    <v-col cols="8">
      <v-card
        style="background-color: coral; height: auto"
        class="mt-5"
      >
        <p class="error">{{ error }}</p>
        <p class="decode-result">Last result: <b>{{ result }}</b></p>
        <qrcode-drop-zone
          @decode="onDecode"
          @init="logErrors"
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
      <v-btn @click="doUpdateBookingStatus">
          aaa
      </v-btn>
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
      // this.qrresult = this.updateBookingStatus(Number(this.result));
      // alert(this.qrresult);
    },
    doUpdateBookingStatus() {
      // alert(`số${Number(this.result)}`);
      // alert(`chữ${this.result}`);
      console.log('aaa');
      this.updateBookingStatus(58);
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
    Promise.all([this.getUser]).then(() => {
      this.getBookings();
    });
  },
};
</script>
