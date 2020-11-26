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
              <v-avatar color="#727cf5" height="50px" min-width="50px" class="hidden-xs-only mr-2">
                <v-img
                  height="50px"
                  min-width="60px"
                  v-if="contract.vendor.avatar"
                  :src="contract.vendor.avatar"
                />
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
          <!-- <v-chip
            v-if="false"
            small
            class="font-nunito mb-2"
            :color="getStatus(contract.status, contract.paid).color"
            >{{ getStatus(contract.status, contract.paid).contractStatus }}</v-chip
          >
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
          > -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-stepper v-model="step" v-if="contract.reserved" class="elevation-0">
            <v-stepper-header class="elevation-0">
              <v-stepper-step :complete="step > 0" step="1" color="#727CF5">
                Hợp đồng được tạo
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 1" step="2" color="#727CF5">
                Đã đóng tiền giữ chỗ
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="3" color="#727CF5">
                Chủ trọ đã nhận tiền cọc
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 3" step="4" color="#727CF5">
                Đã ký hợp đồng
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items class="elevation-0">
              <v-stepper-content step="1" class="elevation-0">
                <div>
                  <v-row>
                    <v-col
                      cols="12"
                      class="d-flex justify-center font-weight-bold font-nunito"
                      style="font-size: 18px"
                      ><p class="hidden-sm-and-up">Hợp đồng được tạo</p></v-col
                    >
                    <v-col
                      cols="12"
                      class="d-flex justify-center font-nunito"
                      style="font-size: 18px"
                      ><p class="hidden-sm-and-down">
                        Bạn cần thanh toán tiền cọc giữ chân và gửi thông tin thanh toán để chủ nhà
                        xác nhận
                      </p></v-col
                    >
                    <v-col cols="12" class="pb-0 pt-0">
                      <v-timeline align-top dense>
                        <v-timeline-item color="#727CF5" small>
                          <div>
                            Thanh toán tiền cọc giữ chỗ cho chủ trọ.
                            <v-card-subtitle class="pt-0 pb-0  hidden-sm-and-down">
                              Thanh toán bằng tiền mặt, chuyển khoản và các hình thức thanh toán trực tuyến.<br/>
                              Hỗ trợ thanh toán bằng
                              <v-btn :href="getParamForUrl" target="_blank" rounded text>
                                <v-img
                                  height="30px"
                                  width="30px"
                                  src="../../assets/logo-momo.png"
                                ></v-img>
                              </v-btn>
                            </v-card-subtitle>
                            <v-card-text class="pt-0 pb-0  hidden-sm-and-up">
                              * Thanh toán bằng tiền mặt, chuyển khoản và các hình thức thanh toán trực tuyến.<br/>
                              * Hỗ trợ thanh toán bằng
                              <!-- <v-btn @click="$emit('momo-payment', getParamForUrl)" rounded text> -->
                              <v-btn :href="getParamForUrl" rounded text>
                                <v-img
                                  height="30px"
                                  width="30px"
                                  src="../../assets/logo-momo.png"
                                ></v-img>
                                 <!-- <v-card-subtitle class="pl-1 pr-0">Bạn phải có tài khoản MoMo</v-card-subtitle> -->
                              </v-btn>
                            </v-card-text>
                          </div>
                        </v-timeline-item>
                        <v-timeline-item color="#727CF5" small>
                          <div>
                            Yêu cầu chủ nhà xác nhận tiền cọc giữ chỗ :
                            <v-chip
                              @click="$emit('pay-reserve-fee', contract.contractId)"
                              color="#727CF5"
                              class="ml-2"
                              dark
                              >Yêu cầu xác nhận</v-chip
                            >
                          </div>
                        </v-timeline-item>
                      </v-timeline>
                    </v-col>
                  </v-row>
                </div>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-row>
                  <v-col
                    cols="12"
                    class="d-flex justify-center font-weight-bold font-nunito"
                    style="font-size: 18px"
                    ><p class="hidden-sm-and-up">Đã đóng tiền giữ chỗ</p></v-col
                  >
                  <v-col cols="12" class="d-flex justify-center pb-0 pt-0">
                    Yêu cầu xác nhận tiền của bạn đã được gửi tới chủ nhà. Hãy đợi cho tới khi chủ
                    nhà xác nhận.
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-row>
                  <v-col
                    cols="12"
                    class="d-flex justify-center font-weight-bold font-nunito"
                    style="font-size: 18px"
                    ><p class="hidden-sm-and-up">Chủ trọ đã nhận tiền cọc</p></v-col
                  >
                  <v-col cols="12" class="d-flex justify-center pb-0 pt-0"
                    ><v-chip @click="$emit('activate', contract.contractId)" color="#727CF5" dark
                      >Ký hợp đồng</v-chip
                    ></v-col
                  >
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-row>
                  <v-col
                    cols="12"
                    class="d-flex justify-center font-weight-bold font-nunito"
                    style="font-size: 18px"
                    ><p class="hidden-sm-and-up">Đã ký hợp đồng</p></v-col
                  >
                  <v-col cols="12" class="d-flex justify-center pb-0 pt-0">
                    <v-chip @click="$emit('view-detail', contract.contractId)" color="#727CF5" dark>
                      xem chi tiết hợp đồng</v-chip
                    >
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <v-stepper v-model="step" v-if="!contract.reserved" class="elevation-0">
            <v-stepper-header>
              <v-stepper-step :complete="step > 0" step="1" color="#727CF5">
                Hợp đồng được tạo
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 1" step="2" color="#727CF5">
                Đã ký hợp đồng
              </v-stepper-step>
            </v-stepper-header>
            <!-- <v-stepper-items> -->
            <v-stepper-items class="elevation-0">
              <v-stepper-content step="1">
                <div class="d-flex justify-center">
                  <v-row>
                    <v-col
                      cols="12"
                      class="d-flex justify-center font-weight-bold font-nunito"
                      style="font-size: 18px"
                      ><p class="hidden-sm-and-up">Hợp đồng được tạo</p></v-col
                    >
                    <v-col cols="12" class="d-flex justify-center pb-0 pt-0"
                      ><v-chip @click="$emit('activate', contract.contractId)" color="#727CF5" dark
                        >Ký hợp đồng</v-chip
                      ></v-col
                    >
                  </v-row>
                </div>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-row>
                  <v-col
                    cols="12"
                    class="d-flex justify-center font-weight-bold font-nunito"
                    style="font-size: 18px"
                    ><p class="hidden-sm-and-up">Đã ký hợp đồng</p></v-col
                  >
                  <v-col cols="12" class="d-flex justify-center pb-0 pt-0">
                    <v-chip @click="$emit('view-detail', contract.contractId)" color="#727CF5" dark>
                      xem chi tiết hợp đồng</v-chip
                    >
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
            <!-- </v-stepper-items> -->
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
    // ...mapGetters({
    //   getUserById: 'vendor/overview/getUserById',
    // }),
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
    getParamForUrl() {
      const { downPayment } = this.contract;
      let result = null;
      let url = null;
      console.log(this.contract.group.vendorId);
      const { phone } = this.contract.vendor;
      // const phone = '0987654320';
      if (downPayment.toString().includes('.')) {
        if (downPayment.toString().split('.')[0] === 0) {
          result = `${downPayment.toString().split('.')[1]}00000`;
          url = `https://nhantien.momo.vn/${phone}/${result}`;
          // console.log(`a${url}`);
          return url;
        }
        result = `${
          downPayment.toString().split('.')[0] + downPayment.toString().split('.')[1]
        }00000`;
        url = `https://nhantien.momo.vn/${phone}/${result}`;
        // console.log(`b${url}`);
        return url;
      }
      result = `${downPayment.toString()}000000`;
      url = `https://nhantien.momo.vn/${phone}/${result}`;
      // console.log(`c${url}`);
      return url;
    },
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
      getUserByIds: 'vendor/overview/getUserByIds',
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
    getStatus(status, paid) {
      let contractStatus = '';
      let color = 'red';
      switch (status) {
        case 'REVERSED':
          contractStatus = 'Đặt cọc giữ chỗ thành công';
          color = 'rgba(255,188,0,.25)';
          break;
        case 'ACTIVATED':
          contractStatus = 'đang thuê';
          color = 'rgba(57,175,209,.25)';
          break;
        case 'INACTIVE':
          contractStatus = 'Chưa đóng tiền cọc giữ chỗ';
          color = 'rgba(10,207,151,.25)';
          if (paid) {
            contractStatus = 'Đang chờ chủ trọ xác nhận';
          }
          break;
        case 'EXPIRED':
          contractStatus = 'hết hiệu lực';
          color = 'rgba(250,92,124,.25)';
          break;
        default:
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
