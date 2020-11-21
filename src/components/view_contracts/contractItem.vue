<template>
  <v-card class="mb-2 pa-4">
    <v-row>
      <!-- <v-col cols="3" md="0" class="hidden-sm-and-up pa-0">
        <v-row no-gutters class="d-flex">
          <v-col cols="12">
            <span class="font-nunito text-primary size-sub-2 hidden-sm-and-up">Chủ trọ:</span>
          </v-col>
          <v-col cols="12" class="mt-4">
            <span class="font-nunito text-primary size-sub-2 hidden-sm-and-up">Nhà trọ:</span>
          </v-col>
          <v-col cols="12" class="mt-7">
            <span class="font-nunito text-primary size-sub-2 hidden-sm-and-up">Phòng:</span>
          </v-col>
        </v-row>
      </v-col> -->
      <!-- <v-col cols="9" md="12"> -->
      <v-row no-gutters class="d-flex">
        <v-col cols="12" md="3" class="d-flex align-center">
          <v-row class="ma-0">
            <v-col cols="3" class="hidden-sm-and-up">
              <span class="font-nunito text-primary size-sub-2">Chủ trọ: </span>
            </v-col>
            <v-col cols="9" md="12" class="d-flex">
              <v-avatar
                color="#727cf5"
                height="40"
                width="40"
                min-width="40"
                class="hidden-xs-only mr-2"
              >
                <!-- <v-img
            max-height="30"
            max-width="30"
            v-if="contract.vendor.avatar"
            :src="contract.vendor.avatar"
          /> -->
                <span class="text-overline white--text">{{
                  getAvatarTitle(contract.vendor.username)
                }}</span>
              </v-avatar>
              <span class="d-flex flex-column align-start">
                <span class="text-gray font-nunito size9rem font-weight-bold">{{
                  contract.vendor.username
                }}</span>
                <span class="text-muted size-sub-3 font-nunito">{{ contract.vendor.phone }}</span>
              </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" class="d-flex flex-column">
          <v-row class="ma-0">
            <v-col cols="3" class="hidden-sm-and-up">
              <span class="font-nunito text-primary size-sub-2">Nhà trọ: </span>
            </v-col>
            <v-col cols="9" md="12" class="d-flex flex-column">
              <span class="text-gray font-nunito size9rem font-weight-bold">{{
                contract.group.groupName
              }}</span>
              <span class="font-nunito text-muted size-caption">
                {{ contract.group.buildingNo }} {{ contract.group.address.streetName }},
                {{ contract.group.address.wardName }}, {{ contract.group.address.districtName }},
                {{ contract.group.address.provinceName }}
              </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="1" class="d-flex flex-column">
          <v-row class="ma-0">
            <v-col cols="3" class="hidden-sm-and-up">
              <span class="font-nunito text-primary size-sub-2">Phòng:</span>
            </v-col>
            <v-col cols="9" md="12" class="d-flex justify-start justify-sm-center align-center">
              <span class="font-nunito text-primary size-sub-2">{{ contract.room.roomName }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="d-flex justify-center align-center">
          <v-row class="ma-0">
            <v-col cols="3" class="hidden-sm-and-up">
              <span class="font-nunito text-primary size-sub-2">Bắt đầu: </span>
            </v-col>
            <v-col cols="9" md="12" class="d-flex justify-start justify-sm-center align-center">
              <span class="font-nunito text-gray size-sub-2">{{
                getDateByTimestamp(contract.startTime)
              }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="d-flex justify-center align-center">
          <v-row class="ma-0">
            <v-col cols="3" class="hidden-sm-and-up">
              <span class="font-nunito text-primary size-sub-2">Kết thúc: </span>
            </v-col>
            <v-col cols="9" md="12" class="d-flex justify-start justify-sm-center align-center">
              <span class="font-nunito text-gray size-sub-2">{{
                getDateByTimestamp(getEndDate(contract.startTime, contract.duration))
              }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="1" class="d-flex flex-column justify-center align-center">
          <v-chip small class="font-nunito mb-2" :color="getStatus(contract.status).color">{{
            getStatus(contract.status).contractStatus
          }}</v-chip>
          <v-btn
            small
            rounded
            outlined
            color="green"
            v-if="contract.status !== 'INACTIVE'"
            text
            @click="$emit('view-detail', contract.contractId)"
            >Chi tiết</v-btn
          >
          <v-btn
            small
            rounded
            outlined
            color="red"
            v-if="contractSignable"
            text
            @click="$emit('activate', contract.contractId)"
            >Ký hợp đồng</v-btn
          >
          <v-btn
            v-if="contract.reserved && contract.paid === false"
            small
            rounded
            outlined
            color="yellow"
            text
            @click="$emit('pay-reserve-fee', contract.contractId)"
            >Xác nhận đóng tiền giữ chỗ</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-stepper v-model="step" v-if="contract.reserved">
            <v-stepper-header>
              <v-stepper-step :complete="step > 0" step="1"> Hợp đồng được tạo </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 1" step="2"> Đã đóng tiền giữ chỗ </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="3"> Chủ trọ đã nhận tiền cọc </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 3" step="4"> Đã ký hợp đồng </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
          <v-stepper v-model="step" v-if="!contract.reserved">
            <v-stepper-header>
              <v-stepper-step :complete="step > 0" step="1"> Hợp đồng được tạo </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 1" step="2"> Đã ký hợp đồng </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>
<style scoped></style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'ContractItem',
  props: ['contract'],
  components: {},
  data: () => ({
    dialog: false,
    mapDialog: false,
  }),
  computed: {
    contractSignable() {
      if (this.contract.reserved) {
        if (this.contract.status === 'RESERVED') {
          return true;
        }
        return false;
      }
      if (!this.contract.reserved) {
        if (this.contract.status === 'INACTIVE') {
          return true;
        }
        return false;
      }
      return false;
    },
    step() {
      if (this.contract.reserved) {
        if (this.contract.status === 'INACTIVE') {
          if (this.contract.paid === false) {
            return 1;
          }
          if (this.contract.paid === true) {
            return 2;
          }
        }
        if (this.contract.status === 'RESERVED') {
          return 3;
        }
        if (this.contract.status === 'ACTIVATED') {
          return 4;
        }
      }
      if (!this.contract.reserved) {
        if (this.contract.status === 'INACTIVE') {
          return 1;
        }
        if (this.contract.status === 'ACTIVATED') {
          return 2;
        }
      }
      return null;
    },
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
    getAvatarTitle(name) {
      return name.substring(name.lastIndexOf(' ') + 1).substring(0, 1);
    },
    getDateByTimestamp(time) {
      const date = new Date(time);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    },
    getEndDate(startDate, duration) {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + duration);
      return endDate.getTime();
    },
    getStatus(status) {
      let contractStatus = '';
      let color = 'red';
      switch (status) {
        case 'REVERSED':
          contractStatus = 'cọc';
          color = 'rgba(255,188,0,.25)';
          break;
        case 'ACTIVATED':
          contractStatus = 'đang thuê';
          color = 'rgba(57,175,209,.25)';
          break;
        case 'INACTIVE':
          contractStatus = 'chờ xác nhận';
          color = 'rgba(10,207,151,.25)';
          break;
        default:
          contractStatus = 'hết hiệu lực';
          color = 'rgba(250,92,124,.25)';
          break;
      }
      return { contractStatus, color };
    },
    getColor() {
      return '#f1f3fa';
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
.dialog-title {
  font-weight: 700 !important;
}
.title-content {
  font-size: 0.9rem !important;
}
</style>
