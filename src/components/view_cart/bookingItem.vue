<template>
  <v-card class="mb-2">
    <v-row no-gutters class="d-flex justify-center">
      <v-col
        cols="7"
        sm="3"
        md="3"
        class="d-flex flex-column justify-center align-center py-4 px-2"
      >
        <span class="font-nunito group-name px-4 py-2" @click="getGroup()">{{
          booking.group.groupName
        }}</span>
        <span class="text-primary font-nunito mt-2"
          ><v-icon color="#727cf5" class="mr-2" small>mdi-phone-forward</v-icon
          >{{ booking.vendor.phone }}</span
        >
      </v-col>
      <v-col
        cols="4"
        sm="2"
        md="2"
        class="d-flex align-start align-sm-center align-md-center align-lg-center py-4 px-2"
      >
        <v-col cols="11" sm="11" md="11" class="d-flex flex-column align-start justify-center px-0">
          <span class="text-danger font-nunito"
            >{{ timestamp.getDate() }}-{{ timestamp.getMonth() + 1 }}-{{
              timestamp.getFullYear()
            }}</span
          >
          <span class="text-muted font-nunito"
            >{{ timestamp.getHours() }}:{{ padZero(timestamp.getMinutes())
            }}{{ timestamp.getMinutes() }}</span
          >
        </v-col>
        <v-col cols="1" sm="1" md="1" class="hidden-sm-and-up pa-0">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon color="#727cf5">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list>
                <v-list-item _@click="logout">
                  <v-list-item-icon>
                    <v-icon color="#727cf5">mdi-account-arrow-left</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Chi tiết lịch hẹn</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
      </v-col>
      <v-col cols="12" sm="7" md="7" class="d-flex py-4 px-4">
        <v-col cols="12" sm="11" md="11" class="d-flex flex-column align-start">
          <span class="text-primary-dark font-nunito type-name" @click="getType()">{{
            booking.type.title
          }}</span>
          <span class="my-2">
            <v-icon color="#727cf5">mdi-home-currency-usd</v-icon>
            <span class="amber--text text-decoration-line-through font-nunito" v-if="booking.deal">
              {{ booking.type.price }} {{ booking.type.priceUnit }}
            </span>
            <span class="amber--text font-nunito" v-if="!booking.deal">
              {{ booking.type.price }} {{ booking.type.priceUnit }}
            </span>
            <span class="amber--text font-nunito" v-if="booking.deal">
              {{ booking.deal.offeredPrice }} {{ booking.type.priceUnit }}
            </span>
            <small class="font-italic" v-if="booking.deal"> (đã trả giá)</small>
          </span>
          <small class="font-nunito address" @click="openStreetMap()"
            ><v-icon color="#727cf5">mdi-google-maps</v-icon>{{ booking.group.buildingNo }}
            {{ booking.group.address.streetName }}, {{ booking.group.address.wardName }},
            {{ booking.group.address.districtName }},
            {{ booking.group.address.provinceName }}</small
          >
        </v-col>
        <v-col cols="0" sm="1" md="1" class="hidden-xs-only pa-0">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon color="#727cf5">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                style="min-height: 20px !important;"
                class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
              >
                <v-icon color="#6c757d" class="mr-2 item-hover" size="20"
                  >mdi-home-map-marker</v-icon
                >
                <v-list-item-title class="item-hover">Chi tiết</v-list-item-title>
              </v-list-item>
              <v-list-item
                style="min-height: 20px !important;"
                class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
              >
                <v-icon color="#6c757d" class="mr-2 item-hover" size="20">report</v-icon>
                <v-list-item-title class="item-hover">Báo cáo</v-list-item-title>
              </v-list-item>
              <v-list-item
                style="min-height: 20px !important;"
                class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
              >
                <v-icon color="#6c757d" class="mr-2 item-hover" size="20">mdi-comment-eye</v-icon>
                <v-list-item-title class="item-hover">Nhận xét</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped></style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'BookingItem',
  props: ['booking'],
  computed: {
    timestamp() {
      return new Date(this.booking.meetTime);
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
    getAvatarTitle() {
      return this.booking.group.groupName
        .substring(this.group.groupName.lastIndexOf(' ') + 1)
        .substring(0, 1);
    },
    mapDateCode(code) {
      let day;
      switch (code) {
        case 0:
          day = 'Chủ nhật';
          break;
        case 1:
          day = 'Thứ 2';
          break;
        case 2:
          day = 'Thứ 3';
          break;
        case 3:
          day = 'Thứ 4';
          break;
        case 4:
          day = 'Thứ 5';
          break;
        case 5:
          day = 'Thứ 6';
          break;
        default:
          day = 'Thứ 7';
          break;
      }
      return day;
    },
    getGroup() {
      this.$router.push(`/group/${this.booking.group.groupId}`);
    },
    getType() {
      this.$router.push(`/detail/${this.booking.type.typeId}`);
    },
    openStreetMap() {
      const lat = this.booking.group.latitude;
      const long = this.booking.group.longitude;
      const url = `https://www.google.com/maps/search/${lat},${long}/@${lat},${long},17z?hl=vi`;
      window.open(url, '_blank');
    },
    getDetail() {
      console.log('detail');
    },
  },
  created() {
    this.getProvinces();
  },
};
</script>
<style scoped>
.group-name {
  color: #6c757d !important;
  font-weight: 600 !important;
  font-size: 0.9rem;
  text-align: center;
  background-color: #f0f4f9;
  border-radius: 2rem !important;
}
.group-name:hover {
  color: #fff !important;
  background-color: #727cf5 !important;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
  cursor: pointer;
}
.type-name {
  color: #727cf5 !important;
}
.type-name:hover {
  color: #4250f2 !important;
  cursor: pointer;
}
.address {
  color: #6c757d !important;
}
.address:hover {
  color: #33cc33 !important;
  cursor: pointer;
}
.v-list-item__title {
  color: #6c757d;
  font-family: 'Nunito', sans-serif !important;
  font-weight: 400 !important;
  font-size: 0.9rem !important;
}
.v-menu__content {
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15);
  background-color: #fff !important;
  background-clip: padding-box !important;
  border: 1px solid #e4eaf2 !important;
  border-radius: 0.25rem !important;
  color: #6c757d !important;
}
.item-menu:hover {
  background-color: #f8f9fa;
}
.item-hover:hover {
  color: #272e37 !important;
}
</style>
