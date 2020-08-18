<template>
  <v-card v-if="!isLoadingContracts && !groups.isLoading">
    <div style="font-size: 20px; fontweight: bold;" class="pt-3 pl-2 pb-6">
      Các phòng sắp hết hạn hợp đồng
    </div>
    <v-list two-line>
      <v-divider></v-divider>
      <v-list-item v-for="group in groups.data" :key="group.groupId">
        <v-list-item-content>
          <v-list-item-title style="color: #1f17ff; fontsize: 18px;">
            {{ group.groupName }}
          </v-list-item-title>
          <v-list-item-subtitle v-html="group.street" class="pb-1"></v-list-item-subtitle>
          <div
            class="d-flex justify-space-between mt-5"
            v-for="contract in contractByGroups[group.groupId]"
            :key="contract.contractId"
          >
            <div style="fontweight: bold;">{{ contract.room.roomName }}</div>
            <div style="fontweight: bold;">
              {{ expiredDate(contract.startTime, contract.duration) }}
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text style="color: #818286;" class="d-flex justify-end">Xem thêm >></v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SuggestContract',
  components: {},
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
      const month = d.getMonth();
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
  data: () => ({}),
};
</script>
