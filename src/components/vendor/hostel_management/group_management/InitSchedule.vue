<template>
  <v-row style="background-color: #f7f7f9; border-radius: 0.5rem" class="my-3 pl-4 py-2">
    <v-col cols="5" class="d-flex px-0">
      <v-col
        cols="4"
        class="d-flex flex-column align-center py-3 px-2"
        v-for="item in newGroup.schedules"
        v-bind:key="item.scheduleId"
        style="border-radius: 0.35rem"
      >
        <v-btn
          class="elevation-0 font-nunito size9rem d-flex justify-center font-weight-600 text-capitalize"
          style="
            letter-spacing: 0.01rem !important;
            border: 1px solid #324581;
            color: #324581;
            background-color: #fff;
          "
          max-width="110"
          min-width="110"
          @click="openDialog(item.scheduleId)"
          ><v-icon small class="mr-1">mdi-alarm-plus</v-icon>{{ item.dayOfWeek }}</v-btn
        >
        <div v-if="item.timeRange.length > 0" class="d-flex flex-column align-center mt-2">
          <div
            v-for="time in item.timeRange"
            v-bind:key="time"
            class="font-nunito size9rem mt-2 py-2"
            style="
              background-color: #eaecf2;
              border-radius: 0.25rem;
              width: 110px;
              text-align: center;
              position: relative;
            "
          >
            <v-hover v-slot="{ hover }">
              <div>
                {{ time }}
                <v-expand-transition>
                  <v-icon
                    size="25"
                    color="#fff"
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out cursor"
                    style="
                      height: 100%;
                      width: 110px;
                      position: absolute;
                      top: 0;
                      background-color: rgba(0, 0, 0, 0.45);
                      border-radius: 0.25rem;
                    "
                    @click="removeFreeTime(item.scheduleId, time)"
                  >
                    mdi-delete-forever
                  </v-icon>
                </v-expand-transition>
              </div>
            </v-hover>
          </div>
        </div>
      </v-col>
    </v-col>
    <v-dialog v-model="showAddNewFreeTime" hide-overlay persistent max-width="600px">
      <v-card class="d-flex pa-4">
        <v-row class="ma-0">
          <v-col cols="4">
            <v-autocomplete
              v-model="from"
              :items="timeFrom"
              label="Từ"
              class="size9rem font-nunito form"
              solo
              dense
              color="indigo"
              hide-details
              background-color="white"
              no-data-text="Không có kết quả phù hợp"
              style="border: 1px solid #e1e1e1 !important; border-radius: 4px"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="to"
              :items="timeTo"
              label="Đến"
              class="size9rem font-nunito form"
              solo
              dense
              color="indigo"
              hide-details
              background-color="white"
              no-data-text="Không có kết quả phù hợp"
              style="border: 1px solid #e1e1e1 !important; border-radius: 4px"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4" class="d-flex justify-end">
            <v-btn class="btn btn-primary font-nunito mx-4" @click="addNewFreeTime()"> Thêm </v-btn>
            <v-btn class="btn btn-light red--text elevation-0 font-nunito" @click="closeDialog()">
              Hủy
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'InitSchedule',
  data: () => ({
    showAddNewFreeTime: false,
    from: '05:00',
    to: '',
    day: -1,
    schedule: [],
  }),
  computed: {
    allSchedule() {
      return this.$store.state.renter.common.schedule.data;
    },
    newGroup() {
      return this.$store.state.vendor.group.newGroup;
    },
    timeFrom() {
      let times = this.getFullTimes('05:00', '21:30', 'asc');
      let timeSelected = this.newGroup.schedules.find((item) => item.scheduleId === this.day);
      let timeIgnore = [];
      if (timeSelected) {
        timeSelected = timeSelected.timeRange;
        timeSelected.forEach((item) => {
          const [start, end] = item.split(' - ');
          timeIgnore = [...timeIgnore, ...this.getFullTimes(start, end, 'asc')];
        });
        timeIgnore.forEach((item) => {
          times = times.filter((t) => t !== item);
        });
      }
      return times;
    },
    timeTo() {
      let times = this.getTimes(String(this.from), '22:00', 'asc');
      let timeSelected = this.newGroup.schedules.find((item) => item.scheduleId === this.day);
      let timeIgnore = [];
      if (timeSelected) {
        timeSelected = timeSelected.timeRange;
        timeSelected.forEach((item) => {
          const [start, end] = item.split(' - ');
          timeIgnore = [...timeIgnore, ...this.getTimes(start, end, 'asc')];
        });
        timeIgnore.forEach((item) => {
          times = times.filter((t) => t !== item);
        });
        // const startTimes = timeSelected.map((item) => ({
        //   hour: Number(item.slice(0, 5).trim().split(':')[0]),
        //   minute: Number(item.slice(0, 5).trim().split(':')[1]),
        // }));
        const startTimes = timeSelected.map((item) => item.slice(0, 5).trim());
        startTimes.push(this.from);
        startTimes.sort((prev, next) => {
          const [prevHour, prevMinute] = prev.split(':').map((item) => Number(item));
          const [nextHour, nextMinute] = next.split(':').map((item) => Number(item));
          return prevHour !== nextHour ? prevHour - nextHour : prevMinute - nextMinute;
        });
        if (startTimes.indexOf(this.from) < startTimes.length - 1) {
          const endTime = startTimes[startTimes.indexOf(this.from) + 1];
          const endTimeNumber = {
            hour: Number(endTime.slice(0, 5).trim().split(':')[0]),
            minute: Number(endTime.slice(0, 5).trim().split(':')[1]),
          };
          const halfBeforeEndTime =
            endTimeNumber.minute === 0
              ? `${endTimeNumber.hour - 1}:30` // eslint-disable-line
              : `${endTimeNumber.hour}:00`; // eslint-disable-line
          return times.slice(0, times.indexOf(halfBeforeEndTime) + 1);
        }
      }
      return times;
    },
  },
  methods: {
    ...mapActions({
      setNewGroupValue: 'vendor/group/setNewGroupValue',
    }),
    getTimes(from, to, sort) {
      const [fromH, fromM] = from.split(':').map((m) => Number(m));
      const [toH, toM] = to.split(':').map((m) => Number(m));
      const hourArr = [...Array(toH - fromH + 1)];
      const preSort = hourArr.flatMap((_, index) => {
        const indexHour = fromH + index;
        if (index === 0 && fromH === toH) {
          return fromM < 30 && toM >= 30 // eslint-disable-line
            ? `${indexHour}:30` // eslint-disable-line
            : []; // eslint-disable-line
        }
        // getTimes
        if (index === 0) {
          // min output = start + 30m
          return fromM < 30 // eslint-disable-line
            ? `${indexHour}:30` // eslint-disable-line
            : []; // eslint-disable-line
        }

        // if (index === 0) {
        //   // min output = start + 30m
        //   return fromM == 0 // eslint-disable-line
        //     ? [`${indexHour}:00`, `${indexHour}:30`] // eslint-disable-line
        //     : fromM < 30 // eslint-disable-line
        //     ? `${indexHour}:30` // eslint-disable-line
        //     : []; // eslint-disable-line
        // }
        if (index === hourArr.length - 1) {
          return toM < 30 ? `${indexHour}:00` : [`${indexHour}:00`, `${indexHour}:30`];
        }
        return [`${indexHour}:00`, `${indexHour}:30`];
      });
      if (sort === 'desc') {
        return preSort.reverse();
      }
      return preSort;
    },
    getFullTimes(from, to, sort) {
      const [fromH, fromM] = from.split(':').map((m) => Number(m));
      const [toH, toM] = to.split(':').map((m) => Number(m));
      const hourArr = [...Array(toH - fromH + 1)];
      const preSort = hourArr.flatMap((_, index) => {
        const indexHour = fromH + index;
        if (index === 0 && fromH === toH) {
          return fromM < 30 && toM >= 30 // eslint-disable-line
            ? `${indexHour}:30` // eslint-disable-line
            : []; // eslint-disable-line
        }
        // get Fulltimes
        if (index === 0) {
          // min output = start + 30m
          return fromM == 0 // eslint-disable-line
            ? [`${indexHour}:00`, `${indexHour}:30`] // eslint-disable-line
            : fromM <= 30 // eslint-disable-line
            ? `${indexHour}:30` // eslint-disable-line
            : []; // eslint-disable-line
        }
        // if (index === 0) {
        //   // min output = start + 30m
        //   return fromM < 30 // eslint-disable-line
        //     ? `${indexHour}:30` // eslint-disable-line
        //     : []; // eslint-disable-line
        // }
        if (index === hourArr.length - 1) {
          return toM >= 30 // eslint-disable-line
            ? [`${indexHour}:00`, `${indexHour}:30`] // eslint-disable-line
            : `${indexHour}:00`; // eslint-disable-line
        }
        return [`${indexHour}:00`, `${indexHour}:30`];
      });
      if (sort === 'desc') {
        return preSort.reverse();
      }
      return preSort;
    },
    openDialog(scheduleId) {
      this.day = scheduleId;
      this.showAddNewFreeTime = true;
    },
    closeDialog() {
      this.showAddNewFreeTime = false;
      this.from = '05:00';
      this.to = '';
      this.day = -1;
    },
    addNewFreeTime() {
      const time = `${this.from} - ${this.to}`;
      const index = this.newGroup.schedules.findIndex((item) => item.scheduleId === this.day);
      this.newGroup.schedules[index].timeRange.push(time);
      this.setNewGroupValue(this.newGroup);
      this.closeDialog();
    },
    removeFreeTime(scheduleId, timeRange) {
      const index = this.newGroup.schedules.findIndex((item) => item.scheduleId === scheduleId);
      this.newGroup.schedules[index].timeRange = this.newGroup.schedules[index].timeRange.filter(
        (item) => item !== timeRange,
      );
      this.setNewGroupValue(this.newGroup);
    },
  },
  created() {
    this.newGroup.schedules = this.allSchedule.map((item) => ({
      scheduleId: item.scheduleId,
      dayOfWeek: item.dayOfWeek,
      timeRange: [],
    }));
  },
};
</script>

<style>
.day:hover {
  background-color: #f1f1f4 !important;
}
</style>
