<template>
  <div v-if="!groups.isLoading" class="d-flex flex-column" style="height: 100%;">
    <div class="text-h6 font-weight-thin">
      Tổng quan về các khu trọ
    </div>
    <div style="height: calc(100% - 32px);" class="d-flex flex-column flex-md-row flex-nowrap">
      <div style="width: 30%; overflow-y: auto;">
        <vue-scroll>
          <v-list three-line>
            <v-list-item-group v-model="selectedGroupIndex">
              <v-list-item v-for="group in groups.data" :key="group.groupId">
                <v-list-item-content>
                  <v-list-item-title>{{ group.groupName }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon>location_on</v-icon>
                    {{ group.address.streetName }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </vue-scroll>
      </div>
      <div style="width: 30%;" class="hidden-sm-and-down">
        <div>Phòng sắp hết hợp đồng</div>
        <ExpiringRoom :groupId="selectedGroup.groupId" />
      </div>
      <div style="width: 40%;">
        <div>Thống kê về khu trọ</div>
        <HostelGroupStatistic />
      </div>
    </div>
  </div>
</template>
<script>
import ExpiringRoom from './ExpiringRoom.vue';
import HostelGroupStatistic from './HostelGroupStatistic.vue';

export default {
  name: 'HostelGroupsOverview',
  components: { ExpiringRoom, HostelGroupStatistic },
  data: () => ({
    selectedGroupIndex: 0,
    selectedGroup: null,
  }),
  methods: {
    expiredDate(startTime, duration) {
      // startTime : milisecond
      // duration : number of months
      console.log(startTime);
      console.log(duration);
      const date = new Date(startTime);
      date.setMonth(date.getMonth() + duration);
      console.log(date);
      return this.convertDateToString(date);
    },
    convertDateToString(d) {
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      const date = d.getDate();
      return `${date}/${month}/${year}`;
    },
  },
  computed: {
    groups() {
      return this.$store.state.vendor.group.groups;
    },
  },
  watch: {
    selectedGroupIndex() {
      this.selectedGroup = this.groups.data[this.selectedGroupIndex];
    },
  },
};
</script>
