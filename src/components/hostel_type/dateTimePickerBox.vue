<template>
  <div class="info-card d-flex flex-column">
    <v-dialog :value="dateTimePicker.isOpenPicker">
      <dateTimePicker
        v-on:cancel="dateTimePicker.isOpenPicker = false"
        v-on:ok="receivedDateTime"
        :groupId="groupId"
      />
    </v-dialog>
    <div
      class="above d-flex flex-column justify-center align-center"
      style="background-color: #fff; height: 100%"
    >
      <v-sheet
        class="ma-6 pa-2 d-flex align-center justify-center"
        color="#F6F7F9"
        rounded
      >
        <v-avatar height="64" width="64" left>
          <v-img max-height="64" max-width="64" src="../../assets/logo.png" />
        </v-avatar>
        <p class="text-h5 text-center ma-2">{{name}}</p>
      </v-sheet>
      <div class="d-flex flex-wrap align-center">
        <v-rating
          v-model="rating.average"
          color="yellow"
          readonly
        >
        </v-rating>
        ({{rating.total}})
      </div>
      <v-btn class="ma-2" tile outlined color="success" @click="pick('date')">
        <v-icon left>fas fa-calendar-plus</v-icon>Chọn ngày giờ
      </v-btn>
      <v-spacer />
      <div
        v-if="dateTimePicker.date != null && dateTimePicker.time != null"
        class="d-flex flex-column align-center justify-center"
      >
        <v-sheet class="mb-2" outlined tile shaped>
          <p class="ma-1">Lịch hẹn của bạn</p>
          <p class="ma-1">
            Ngày:
            {{dateTimePicker.date.getDate()}}/
            {{dateTimePicker.date.getMonth()}}/
            {{dateTimePicker.date.getFullYear()}}
          </p>
          <p class="ma-1">Giờ: {{dateTimePicker.time}}</p>
        </v-sheet>
      </div>
    </div>
    <div class="below d-flex justify-center align-center">
      <v-dialog v-model="dialog.booking" persistent max-width="290">
        <template v-slot:activator="{ attrs }">
          <v-btn v-bind="attrs" color="red" outlined width="80%" class="ma-6" @click="book">
            <v-icon left>fas fa-paper-plane</v-icon>Đặt ngay!
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
import dateTimePicker from './dateTimePicker.vue';

export default {
  name: 'DateTimePickerBox',
  components: { dateTimePicker },
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
      this.showSnackbar('success', 'Bạn đã đặt lịch hẹn xem phòng thành công!!!');
    },
    receivedDateTime(event) {
      this.dateTimePicker.isOpenPicker = false;
      console.log(event);
      this.dateTimePicker.date = event.date;
      this.dateTimePicker.time = event.time;
    },
  },

};
</script>
<style lang="scss" scoped>
</style>
