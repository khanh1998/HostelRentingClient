<template>
  <v-sheet class="main d-flex flex-column pa-1 flex-wrap" light>
    <div class="above d-flex flex-column pa-1 flex-wrap">
      <p class="h6-text">CHỌN NGÀY</p>
      <v-chip-group mandatory dark v-model="pickedDate">
        <v-chip
          light
          v-for="i in 7" v-bind:key="i"
          x-large
          label
          class="mr-1"
          outlined
          active-class="red--text red"
          link
          @click="getTimesForDate(i-1)"
        >
          <v-sheet
            class="d-flex flex-column justify-center align-center ma-1 pa-1 flex-wrap"
            light
          >
            <p class="ma-0">{{daysOfWeek[dates[i].getDay()]}}</p>
            <p class="ma-0 text-h5 font-weight-bold">{{dates[i].getDate()-1}}</p>
          </v-sheet>
        </v-chip>
      </v-chip-group>
    </div>
    <div
      v-if="timesForDate != null"
      class="below d-flex flex-column align-center pa-1 flex-wrap"
    >
      <p class="h6-text">CHỌN THỜI GIAN</p>
      <v-chip-group mandatory dark  v-model="pickedTime">
        <v-chip
          light
          v-for="j in timesForDate.length" v-bind:key="j"
          x-large
          label
          class="mr-1"
          outlined
          active-class="amber--text amber"
          link
        >
          {{timesForDate[j-1]}}
        </v-chip>
      </v-chip-group>
    </div>
    <div class="d-flex justify-space-around mt-1">
      <v-btn
        color="warning"
        @click="$emit('cancel')"
      >
        HỦY
      </v-btn>
      <v-btn
        color="success"
        v-if="pickedDate != null && pickedTime != null"
        @click="$emit('ok', pickDateAndTime())"
      >
        CHỌN
      </v-btn>
    </div>
  </v-sheet>
</template>
<style scoped>

</style>
<script>
export default {
  name: 'DateTimePicker',
  data: () => ({
    times: [
      ['0', '8h - 12h', '13h - 18h', '19h - 20h'],
      ['1', '8h - 12h', '13h - 18h', '19h - 20h'],
      ['2', '8h - 12h', '13h - 18h', '19h - 20h'],
      ['3', '8h - 12h', '13h - 18h', '19h - 20h'],
      ['4', '8h - 12h', '13h - 18h', '19h - 20h'],
      ['5', '8h - 12h', '13h - 18h', '19h - 20h'],
      ['6', '8h - 12h', '13h - 18h', '19h - 20h'],
    ],
    // daysOfWeek: ['monday', 'tuesday', 'wednesday', 'friday', 'friday', 'saturday', 'sunday'],
    daysOfWeek: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dates: [],
    timesForDate: null,
    pickedDate: null,
    pickedTime: null,
  }),
  methods: {
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
        time: this.times[this.pickedDate][this.pickedTime],
      };
    },
    cancelPickDateAndTime() {
      this.pickedDate = null;
      this.pickedTime = null;
    },
  },
  created() {
    this.dates = this.getListOf7Dates();
    [this.timesForDate] = this.times;
    console.log(this.timesForDate);
  },
};
</script>
