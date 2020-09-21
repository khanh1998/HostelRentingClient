<template>
  <!-- eslint-disable max-len -->
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="!isLoading">
      <div v-if="stepper.step == 1">
        <v-card color="white" width="400" class="px-1 pb-6 pt-2">
          <v-card-text>
            <span
              class="font-weight-bold text-subtitle-2 py-0"
              :style="{ color: '#101526', textAlign: 'center' }"
            >Chọn Ngày</span>
            <div :style="{ width: '30px', height: '2px', backgroundColor: '#4F60C9' }"></div>
          </v-card-text>
          <v-chip-group class="mt-3" mandatory light v-model="pickedDate" center-active show-arrows>
            <v-chip
              light
              v-for="i in 7"
              v-bind:key="i"
              label
              large
              class="pickDay mr-1 d-flex justify-center align-center"
              active-class="white--text"
              style="height: 60px"
              link
              @click="getTimesForDate(dates[i - 1].getDay())"
            >
              <!-- <v-sheet
                class="d-flex flex-column justify-center align-center pa-1 flex-wrap"
                _light
              >-->
              <div class="d-flex flex-column justify-center align-center pa-1 flex-wrap">
                <p class="ma-0">{{ daysOfWeek[dates[i - 1].getDay()] }}</p>
                <p class="ma-0 font-weight-bold">{{ dates[i - 1].getDate() }}</p>
              </div>
              <!-- </v-sheet> -->
            </v-chip>
          </v-chip-group>
          <v-card-actions class="justify-center mt-4">
            <v-btn
              small
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2 white--text"
              depressed
              @click="stepper.step += 1"
            >Tiếp tục</v-btn>
            <v-btn
              small
              outlined
              color="#9e9fa7"
              class="text-caption px-4 py-2 mx-2"
              depressed
              @click="$emit('cancel')"
            >Hủy</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="stepper.step == 2">
        <v-card class="px-5 pb-6 pt-2" color="white" width="400" elevation="0">
          <v-card-text class="px-0">
            <span
              class="font-weight-bold text-subtitle-2 py-0"
              :style="{ color: '#101526', textAlign: 'center' }"
            >Chọn Giờ</span>
            <div :style="{ width: '30px', height: '2px', backgroundColor: '#4F60C9' }"></div>
          </v-card-text>
          <span v-for="time in timesForDate" v-bind:key="time">{{ time }}</span>
          <el-time-picker
            v-model="pickedTime"
            :picker-options="{
              selectableRange: timesForDate,
              step: '00:15:00',
            }"
            placeholder="Arbitrary time"
          ></el-time-picker>
          <v-chip-group v-model="selectedTime" light column center-active show-arrows>
            <v-chip
              light
              v-for="item in listHoursToChoice"
              v-bind:key="item"
              large
              label
              class="pickTime mr-1"
              active-class="white--text"
              link
              @click="pickedTime = item"
            >{{ item }}</v-chip>
          </v-chip-group>
          <v-card-actions>
            <v-btn
              small
              outlined
              color="#9e9fa7"
              class="text-caption px-4 py-2 mx-2"
              depressed
              @click="$emit('cancel')"
            >Hủy</v-btn>
            <v-btn
              small
              outlined
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2"
              depressed
              @click="stepper.step -= 1"
            >Quay lại</v-btn>
            <v-btn
              v-if="pickedTime"
              small
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2 white--text"
              depressed
              @click="stepper.step += 1"
            >Tiếp tục</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="stepper.step == 3">
        <v-card
          class="d-flex flex-column justify-center align-center pa-2"
          color="white"
          width="400"
        >
          <v-card-text class="d-flex flex-column">
            <span
              class="text-subtitle-1 font-weight-medium"
              :style="{ color: '#5a669f', textAlign: 'center' }"
            >Xác nhận bạn muốn đặt lịch hẹn xem phòng vào</span>
            <div class="d-flex justify-space-between mt-6 px-4">
              <div class="d-flex align-center">
                <div
                  class="d-flex justify-center align-center pa-2"
                  style="border: 2px solid #ecedf1; border-radius: 50px"
                >
                  <v-img max-height="15" max-width="15" src="../../assets/typeDetail/date.png" />
                </div>
                <span
                  class="ml-2 text-subtitle-2"
                  style="color: #101526"
                >{{ `${dates[pickedDate].toLocaleDateString('vi-vn')}` }}</span>
              </div>
              <div class="d-flex align-center">
                <div
                  class="d-flex justify-center align-center pa-2"
                  style="border: 2px solid #ecedf1; border-radius: 50px"
                >
                  <v-img max-height="15" max-width="15" src="../../assets/typeDetail/time.png" />
                </div>
                <span class="ml-2 text-subtitle-2" style="color: #101526">
                  {{
                  `${pickedTime.getHours()} : ${pickedTime.getMinutes()}`
                  }}
                </span>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              small
              outlined
              color="#9e9fa7"
              class="text-caption px-4 py-2 mx-2"
              depressed
              @click="$emit('cancel')"
            >Hủy</v-btn>
            <v-btn
              small
              outlined
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2"
              depressed
              @click="stepper.step -= 1"
            >Quay lại</v-btn>
            <v-btn
              small
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2"
              depressed
              @click="$emit('ok', pickDateAndTime())"
            >Đồng ý</v-btn>
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
      this.timesForDate = this.times[index - 1];
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
      console.log('thuy');
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
    console.log('thuy');
    console.log(this.getSchedules);
    this.dates = this.getListOf7Dates();
    console.log(this.date);
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
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.pickDay.v-chip--active {
  height: 70px !important;
  width: 20%;
  background-color: #4f60c9;
}
.pickTime.v-chip--active {
  background-color: #4f60c9;
}
</style>
