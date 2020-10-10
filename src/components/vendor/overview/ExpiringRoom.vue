<template>
  <div v-if="!isLoadingContracts" style="width: 100%;" class="pa-1 d-flex flex-column">
    <div class="text-h6 font-weight-thin">Các phòng sắp hết hợp đồng ({{ '6 tháng' }} )</div>
    <v-divider />
    <vue-scroll v-if="expiringContracts.length > 0">
      <v-list two-line>
        <v-list-item v-for="contract in expiringContracts" :key="contract.contractId">
          <v-list-item-content>
            <v-list-item-title>{{ contract.room.roomName }}</v-list-item-title>
            <v-list-item-subtitle
              >Ngày hết hạn: {{ getExpiringDateString(contract) }}</v-list-item-subtitle
            >
            <v-divider />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </vue-scroll>
    <v-card v-if="expiringContracts.length === 0">
      <v-card-title>
        Không có phòng trọ nào đang trống.
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ExpiringRoom',
  props: ['groupId'],
  data: () => ({
    expiringContracts: [],
  }),
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
    }),
    updateExpiringRoomList(groupId) {
      console.log('watch groupid run');
      const oneMonth = 31 * 24 * 60 * 60 * 1000;
      let expiring = [];
      // get all the contracts which has valid time less than one month
      const now = Date.now();
      expiring = this.contracts
        .filter((contract) => contract.group.groupId === groupId)
        .filter((contract) => {
          const diff = now - contract.startTime;
          return diff < 6 * oneMonth;
        });
      this.expiringContracts = expiring;
    },
    getExpiringDateString(contract) {
      const { startTime, duration } = contract;
      const d = this.expiringDate(startTime, duration);
      return d.toLocaleDateString('vi-vn');
    },
    expiringDate(startTime, duration) {
      const oneMonth = 31 * 24 * 60 * 60 * 1000;
      const durationInMilis = duration * oneMonth;
      return new Date(startTime + durationInMilis);
    },
  },
  computed: {
    contracts() {
      return this.$store.state.user.contracts.data;
    },
    isLoadingContracts() {
      return this.$store.state.user.contracts.isLoading;
    },
  },
  watch: {
    groupId(newGroupId) {
      this.updateExpiringRoomList(newGroupId);
    },
  },
  created() {
    if (this.contracts.length === 0) {
      this.getContracts();
    }
    this.updateExpiringRoomList(this.groupId);
  },
};
</script>
