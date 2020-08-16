<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row>
        <v-col>
          <p class="text-h4">Khám phá quận {{district.districtName}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6">
          <v-card width="100%">
            <v-card-title>
              Giá thuê theo phường
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="5"
              class="elevation-1"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
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
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Quận',
        value: 'district',
      },
      {
        text: 'Giá trung bình / phòng',
        value: 'districtAverage',
      },
      {
        text: 'Giá trung bình / m2',
        value: 'districtM2',
      },
    ],
  }),
  computed: {
    districtId() {
      return this.$route.params.districtId;
    },
    district() {
      return (
        this.districtInput ||
        this.$store.state.renter.common.districts.data.find(
          (district) => district.districtId === Number(this.districtId),
        )
      );
    },
    wards() {
      return this.district.wards;
    },
    streets() {
      return this.wards.map((ward) => ward.streets).flat();
    },
    streetIds() {
      return this.streets.map((street) => street.streetId);
    },
    wardNames() {
      return this.wards.map((ward) => ward.wardName);
    },
    isLoading() {
      return (
        this.$store.state.renter.common.provinces.isLoading ||
        this.$store.state.renter.discovery.stats.streets.isLoading
      );
    },
    items() {
      return this.wardNames.map((wardName) => ({
        district: wardName,
        districtAverage: Math.random().toFixed(2) * 10,
        districtM2: Math.random().toFixed(2) * 10,
      }));
    },
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
      getStreetStats: 'renter/discovery/getStreetStats',
    }),
  },
  created() {
    if (!this.districtInput) {
      this.getProvinces().then(() => this.getStreetStats(this.streetIds));
    } else {
      this.getStreetStats(this.streetIds);
    }
  },
};
</script>
