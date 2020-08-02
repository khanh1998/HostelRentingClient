<template>
  <div class="info-card d-flex flex-column">
    <v-overlay :value="dateTimePicker.isOpenPicker">
      <dateTimePickerStepper
        v-on:cancel="dateTimePicker.isOpenPicker = false"
        v-on:ok="receivedDateTime"
        :groupId="groupId"
      />
    </v-overlay>
    <div
      class="above d-flex flex-column justify-center align-center rounded-lg"
      style="background-color: #fff;"
    >
      <v-sheet
        class="ma-6 pa-2 d-flex align-center justify-center rounded-pill"
        color="#F6F7F9"
        rounded
      >
        <v-avatar height="64" width="64" left>
          <v-img max-height="64" max-width="64" src="../../assets/logo.png" />
        </v-avatar>
        <p class="text-h6 font-weight-thin text-center ma-2">{{name}}</p>
      </v-sheet>
      <div class="d-flex flex-wrap align-center">
        <v-icon color="yellow" x-small>fas fa-star</v-icon>
        <span class="white--text">{{'_'}}</span>
        <p class="grey--text mb-0">{{` ${rating.average}/5 `}}</p>
        <span class="white--text">{{'_'}}</span>
        <p class="mb-0">({{rating.total}})</p>
      </div>
      <div class="d-flex">
        <v-btn color="orange" outlined @click="$emit('openMessage')" rounded class="my-2 mx-1">
          <v-icon>fas fa-comment-dots</v-icon>Nhắn tin ngay!
        </v-btn>
      </div>
    </div>
    <div class="below d-flex justify-center align-center">
      <v-dialog v-model="dialog.booking" persistent max-width="290">
        <template v-slot:activator="{ attrs }">
          <v-btn
            v-bind="attrs"
            color="primary"
            width="80%"
            class="ma-6"
            depressed
            :disabled="hasPendingBooking"
            @click="dateTimePicker.isOpenPicker = true"
          >
            <v-icon left>fas fa-paper-plane</v-icon>ĐẶT LỊCH XEM PHÒNG
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Xác nhận đặt lịch</v-card-title>
          <v-card-text v-if="dateTimePicker.date != null && dateTimePicker.time != null">
            Bạn muốn đặt lịch vào ngày
            <span>
              {{dateTimePicker.date.getDate()}}/
              {{dateTimePicker.date.getMonth()}}/
              {{dateTimePicker.date.getFullYear()}},
            </span>
            vào lúc {{dateTimePicker.time}}
            tại nhà trọ {{name}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog.booking = false">Không</v-btn>
            <v-btn color="green darken-1" text @click="sendBooking">Có</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.display" :bottom="snackbar.bottom" :color="snackbar.color">
        {{snackbar.message}}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.display = false">Đóng</v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import dateTimePickerStepper from './dateTimePickerStepper.vue';
import sendBookingRequest from '../../utils/booking';

export default {
  name: 'DateTimePickerBox',
  components: { dateTimePickerStepper },
  props: {
    name: String,
    rating: Object,
    groupId: Number,
    typeId: Number,
    vendorId: Number,
  },
  data: () => ({
    dateTimePicker: {
      isOpenPicker: false,
      date: null,
      time: null,
    },
    dialog: {
      booking: false,
    },
    snackbar: {
      display: false,
      message: '',
      color: 'red',
      bottom: true,
    },
  }),
  methods: {
    showSnackbar(color, message) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.display = true;
    },
    async sendBooking() {
      this.dialog.booking = false;
      this.showSnackbar('yellow', 'Booking của bạn đang được tạo');
      const [hours, minutes] = this.dateTimePicker.time.split(':');
      this.dateTimePicker.date.setHours(hours);
      this.dateTimePicker.date.setMinutes(minutes);
      this.dateTimePicker.date.setSeconds(0);
      const bookingObj = {
        renterId: 1,
        vendorId: 1,
        typeId: this.typeId,
        statusId: 1,
        dealId: 1,
        startTime: this.dateTimePicker.date.getTime(),
      };
      const success = await sendBookingRequest(bookingObj);
      if (success) {
        this.showSnackbar(
          'success',
          'Bạn đã đặt lịch hẹn xem phòng thành công!!!',
        );
      } else {
        this.showSnackbar('red', 'Đặt lịch xem phòng thất bại');
      }
    },
    async receivedDateTime(event) {
      this.dateTimePicker.isOpenPicker = false;
      console.log(event);
      this.dateTimePicker.date = event.date;
      this.dateTimePicker.time = event.time;
      await this.sendBooking();
    },
  },
  computed: {
    ...mapGetters({
      findPendingBooking: 'user/findPendingBooking',
    }),
    hasPendingBooking() {
      const renterId = this.userState.data.userId;
      const res = this.findPendingBooking(renterId, this.vendorId, this.typeId);
      if (!res) {
        return false;
      }
      return true;
    },
    userState() {
      return this.$store.state.user.user;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
