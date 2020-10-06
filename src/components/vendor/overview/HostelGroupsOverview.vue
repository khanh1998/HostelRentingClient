<template>
  <v-card
    elevation="0"
    v-if="!groups.isLoading"
    class="d-flex flex-column pa-2"
    style="height: 100%;"
  >
    <div class="text-h6 font-weight-thin">
      Tổng quan về các khu trọ
    </div>
    <v-divider />
    <div
      v-if="groups.data.length > 0"
      style="height: calc(100% - 32px);"
      class="d-flex flex-row flex-nowrap"
    >
      <div style="min-width: 30%; overflow-y: auto;">
        <vue-scroll>
          <v-list three-line>
            <v-list-item-group v-model="selectedGroupIndex" mandatory>
              <v-list-item
                v-for="group in groups.data"
                :key="group.groupId"
                @click="openMobileDialog"
              >
                <v-list-item-avatar>
                  <v-avatar color="green" size="36"
                    ><span class="white--text headline">{{
                      getShortName(group.groupName)
                    }}</span></v-avatar
                  >
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ group.groupName }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon>location_on</v-icon>
                    {{ group.address.streetName }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action v-if="isMobile">
                  <v-btn icon large>
                    <v-icon color="grey lighten-1">insert_link</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </vue-scroll>
      </div>
      <div style="max-width: 40%; overflow-y: hidden;" class="d-flex flex-row">
        <v-divider vertical />
        <ExpiringRoom :groupId="selectedGroup.groupId" v-if="!isMobile" />
      </div>
      <div style="max-width: 30%; overflow-y: hidden;" class="d-flex flex-row">
        <v-divider vertical />
        <HostelGroupStatistic :group="selectedGroup" v-if="!isMobile" />
      </div>
    </div>
    <div v-if="groups.data.length == 0">
      <v-card>
        <v-card-text>
          Hiện tại bạn đang chưa có khu trọ nào.
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" tile outlined to="/vendor/management">
            <v-icon>add</v-icon> Tạo khu trọ
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog
      v-model="mobileOverviewDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="hidden-md-and-up"
    >
      <v-card v-if="selectedGroup">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="mobileOverviewDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedGroup.groupName }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div style="height: calc(100vh - 64px); overflow-y: hidden;" class="d-flex flex-column">
          <div>
            <HostelGroupStatistic :group="selectedGroup" />
          </div>
          <v-divider />
          <div class="d-flex flex-column" style="height: 400px; overflow-y: hidden;">
            <ExpiringRoom :groupId="selectedGroup.groupId" />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import ExpiringRoom from './ExpiringRoom.vue';
import HostelGroupStatistic from './HostelGroupStatistic.vue';

export default {
  name: 'HostelGroupsOverview',
  components: { ExpiringRoom, HostelGroupStatistic },
  data: () => ({
    selectedGroupIndex: null,
    selectedGroup: null,
    mobileOverviewDialog: false,
  }),
  created() {
    if (this.groups.data.length > 0) {
      this.selectedGroupIndex = 0;
      [this.selectedGroup] = this.groups.data;
    }
  },
  methods: {
    getShortName(fullName) {
      const tokens = fullName.split(' ');
      return tokens.reverse()[0].substring(0, 1);
    },
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
    openMobileDialog() {
      if (this.isMobile) this.mobileOverviewDialog = true;
    },
  },
  computed: {
    groups() {
      return this.$store.state.vendor.group.groups;
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        case 'sm':
          return true;
        default:
          return false;
      }
    },
  },
  watch: {
    selectedGroupIndex() {
      this.selectedGroup = this.groups.data[this.selectedGroupIndex];
    },
  },
};
</script>
