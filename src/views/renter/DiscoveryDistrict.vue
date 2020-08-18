<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row>
        <v-col>
          <p class="text-h4">
            <span class="font-weight-light">Khám phá </span>
            <span class="font-weight-bold blue--text"> {{ district.districtName }}</span>
          </p>
          <p>
            <v-icon color="amber">attach_money</v-icon>
            Giá trung bình: <span class="font-weight-bold">{{ average.price }}</span> triệu/tháng
          </p>
          <p>
            <v-icon color="green">crop</v-icon>
            Diện tích trung bình: <span class="font-weight-bold">{{ average.area }}</span> m2/phòng
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6">
          <v-card width="100%">
            <v-card-title>
              <span class="blue--text">Giá thuê theo phường</span>
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
              :items="itemWards"
              :items-per-page="5"
              class="elevation-1"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card width="100%">
            <v-card-title>
              <span class="blue--text">Giá trung bình theo tuyến đường</span>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchStreet"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headerStreets"
              :items="itemStreets"
              :items-per-page="5"
              class="elevation-1"
              :search="searchStreet"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'DiscoveryDistrict',
  props: {
    districtInput: Object,
  },
  data: () => ({
    search: '',
    searchStreet: '',
    headers: [
      {
        text: 'Quận',
        value: 'district',
      },
      {
        text: 'Giá trung bình / phòng (Triệu)',
        value: 'districtAverage',
      },
      {
        text: 'Diện tích trung bình / phòng (m2)',
        value: 'districtM2',
      },
    ],
    headerStreets: [
      {
        text: 'Đường',
        value: 'street',
      },
      {
        text: 'Giá trung bình / phòng (Triệu)',
        value: 'streetAverage',
      },
      {
        text: 'Diện tích trung bình / phòng (m2)',
        value: 'streetM2',
      },
    ],
  }),
  computed: {
    ...mapState({
      'stats.streets': (state) => state.renter.discovery.stats.streets.data,
    }),
    ...mapGetters({
      getAverage: 'renter/discovery/getAverage',
    }),
    average() {
      return this.getAverage(this.streetIds);
    },
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
    itemWards() {
      return this.wards.map((ward) => ({
        district: ward.wardName,
        districtAverage: this.getAverage(this.getStreetIds(ward)).price,
        districtM2: this.getAverage(this.getStreetIds(ward)).area,
      }));
    },
    itemStreets() {
      return this.streets.map((street) => ({
        street: street.streetName,
        streetAverage: this.getAverage([street.streetId]).price,
        streetM2: this.getAverage([street.streetId]).area,
      }));
    },
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
      getStreetStats: 'renter/discovery/getStreetStats',
    }),
    getStreetIds(ward) {
      return ward.streets.map((street) => street.streetId);
    },
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
