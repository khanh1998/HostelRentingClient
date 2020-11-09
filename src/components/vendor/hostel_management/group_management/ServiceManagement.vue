<template>
  <v-row class="mx-0 mt-3 pr-5 d-flex flex-column">
    <div>
      <v-btn
        class="bg-danger-lighten elevation-0 text-danger font-nunito size9rem d-flex justify-start ml-auto"
        style="letter-spacing: 0.01rem !important"
        @click="dialog.addGroupService = true"
        ><v-icon small class="mr-1">mdi-cash-plus</v-icon>Thêm dịch vụ mới</v-btn
      >
    </div>
    <div class="d-flex flex-column">
      <v-row
        class="mx-0 mt-4 pr-4"
        style="
          border-bottom: 2px solid #eef2f7;
          border-top: 2px solid #eef2f7;
          border-left: 2px solid #eef2f7;
          border-right: 2px solid #eef2f7;
        "
      >
        <v-col
          cols="2"
          class="d-flex py-0 align-center justify-center"
          style="border-right: 1px solid #eef2f7"
        >
          <span class="font-nunito text-black size-sub-3">Bắt buộc</span>
        </v-col>
        <v-col
          cols="4"
          class="d-flex py-0 align-center justify-center"
          style="border-right: 1px solid #eef2f7"
        >
          <span class="font-nunito text-black size-sub-3">Tên</span>
        </v-col>
        <v-col
          cols="4"
          class="d-flex py-0 align-center justify-center"
          style="border-right: 1px solid #eef2f7"
        >
          <span class="font-nunito text-black size-sub-3">Giá</span>
        </v-col>
        <v-col cols="2" class="d-flex py-0 align-center justify-center">
          <span class="font-nunito text-black size-sub-3">Tần suất</span>
        </v-col>
      </v-row>
      <v-virtual-scroll
        :items="groupService"
        :item-height="55"
        height="200"
        v-if="groupService.length > 0"
      >
        <template v-slot="{ item }">
          <v-list-item :key="item.serviceId" class="px-0 d-flex justify-start align-start">
            <v-row
              class="mx-0 pa-0 service-item cursor"
              style="border-bottom: 1px solid #eef2f7"
              v-if="groupService.length >= 4"
            >
              <v-col
                cols="2"
                class="d-flex flex-colum justify-center align-center"
                style="border-right: 1px solid #eef2f7; border-left: 1px solid #eef2f7"
              >
                <v-checkbox
                  v-model="required"
                  color="#727cf5"
                  :value="item.serviceId"
                  hide-details
                  class="filter my-0"
                ></v-checkbox>
              </v-col>
              <v-col
                cols="4"
                class="d-flex py-0 align-center"
                style="border-right: 1px solid #eef2f7"
              >
                <span class="font-nunito text-black size-sub-3">{{ item.serviceName }}</span>
              </v-col>
              <v-col
                cols="4"
                class="d-flex py-0 align-center justify-center"
                style="border-right: 1px solid #eef2f7"
              >
                <span class="font-nunito text-black size-sub-3" v-if="item.price">{{
                  item.price
                }}</span>
                <span
                  class="font-nunito text-primary size-sub-3 ml-1"
                  v-if="item.price && !priceSuggestion"
                  >VNĐ/{{ item.userUnit }}</span
                >
                <span class="font-nunito text-black size-sub-3" v-if="priceSuggestion">{{
                  item.priceSuggestion
                }}</span>
              </v-col>
              <v-col cols="2" class="d-flex py-0 align-center justify-center">
                <span class="font-nunito text-black size-sub-3">{{ item.timeUnit }}</span>
              </v-col>
            </v-row>
            <v-row
              class="mx-0 py-0 pl-0 pr-4 service-item cursor"
              style="
                border-bottom: 1px solid #eef2f7;
                border-left: 2px solid #eef2f7;
                border-right: 2px solid #eef2f7;
              "
              v-else
            >
              <v-col
                cols="2"
                class="d-flex flex-colum justify-center align-center"
                style="border-right: 1px solid #eef2f7"
              >
                <v-checkbox
                  v-model="required"
                  color="#727cf5"
                  :value="item.serviceId"
                  hide-details
                  class="filter my-0"
                ></v-checkbox>
              </v-col>
              <v-col
                cols="4"
                class="d-flex py-0 align-center"
                style="border-right: 1px solid #eef2f7"
              >
                <span class="font-nunito text-black size-sub-3">{{ item.serviceName }}</span>
              </v-col>
              <v-col
                cols="4"
                class="d-flex py-0 align-center justify-center"
                style="border-right: 1px solid #eef2f7"
              >
                <span class="font-nunito text-black size-sub-3" v-if="item.price">{{
                  item.price
                }}</span>
                <span
                  class="font-nunito text-primary size-sub-3 ml-1"
                  v-if="item.price && !priceSuggestion"
                  >VNĐ/{{ item.userUnit }}</span
                >
                <span class="font-nunito text-black size-sub-3" v-if="priceSuggestion">{{
                  item.priceSuggestion
                }}</span>
              </v-col>
              <v-col cols="2" class="d-flex py-0 align-center justify-center">
                <span class="font-nunito text-black size-sub-3">{{ item.timeUnit }}</span>
              </v-col>
            </v-row>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <span
        v-else
        style="
          border: 2px dashed #dee2e6;
          border-bottom-right-radius: 6px;
          border-top: 0px;
          border-bottom-left-radius: 6px;
          text-align: center;
        "
        class="pa-5 font-nunito text-primary size9rem"
        >Không có dịch vụ nào</span
      >
    </div>
    <v-dialog v-model="dialog.addGroupService" hide-overlay persistent max-width="600px">
      <v-card>
        <v-card-title
          style="
            background-color: #727cf5 !important;
            box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
          "
        >
          <span class="white--text font-nunito">Thêm dịch vụ mới</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" class="pl-0 pb-0" v-if="!otherService.checkbox">
                <v-select
                  :items="allServices"
                  label="Chọn dịch vụ"
                  item-text="serviceName"
                  item-value="serviceId"
                  dense
                  v-model="addNew.serviceId"
                  class="pa-1 size9rem font-nunito form"
                  solo
                  @input="initUserUnit()"
                ></v-select>
              </v-col>
              <v-col cols="6" class="pl-0 pb-0" v-else>
                <v-text-field
                  v-model="otherService.serviceName"
                  dense
                  label="Tên dịch vụ"
                  class="py-1 size9rem font-nunito service-box-textfield"
                  outlined
                  color="#727cf5"
                />
              </v-col>
              <v-col cols="6" class="pr-0 d-flex pb-0" v-if="!otherService.checkbox">
                <v-text-field
                  v-model="addNew.price"
                  dense
                  label="Giá tiền"
                  type="number"
                  class="py-1 form size9rem font-nunito addnew-service"
                  solo
                  step="10000"
                  min="0"
                  :rules="[rules.min(addNew.price)]"
                  v-if="userUnitSuggested"
                />
                <v-text-field
                  v-model="addNew.userUnit"
                  dense
                  class="py-1 size9rem font-nunito userUnit-textfield"
                  filled
                  prefix="VNĐ/"
                  v-if="userUnitSuggested && userUnitSuggested === 'VNĐ/Phòng'"
                />
                <span
                  v-if="userUnitSuggested && userUnitSuggested !== 'VNĐ/Phòng'"
                  class="my-1 mx-0 px-2 d-flex align-center"
                  style="
                    background-color: rgba(57, 175, 209, 0.25) !important;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    color: #39afd1 !important;
                    height: 38px;
                  "
                >
                  <span class="font-nunito size9rem">{{ userUnitSuggested }}</span>
                </span>
                <span
                  class="my-1 mx-0 px-2 d-flex align-center font-nunito text-gray"
                  style="border: 1px solid #e1e1e1 !important; border-radius: 4px; height: 38px"
                  v-if="!userUnitSuggested"
                  >{{ priceSuggestion }}</span
                >
              </v-col>
              <v-col cols="6" class="pr-0 d-flex pb-0" v-else>
                <v-text-field
                  v-model="otherService.price"
                  dense
                  label="Giá tiền"
                  type="number"
                  class="py-1 form size9rem font-nunito addnew-service other-service"
                  solo
                  step="10000"
                  min="0"
                  height="40"
                  :rules="[rules.min(otherService.price)]"
                />
                <v-text-field
                  v-model="otherService.userUnit"
                  dense
                  class="py-1 size9rem font-nunito other-service-textfield"
                  filled
                  prefix="VNĐ/"
                />
              </v-col>
              <v-col cols="6" class="pt-0 pl-0" v-if="!otherService.checkbox">
                <v-select
                  :items="service.timeUnit"
                  prefix="Tần suất thu: "
                  dense
                  hide-details
                  v-model="addNew.timeUnit"
                  class="pa-1 form size9rem font-nunito"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="6" class="pt-0 pl-0" v-else>
                <v-select
                  :items="service.timeUnit"
                  prefix="Tần suất thu: "
                  dense
                  color="#727cf5"
                  hide-details
                  v-model="otherService.timeUnit"
                  class="otherService size9rem font-nunito service-box-textfield"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="6" class="pt-0 pr-0">
                <v-checkbox
                  v-model="otherService.checkbox"
                  label="Dịch vụ khác"
                  hide-details
                  class="filter service-checkbox"
                  color="#727cf5"
                  @change="resetMessage()"
                ></v-checkbox>
              </v-col>
            </v-row>
            <span class="text-danger font-nunito size-9rem mt-1">{{ message }}</span>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-start pa-4">
          <v-spacer></v-spacer>
          <v-btn
            class="btn btn-light red--text elevation-0 font-nunito"
            @click="dialog.addGroupService = false"
          >
            Hủy
          </v-btn>
          <v-btn class="btn btn-primary font-nunito" @click="addService()"> Thêm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ServiceManagement',
  data: () => ({
    dialog: {
      addGroupService: false,
    },
    addNew: {
      serviceId: 0,
      price: null,
      priceSuggestion: null,
      userUnit: 'phòng',
      timeUnit: '',
      serviceName: null,
    },
    otherService: {
      checkbox: false,
      serviceName: '',
      price: null,
      userUnit: 'phòng',
      timeUnit: '',
    },
    service: {
      userUnit: ['VNĐ/Phòng', 'VNĐ/Người'],
      timeUnit: ['1 tuần', '1 tháng', '3 tháng', '6 tháng', '1 năm'],
    },
    groupService: [],
    required: [],
    userUnitSuggested: 'VNĐ/Phòng',
    priceSuggestion: null,
    rules: {
      min(value) {
        return (value || 'Giá không hợp lệ') >= 0 || 'Không hợp lệ';
      },
    },
    message: '',
  }),
  computed: {
    allServices() {
      return this.$store.state.renter.common.services.data;
    },
    newGroup() {
      return this.$store.state.vendor.group.newGroup;
    },
  },
  methods: {
    ...mapActions({
      getAllServices: 'renter/common/getAllServices1',
      setNewGroupValue: 'vendor/group/setNewGroupValue',
    }),
    initUserUnit() {
      const { serviceName } = this.allServices.find(
        (service) => service.serviceId === Number(this.addNew.serviceId),
      );
      switch (serviceName) {
        case 'điện cố định theo đồng hồ':
          this.userUnitSuggested = 'VNĐ/Kwh';
          this.addNew.userUnit = 'kwh';
          break;
        case 'điện cố định theo người':
          this.userUnitSuggested = 'VNĐ/Người';
          this.addNew.userUnit = 'người';
          break;
        case 'điện lũy tiến':
          this.userUnitSuggested = null;
          this.priceSuggestion = 'Giá bậc thang';
          this.addNew.price = null;
          this.addNew.priceSuggestion = this.priceSuggestion;
          this.addNew.userUnit = 'phòng';
          break;
        case 'điện biến động':
          this.userUnitSuggested = null;
          this.priceSuggestion = 'Giá không cố định';
          this.addNew.price = null;
          this.addNew.priceSuggestion = this.priceSuggestion;
          this.addNew.userUnit = null;
          break;
        case 'nước lũy tiến':
          this.userUnitSuggested = null;
          this.priceSuggestion = 'Giá bậc thang';
          this.addNew.price = null;
          this.addNew.priceSuggestion = this.priceSuggestion;
          this.addNew.userUnit = null;
          break;
        case 'nước cố định theo người':
          this.userUnitSuggested = 'VNĐ/Người';
          this.addNew.userUnit = 'người';
          break;
        case 'nước cố định theo đồng hồ':
          this.userUnitSuggested = 'VNĐ/Khối';
          this.addNew.userUnit = 'khối';
          break;
        case 'nước biến động':
          this.userUnitSuggested = null;
          this.priceSuggestion = 'Giá không cố định';
          this.addNew.price = null;
          this.addNew.priceSuggestion = this.priceSuggestion;
          this.addNew.userUnit = null;
          break;
        case 'gửi xe':
          this.userUnitSuggested = 'VNĐ/Chiếc';
          this.addNew.userUnit = 'chiếc';
          break;
        default:
          this.userUnitSuggested = 'VNĐ/Phòng';
          this.addNew.userUnit = 'phòng';
          break;
      }
    },
    validate() {
      this.message = '';
      if (!this.otherService.checkbox) {
        if (this.addNew.serviceId === 0) {
          this.message += 'Vui lòng nhập thông tin (loại dịch vụ';
        }
        if (!this.addNew.price && !this.priceSuggestion) {
          this.message += this.message === '' ? 'Vui lòng nhập thông tin (giá' : ', giá';
        }
        if (this.addNew.timeUnit === '') {
          this.message +=
            this.message === ''
              ? 'Vui lòng nhập thông tin (tần suất thanh toán' // eslint-disable-line
              : ', tần suất thanh toán'; // eslint-disable-line
        }
        if (this.message !== '') {
          this.message += ')';
        }
      } else {
        if (this.otherService.serviceName.trim() === '') {
          this.message += 'Vui lòng nhập thông tin (tên dịch vụ';
        }
        if (!this.otherService.price) {
          this.message += this.message === '' ? 'Vui lòng nhập thông tin (giá' : ', giá';
        }
        if (this.otherService.timeUnit === '') {
          this.message +=
            this.message === ''
              ? 'Vui lòng nhập thông tin (tần suất thanh toán' // eslint-disable-line
              : ', tần suất thanh toán'; // eslint-disable-line
        }
        if (this.message !== '') {
          this.message += ')';
        }
      }
    },
    addService() {
      this.validate();
      if (this.message === '') {
        if (!this.otherService.checkbox) {
          const { serviceName } = this.allServices.find(
            (service) => service.serviceId === Number(this.addNew.serviceId),
          );
          this.addNew.serviceName = serviceName;
          this.groupService.push({
            serviceId: this.addNew.serviceId,
            serviceName: this.addNew.serviceName,
            price: this.addNew.price,
            priceSuggestion: this.addNew.priceSuggestion,
            timeUnit: this.addNew.timeUnit,
            userUnit: this.addNew.userUnit,
          });
          this.dialog.addGroupService = false;
          this.resetAddnewValue();
          this.newGroup.services = this.groupService;
          this.setNewGroupValue(this.newGroup);
        } else {
          console.log(this.otherService);
        }
      }
    },
    resetMessage() {
      this.message = '';
    },
    resetAddnewValue() {
      const newValue = {
        serviceId: 0,
        price: null,
        userUnit: 'phòng',
        timeUnit: '',
        serviceName: null,
      };
      this.addNew = newValue;
    },
  },
  created() {},
};
</script>

<style>
.addnew-service .v-input__slot {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-right: 0px solid !important;
}
.other-service .v-input__slot {
  border-color: rgba(0, 0, 0, 0.4) !important;
}
.userUnit-textfield .v-input__slot {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-left: 0px solid !important;
  border-bottom-right-radius: 4px !important;
  border: 0px !important;
  background-color: rgba(57, 175, 209, 0.25) !important;
}
.other-service-textfield .v-input__slot {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-left: 0px solid !important;
  border-bottom-right-radius: 4px !important;
  border: 0px !important;
  background-color: rgba(57, 175, 209, 0.25) !important;
}
.userUnit-textfield .v-text-field__prefix,
.v-text-field__suffix {
  color: #39afd1 !important;
  padding-top: 2px !important;
}
.other-service-textfield .v-text-field__prefix,
.v-text-field__suffix {
  color: #39afd1 !important;
  padding-top: 4px !important;
}
.userUnit-textfield.theme--light.v-input input,
.theme--light.v-input textarea {
  color: #39afd1 !important;
}
.other-service-textfield.theme--light.v-input input,
.theme--light.v-input textarea {
  color: #39afd1 !important;
}
.userUnit-textfield.v-text-field--filled.v-input--dense.v-text-field--single-line
  > .v-input__control
  > .v-input__slot {
  min-height: 38px !important;
}
.form .v-text-field__prefix,
.v-text-field__suffix {
  color: #727cf5 !important;
  padding-top: 2px !important;
}
.otherService .v-text-field__prefix,
.v-text-field__suffix {
  color: #727cf5 !important;
  padding-top: 2px !important;
}
.service-checkbox .theme--light.v-label {
  color: #727cf5 !important;
  font-size: 0.875rem !important;
  font-family: 'Nunito', sans-serif !important;
  font-weight: bold !important;
}
.service-box-textfield .v-input__slot {
  border: none !important;
}
.service-item:hover {
  background-color: #f1f3fa;
}
</style>
