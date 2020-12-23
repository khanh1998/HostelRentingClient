<template>
  <div style="overflow-y: auto; background-color: #fafbfe">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="!isLoading">
      <v-row class="d-flex justify-center ma-0 font-nunito">
        <v-col cols="12" md="11">
          <v-row class="d-flex align-center ma-0 justify-center">
            <span class="page-title">Cài đặt lịch rảnh của</span>
            <v-col cols="6" class="d-flex mx-5 flex-column justify-center">
              <v-autocomplete
                v-model="groupSelected"
                :items="groupSearch"
                label="Khu trọ"
                item-text="groupName"
                item-value="groupId"
                class="size9rem font-nunito light-autocomplete"
                solo
                dense
                color="#727cf5"
                hide-details
                background-color="#f1f3fa"
                no-data-text="Không có kết quả phù hợp"
              >
                <template slot="selection" slot-scope="{ item }">
                  <span class="font-nunito text-primary font-weight-600">{{ item.groupName }}</span>
                </template>
                <template slot="item" slot-scope="{ item }">
                  <span class="d-flex flex-column mb-3">
                    <span class="font-nunito size9rem text-primary-dark">{{ item.groupName }}</span>
                    <span class="font-nunito size-sub-3 text-gray"
                      >{{ item.buildingNo }}, {{ item.address.streetName }},
                      {{ item.address.districtName }} , {{ item.address.provinceName }}</span
                    >
                  </span>
                </template></v-autocomplete
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="11" class="my-0 py-0">
          <v-row
            style="background-color: #f1f3fa; border-radius: 0.5rem"
            class="my-3 mx-0 d-flex flex-column pl-4"
          >
            <v-col cols="12" class="pa-0">
              <v-row class="ma-0">
                <v-col cols="3">
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
                <v-col cols="3">
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
                <v-col cols="2">
                  <div v-show="!visibleCreateSchedule">
                    <v-btn
                      class="btn-success white--text font-nunito size9rem d-flex justify-start"
                      style="letter-spacing: 0.01rem !important"
                      height="40"
                      ><v-icon small class="mr-1">mdi-calendar-week</v-icon>Áp dụng</v-btn
                    >
                  </div>

                  <v-menu :close-on-content-click="false" offset-y left v-model="menu">
                    <template v-slot:activator="{ on, attrs }">
                      <div v-show="visibleCreateSchedule">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          height="40"
                          class="btn-success white--text font-nunito size9rem d-flex justify-start"
                          style="letter-spacing: 0.01rem !important"
                          ><v-icon small class="mr-1">mdi-calendar-week</v-icon>Áp dụng</v-btn
                        >
                      </div>
                    </template>
                    <v-card class="hidden-xs-only pt-4" min-width="500" max-width="500">
                      <v-checkbox
                        v-model="selectAll"
                        label="Tất cả các ngày trong tuần"
                        class="filter checkbox-primary checkbox-small mt-0 ml-5 mb-1"
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
                          class="filter mt-1 text-capitalize ml-5 checkbox-small"
                          color="#727cf5"
                        ></v-checkbox>
                      </div>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="menu = false" class="font-nunito size-sub-3">
                          Hủy
                        </v-btn>
                        <v-btn
                          color="#4250f2"
                          text
                          class="font-nunito size-sub-3"
                          @click="addSchedule()"
                        >
                          Thêm
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                    <v-card class="hidden-sm-and-up pt-4" min-width="400" max-width="400">
                      <v-checkbox
                        v-model="selectAll"
                        label="Tất cả các ngày trong tuần"
                        class="filter checkbox-primary checkbox-small mt-0 ml-5 mb-1"
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
                          class="filter mt-1 text-capitalize ml-5 checkbox-small"
                          color="#727cf5"
                        ></v-checkbox>
                      </div>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="menu = false" class="font-nunito size-sub-3">
                          Hủy
                        </v-btn>
                        <v-btn
                          color="#4250f2"
                          text
                          class="font-nunito size-sub-3"
                          @click="addSchedule()"
                        >
                          Thêm
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-col>
                <v-col cols="6" class="px-0 d-flex align-end">
                  <span class="red--text font-nunito size-caption">{{ errorMsg }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-row class="ma-0">
                <v-col cols="5" class="d-flex pa-0">
                  <v-col
                    cols="4"
                    class="d-flex flex-column align-center py-3 px-2"
                    v-for="item in group.schedules"
                    v-bind:key="item.scheduleId"
                    style="border-radius: 0.35rem"
                  >
                    <span
                      class="font-nunito size9rem d-flex justify-center font-weight-600 text-capitalize py-2"
                      style="
                        letter-spacing: 0.01rem !important;
                        border: 1px solid #324581;
                        color: #324581;
                        background-color: #fff;
                        width: 110px;
                        border-radius: 0.25rem;
                      "
                      ><v-icon small class="mr-1">mdi-alarm-plus</v-icon>{{ item.dayOfWeek }}</span
                    >
                    <div
                      v-if="item.timeRange.length > 0"
                      class="d-flex flex-column align-center mt-2"
                    >
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
              </v-row>
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
                    <v-btn class="btn btn-primary font-nunito mx-4" @click="addNewFreeTime()">
                      Thêm
                    </v-btn>
                    <v-btn
                      class="btn btn-light red--text elevation-0 font-nunito"
                      @click="closeDialog()"
                    >
                      Hủy
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'VendorScheduleTalbe',
  components: {},
  data: () => ({
    daysOfWeek: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'],
    schedules: [
      {
        scheduleId: 0,
        timeRange: [],
      },
      {
        scheduleId: 0,
        timeRange: [],
      },
      {
        scheduleId: 0,
        timeRange: [],
      },
      {
        scheduleId: 0,
        timeRange: [],
      },
      {
        scheduleId: 0,
        timeRange: [],
      },
      {
        scheduleId: 0,
        timeRange: [],
      },
      {
        scheduleId: 0,
        timeRange: [],
      },
    ],
    scheduleList: [],
    searchQuery: '',
    selectedGroup: [],
    selectedAllGroup: false,
    scheduleObjForGet: [],
    showAddNewFreeTime: false,
    from: '05:00',
    to: '',
    day: -1,
    schedule: [],
    selectAll: false,
    selectDay: [],
    menu: false,
    errorMsg: '',
    groupSchedules: [],
    scheduleObj: [],

    groupSelected: '',
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getGroups: 'vendor/group/getGroups',
      getAllSchedule: 'renter/common/getAllSchedule',
    }),
    selectAllDay() {
      const scheduleIds = [];
      if (this.selectAll) {
        this.allSchedule.forEach((item) => scheduleIds.push(item.scheduleId));
      }
      this.selectDay = scheduleIds;
    },
    checkDupplicateTime() {
      const dayDuplicate = [];
      this.selectDay.forEach((item) => {
        let timeSelected = this.groupSchedules.find((s) => s.scheduleId === item);
        let timeIgnore = [];
        if (timeSelected) {
          timeSelected = timeSelected.timeRange;
          timeSelected.forEach((t) => {
            const [start, end] = t.split(' - ');
            timeIgnore = [...timeIgnore, ...this.getTimes(start, end, 'asc')];
          });
          let flat = 0;
          timeIgnore.forEach((i) => {
            if (this.getFullTimes(this.from, this.to, 'asc').includes(i)) {
              flat += 1;
            }
          });
          if (flat > 0) {
            dayDuplicate.push(item);
          }
        }
      });
      return dayDuplicate;
    },
    addSchedule() {
      this.errorMsg = '';
      if (this.checkDupplicateTime().length > 0) {
        this.errorMsg = 'Lịch rảnh bạn vừa chọn hiện đang có khoảng thời gian trùng vào các ngày';
        this.checkDupplicateTime().forEach((item, index) => {
          this.errorMsg += ` ${this.allSchedule.find((s) => s.scheduleId === item).dayOfWeek}`;
          this.errorMsg += index === this.checkDupplicateTime().length - 1 ? '.' : ',';
        });
      } else {
        const time = `${this.from} - ${this.to}`;
        if (this.groupSchedules.schedules.length === 0) {
          this.selectDay.forEach((item) => {
            this.groupSchedules.schedules.push({ scheduleId: item, timeRange: [time] });
          });
        } else {
          this.selectDay.forEach((item) => {
            const index = this.groupSchedules.schedules.findIndex(
              (schedule) => schedule.scheduleId === item,
            );
            if (index !== -1) {
              this.groupSchedules.schedules[index].timeRange.push(time);
            } else {
              this.groupSchedules.schedules.push({ scheduleId: item, timeRange: [time] });
            }
          });
        }
        this.groupSchedules.schedules.sort((a, b) => a.scheduleId - b.scheduleId);
        this.selectedGroup.forEach((item) => {
          this.scheduleObj.push({
            groupId: item,
            schedules: this.groupSchedules.schedules,
          });
        });
        console.log(this.scheduleObj);
      }
      this.menu = false;
    },
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
    selectAllGroups() {
      const groupIds = [];
      if (this.selectedAllGroup) {
        this.groupSearch.forEach((item) => groupIds.push(item.groupId));
      }
      this.selectedGroup = groupIds;
    },
    checkSelectAll() {
      if (this.selectedGroup.length === this.groupSearch.length && !this.selectedAllGroup) {
        this.selectedAllGroup = true;
      }
      if (this.selectedGroup.length !== this.groupSearch.length && this.selectedAllGroup) {
        this.selectedAllGroup = false;
      }
    },
    sendData(scheduleObjList, id) {
      // console.log(scheduleObjList);
      // console.log(`bbbbbb${id}`);
      this.schedules[id - 1].timeRange = [];

      for (let scheduleObj = 0; scheduleObj < scheduleObjList.length; scheduleObj += 1) {
        const { startTime, endTime, scheduleId } = scheduleObjList[scheduleObj];
        if (scheduleId === 1) {
          this.schedules[0].scheduleId = scheduleId;
          if (this.schedules[0].timeRange.indexOf(`${startTime} - ${endTime}`) === -1) {
            this.schedules[0].timeRange.push(`${startTime} - ${endTime}`);
          }
        }
        if (scheduleId === 2) {
          this.schedules[1].scheduleId = scheduleId;
          if (this.schedules[1].timeRange.indexOf(`${startTime} - ${endTime}`) === -1) {
            this.schedules[1].timeRange.push(`${startTime} - ${endTime}`);
          }
        }
        if (scheduleId === 3) {
          this.schedules[2].scheduleId = scheduleId;
          if (this.schedules[2].timeRange.indexOf(`${startTime} - ${endTime}`) === -1) {
            this.schedules[2].timeRange.push(`${startTime} - ${endTime}`);
          }
        }
        if (scheduleId === 4) {
          this.schedules[3].scheduleId = scheduleId;
          if (this.schedules[3].timeRange.indexOf(`${startTime} - ${endTime}`) === -1) {
            this.schedules[3].timeRange.push(`${startTime} - ${endTime}`);
          }
        }
        if (scheduleId === 5) {
          this.schedules[4].scheduleId = scheduleId;
          if (this.schedules[4].timeRange.indexOf(`${startTime} - ${endTime}`) === -1) {
            this.schedules[4].timeRange.push(`${startTime} - ${endTime}`);
          }
        }
        if (scheduleId === 6) {
          this.schedules[5].scheduleId = scheduleId;
          if (this.schedules[5].timeRange.indexOf(`${startTime} - ${endTime}`) === -1) {
            this.schedules[5].timeRange.push(`${startTime} - ${endTime}`);
          }
        }
        if (scheduleId === 7) {
          this.schedules[6].scheduleId = scheduleId;
          if (this.schedules[6].timeRange.indexOf(`${startTime} - ${endTime}`) === -1) {
            this.schedules[6].timeRange.push(`${startTime} - ${endTime}`);
          }
        }
      }
    },
    customFilter(item, queryText) {
      const textOne = item.groupName.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    getScheduleId(dayOfWeek) {
      let scheduleId = 0;
      switch (dayOfWeek) {
        case 'thứ hai':
          scheduleId = 1;
          break;
        case 'thứ ba':
          scheduleId = 2;
          break;
        case 'thứ tư':
          scheduleId = 3;
          break;
        case 'thứ năm':
          scheduleId = 4;
          break;
        case 'thứ sáu':
          scheduleId = 5;
          break;
        case 'thứ bảy':
          scheduleId = 6;
          break;
        case 'chủ nhật':
          scheduleId = 7;
          break;
        default:
          scheduleId = 0;
          break;
      }
      return scheduleId;
    },
    clickGroup(group) {
      this.selectedGroup = group.groupName;
      this.scheduleList = [];
      const timeRange = [];
      group.schedules.forEach((element) => {
        const { scheduleId } = element;
        const { dayOfWeek } = element;
        element.timeRange.forEach((element2) => {
          const startTime = element2.split('-')[0].trim();
          const endTime = element2.split('-')[1].trim();
          const now = Date.now();
          timeRange.push({
            startTime,
            endTime,
            now,
          });
        });
        this.scheduleList.push({ scheduleId, dayOfWeek, timeRange });
      });
      console.log('aaa');
      console.log(this.scheduleList);
    },
  },
  watch: {
    schedules: {
      handler() {
        this.$emit(
          'newValue',
          this.schedules.filter((item) => item.timeRange.length > 0),
        );
      },
      deep: true,
    },
  },
  computed: {
    isLoading() {
      const loadingUser = this.$store.state.user.user.isLoading;
      const loadingGroups = this.$store.state.vendor.group.groups.isLoading;
      return loadingUser || loadingGroups;
    },
    groups() {
      return this.$store.state.vendor.group.groups;
    },
    groupSearch() {
      if (!this.searchQuery) {
        return this.groups.data;
      }
      return this.groups.data.filter(
        (item) => item.groupName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
      );
    },
    group() {
      return this.groupSearch.find((item) => item.groupId === this.groupSelected);
    },
    allSchedule() {
      return this.$store.state.renter.common.schedule.data;
    },
    visibleCreateSchedule() {
      if (this.from === '' || this.to === '' || this.from === null || this.to === null) {
        return false;
      }
      return true;
    },
    timeFrom() {
      const times = this.getFullTimes('05:00', '21:30', 'asc');
      // let timeSelected = this.newGroup.schedules.find((item) => item.scheduleId === this.day);
      // let timeIgnore = [];
      // if (timeSelected) {
      //   timeSelected = timeSelected.timeRange;
      //   timeSelected.forEach((item) => {
      //     const [start, end] = item.split(' - ');
      //     timeIgnore = [...timeIgnore, ...this.getFullTimes(start, end, 'asc')];
      //   });
      //   timeIgnore.forEach((item) => {
      //     times = times.filter((t) => t !== item);
      //   });
      // }
      return times;
    },
    timeTo() {
      const times = this.getTimes(String(this.from), '22:00', 'asc');
      // let timeSelected = this.newGroup.schedules.find((item) => item.scheduleId === this.day);
      // let timeIgnore = [];
      // if (timeSelected) {
      //   timeSelected = timeSelected.timeRange;
      //   timeSelected.forEach((item) => {
      //     const [start, end] = item.split(' - ');
      //     timeIgnore = [...timeIgnore, ...this.getTimes(start, end, 'asc')];
      //   });
      //   timeIgnore.forEach((item) => {
      //     times = times.filter((t) => t !== item);
      //   });
      //   const startTimes = timeSelected.map((item) => item.slice(0, 5).trim());
      //   startTimes.push(this.from);
      //   startTimes.sort((prev, next) => {
      //     const [prevHour, prevMinute] = prev.split(':').map((item) => Number(item));
      //     const [nextHour, nextMinute] = next.split(':').map((item) => Number(item));
      //     return prevHour !== nextHour ? prevHour - nextHour : prevMinute - nextMinute;
      //   });
      //   if (startTimes.indexOf(this.from) < startTimes.length - 1) {
      //     const endTime = startTimes[startTimes.indexOf(this.from) + 1];
      //     const endTimeNumber = {
      //       hour: Number(endTime.slice(0, 5).trim().split(':')[0]),
      //       minute: Number(endTime.slice(0, 5).trim().split(':')[1]),
      //     };
      //     const halfBeforeEndTime =
      //       endTimeNumber.minute === 0
      //         ? `${endTimeNumber.hour - 1}:30` // eslint-disable-line
      //         : `${endTimeNumber.hour}:00`; // eslint-disable-line
      //     return times.slice(0, times.indexOf(halfBeforeEndTime) + 1);
      //   }
      // }
      return times;
    },
  },
  created() {
    // this.getGroups();
    if (this.allSchedule.length === 0) {
      this.getAllSchedule().then(() => {
        this.groupSchedules.schedules = this.allSchedule.map((item) => ({
          scheduleId: item.scheduleId,
          dayOfWeek: item.dayOfWeek,
          timeRange: [],
        }));
      });
    } else {
      this.groupSchedules.schedules = this.allSchedule.map((item) => ({
        scheduleId: item.scheduleId,
        dayOfWeek: item.dayOfWeek,
        timeRange: [],
      }));
    }
    if (this.groupSearch.length === 0) {
      this.getGroups().then(() => {
        if (this.groupSearch.length > 0) {
          this.groupSelected = this.groupSearch[0].groupId;
        }
      });
    }
  },
};
</script>
<style>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
