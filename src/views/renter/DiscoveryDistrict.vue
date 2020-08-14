<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row>{{district.districtName}}</v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'DiscoveryDistrict',
  props: {
    districtInput: Object,
  },
  computed: {
    districtId() {
      return this.$route.params.districtId;
    },
    district() {
      return (
        this.districtInput
        || this.$store.state.renter.common.districts.data.find(
          (district) => district.districtId === Number(this.districtId),
        )
      );
    },
    isLoading() {
      return this.$store.state.renter.common.provinces.isLoading;
    },
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
    }),
  },
  created() {
    if (!this.districtInput) {
      this.getProvinces();
    }
  },
};
</script>
