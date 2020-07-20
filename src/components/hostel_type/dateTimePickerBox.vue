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
            @click="pick('date')"
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
import dateTimePickerStepper from './dateTimePickerStepper.vue';

export default {
  name: 'DateTimePickerBox',
  components: { dateTimePickerStepper },
  props: {
    name: String,
    rating: Object,
    groupId: Number,
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
    pick(name) {
      if (name === 'date') {
        this.dateTimePicker.isOpenPicker = !this.dateTimePicker.isOpenPicker;
      }
      if (name === 'time') {
        this.timePicker.isOpenPicker = !this.timePicker.isOpenPicker;
      }
    },
    showSnackbar(color, message) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.display = true;
    },
    isPickDateAndTime() {
      const pickedTime = this.dateTimePicker.time;
      const pickedDate = this.dateTimePicker.date;
      if (pickedTime === null || pickedDate === null) {
        this.showSnackbar('red', 'Hãy chọn thời gian trước khi đặt lịch!');
        return false;
      }
      return true;
    },
    book() {
      if (this.isPickDateAndTime()) {
        this.dialog.booking = true;
      }
    },
    sendBooking() {
      this.dialog.booking = false;
      this.showSnackbar(
        'success',
        'Bạn đã đặt lịch hẹn xem phòng thành công!!!',
      );
    },
    receivedDateTime(event) {
      this.dateTimePicker.isOpenPicker = false;
      console.log(event);
      this.dateTimePicker.date = event.date;
      this.dateTimePicker.time = event.time;
      this.sendBooking();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
