<template>
  <div>
    <span class="text-h6"><v-icon>king_bed</v-icon> Tiện ích</span>
    <v-chip-group column>
      <v-chip v-for="facility in type.facilities" :key="facility.facilityId" close>{{
        facility.facilityName
      }}</v-chip>
    </v-chip-group>
    <span>Them tien ich</span>
    <v-card :loading="facilities.isLoading">
      <v-chip-group column>
        <v-chip
          v-for="facility in addableFacilities"
          :key="facility.facilityId"
          @click="addFacility(facility)"
          >{{ facility.facilityName }}</v-chip
        >
      </v-chip-group>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HostelTypeFacilityEditor',
  props: ['type'],
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/common/getAllFacilities1',
    }),
    removeFacility(facility) {
      const index = this.type.facilities.findIndex(
        (faci) => faci.facilityId === facility.facilityId,
      );
      delete this.type.facilities[index];
    },
    addFacility(facility) {
      this.type.facilities.push(facility);
    },
  },
  computed: {
    ...mapState('renter/common', ['facilities']),
    addableFacilities() {
      const currentFaciIds = this.type.facilities.map((faci) => faci.facilityId);
      return this.facilities.data.filter((faci) => !currentFaciIds.includes(faci.facilityId));
    },
  },
  created() {
    this.getAllFacilities();
  },
};
</script>
