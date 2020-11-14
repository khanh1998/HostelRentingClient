<template>
  <v-row class="mx-0 mt-3 d-flex flex-column">
    <span style="text-align: center" class="text-primary-dark font-nunito size9rem mb-2"
      >Cài đặt lịch rảnh các ngày trong tuần để người thuê có thể gặp bạn hoặc quản lý của khu trọ
      để xem phòng trọ.</span
    >
    <v-row>
      <v-col cols="4">
        <div class="d-flex flex-row">
          <el-time-select
            placeholder="Từ"
            v-model="from"
            fg-input
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:30',
            }"
          >
          </el-time-select>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="d-flex flex-row">
          <el-time-select
            placeholder="Đến"
            v-model="to"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:30',
            }"
          >
          </el-time-select>
        </div>
      </v-col>
      <v-col cols="4">
        <div v-show="!visibleCreateSchedule">
          <v-btn
            class="bg-danger-lighten elevation-0 text-danger font-nunito size9rem d-flex justify-start ml-auto"
            style="letter-spacing: 0.01rem !important"
            ><v-icon small class="mr-1">mdi-calendar-week</v-icon>Áp dụng</v-btn
          >
        </div>

        <v-menu :close-on-content-click="false" offset-y left v-model="menu">
          <template v-slot:activator="{ on, attrs }">
            <div v-show="visibleCreateSchedule">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="bg-danger-lighten elevation-0 text-danger font-nunito size9rem d-flex justify-start ml-auto"
                style="letter-spacing: 0.01rem !important"
                ><v-icon small class="mr-1">mdi-calendar-week</v-icon>Áp dụng</v-btn
              >
            </div>
          </template>
          <v-card class="pt-4" min-width="500" max-width="500">
            <v-checkbox
              v-model="selectAll"
              label="Tất cả các ngày trong tuần"
              class="filter checkbox-primary mt-0 ml-5 mb-1"
              color="#4250f2"
              hide-details
              @click="selectAllDay()"
            ></v-checkbox>
            <v-divider></v-divider>
            <div class="d-flex flex-wrap pr-5">
              <v-checkbox
                v-model="selectDay"
                v-for="item in allSchedule"
                v-bind:key="item.scheduleId"
                :label="item.dayOfWeek"
                :value="item.scheduleId"
                hide-details
                class="filter mt-1 text-capitalize ml-5 checkbox"
                color="#727cf5"
              ></v-checkbox>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="menu = false" class="font-nunito size-sub-3"> Hủy </v-btn>
              <v-btn color="#4250f2" text class="font-nunito size-sub-3" @click="addSchedule()">
                Thêm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <span class="font-nunito text-danger size9rem" v-show="!visibleCreateSchedule"
      >Vui lòng chọn thời gian rảnh</span
    >
    <v-row>
      <ScheduleItem
        v-for="item in newGroup.schedules"
        v-bind:key="item.scheduleId"
        :schedule="item"
      />
    </v-row>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import ScheduleItem from './ScheduleItem.vue';

export default {
  name: 'ScheduleManagement',
  data: () => ({
    selected: [],
    recommendList: [],
    values: '',
    from: '',
    to: '',
    selectAll: false,
    selectDay: [],
    menu: false,
    schedules: [],
  }),
  components: { ScheduleItem },
  computed: {
    allSchedule() {
      return this.$store.state.renter.common.schedule.data;
    },
    newGroup() {
      return this.$store.state.vendor.group.newGroup;
    },
    visibleCreateSchedule() {
      if (this.from === '' || this.to === '' || this.from === null || this.to === null) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions({
      setNewGroupValue: 'vendor/group/setNewGroupValue',
    }),
    selectCheckBox() {
      this.newGroup.regulation = this.selected;
      this.setNewGroupValue(this.newGroup);
    },
    selectAllDay() {
      const scheduleIds = [];
      if (this.selectAll) {
        this.allSchedule.forEach((item) => scheduleIds.push(item.scheduleId));
      }
      this.selectDay = scheduleIds;
    },
    addSchedule() {
      const time = `${this.from} - ${this.to}`;
      if (this.newGroup.schedules.length === 0) {
        this.selectDay.forEach((item) => {
          this.newGroup.schedules.push({ scheduleId: item, timeRange: [time] });
        });
      } else {
        this.selectDay.forEach((item) => {
          const index = this.newGroup.schedules.findIndex(
            (schedule) => schedule.scheduleId === item,
          );
          if (index !== -1) {
            this.newGroup.schedules[index].timeRange.push(time);
          } else {
            this.newGroup.schedules.push({ scheduleId: item, timeRange: [time] });
          }
        });
      }
      this.newGroup.schedules.sort((a, b) => a.scheduleId - b.scheduleId);
      this.setNewGroupValue(this.newGroup);
      this.menu = false;
    },
  },
  created() {},
};
</script>

<style>
.dropzone {
  border: 2px dashed #dee2e6;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  min-height: 150px;
  padding: 20px;
}
.checkbox-primary .theme--light.v-label {
  color: #727cf5 !important;
  font-size: 0.875rem !important;
  font-family: 'Nunito', sans-serif !important;
}
</style>
