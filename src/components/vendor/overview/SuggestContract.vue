<template>
  <v-card v-if="!isLoadingContracts && !groups.isLoading">
    <v-card-title>Các phòng sắp hết hạn hợp đồng</v-card-title>
    <div style="height: 100%;" class="d-flex flex-column flex-md-row flex-nowrap">
      <div style="max-height: 100%; overflow-y: auto; flex: 0 1 auto;">
        <v-list>
          <v-list-item-group v-model="selectedGroup">
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
      </div>
      <div class="hidden-sm-and-down">
        list
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SuggestContract',
  components: {},
  data: () => ({
    selectedGroup: 1,
  }),
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
    }),
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
    contracts() {
      return this.$store.state.user.contracts.data;
    },
    groups() {
      return this.$store.state.vendor.group.groups;
    },
    isLoadingContracts() {
      return this.$store.state.user.contracts.isLoading;
    },
    contractByGroups() {
      const oneMonth = 31 * 24 * 60 * 60 * 1000;
      const groupContract = {};
      const expiring = [];
      // get all the contracts which has valid time less than one month
      this.contracts.forEach((contract) => {
        const now = Date.now();
        const diff = now - contract.startTime;
        if (diff < 6 * oneMonth) {
          expiring.push(contract);
        }
      });
      // convert list to an map
      expiring.forEach((contract) => {
        if (groupContract[contract.group.groupId]) {
          groupContract[contract.group.groupId].push(contract);
        } else {
          groupContract[contract.group.groupId] = [contract];
        }
      });
      return groupContract;
    },
  },
  created() {
    this.getContracts();
  },
};
</script>
