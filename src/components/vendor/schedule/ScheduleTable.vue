<template>
  <div style="overflow-y: auto; background-color: #fafbfe">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="!isLoading">
      <v-row class="d-flex justify-space-between ma-0 mt-5 font-nunito">
        <!-- <v-col cols="12" md="3" class="py-0 mb-3">
          <v-card class="pa-3">
            <div class="d-flex">
              <span
                style="letter-spacing: 0.02em; font-weight: 700"
                class="text-gray font-nunito size9rem mt-2"
                >KHU TRỌ Nè</span
              >
            </div>
            <v-text-field
              label="Tìm kiếm khu trọ"
              v-model="searchQuery"
              append-icon="search"
              solo
              hide-details
              class="mt-3 text-muted pa-0 size-sub-2 chat mb-7 hidden-sm-and-down"
              height="35"
              rounded
            ></v-text-field>
            <v-virtual-scroll
              :items="groupSearch"
              :item-height="90"
              height="500px"
              class="pa-3 hidden-sm-and-down scrollbar"
              style="background-color: white"
              id="style-1"
            >
              <template v-slot="{ item, index }">
                <v-list-item :key="item.groupId" class="px-0 d-flex justify-start align-start">
                  <span class="d-flex flex-column" v-if="groupSearch.length !== 0">
                    <span
                      class="font-weight-bold size9rem font-nunito cursor"
                      @click="clickGroup(item)"
                      v-bind:style="index % 2 === 0 ? 'color: #727cf5;' : 'color: #39afd1;'"
                      >{{ item.groupName }}</span
                    >
                    <small class="text-gray font-nunito mt-2"
                      >{{ item.buildingNo }} {{ item.address.streetName }},
                      {{ item.address.districtName }}, {{ item.address.provinceName }}</small
                    >
                  </span>
                </v-list-item>
              </template>
            </v-virtual-scroll>
            <v-autocomplete
              :items="groups.data"
              :filter="customFilter"
              item-text="groupName"
              label="Nhà trọ"
              persistent-hint
              :style="{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
              }"
              solo
              filled
              dense
              outlined
              hide-no-data
              class="text-body-2 hidden-md-and-up mt-3"
            >
              <template slot="selection" slot-scope="{ item }">
                <span class="font-nunito font-weight-medium text-body-2">{{ item.groupName }}</span>
              </template>
              <template slot="item" slot-scope="{ item }">
                <span class="d-flex flex-column" @click="clickGroup(item)">
                  <span class="font-weight-bold size9rem font-nunito cursor text-primary mt-3">{{
                    item.groupName
                  }}</span>
                  <small class="text-gray font-nunito"
                    >{{ item.buildingNo }} {{ item.address.streetName }},
                    {{ item.address.districtName }}, {{ item.address.provinceName }}</small
                  >
                </span>
              </template>
            </v-autocomplete>
          </v-card>
        </v-col> -->
        <v-col cols="6" md="4" xl="4">
          <v-card>
            <v-row class="ma-0 px-2 py-3">
              <v-col cols="12">
                <v-text-field
                  label="Khu trọ"
                  v-model="searchQuery"
                  append-icon="search"
                  solo
                  hide-details
                  class="text-muted pa-0 size-sub-2 slide-booking icon-gray"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" class="pt-2 pb-0" v-if="groupSearch.length > 0">
                <v-row class="ma-0 px-1" style="background-color: #f1f3fa; border-color: #eef2f7">
                  <v-col cols="12">
                    <v-checkbox
                      v-model="selectedAllGroup"
                      color="#727cf5"
                      label="Áp dụng tất cả các khu trọ"
                      hide-details
                      class="filter my-0 py-0 px-2 checkbox-small font-nunito"
                      @click="selectAll()"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="12" class="pt-0">
                <v-card
                  class="overflow-y-auto d-flex flex-column py-1"
                  max-height="250"
                  min-height="250"
                  outlined
                  v-if="groupSearch.length > 0"
                  style="
                    border: 0px !important;
                    border-top-left-radius: 0 !important;
                    border-top-right-radius: 0 !important;
                  "
                >
                  <div
                    class="ma-0 d-flex flex-column"
                    v-for="item in groupSearch"
                    v-bind:key="item.groupId"
                  >
                    <div
                      class="d-flex px-1 service-item cursor"
                      style="border: 1px solid #eef2f7; border-top: 0px !important"
                    >
                      <v-col cols="2">
                        <v-checkbox
                          v-model="selectedGroup"
                          color="#727cf5"
                          :value="item.groupId"
                          hide-details
                          class="filter my-0 py-0 px-2 checkbox-small"
                          @change="checkSelectAll()"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="7" class="d-flex align-center">
                        <span class="font-nunito size9rem">{{ item.groupName }}</span>
                      </v-col>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="7" class="py-0 mb-3">
          <div class="font-nunito">
            <v-row no-gutters>
              <v-col v-for="day in daysOfWeek" :key="day">
                <TableColumn :columnName="day" @new="sendData" :dataT="scheduleList" />
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <div class="d-flex justify-end">
                  <v-btn depressed color="green" dark outlined tile class="ma-2"
                    ><v-icon left>save</v-icon>Lưu thay đổi</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" md="1" />
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import TableColumn from './ScheduleTableColumn.vue';

export default {
  name: 'VendorScheduleTalbe',
  components: { TableColumn },
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
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getGroups: 'vendor/group/getGroups',
      getAllSchedule: 'renter/common/getAllSchedule',
    }),
    selectAll() {
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
    // clickGroup(group) {
    //   this.selectedGroup = group.groupName;
    //   group.schedules.forEach((element) => {
    //     const { scheduleId } = element;
    //     element.timeRange.forEach((element2) => {
    //       const startTime = element2.split('-')[0].trim();
    //       const endTime = element2.split('-')[1].trim();
    //       this.scheduleObjForGet.push({
    //         scheduleId,
    //         startTime,
    //         endTime,
    //       });
    //       this.sendData(this.scheduleObjForGet, scheduleId);
    //     });
    //   });
    //   console.log('aaa');
    //   console.log(this.schedules);
    // },
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
    allSchedule() {
      return this.$store.state.renter.common.schedule.data;
    },
  },
  created() {
    this.getGroups();
    if (this.allSchedule.length === 0) {
      this.getAllSchedule();
    }
  },
};
</script>
<style>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
