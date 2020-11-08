<template>
  <v-row justify="center">
    <v-dialog v-model="show" scrollable max-width="98%" transition="dialog-bottom-transition">
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="d-flex flex-column" v-if="!isLoading">
        <v-row class="d-flex px-4 py-3 align-center ma-0 justify-space-between">
          <v-img
            alt="Hostel Renting"
            class="shrink mr-2"
            contain
            src="@/assets/logo-sac.png"
            transition="scale-transition"
            max-width="40"
            max-height="40"
          />
          <span
            class="font-nunito text-primary font-weight-bold"
            style="font-size: 1.125rem !important"
            >Thêm nhà trọ mới
          </span>
          <v-btn icon @click="closeDialog()" class="mr-4"
            ><v-icon color="#98a6ad">close</v-icon></v-btn
          >
        </v-row>
        <v-divider></v-divider>
        <v-card-text class="py-0" style="height: 500px">
          <v-row class="ma-0 d-flex justify-space-between">
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="8" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Tên nhà trọ<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-text-field
                    class="size-sub-2 font-nunito form"
                    solo
                    dense
                    light
                    hide-details
                    v-model="groupInfo.groupName"
                  />
                </v-col>
                <v-col cols="4" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Loại nhà trọ<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-select
                    v-model="groupInfo.category"
                    :items="categories"
                    item-text="categoryName"
                    item-value="categoryId"
                    label="Loại"
                    dense
                    hide-details
                    solo
                    class="size-sub-2 font-nunito form"
                  ></v-select>
                </v-col>
                <v-col cols="8" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Địa chỉ<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-text-field
                    class="size-sub-2 form"
                    color="#727cf5"
                    solo
                    dense
                    light
                    hide-details
                    v-model="groupInfo.address"
                  />
                </v-col>
                <v-col cols="4" class="d-flex flex-column">
                  <span></span>
                  <v-checkbox
                    v-model="groupInfo.ownerJoin"
                    label="Chung chủ"
                    color="#727cf5"
                    class="filter font-nunito size-sub-2 mt-auto checkbox"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-radio-group
                    v-model="groupInfo.curfewTime.radiogroup"
                    hide-details
                    row
                    class="filter ma-0"
                  >
                    <v-radio
                      label="Giờ giấc tự do"
                      value="free"
                      color="#727cf5"
                      class="radioGroup font-nunito"
                    ></v-radio>
                    <v-radio
                      label="Giới nghiêm"
                      value="limit"
                      color="#727cf5"
                      class="radioGroup font-nunito"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="4">
                  <div class="d-flex flex-row mt-2">
                    <el-time-select
                      placeholder="Mở cổng"
                      v-model="groupInfo.curfewTime.startTime"
                      :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '23:30',
                      }"
                    >
                    </el-time-select>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div class="d-flex flex-row mt-2">
                    <el-time-select
                      placeholder="Đóng cổng"
                      v-model="groupInfo.curfewTime.endTime"
                      :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '23:30',
                      }"
                    >
                    </el-time-select>
                  </div>
                </v-col>
                <v-col cols="8" class="d-flex flex-column">
                  <span class="field-name font-weight-medium d-flex align-center mb-0"
                    >Người liên lạc<v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon small color="#fa5c7c">mdi-account-question</v-icon>
                        </v-btn>
                      </template>
                      <span class="font-nunito"
                        >Là người có thể liên lạc khi tới xem phòng, nếu là chủ trọ, bạn có thể để
                        trống</span
                      >
                    </v-tooltip>
                  </span>
                  <div class="d-flex">
                    <v-col cols="7" class="py-0 pl-0">
                      <v-text-field
                        class="size-sub-2 form"
                        color="#727cf5"
                        label="Tên"
                        solo
                        dense
                        light
                        v-model="groupInfo.manager.name"
                      />
                    </v-col>
                    <v-col cols="5" class="py-0 pr-0">
                      <v-text-field
                        class="size-sub-2 form"
                        color="#727cf5"
                        label="Số điện thoại"
                        solo
                        dense
                        light
                        hide-details
                        v-model="groupInfo.manager.phone"
                      />
                    </v-col>
                  </div>
                </v-col>
                <v-col cols="4" class="d-flex flex-column">
                  <span class="field-name font-weight-medium d-flex align-center mb-0"
                    >Cọc giữ chân<v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon small color="#fa5c7c">mdi-account-question</v-icon>
                        </v-btn>
                      </template>
                      <span class="font-nunito"
                        >Là người có thể liên lạc khi tới xem phòng, nếu là chủ trọ, bạn có thể để
                        trống</span
                      >
                    </v-tooltip>
                  </span>
                  <div class="d-flex">
                    <v-col cols="12" class="py-0 pl-0">
                      <v-text-field
                        class="size-sub form"
                        type="number"
                        color="#727cf5"
                        solo
                        dense
                        light
                        hide-details
                        v-model="groupInfo.downPayment"
                        suffix="VNĐ"
                        step="100000"
                        min="0"
                        :rules="[rules.min(groupInfo.downPayment)]"
                      />
                    </v-col>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 d-flex justify-end">
              <v-col cols="11" class="pa-0">
                <v-tabs background-color="#EEF2F7" show-arrows center-active>
                  <v-tab
                    class="font-nunito text-gray size9rem text-capitalize utilities-category"
                    style="letter-spacing: 0.01rem !important"
                  >
                    <span>Vị trí trên bản đồ</span>
                  </v-tab>
                  <v-tab
                    class="font-nunito text-gray size9rem text-capitalize utilities-category"
                    style="letter-spacing: 0.01rem !important"
                  >
                    <span>Dịch vụ</span>
                  </v-tab>
                  <v-tab
                    class="font-nunito text-gray size9rem text-capitalize utilities-category"
                    style="letter-spacing: 0.01rem !important"
                  >
                    <span>Nội quy</span>
                  </v-tab>
                  <v-tab
                    class="font-nunito text-gray size9rem text-capitalize utilities-category"
                    style="letter-spacing: 0.01rem !important"
                  >
                    <span>Hình ảnh</span>
                  </v-tab>
                  <v-tab
                    class="font-nunito text-gray size9rem text-capitalize utilities-category"
                    style="letter-spacing: 0.01rem !important"
                  >
                    <span>Hợp đồng mẫu</span>
                  </v-tab>
                  <v-tab-item> vi tri tren ban do </v-tab-item>
                  <v-tab-item> <ServiceManagement /></v-tab-item>
                  <v-tab-item><RegulationManagement /></v-tab-item>
                  <v-tab-item><AvatarManagement /></v-tab-item>
                  <v-tab-item>Hợp đồng</v-tab-item>
                </v-tabs>
              </v-col>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end pa-4">
          <v-btn class="btn btn-light elevation-0 font-nunito" @click="closeDialog()"> Đóng </v-btn>
          <v-btn class="btn btn-primary font-nunito"> Lưu </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ServiceManagement from './ServiceManagement.vue';
import RegulationManagement from './RegulationManagement.vue';
import AvatarManagement from './AvatarManagement.vue';
// import snackBarMixin from '../../mixins/snackBar';
// import PlacePicker from './PlacePicker.vue';
// import HostelGroupRules from './HostelGroupRules.vue';
// import HostelGroupServiceEditor from './HostelGroupServiceEditor.vue';
// import TableOfContent from './TableOfContent.vue';
// import ScheduleForCreated from '../schedule/ScheduleTableForCreated.vue';

export default {
  name: 'GroupManagement',
  props: ['show', 'create', 'update'],
  // mixins: [snackBarMixin],
  components: {
    ServiceManagement,
    RegulationManagement,
    AvatarManagement,
    // PlacePicker,
    // HostelGroupRules,
    // HostelGroupServiceEditor,
    // TableOfContent,
    // ScheduleForCreated,
  },
  data: () => ({
    newGroup: {
      vendorId: 0,
      buildingNo: '',
      longitude: '',
      latitude: '',
      managerName: '',
      managerPhone: '',
      ownerJoin: false,
      imgUrl: null,
      address: {
        provinceId: 1,
        provinceName: 'Thành phố Hồ Chí Minh',
        districtId: null,
        districtName: '',
        wardId: null,
        wardName: '',
        streetId: null,
        streetName: '',
      },
      services: [],
      schedules: [],
    },
    toc: [
      {
        to: 'name',
        text: 'Tên khu trọ',
      },
      {
        to: 'address',
        text: 'Địa chỉ',
      },
      {
        to: 'service',
        text: 'Dịch vụ',
      },
    ],
    // thuy
    groupInfo: {
      groupName: '',
      category: 0,
      address: '',
      ownerJoin: false,
      curfewTime: {
        radiogroup: 'limit',
        startTime: '',
        endTime: '',
      },
      manager: {
        name: '',
        phone: '',
      },
      downPayment: 0,
    },
    rules: {
      min(value) {
        return (value || 'Giá không hợp lệ') > 0 || 'Không hợp lệ';
      },
    },
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      createHostelGroup: 'vendor/group/createHostelGroup',
      getAllCategories: 'renter/filterResult/getAllCategories',
      getAllServices: 'renter/common/getAllServices1',
      getAllRules: 'renter/common/getAllRules',
    }),
    receiveNewServiceData(serviceList) {
      if (this.create) {
        this.newGroup.services = serviceList;
      }
    },
    receiveNewRulesData(obj) {
      if (this.create) {
        this.newGroup.regulations = obj.rule;
        if (!obj.time.openAllDay && obj.time.startTime && obj.time.endTime) {
          this.newGroup.curfewTime = `${obj.time.startTime} - ${obj.time.endTime}`;
        } else {
          this.newGroup.curfewTime = null;
        }
      }
    },
    receiveNewAddress(addressObj) {
      const { coords, address } = addressObj;
      this.newGroup.longitude = coords.longitude;
      this.newGroup.latitude = coords.latitude;
      this.newGroup.address = address;
      this.newGroup.buildingNo = address.buildingNo;
    },
    receiveNewSchedule(scheduleObj) {
      this.newGroup.schedules = scheduleObj;
      // console.log('new group');
      // console.log(this.newGroup.schedules);
    },
    checkCreatingGroup() {
      if (this.groups.success) {
        // this.showSnackBar(`Khu trọ ${this.newGroup.groupName} đã được tạo thành công`, {
        //   color: 'green',
        // });
        this.changeShow();
      } else {
        this.showSnackBar('Tạo khu trọ thất bại', { color: 'red' });
      }
    },
    changeShow() {
      this.show = false;
    },
    doCreateHostelGroup() {
      this.createHostelGroup(this.newGroup).then(() => this.checkCreatingGroup());
    },
    closeDialog() {
      this.$emit('close');
    },
  },
  computed: {
    ...mapState({
      groups: (state) => state.vendor.group.groups,
    }),
    user() {
      return this.$store.state.user.user.data;
    },
    categories() {
      return this.$store.state.renter.filterResult.filter.categories.data;
    },
    allServices() {
      return this.$store.state.renter.common.services.data;
    },
    allRules() {
      return this.$store.state.renter.common.rules.data;
    },
    isLoading() {
      const allServices = this.$store.state.renter.common.services.isLoading;
      const allCategories = this.$store.state.renter.filterResult.filter.categories.isLoading;
      const allRules = this.$store.state.renter.common.rules.isLoading;
      return allServices || allCategories || allRules;
    },
  },
  created() {
    if (!this.user) {
      this.getUser().then(() => {
        this.newGroup.vendorId = this.user.userId;
      });
    } else {
      this.newGroup.vendorId = this.user.userId;
    }
    // if (this.categories.length === 0) {
    this.getAllCategories().then(() => {
      this.groupInfo.category = this.$store.state.renter.filterResult.filter.categories.select;
    });
    if (this.allServices.length === 0) {
      this.getAllServices();
    }
    if (this.allRules.length === 0) {
      this.getAllRules();
    }
    // }
  },
};
</script>
<style>
.field-name {
  color: #212121 !important;
  font-family: Nunito, sans-serif !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  text-align: left !important;
  margin-bottom: 0.5rem !important;
}
.v-input__slot {
  border: 1px solid #dee2e6 !important;
}
.checkbox .theme--light.v-label {
  color: #6c757d !important;
  font-size: 0.875rem !important;
  font-family: 'Nunito', sans-serif !important;
}
.form.v-text-field input {
  color: #6c757d !important;
}
.form.theme--light.v-select .v-select__selection--comma {
  color: #6c757d !important;
}
.form .theme--light.v-label {
  color: #98a6ad !important;
  font-weight: 400 !important;
}
.radioGroup .theme--light.v-label {
  color: #6c757d !important;
  font-family: 'Nunito', sans-serif !important;
  font-size: 0.875rem !important;
}
.el-input__inner {
  color: #6c757d !important;
}
</style>
