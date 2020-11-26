<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      max-width="1000"
      scrollable
      transition="dialog-bottom-transition"
      persistent
    >
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card
        class="d-flex flex-column white"
        v-if="!isLoading"
        style="border-radius: 0px !important"
      >
        <v-card
          class="d-flex px-4 py-3 align-center ma-0 justify-space-between bg-primary"
          style="
            border-color: rgb(255, 255, 255);
            box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
            border-radius: 0px !important;
          "
        >
          <!-- <v-img
            alt="Hostel Renting"
            class="shrink mr-2"
            contain
            src="@/assets/logo-sac.png"
            transition="scale-transition"
            max-width="40"
            max-height="40"
          /> -->
          <v-icon class="ml-4" color="rgb(255, 255, 255, 0.8)">mdi-home-group</v-icon>

          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Thêm khu trọ mới
          </span>
          <v-btn icon @click="closeDialog()" class="mr-4"
            ><v-icon color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
          >
        </v-card>
        <v-stepper v-model="e1">
          <v-stepper-header class="ma-auto px-16" _style="width: 70% !important">
            <template v-for="n in 5">
              <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n" color="#727cf5">
                <span class="font-nunito size9rem text-gray">{{ stepHeader[n - 1] }}</span>
              </v-stepper-step>
              <v-divider v-if="n !== 5" :key="n"></v-divider>
            </template>
          </v-stepper-header>
          <!-- <v-stepper-content step="1" class="pa-0">
            <v-card
              class="overflow-y-auto d-flex flex-column py-1 mx-10 my-3"
              max-height="350"
              min-height="350"
            >
              1
            </v-card>
            <v-divider></v-divider>
            <div class="d-flex justify-end pa-4">
              <v-btn class="btn btn-primary font-nunito mx-2" @click="e1 = 2"> Tiếp tục </v-btn>
              <v-btn class="btn btn-light elevation-0 font-nunito mx-2" @click="closeDialog()"
                >Hủy</v-btn
              >
            </div>
          </v-stepper-content> -->
          <v-stepper-content step="1" class="pa-0 mt-2">
            <v-card
              class="overflow-y-auto d-flex flex-column pb-3 px-10 my-0"
              max-height="370"
              min-height="370"
              style="box-shadow: none !important"
            >
              <v-row class="ma-0">
                <v-col cols="8" class="py-0">
                  <v-row class="ma-0">
                    <v-col cols="7" class="d-flex flex-column">
                      <span class="field-name font-weight-medium"
                        >Tên khu trọ<span class="red--text ml-1">(*)</span></span
                      >
                      <v-text-field
                        class="size-sub-2 font-nunito form"
                        solo
                        dense
                        light
                        hide-details
                        v-model="newGroupValue.groupName"
                        @input="setNewGroupValue(newGroupValue)"
                      />
                      <span class="font-nunito red--text size-caption" v-show="check && error.name"
                        >Vui lòng điền tên khu trọ</span
                      >
                    </v-col>
                    <v-col cols="5" class="d-flex flex-column">
                      <span class="field-name font-weight-medium"
                        >Loại<span class="red--text ml-1">(*)</span></span
                      >
                      <v-select
                        v-model="newGroupValue.categoryId"
                        @change="setNewGroupValue(newGroupValue)"
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
                    <v-col cols="3" class="d-flex flex-column">
                      <span class="field-name font-weight-medium"
                        >Địa chỉ<span class="red--text ml-1">(*)</span></span
                      >
                      <v-text-field
                        class="size-sub-2 font-nunito form"
                        solo
                        dense
                        light
                        label="Số nhà"
                        hide-details
                        v-model="newGroupValue.buildingNo"
                        @input="setNewGroupValue(newGroupValue)"
                      />
                    </v-col>
                    <v-col cols="9" class="d-flex flex-column justify-end">
                      <gmap-autocomplete
                        placeholder="Địa chỉ đầy đủ"
                        @place_changed="setPlace"
                        :options="gmap"
                        :value="addressString1"
                        :selectFirstOnEnter="true"
                        style="
                          border: 1px solid #dee2e6 !important;
                          border-radius: 4px;
                          height: 38px !important;
                        "
                        class="address-autocomplete px-3"
                      ></gmap-autocomplete>
                    </v-col>
                    <v-col cols="3" class="d-flex flex-column py-0">
                      <span class="size-caption red--text font-nunito">{{
                        errorMsg.buildingNo
                      }}</span>
                    </v-col>
                    <v-col cols="9" class="d-flex flex-column justify-end py-0">
                      <span class="size-caption red--text font-nunito">{{
                        errorMsg.fullAddres
                      }}</span>
                    </v-col>
                    <v-col cols="3" class="d-flex align-start pr-0">
                      <v-checkbox
                        v-model="newGroupValue.ownerJoin"
                        @click="setNewGroupValue(newGroupValue)"
                        label="Chung chủ"
                        color="#727cf5"
                        class="filter font-nunito size-sub-2 checkbox ma-0"
                        hide-details
                      ></v-checkbox>
                      <span class="red--text pl-1 pt-auto">(*)</span>
                    </v-col>
                    <v-col cols="9" class="d-flex flex-column justify-end">
                      <div class="d-flex mb-2 justify-center">
                        <v-radio-group
                          v-model="groupInfo.curfewTime.radiogroup"
                          hide-details
                          row
                          class="filter my-0"
                          @change="setCurfewtime()"
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
                            class="radioGroup font-nunito ml-4"
                          ></v-radio>
                        </v-radio-group>
                        <span class="red--text mt-1">(*)</span>
                      </div>
                      <v-row class="ma-0" v-show="showCurfewTime">
                        <v-col cols="6" class="py-0 pl-0 d-flex flex-column">
                          <v-autocomplete
                            v-model="newGroupValue.curfewTime.startTime"
                            :items="getTimes('00:00', '23:30', 'asc')"
                            label="Mở cổng"
                            class="size9rem font-nunito form my-0 py-0 pr-0"
                            solo
                            dense
                            color="indigo"
                            hide-details
                            background-color="white"
                            no-data-text="Không có kết quả phù hợp"
                            style="border: 1px solid #e1e1e1 !important; border-radius: 4px"
                          ></v-autocomplete>
                          <span
                            class="font-nunito red--text size-caption"
                            v-show="check && error.startTime"
                            >Vui lòng chọn giờ mở cổng</span
                          >
                        </v-col>
                        <v-col cols="6" class="py-0 pr-0 d-flex flex-column">
                          <v-autocomplete
                            v-model="newGroupValue.curfewTime.endTime"
                            :items="getTimes('00:30', '24:00', 'desc')"
                            label="Đóng cổng"
                            class="size9rem font-nunito form my-0 py-0"
                            solo
                            dense
                            color="indigo"
                            hide-details
                            background-color="white"
                            no-data-text="Không có kết quả phù hợp"
                            style="border: 1px solid #e1e1e1 !important; border-radius: 4px"
                          ></v-autocomplete>
                          <span
                            class="font-nunito red--text size-caption"
                            v-show="check && error.endTime"
                            >Vui lòng chọn giờ đóng cổng</span
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="4" class="d-flex flex-column">
                      <span class="field-name font-weight-medium d-flex align-center font-nunito"
                        >Người liên lạc
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <span
                              v-bind="attrs"
                              v-on="on"
                              class="red--text font-nunito font-weight-bold ml-2"
                              >?</span
                            >
                          </template>
                          <span class="font-nunito"
                            >Là người có thể liên lạc khi tới xem phòng, nếu là chủ trọ, bạn có thể
                            để trống</span
                          >
                        </v-tooltip>
                      </span>
                      <v-text-field
                        class="size-sub-2 form"
                        color="#727cf5"
                        label="Tên"
                        solo
                        dense
                        hide-details
                        light
                        v-model="newGroupValue.managerName"
                        @input="setNewGroupValue(newGroupValue)"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex align-end">
                      <v-text-field
                        class="size-sub-2 form"
                        color="#727cf5"
                        label="Số điện thoại"
                        solo
                        dense
                        light
                        hide-details
                        v-model="newGroupValue.managerPhone"
                        @input="setNewGroupValue(newGroupValue)"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex flex-column">
                      <span class="field-name font-weight-medium d-flex align-center font-nunito"
                        >Cọc giữ chỗ<span class="red--text ml-1">(*)</span>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <span
                              v-bind="attrs"
                              v-on="on"
                              class="red--text font-nunito font-weight-bold ml-2"
                              >?</span
                            >
                          </template>
                          <span class="font-nunito">Tiền cọc giữ chỗ thuê cần phải đóng</span>
                        </v-tooltip>
                      </span>
                      <v-text-field
                        class="size-sub form"
                        type="number"
                        color="#727cf5"
                        solo
                        dense
                        light
                        hide-details
                        v-model="newGroupValue.downPayment"
                        suffix="VNĐ"
                        step="100000"
                        min="0"
                        :rules="[rules.min(groupInfo.downPayment)]"
                        @input="setNewGroupValue(newGroupValue)"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex flex-column py-0">
                      <span
                        class="font-nunito red--text size-caption"
                        v-show="check && error.manageName"
                        >Vui lòng điền tên người liên lạc</span
                      >
                    </v-col>
                    <v-col cols="4" class="d-flex flex-column py-0">
                      <span
                        class="font-nunito red--text size-caption"
                        v-show="check && error.managePhone"
                        >Vui lòng điền số điện thoại người liên lạc</span
                      >
                      <span
                        class="font-nunito red--text size-caption"
                        v-show="check && error.validPhone"
                        >Số điện thoại không hợp lệ</span
                      >
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="4" class="d-flex flex-column pl-10">
                  <v-card outlined min-height="330" max-height="330">
                    <v-col cols="12" class="d-flex flex-column px-5">
                      <span class="field-name font-weight-medium">Ảnh đại diện khu trọ</span>
                      <AvatarManagement />
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-divider></v-divider>
            <div class="d-flex px-4 py-3">
              <v-spacer></v-spacer>
              <v-btn class="btn btn-primary font-nunito mx-2" @click="nextServiceStep()">
                Tiếp tục
              </v-btn>
              <v-btn
                class="btn btn-outline-primary elevation-0 font-nunito mx-2"
                @click="closeDialog()"
                >Đóng</v-btn
              >
            </div>
          </v-stepper-content>
          <v-stepper-content step="2" class="pa-0 mt-2">
            <v-card
              class="overflow-y-auto d-flex flex-column pt-1 pb-3 px-16 my-0"
              max-height="370"
              min-height="370"
              style="box-shadow: none !important"
            >
              <ServiceManagement />
            </v-card>
            <v-divider></v-divider>
            <div class="d-flex px-4 py-3">
              <v-btn class="btn btn-light elevation-0 font-nunito mx-2" @click="e1 = 1"
                >Quay lại</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn class="btn btn-primary font-nunito mx-2" @click="nextRegulationStep()">
                Tiếp tục
              </v-btn>
              <v-btn
                class="btn btn-outline-primary elevation-0 font-nunito mx-2"
                @click="closeDialog()"
                >Đóng</v-btn
              >
            </div>
          </v-stepper-content>
          <v-stepper-content step="3" class="pa-0 mt-2">
            <v-card
              class="overflow-y-auto d-flex flex-column pt-1 pb-3 px-10 my-0"
              max-height="370"
              min-height="370"
              style="box-shadow: none !important"
            >
              <RegulationManagement />
            </v-card>
            <v-divider></v-divider>
            <div class="d-flex px-4 py-3">
              <v-btn class="btn btn-light elevation-0 font-nunito mx-2" @click="e1 = 2"
                >Quay lại</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn class="btn btn-primary font-nunito mx-2" @click="e1 = 4"> Tiếp tục </v-btn>
              <v-btn
                class="btn btn-outline-primary elevation-0 font-nunito mx-2"
                @click="closeDialog()"
                >Đóng</v-btn
              >
            </div>
          </v-stepper-content>
          <v-stepper-content step="4" class="pa-0 mt-2">
            <v-card
              class="overflow-y-auto d-flex flex-column pt-1 pb-3 px-10 my-0"
              max-height="370"
              min-height="370"
              style="box-shadow: none !important"
            >
              <InitSchedule />
            </v-card>
            <v-divider></v-divider>
            <div class="d-flex px-4 py-3">
              <v-btn class="btn btn-light elevation-0 font-nunito mx-2" @click="e1 = 3"
                >Quay lại</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn class="btn btn-primary font-nunito mx-2" @click="nextContractStep()">
                Tiếp tục
              </v-btn>
              <v-btn
                class="btn btn-outline-primary elevation-0 font-nunito mx-2"
                @click="closeDialog()"
                >Đóng</v-btn
              >
            </div>
          </v-stepper-content>
          <v-stepper-content step="5" class="pa-0 mt-2">
            <v-card
              class="overflow-y-auto d-flex flex-column pt-1 pb-3 px-10 my-0"
              max-height="370"
              min-height="370"
              style="box-shadow: none !important"
            >
              <span>Hợp đồng</span>
            </v-card>
            <v-divider></v-divider>
            <div class="d-flex px-4 py-3">
              <v-btn class="btn btn-light elevation-0 font-nunito mx-2" @click="e1 = 4"
                >Quay lại</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn class="btn btn-primary font-nunito mx-2" @click="insertGroup()"> Lưu </v-btn>
              <v-btn
                class="btn btn-outline-primary elevation-0 font-nunito mx-2"
                @click="closeDialog()"
                >Đóng</v-btn
              >
            </div>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
    <v-dialog v-model="warningDialog" max-width="400" hide-overlay>
      <v-card>
        <v-card-title class="d-flex flex-column justify-center px-8">
          <v-icon large class="material-icons-outlined" color="#ffbc00">report_problem</v-icon>
          <span
            class="text-gray font-nunito mt-2"
            style="
              font-size: 1.125rem !important;
              text-align: center !important;
              font-weight: 700 !important;
              padding: 0px 20px 0px;
            "
            >{{ warningTitle }}</span
          >
        </v-card-title>
        <div
          class="font-nunito"
          style="
            font-size: 0.9rem;
            font-weight: 400;
            text-align: center !important;
            padding: 0px 20px 20px;
            color: #ffbc00;
          "
        >
          {{ emptyElement }}
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ServiceManagement from './ServiceManagement.vue';
import RegulationManagement from './RegulationManagement.vue';
import InitSchedule from './InitSchedule.vue';
import AvatarManagement from './AvatarManagement.vue';

export default {
  name: 'CreateGroupDialog',
  props: ['show'],
  components: {
    ServiceManagement,
    RegulationManagement,
    InitSchedule,
    AvatarManagement,
  },
  data: () => ({
    addressString1: '321',
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
    // thuy
    e1: 1,
    stepHeader: ['Thông tin', 'Dịch vụ', 'Nội quy', 'Lịch rảnh', 'Hợp đồng mẫu'],
    groupInfo: {
      groupName: '',
      category: 0,
      address: '',
      ownerJoin: false,
      curfewTime: {
        radiogroup: 'free',
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
    showCurfewTime: false,
    // map
    center: { lat: 10.8230989, lng: 106.6296638 },
    marker: { position: { lat: 10.8230989, lng: 106.6296638 } },
    place: { position: { lat: 10.8230989, lng: 106.6296638 } },
    addressString: '',
    gmap: {
      bounds: {
        north: 11.1602136,
        south: 10.3493704,
        east: 107.0265769,
        west: 106.3638784,
      },
      strictBounds: true,
    },
    buildingNo: '',
    coordsToString: {
      addressComponents: [],
      selectableAddresses: [],
      selectedAddress: '',
    },
    addressComponents: [],
    warningDialog: false,
    warningTitle: '',
    emptyElement: '',
    errorMsg: {
      fullAddres: '',
      buildingNo: '',
    },
    check: false,
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      createHostelGroup: 'vendor/group/createHostelGroup',
      getAllCategories: 'renter/filterResult/getAllCategories',
      getAllServices: 'renter/common/getAllServices1',
      getAllRules: 'renter/common/getAllRules',
      getAllSchedule: 'renter/common/getAllSchedule',
      setNewGroupValue: 'vendor/group/setNewGroupValue',
      getProvinces: 'renter/common/getProvinces',
    }),
    nextServiceStep() {
      this.check = true;
      if (
        this.getAddress() !== false &&
        !this.error.name &&
        !this.error.startTime &&
        !this.error.endTime &&
        !this.error.managerName &&
        !this.error.managerPhone &&
        !this.error.validPhone
      ) {
        this.e1 = 2;
      }
    },
    nextContractStep() {
      const emptyDay = this.newGroupValue.schedules.filter((item) => item.timeRange.length === 0);
      if (emptyDay.length === 7) {
        this.warningTitle = 'Hãy cài đặt lịch rảnh ít nhất 1 ngày trong tuần!';
        this.emptyElement =
          'Cài đặt lịch rảnh các ngày trong tuần để người thuê có thể gặp bạn hoặc quản lý của khu trọ để xem phòng trọ.';
        this.warningDialog = true;
      } else {
        this.e1 = 5;
      }
    },
    nextRegulationStep() {
      if (this.newGroupValue.services.length === 0) {
        this.warningTitle = 'Vui lòng điền các dịch vụ tính tiền ở khu trọ của bạn!';
        this.emptyElement = '';
        this.warningDialog = true;
      } else {
        this.e1 = 3;
      }
    },
    checkCreatingGroup() {
      if (this.groups.success) {
        this.changeShow();
      } else {
        this.showSnackBar('Tạo khu trọ thất bại', { color: 'red' });
      }
    },
    changeShow() {
      this.show = false;
    },
    closeDialog() {
      this.$emit('close');
    },
    setCurfewtime() {
      if (this.groupInfo.curfewTime.radiogroup === 'free') {
        this.newGroupValue.curfewTime.limit = false;
        this.showCurfewTime = false;
      } else {
        this.newGroupValue.curfewTime.limit = true;
        this.showCurfewTime = true;
      }
    },
    setPlace(place) {
      this.place = place;
      this.addMarker();
      this.addressString = `${this.place.formatted_address}`;
      console.log(this.place);
      this.addressString1 = `~${this.addressString.substring(5)}`;
    },
    addMarker() {
      const marker = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      };
      this.marker = { position: marker };
      this.center = marker;
      console.log(this.marker);
      this.newGroupValue.latitude = this.marker.position.lat;
      this.newGroupValue.longitude = this.marker.position.lng;
      this.setNewGroupValue(this.newGroupValue);
    },
    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const coord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.center = coord;
          this.place = { position: coord };
          this.marker = { position: coord };
        });
      }
    },
    async searchByCoord(coords) {
      const key = 'AIzaSyDNBmxVGbZ4Je5XHPRqqaZPmDFKjKPPhXk';
      const { lat, lng } = coords;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
      let res = await fetch(url);
      if (res.status === 200) {
        res = await res.json();
        const includeRoutes = res.results.filter((item) => {
          const indexR = item.address_components.findIndex((compo) => {
            const includeRoute = compo.types.includes('route');
            return includeRoute;
          });
          return indexR > -1;
        });
        let formattedAddresses = includeRoutes.map((item) => {
          const addressComponents = item.address_components;
          const streetNumber = addressComponents.find((compo) => {
            const isInclude = compo.types.includes('street_number');
            return isInclude;
          });
          if (streetNumber) {
            const shortName = streetNumber.short_name;
            return item.formatted_address.substring(shortName.length + 1);
          }
          return item.formatted_address;
        });
        formattedAddresses = new Set(formattedAddresses);
        return Array.from(formattedAddresses);
      }
      console.log(this.marker);
      return null;
    },
    updateSelectableAddress() {
      const { position } = this.marker;
      this.searchByCoord(position).then((formattedAddresses) => {
        this.coordsToString.selectableAddresses = formattedAddresses;
      });
    },
    findDistrictByName(districtName) {
      const district = this.districts.data.find((d) => {
        const include = d.districtName
          .trim()
          .toLowerCase()
          .includes(districtName.trim().toLowerCase());
        return include;
      });
      return district;
    },
    findWardByName(wardName, wards) {
      const ward = wards.find((w) => {
        const include = w.wardName.trim().toLowerCase().includes(wardName.trim().toLowerCase());
        return include;
      });
      return ward;
    },
    findStreetByName(streetName) {
      const street = this.streets.data.find((s) => {
        const include = s.streetName.trim().toLowerCase().includes(streetName.trim().toLowerCase());
        return include;
      });
      return street;
    },
    emitNewAddress() {
      this.newGroupValue.address = this.addressObjForApi;
      this.setNewGroupValue(this.newGroupValue);
      this.$emit('newValue', {
        coords: {
          longitude: this.marker.position.lng,
          latitude: this.marker.position.lat,
        },
        address: this.addressObjForApi,
      });
      console.log(this.addressObjForApi);
    },
    insertGroup() {
      console.log(this.newGroupValue);
      const regulation = this.newGroupValue.regulation.map((item) => ({ regulationId: item }));
      const groupService = this.newGroupValue.services
        .filter((item) => item.serviceId)
        .map((item) => ({
          serviceId: item.serviceId,
          price:
            item.price !== -1 && item.price !== -2
              ? this.getPriceUnit(item.price).servicePrice // eslint-disable-line
              : item.price, // eslint-disable-line
          priceUnit:
            item.price !== -1 && item.price !== -2
              ? this.getPriceUnit(item.price).servicePriceUnit // eslint-disable-line
              : null, // eslint-disable-line
          timeUnit: item.timeUnit,
          userUnit: item.price !== -1 && item.price !== -2 ? item.userUnit : null,
          isRequired: item.isRequired,
        }));
      const newGroupServices = this.newGroupValue.services
        .filter((item) => !item.serviceId)
        .map((item) => ({
          price:
            item.price !== -1 && item.price !== -2
              ? this.getPriceUnit(item.price).servicePrice // eslint-disable-line
              : item.price, // eslint-disable-line
          priceUnit:
            item.price !== -1 && item.price !== -2
              ? this.getPriceUnit(item.price).servicePriceUnit // eslint-disable-line
              : null, // eslint-disable-line
          timeUnit: item.timeUnit,
          userUnit: item.price !== -1 && item.price !== -2 ? item.userUnit : null,
          serviceName: item.serviceName,
          isRequired: item.isRequired,
        }));
      const reqObj = {
        address: this.addressObjForApi,
        appendixContract: 'string',
        buildingNo: this.newGroupValue.buildingNo,
        categoryId: this.newGroupValue.categoryId,
        curfewTime:
          this.newGroupValue.curfewTime.limit === true
            ? `${this.newGroupValue.curfewTime.startTime}-${this.newGroupValue.curfewTime.endTime}` // eslint-disable-line
            : null, // eslint-disable-line
        downPayment: this.newGroupValue.downPayment,
        groupName: this.newGroupValue.groupName,
        imgUrl: this.newGroupValue.avatar,
        latitude: this.newGroupValue.latitude,
        longitude: this.newGroupValue.longitude,
        managerName: this.newGroupValue.managerName,
        managerPhone: this.newGroupValue.managerPhone,
        ownerJoin: this.newGroupValue.ownerJoin,
        regulations: regulation,
        newRegulations: this.newGroupValue.newRegulations.map((item) => ({
          regulationName: item,
        })),
        schedules: this.newGroupValue.schedules
          .filter((item) => item.timeRange.length > 0)
          .map((item) => ({ scheduleId: item.scheduleId, timeRange: item.timeRange })),
        services: groupService,
        newServices: newGroupServices,
        vendorId: this.user.userId,
      };
      console.log(this.addressObjForApi);
      this.createHostelGroup(reqObj).then(() => {
        if (this.isCreatedGroupStatus) {
          this.closeDialog();
        } else {
          console.log('not success');
        }
      });
      console.log(reqObj);
    },
    getPriceUnit(price) {
      let servicePriceUnit = null;
      let servicePrice = 0;
      if (String(price).length <= 6) {
        servicePrice = price / 1000;
        servicePriceUnit = 'nghìn';
      } else if (String(price).length < 10) {
        servicePrice = price / 1000000;
        servicePriceUnit = 'triệu';
      } else {
        servicePriceUnit = 'tỉ';
        servicePrice = price / 1000000000;
      }
      return { servicePrice, servicePriceUnit };
    },
    getAddress() {
      this.errorMsg.fullAddres = ' ';
      this.errorMsg.buildingNo = ' ';
      if (this.newGroupValue.buildingNo.trim() !== '') {
        let address = this.addressString.split(this.newGroupValue.buildingNo);
        if (address.length === 1) {
          this.errorMsg.fullAddres = 'Số nhà không trùng khớp';
          return false;
        }
        address = this.addressString.split(this.newGroupValue.buildingNo)[1].trim();
        let [streetName, wardName, districtName] = address.split(',');
        if (streetName.startsWith('Đường')) {
          streetName = `${streetName.split('Đường')[1]}`;
        }
        wardName = wardName.trim();
        districtName = districtName.trim();
        return { streetName, wardName, districtName };
      }
      this.errorMsg.buildingNo = 'Vui lòng điền số nhà';
      return false;
    },
    getTimes(from, to, sort) {
      const [fromH, fromM] = from.split(':').map((m) => Number(m));
      const [toH, toM] = to.split(':').map((m) => Number(m));
      const hourArr = [...Array(toH - fromH + 1)];
      const preSort = hourArr.flatMap((_, index) => {
        const indexHour = fromH + index;
        if (index === 0 && fromH === toH) {
          return fromM === 0 && toM < 30 // eslint-disable-line
            ? `${indexHour}:00` // eslint-disable-line
            : fromM === 0 && toM >= 30 // eslint-disable-line
            ? [`${indexHour}:00`, `${indexHour}:30`] // eslint-disable-line
            : fromM <= 30 && toM >= 30 // eslint-disable-line
            ? `${indexHour}:30` // eslint-disable-line
            : []; // eslint-disable-line
        }
        if (index === 0) {
          return fromM === 0 // eslint-disable-line
            ? `${indexHour}:00` // eslint-disable-line
            : fromM <= 30 // eslint-disable-line
            ? `${indexHour}:30` // eslint-disable-line
            : []; // eslint-disable-line
        }
        if (index === hourArr.length - 1) {
          return toM < 30 ? `${indexHour}:00` : [`${indexHour}:00`, `${indexHour}:30`];
        }
        return [`${indexHour}:00`, `${indexHour}:30`];
      });
      if (sort === 'desc') {
        return preSort.reverse();
      }
      return preSort;
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
    allSchedule() {
      return this.$store.state.renter.common.schedule.data;
    },
    isLoading() {
      const allServices = this.$store.state.renter.common.services.isLoading;
      const allCategories = this.$store.state.renter.filterResult.filter.categories.isLoading;
      const allRules = this.$store.state.renter.common.rules.isLoading;
      const allSchedule = this.$store.state.renter.common.schedule.isLoading;
      const isCreatingGroup = this.$store.state.vendor.group.groups.isCreating;
      return allServices || allCategories || allRules || allSchedule || isCreatingGroup;
    },
    isCreatedGroupStatus() {
      return this.$store.state.vendor.group.groups.success;
    },
    newGroupValue() {
      return this.$store.state.vendor.group.newGroup;
    },
    ...mapState('renter/common', ['provinces', 'wards', 'districts', 'streets']),
    addressObjForApi() {
      const { streetName, wardName, districtName } = this.getAddress();
      const district = this.findDistrictByName(districtName);
      const ward = this.findWardByName(wardName, district.wards);
      const street = this.findStreetByName(streetName);
      const obj = {
        provinceId: 1,
        districtId: district.districtId,
        wardId: ward.wardId,
        streetName,
        buildingNo: this.newGroupValue.buildingNo,
      };
      if (street) {
        obj.streetId = street.streetId;
      } else {
        obj.streetId = null;
      }
      return obj;
    },
    error() {
      const name = this.newGroupValue.groupName.trim() === '';
      const startTime =
        this.newGroupValue.curfewTime.limit && this.newGroupValue.curfewTime.startTime === '';
      const endTime =
        this.newGroupValue.curfewTime.limit && this.newGroupValue.curfewTime.endTime.trim() === '';
      let manageName =
        this.newGroupValue.managerPhone &&
        this.newGroupValue.managerPhone.trim() !== '' &&
        !this.newGroupValue.managerName;
      if (manageName === '' || manageName === null) {
        manageName = false;
      }
      let managePhone =
        this.newGroupValue.managerName &&
        this.newGroupValue.managerName.trim() !== '' &&
        !this.newGroupValue.managerPhone;
      if (managePhone === '' || managePhone === null) {
        managePhone = false;
      }
      const pattern = /^[0]{1}[0-9]{8,10}$/;
      let validPhone =
        this.newGroupValue.managerPhone &&
        this.newGroupValue.managerPhone.trim() !== '' &&
        !pattern.test(this.newGroupValue.managerPhone);
      if (validPhone === '' || validPhone === null) {
        validPhone = false;
      }
      return {
        name,
        startTime,
        endTime,
        manageName,
        managePhone,
        validPhone,
      };
    },
  },
  watch: {
    marker: {
      handler() {
        this.updateSelectableAddress();
      },
      deep: true,
    },
    'coordsToString.selectedAddress': {
      handler() {
        this.emitNewAddress();
      },
      deep: true,
    },
    buildingNo: {
      handler() {
        this.emitNewAddress();
        this.addressString1 = `${this.buildingNo} `;
      },
    },
  },
  mounted() {
    this.geolocate();
    this.updateSelectableAddress();
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
      this.newGroupValue.categoryId = this.$store.state.renter.filterResult.filter.categories.select;
    });
    if (this.allServices.length === 0) {
      this.getAllServices();
    }
    if (this.allRules.length === 0) {
      this.getAllRules();
    }
    if (this.provinces.data.length === 0) {
      this.getProvinces();
    }
    if (this.allSchedule.length === 0) {
      this.getAllSchedule();
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
.address-autocomplete::placeholder {
  color: #98a6ad;
  font-family: 'Nunito', sans-serif !important;
  font-weight: 300 !important;
  font-size: 0.9rem !important;
}
.address-autocomplete:focus {
  outline: none;
}
.v-stepper__header {
  height: 50px !important;
  border-color: rgb(255, 255, 255);
  box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
}
.v-stepper__step__step .v-icon.v-icon {
  font-size: 1rem !important;
}
.v-stepper__step {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
