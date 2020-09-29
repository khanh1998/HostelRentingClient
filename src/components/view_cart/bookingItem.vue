<template>
  <v-sheet class="mb-2">
    <v-row no-gutters>
      <v-col cols="5" md="3" class="d-flex justify-space-between">
        <div class="d-flex flex-column align-center justify-center pt-2 pl-4 pb-2">
          <v-avatar size="100">
            <v-img :src="booking.vendor.avatar"></v-img>
          </v-avatar>
          <p class="font-weight-medium">{{ booking.group.groupName }}</p>
          <div class="d-flex align-center">
            <v-icon color="yellow" small>fas fa-star</v-icon>
            <p class="mb-0">4.5/5 (30)</p>
          </div>
          <p class="blue--text">{{ booking.vendor.phone }}</p>
          <v-btn rounded outlined dark color="red">BÁO CÁO</v-btn>
        </div>
        <v-divider vertical class="mr-4" />
      </v-col>
      <v-col cols="7" md="6">
        <div class="pa-1">
          <p class="indigo--text font-weight-medium text-h6">
            {{ booking.type.title }}
          </p>
          <p>
            <span class="grey--text">Giá thuê: </span>
            <span class="blue--text text-decoration-line-through" v-if="booking.deal">
              {{ booking.type.price }} {{ booking.type.priceUnit }}
            </span>
            <span class="blue--text" v-if="!booking.deal">
              {{ booking.type.price }} {{ booking.type.priceUnit }}
            </span>
            <span class="blue--text" v-if="booking.deal">
              {{ booking.deal.offeredPrice }} {{ booking.type.priceUnit }}
            </span>
            <span class="font-italic" v-if="booking.deal"> (đã trả giá)</span>
          </p>
          <p class="grey--text font-italic">
            {{ booking.group.address.streetName }}, {{ booking.group.address.wardName }},
            {{ booking.group.address.districtName }},
            {{ booking.group.address.provinceName }}
          </p>
          <v-btn color="success" outlined> <v-icon class="mr-1">near_me</v-icon>Bản đồ </v-btn>
        </div>
        <v-divider vertical inset light />
      </v-col>
      <v-col cols="12" md="3">
        <v-sheet color="blue">
          <v-row no-gutters justify="center">
            <v-col cols="3" md="7">
              <p class="font-weight-bold text-h1 white--text mb-0">
                {{ timestamp.getDate() }}
              </p>
            </v-col>
            <v-col cols="2" md="5" class="d-flex align-center justify-center">
              <div>
                <p class="white--text font-weight-bold">tháng {{ timestamp.getMonth() }}</p>
                <p class="white--text font-weight-bold">
                  {{ timestamp.getFullYear() }}
                </p>
              </div>
            </v-col>
            <v-col cols="2" md="12" class="d-flex align-center justify-center">
              <p class="font-weight-bold">
                {{ timestamp.getHours() }}:{{ padZero(timestamp.getMinutes())
                }}{{ timestamp.getMinutes() }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6"></v-col>
          </v-row>
        </v-sheet>
        <v-row align-content="center">
          <v-col>
            <v-btn color="red" outlined>CHI TIẾT PHÒNG</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<style scoped></style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'BookingItem',
  props: ['booking'],
  computed: {
    timestamp() {
      return new Date(Number(this.booking.meetTime));
    },
    group() {
      return this.booking.group;
    },
    ward() {
      const { streetId } = this.group.street;
      const res = this.$store.getters['renter/common/getWardByStreetId'](streetId);
      return res;
    },
    district() {
      const { wardId } = this.ward;
      return this.$store.getters['renter/common/getDistrictByWardId'](wardId);
    },
    province() {
      const { districtId } = this.district;
      return this.$store.getters['renter/common/getProvinceByDistrictId'](districtId);
    },
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
    }),
    padZero(int) {
      return int < 10 ? '0' : '';
    },
  },
  created() {
    this.getProvinces();
  },
};
</script>
