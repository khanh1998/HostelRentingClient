<template>
  <div v-if="!isLoadingContracts">
    <p v-for="contract in expiringContracts" :key="contract.contractId">
      {{ contract.room.roomName }}
    </p>
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
      const oneMonth = 31 * 24 * 60 * 60 * 1000;
      let expiring = [];
      // get all the contracts which has valid time less than one month
      const now = Date.now();
      expiring = this.contracts
        .filter((contract) => contract.group.groupId === newGroupId)
        .filter((contract) => {
          const diff = now - contract.startTime;
          return diff < 6 * oneMonth;
        });
      this.expiringContracts = expiring;
    },
  },
  created() {
    this.getContracts();
  },
};
</script>
