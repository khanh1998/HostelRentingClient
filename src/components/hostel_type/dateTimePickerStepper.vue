<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="!isLoading">
      <div v-if="stepper.step == 1">
        <v-card color="white" class="pa-1" height="300px" width="300">
          <v-card-title class="grey--text">Chọn ngày</v-card-title>
          <v-chip-group mandatory light v-model="pickedDate" center-active show-arrows>
            <v-chip
              light
              v-for="i in 7"
              v-bind:key="i"
              label
              large
              class="mr-1"
              outlined
              active-class="red--text red"
              link
              @click="getTimesForDate(dates[i - 1].getDay())"
            >
              <v-sheet class="d-flex flex-column justify-center align-center pa-1 flex-wrap" light>
                <p class="ma-0">{{ daysOfWeek[dates[i - 1].getDay()] }}</p>
                <p class="ma-0 font-weight-bold">
                  {{ dates[i - 1].getDate() }}
                </p>
              </v-sheet>
            </v-chip>
          </v-chip-group>
          <v-card-actions class="justify-center">
            <v-btn color="amber" @click="$emit('cancel')">Hủy</v-btn>
            <v-btn color="green" @click="stepper.step += 1">Tiếp tục</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="stepper.step == 2">
        <v-card class="mb-1 pa-1" color="white" width="300" elevation="0">
          <v-card-title class="grey--text">Chọn giờ</v-card-title>
          <span v-for="time in timesForDate" v-bind:key="time">
            {{ time }}
          </span>
          <el-time-picker
            v-model="pickedTime"
            :picker-options="{
              selectableRange: timesForDate,
              step: '00:15:00',
            }"
            placeholder="Arbitrary time"
          >
          </el-time-picker>
          <v-chip-group v-model="selectedTime" light column center-active show-arrows>
            <v-chip
              light
              v-for="item in listHoursToChoice"
              v-bind:key="item"
              large
              label
              class="mr-1"
              outlined
              active-class="amber--text amber"
              link
              @click="pickedTime = item"
              >{{ item }}</v-chip
            >
          </v-chip-group>
          <v-card-actions>
            <v-btn color="amber" @click="$emit('cancel')">Hủy</v-btn>
            <v-btn color="primary" @click="stepper.step -= 1">Quay lại</v-btn>
            <v-btn v-if="pickedTime" color="green" @click="stepper.step += 1">Tiếp tục</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="stepper.step == 3">
        <v-card class="mb-12" color="white" width="300">
          <v-card-title class="grey--text">Xác nhận</v-card-title>
          <v-card-text class="grey--text">
            Bạn muốn đặt lịch hẹn vào ngày
            <p class="font-weight-bold green--text">
              {{ `${dates[pickedDate].toLocaleDateString('vi-vn')}` }}
            </p>
            vào lúc
            <p class="font-weight-bold green--text">
              {{ `${pickedTime.getHours()} : ${pickedTime.getMinutes()}` }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="amber" @click="$emit('cancel')">Hủy</v-btn>
            <v-btn color="primary" @click="stepper.step -= 1">Quay lại</v-btn>
            <v-btn color="green" @click="$emit('ok', pickDateAndTime())">Đồng ý</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'dateTimePickerStepper',
  props: {
    width: {
      type: Number,
      required: false,
      default: undefined,
    },
    groupId: Number,
  },
  data: () => ({
    stepper: {
      step: 1,
    },
    daysOfWeekEn: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    daysOfWeek: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    dates: [],
    timesForDate: null,
    pickedDate: 0,
    pickedTime: 0,
    selectedTime: null,
  }),
  methods: {
    ...mapActions({
      getSchedules: 'renter/hostelType/getSchedules',
    }),
    getNextDate(date) {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;
    },
    getListOf7Dates(length = 7) {
      // this function return list of seven dates from today
      const today = new Date();
      const dates = [today];
      for (let i = 0; i < length; i += 1) {
        dates.push(this.getNextDate(dates[i]));
      }
      return dates;
    },
    getTimesForDate(index) {
      this.timesForDate = this.times[index];
    },
    pickDateAndTime() {
      return {
        date: this.dates[this.pickedDate],
        time: `${this.pickedTime.getHours()} : ${this.pickedTime.getMinutes()}`,
      };
    },
    cancelPickDateAndTime() {
      this.pickedDate = null;
      this.pickedTime = null;
    },
    createScheduleObject(item) {
      // time has pattern '12:30' 'hh:MM'
      const [startTimeHours, startTimeMinutes] = item.startTime.split(':');
      const startTime = new Date();
      startTime.setHours(startTimeHours);
      startTime.setMinutes(startTimeMinutes);
      const [endTimeHours, endTimeMinutes] = item.endTime.split(':');
      const endTime = new Date();
      endTime.setHours(endTimeHours);
      endTime.setMinutes(endTimeMinutes);
      return {
        startTime,
        endTime,
      };
    },
    plusOneHour(date) {
      date.setHours(date.getHours() + 1);
      return date;
    },
    getTimeString(date) {
      return `${date.getHours()}:${date.getMinutes()}${date.getMinutes() < 10 ? '0' : ''}`;
    },
    makeListTimes(schedule) {
      // schedule contains a string startTime - endTime
      let [startTime, endTime] = schedule.split('-');
      startTime = new Date(Date(startTime));
      endTime = new Date(Date(endTime));
      const result = [];
      let current = new Date(startTime.getTime());
      while (current < endTime) {
        console.log(current);
        result.push(this.getTimeString(current));
        current = this.plusOneHour(current);
      }
      console.log(result);
      return result;
    },
  },
  created() {
    this.getSchedules(this.groupId).then(() => {
      [this.timesForDate] = this.times;
    });
    this.dates = this.getListOf7Dates();
  },
  computed: {
    rawSchedule() {
      return this.$store.state.renter.hostelType.schedules.data.schedules;
    },
    isLoading() {
      return this.$store.state.renter.hostelType.schedules.isLoading;
    },
    times() {
      const arr = [];
      this.daysOfWeekEn.forEach((day) => {
        let result = this.rawSchedule.find((item) => item.code.toUpperCase() === day.toUpperCase());
        result = result.timeRange.map((range) => {
          const [start, end] = range.split('-');
          return `${start.trim()}:00 - ${end.trim()}:00`;
        });
        arr.push(result);
      });
      return arr;
    },
    listHoursToChoice() {
      const result = [];
      this.timesForDate.forEach((times) => {
        result.push(...this.makeListTimes(times));
      });
      return result;
    },
  },
};
</script>
