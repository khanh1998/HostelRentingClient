<template>
  <!-- eslint-disable max-len -->
  <div class="white">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row class="justify-center">
        <v-col cols="12" lg="11">
          <v-row class="d-flex align-center">
            <v-col cols="12" lg="3">
              <p class="font-weight-bold text-h4 blue--text mb-2">
                {{ district.districtName }}
              </p>
              <!-- toDo: api district -->
              <span class="font-weight-bold text-uppercase">thành phố hồ chí minh</span>
            </v-col>
            <v-col cols="12" lg="3">
              <v-card outlined>
                <v-list-item two-line>
                  <v-list-item-content>
                    <span class="text-uppercase text-h5 mb-4">
                      {{ districtStat.avgPrice }}
                      <span class="text-lowercase">triệu</span>
                    </span>
                    <v-list-item-subtitle>Giá trung bình / phòng</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar tile color="white">
                    <v-icon x-large>attach_money</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" lg="4">
              <v-card outlined>
                <v-list-item two-line>
                  <v-list-item-content>
                    <span class="text-uppercase text-h5 mb-4">
                      {{ districtStat.avgSuperficiality }}
                      <span class="text-lowercase">m<sup>2</sup></span>
                    </span>
                    <v-list-item-subtitle>Diện tích trung bình / phòng</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar tile color="white">
                    <v-img
                      style="width: 10px;"
                      src="@/assets/home/superficies.svg"
                      transition="scale-transition"
                    />
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="d-flex mt-10">
            <v-col cols="12" lg="6">
              <v-card class="flex" outlined width="100%" style="height: 100%;">
                <v-card-title class="d-flex justify-center" :style="{ backgroundColor: '#f4f4f4' }">
                  <span class="text-body-1 txt-dark text-capitalize font-nunito font-weight-medium"
                    >THEO PHƯỜNG</span
                  >
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="searchWard"
                    append-icon="mdi-magnify"
                    label="Tên phường"
                    single-line
                    hide-details
                    class="pt-0"
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="itemWards"
                  :items-per-page="5"
                  class="elevation-1"
                  :search="searchWard"
                  :footer-props="{
                    itemsPerPageAllText: 'Tất cả',
                    itemsPerPageText: 'Số lượng phường hiển thị',
                  }"
                ></v-data-table>
              </v-card>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card width="100%" style="height: 100%;" outlined>
                <v-card-title
                  class="d-flex justify-space-between"
                  :style="{ backgroundColor: '#f4f4f4' }"
                >
                  <span class="text-body-1 txt-dark text-capitalize font-nunito font-weight-medium"
                    >THEO ĐƯỜNG</span
                  >
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="searchStreet"
                    append-icon="mdi-magnify"
                    label="Tên đường"
                    single-line
                    hide-details
                    class="pt-0"
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headerStreets"
                  :items="itemStreets"
                  :items-per-page="5"
                  class="elevation-1"
                  :search="searchStreet"
                  :footer-props="{
                    itemsPerPageAllText: 'Tất cả',
                    itemsPerPageText: 'Số lượng đường hiển thị',
                  }"
                ></v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import {
  mapActions,
  // mapState,
  mapGetters,
} from 'vuex';

export default {
  name: 'DiscoveryDistrict',
  props: {
    districtInput: Object,
  },
  data: () => ({
    expand: false,
    mini: true,
    searchWard: '',
    searchStreet: '',
    headers: [
      {
        text: 'Quận',
        value: 'district',
        align: 'start',
        filterable: false,
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
    ...mapGetters({
      getAverage: 'renter/discovery/getAverage',
    }),
    statistic() {
      return this.$store.state.renter.discovery.stats.district.data;
    },
    proviceStat() {
      return this.statistic.provinces[0];
    },
    districtStat() {
      return this.proviceStat.districts[0];
    },
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
        this.$store.state.renter.discovery.stats.streets.isLoading ||
        this.$store.state.renter.discovery.stats.district.isLoading
      );
    },
    itemWards() {
      return this.wards.map((ward) => ({
        district: ward.wardName,
        districtAverage: this.getWardStat(ward.wardId).avgPrice,
        districtM2: this.getWardStat(ward.wardId).avgSuperficality,
      }));
    },
    itemStreets() {
      return this.streets.map((street) => ({
        street: street.streetName,
        streetAverage: this.getStreetStat(street.streetId).avgPrice,
        streetM2: this.getStreetStat(street.streetId).avgPrice,
      }));
    },
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
      getDistrictStatistic: 'renter/discovery/getDistrictStatistic',
    }),
    getStreetIds(ward) {
      return ward.streets.map((street) => street.streetId);
    },
    getWardStat(wardId) {
      const ward = this.districtStat.wards.find((w) => w.wardId === wardId);
      if (ward) {
        return { avgPrice: ward.avgPrice, avgSuperficality: ward.avgSuperficality };
      }
      return { avgPrice: 'Không xác định', avgSuperficality: 'Không xác định' };
    },
    getStreetStat(streetId) {
      const ward = this.districtStat.wards.find(
        (w) => w.streets.find((s) => s.streetId === streetId), // eslint-disable-line
      ); // eslint-disable-line
      if (ward) {
        const street = ward.streets.find((s) => s.streetId === streetId);
        return { avgPrice: street.avgPrice, avgSuperficality: street.avgSuperficality };
      }
      return { avgPrice: 'Không xác định', avgSuperficality: 'Không xác định' };
    },
  },
  created() {
    if (!this.districtInput) {
      this.getProvinces();
      if (!this.statistic) {
        this.getDistrictStatistic(this.districtId);
      }
    }
  },
};
</script>
<style>
.txt-dark {
  color: #212121 !important;
}
thead.v-data-table-header th {
  font-size: smaller !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: small !important;
}
</style>
