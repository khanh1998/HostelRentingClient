<template>
  <div style="overflow-y: auto">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card v-if="!isLoading">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Tìm kiếm"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="allContracts"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title></v-toolbar-title>
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Thông tin hợp đồng</v-toolbar-title>
                </v-toolbar>
                <!-- detail -->
                <v-tabs v-model="tabs.index" class="font-nunito font-weight-bold" color="#727cf5">
                  <v-tab> 1. Thông tin hai bên </v-tab>
                  <v-tab> 2. THÔNG TIN HỢP ĐỒNG </v-tab>
                  <v-tab-item>
                    <div class="d-flex flex-column justify-center align-end">
                      <v-card flat>
                        <v-row no-gutters>
                          <v-col>
                            <v-card>
                              <v-row no-gutters>
                                <v-col cols="12" md="6">
                                  <v-card-text>
                                    <v-container>
                                      <span class="text-h6">BÊN A: BÊN CHO THUÊ</span>
                                      <v-row class="mt-5">
                                        <v-col cols="12" sm="6" md="6" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Ông (Bà): </span
                                          ><span class="ml-2 text-gray-black">{{
                                            vendor.username
                                          }}</span>
                                        </v-col>
                                        <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Năm sinh: </span
                                          ><span class="ml-2 text-gray-black">{{
                                            vendor.yearOfBirth
                                          }}</span>
                                        </v-col>
                                        <v-col cols="7" sm="12" md="12" class="d-flex pb-2">
                                          <span class="font-weight-bold text-gray-black"
                                            >Điện thoại: </span
                                          ><span class="ml-2 text-gray-black">{{
                                            vendor.phone
                                          }}</span>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >CMND số:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            vendor.idNum
                                          }}</span>
                                        </v-col>
                                        <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Ngày cấp:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            getIdNumber(vendor.idIssuedDate)
                                          }}</span>
                                        </v-col>
                                        <v-col cols="7" sm="6" md="6" class="d-flex pb-2">
                                          <span class="font-weight-bold text-gray-black"
                                            >Nơi cấp:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            vendor.idIssuedLocation
                                          }}</span>
                                        </v-col>
                                        <v-col cols="12" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Địa chỉ thường trú:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            vendor.householdAddress
                                          }}</span>
                                        </v-col>
                                        <v-col cols="12" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Chỗ ở hiện nay:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            vendor.currentAddress
                                          }}</span>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-card-text>
                                    <v-container>
                                      <span class="text-h6">BÊN B: BÊN THUÊ</span>
                                      <v-row class="mt-5">
                                        <v-col cols="12" sm="6" md="6" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Ông (Bà): </span
                                          ><span class="ml-2 text-gray-black">{{
                                            renter.username
                                          }}</span>
                                        </v-col>
                                        <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Năm sinh: </span
                                          ><span class="ml-2 text-gray-black">{{
                                            renter.yearOfBirth
                                          }}</span>
                                        </v-col>
                                        <v-col cols="7" sm="12" md="12" class="d-flex pb-2">
                                          <span class="font-weight-bold text-gray-black"
                                            >Điện thoại: </span
                                          ><span class="ml-2 text-gray-black">{{
                                            renter.phone
                                          }}</span>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >CMND số:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            renter.idNum
                                          }}</span>
                                        </v-col>
                                        <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Ngày cấp:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            getIdNumber(renter.idIssuedDate)
                                          }}</span>
                                        </v-col>
                                        <v-col cols="7" sm="6" md="6" class="d-flex pb-2">
                                          <span class="font-weight-bold text-gray-black"
                                            >Nơi cấp:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            renter.idIssuedLocation
                                          }}</span>
                                        </v-col>
                                        <v-col cols="12" class="d-flex pb-0">
                                          <span class="font-weight-bold text-gray-black"
                                            >Địa chỉ thường trú:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            renter.householdAddress
                                          }}</span>
                                        </v-col>
                                        <v-col cols="12" class="d-flex pb-2">
                                          <span class="font-weight-bold text-gray-black"
                                            >Chỗ ở hiện nay:</span
                                          ><span class="ml-2 text-gray-black">{{
                                            renter.currentAddress
                                          }}</span>
                                        </v-col>
                                        <v-col cols="12" class="d-flex pb-2">
                                          <span class="font-weight-bold text-gray-black"
                                            >Trường đã / đang học:</span
                                          ><span class="ml-2 text-gray-black"
                                            >{{ school.schoolName }} -
                                            {{ address.districtName }}</span
                                          >
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-btn class="ma-4 btn-primary" @click="goToNextTab"
                        >Tiếp tục <v-icon small>arrow_forward_ios</v-icon></v-btn
                      >
                    </div>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card>
                      <v-row no-gutters>
                        <v-col cols="12" md="6">
                          <v-card-text class="d-flex flex-column">
                            <span class="text-h6 mt-5">THÔNG TIN PHÒNG TRỌ</span>
                            <v-row>
                              <v-col cols="12" class="d-flex flex-column">
                                <span class="font-weight-bold text-gray-black">Nhà trọ </span>
                                <span class="text size-sub-2 px-3 py-2 mt-2">{{ groupName }}</span>
                              </v-col>
                              <v-col cols="12" class="d-flex flex-column">
                                <span class="font-weight-bold text-gray-black">Phòng </span>
                                <span class="text size-sub-2 px-3 py-2 mt-2">{{ roomName }}</span>
                              </v-col>

                              <v-col cols="12" sm="6" class="d-flex flex-column">
                                <span class="font-weight-bold text-gray-black"
                                  >Ngày bắt đầu hợp đồng
                                </span>
                                <span class="text size-sub-2 px-3 py-2 mt-2">{{ startTime }}</span>
                              </v-col>
                              <v-col cols="12" sm="6" class="d-flex flex-column">
                                <span class="font-weight-bold text-gray-black"
                                  >Thời hạn hợp đồng
                                </span>
                                <span class="text size-sub-2 px-3 py-2 mt-2">{{ duration }}</span>
                              </v-col>
                              <v-col cols="6" sm="6" class="d-flex flex-column">
                                <span class="font-weight-bold text-gray-black">Tiền thuê </span>
                                <span class="text size-sub-2 px-3 py-2 mt-2 d-flex"
                                  ><span>{{ price }}</span>
                                  <span class="ml-auto">triệu/tháng</span>
                                </span>
                              </v-col>
                              <v-col cols="6" sm="6" class="d-flex flex-column">
                                <span class="font-weight-bold text-gray-black">Tiền cọc</span>
                                <span class="text size-sub-2 px-3 py-2 mt-2 d-flex"
                                  ><span>{{ deposit }}</span>
                                  <span class="ml-auto">tháng tiền phòng</span>
                                </span>
                              </v-col>
                            </v-row>
                            <span class="text-h6 mt-5">THÔNG TIN DỊCH VỤ</span>
                            <v-row>
                              <v-col class="12">
                                <!-- hostel group service -->
                                <v-card class="pa-2" height="100%" elevation="0">
                                  <v-data-table
                                    :headers="headersS"
                                    :items="itemsS"
                                    item-key="serviceId"
                                    hide-default-footer
                                    dense
                                    locale="vi-VN"
                                    class="mt-2"
                                  >
                                    <template v-slot:top>
                                      <v-toolbar flat>
                                        <v-toolbar-title>Dịch vụ</v-toolbar-title>
                                      </v-toolbar>
                                    </template>
                                  </v-data-table>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <!-- facility -->
                                  <v-data-table
                                    :headers="headersF"
                                    dense
                                    hide-default-footer
                                    :items="itemsF"
                                    class="elevation-1"
                                  >
                                    <template v-slot:top>
                                      <v-toolbar flat>
                                        <v-toolbar-title>Nội thất</v-toolbar-title>
                                      </v-toolbar>
                                    </template>
                                  </v-data-table>
                                </v-col>
                                <v-col cols="12">
                                  <!-- rule -->
                                  <v-data-table
                                    dense
                                    :headers="headersR"
                                    hide-default-footer
                                    :items="rules"
                                    class="elevation-1"
                                  >
                                    <template v-slot:item.allowed="{ item }">
                                      <v-simple-checkbox
                                        v-model="item.allowed"
                                        disabled
                                      ></v-simple-checkbox>
                                    </template>
                                    <template v-slot:top>
                                      <v-toolbar flat>
                                        <v-toolbar-title>Quy định</v-toolbar-title>
                                      </v-toolbar>
                                    </template>
                                  </v-data-table>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" class="d-flex flex-column">
                                  <span
                                    >Tiền đặt cọc sẽ được trả lại đầy đủ cho bên B khi hết hợp đồng
                                    thuê phòng trọ với điều kiện thanh toán đầy đủ tiền điện, nước,
                                    phí dịch vụ và các khoản khác liên quan.</span
                                  >
                                  <span class="mt-2"
                                    >Bên A ngưng hợp đồng (lấy lại nhà) trước thời hạn thì bồi
                                    thường gấp đôi số tiền bên B đã đặt cọc.</span
                                  >
                                  <span class="mt-2"
                                    >Bên B ngưng hợp đồng trước thời hạn thì phải chịu mất tiền thế
                                    chân.</span
                                  >
                                </v-col>
                                <v-col cols="12">
                                  <!-- image -->
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.groupName="{ item }">
          <span class="text-gray font-nunito size9rem font-weight-bold">{{ item.groupName }}</span>
          <span class="font-nunito text-muted size-caption hidden-sm-and-down">
            {{ item.buildingNo }} {{ item.streetName }}, {{ item.wardName }},
            {{ item.districtName }},
            {{ item.provinceName }}
          </span>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="item.color">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn depressed text @click="findContract(item.contractId)"> Chi tiết </v-btn>
          <v-btn depressed icon :to="`/vendor/contract?contractId=${item.contractId}&mode=update`">
            <v-icon>create</v-icon>
          </v-btn>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="allContracts"> Reset </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-4 pb-4">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import InfomationSection from '@/components/vendor/contract/InfomationSection.vue';
// import TermsOfContractSection from '@/components/vendor/contract/TermsOfContractSection.vue';
// import ContractItemVendor from '@/components/view_contracts/ContractItemVendor.vue';

export default {
  name: 'ViewContractVendor',
  // components: { InfomationSection, TermsOfContractSection },
  data: () => ({
    // search
    search: '',
    // paging
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    // dialog show detail
    dialog: false,
    showIndex: -1,
    showItemDetail: {
      renterName: '',
      groupName: '',
      roomName: '',
      startTime: '',
      endTime: '',
      status: '',
    },
    // tab in detail
    tabs: {
      index: 0,
    },
    // rule
    headersR: [
      {
        text: 'Số thứ tự',
        align: 'start',
        sortable: true,
        value: 'regulationId',
      },
      { text: 'Nội dung', value: 'regulationName' },
      { text: 'Được làm', value: 'allowed' },
      { value: 'actions', sortable: false },
    ],
    headers: [
      {
        text: 'Người thuê',
        align: 'start',
        value: 'renterName',
      },
      { text: 'Nhà trọ', value: 'groupName' },
      { text: 'Phòng', value: 'roomName', sortable: false },
      { text: 'Ngày bắt đầu', value: 'startTime' },
      { text: 'Ngày hết hạn', value: 'endTime' },
      { text: 'Trạng thái', value: 'status', sortable: false },
      { value: 'actions', sortable: false },
    ],
    // service
    headersS: [
      {
        text: 'Tên',
        align: 'start',
        sortable: true,
        value: 'serviceName',
      },
      { text: 'Giá (Nghìn đồng)', value: 'price', sortable: true },
      { text: 'Đơn vị', value: 'userUnit', sortable: false },
      { text: 'Tần suất thanh toán', value: 'timeUnit', sortable: false },
    ],
    // facility

    headersF: [
      { text: 'Số thứ tự', align: 'start', value: 'no' },
      {
        text: 'Nội dung',
        align: 'start',
        sortable: true,
        value: 'facilityName',
      },
    ],
    color: undefined,
    vendor: {},
    renter: {},
    school: {},
    address: {},
    rules: [],
    groupName: {},
    roomName: {},
    startTime: {},
    duration: 0,
    price: 0,
    deposit: 0,
    services: [],
    facilities: [],
  }),
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
      getUser: 'user/getUser',
    }),
    ...mapGetters({
      findContractById: 'user/findContractById',
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
      let color = 'blue';
      switch (status) {
        case 'REVERSED':
          contractStatus = 'cọc';
          color = 'rgb(105, 157, 217)';
          break;
        case 'ACTIVATED':
          contractStatus = 'đang thuê';
          color = 'rgb(202, 233, 244)';
          break;
        case 'INACTIVE':
          contractStatus = 'chờ xác nhận';
          color = 'rgb(18, 189, 138)';
          break;
        default:
          contractStatus = 'hết hiệu lực';
          color = 'rgb(255, 51, 69)';
          break;
      }
      return { contractStatus, color };
    },
    findContract(contractId) {
      // console.log(contractId);
      const createdContract = this.findContractById()(contractId);
      this.vendor = createdContract.vendor;
      this.renter = createdContract.renter;
      this.school = createdContract.renter.school;
      this.address = createdContract.renter.school.address;
      this.rules = createdContract.group.regulations;
      this.groupName = createdContract.group.groupName;
      this.roomName = createdContract.room.roomName;
      this.startTime = this.getDateByTimestamp(createdContract.startTime);
      this.duration = createdContract.duration;
      this.price = createdContract.type.price;
      this.deposit = createdContract.type.deposit;
      this.services = createdContract.group.services;
      this.facilities = createdContract.type.facilities;
      // console.log(this.contractDetail);
      // console.log(this.rules);
      this.dialog = true;
    },
    goToNextTab() {
      this.tabs.index += 1;
      document.getElementById('contractView').scrollTop = 0;
    },
    getIdNumber(time) {
      return new Date(time).toLocaleDateString('vi-vn');
    },
  },
  created() {
    this.getUser().then(() => {
      this.getContracts();
    });
  },
  computed: {
    isLoading() {
      const loadingUser = this.$store.state.user.user.isLoading;
      const loadingContracts = this.$store.state.user.contracts.isLoading;
      // const loadingDeals = this.$store.state.user.deals.isLoading;
      // const loadingProvinces = this.$store.state.renter.common.provinces.isLoading;
      return loadingUser || loadingContracts;
    },
    allContracts() {
      return this.$store.state.user.contracts.data.map((item) => ({
        contractId: item.contractId,
        renterName: item.renter.username,
        groupName: item.group.groupName,
        roomName: item.room.roomName,
        startTime: this.getDateByTimestamp(item.startTime),
        endTime: this.getDateByTimestamp(this.getEndDate(item.startTime, item.duration)),
        status: this.getStatus(item.status).contractStatus,
        color: this.getStatus(item.status).color,
        buildingNo: item.group.buildingNo,
        streetName: item.group.address.streetName,
        wardName: item.group.address.wardName,
        districtName: item.group.address.districtName,
        provinceName: item.group.address.provinceName,
      }));
    },
    bookings() {
      const list = this.allBooking;
      let filteredDate = [];
      filteredDate = list.filter((booking) => {
        let min = new Date(`${this.date[0]}T00:00:00`).getTime();
        let max = new Date(`${this.date[0]}T23:59:59`).getTime();
        if (this.date.length === 2 && this.date[0] !== this.date[1]) {
          max = new Date(`${this.date[1]}T23:59:59`).getTime();
          if (min > max) {
            max = new Date(`${this.date[1]}T00:00:00`).getTime();
            min = new Date(`${this.date[0]}T23:59:59`).getTime();
            return booking.meetTime <= min && booking.meetTime >= max;
          }
        }
        return booking.meetTime <= max && booking.meetTime >= min;
      });

      const result = filteredDate.filter((booking) => {
        const selectedIdx = this.buttonGroup.selectedBookingStatus;
        switch (selectedIdx) {
          case 0:
            return booking.status === 'INCOMING';
          case 1:
            return booking.status === 'DONE';
          case 2:
            return booking.status === 'CANCELLED';
          default:
            return true;
        }
      });
      return { result, filteredDate };
    },
    dateRange() {
      const start = new Date(this.date[0]);
      const end = new Date(this.date[1]);
      if (start.getTime() === end.getTime()) {
        return `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
      }
      if (start.getTime() > end.getTime()) {
        return `${end.getDate()}/${end.getMonth() + 1}${
          this.date[1] === undefined // eslint-disable-next-line
            ? `/${end.getFullYear()}` // eslint-disable-next-line
            : `${
                // eslint-disable-line
                end.getFullYear() === start.getFullYear() // eslint-disable-line
                  ? ` - ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}` // eslint-disable-line
                  : `/${end.getFullYear()}` // eslint-disable-line
              }` // eslint-disable-line
        }`;
      }
      return `${start.getDate()}/${start.getMonth() + 1}${
        this.date[1] === undefined // eslint-disable-next-line
          ? `/${start.getFullYear()}` // eslint-disable-next-line
          : `${
              // eslint-disable-line
              start.getFullYear() === end.getFullYear() // eslint-disable-line
                ? ` - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}` // eslint-disable-line
                : `/${start.getFullYear()}` // eslint-disable-line
            }` // eslint-disable-line
      }`;
    },
    isLoadingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
    counter() {
      let incomming = 0;
      let done = 0;
      let cancel = 0;
      this.bookings.filteredDate.forEach((booking) => {
        switch (booking.status) {
          case 'INCOMING':
            incomming += 1;
            break;
          case 'DONE':
            done += 1;
            break;
          case 'CANCELLED':
            cancel += 1;
            break;
          default:
        }
      });
      return { incomming, done, cancel };
    },
    items() {
      return this.rules.map((item) => ({
        name: item.regulationName,
        no: item.regulationId,
        allowed: item.allowed,
      }));
    },
    itemsS() {
      return this.services.map((item) => ({
        serviceName: item.serviceName,
        price: item.price,
        userUnit: item.userUnit,
        timeUnit: item.timeUnit,
      }));
    },
    itemsF() {
      return this.facilities.map((item) => ({
        no: item.facilityId,
        facilityName: item.facilityName,
      }));
    },
  },
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.btn-primary {
  color: #6c757d !important;
  background-color: #eef2f7 !important;
  border-color: #727cf5 !important;
  /* box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important; */
  border-radius: 0.15rem !important;
  height: 2.5rem !important;
  opacity: 1 !important;
}
.v-btn-toggle > .v-btn.v-btn {
  opacity: 1 !important;
  border-style: none !important;
}
.v-btn-toggle > .v-btn.v-btn--active {
  color: #fff !important;
  background-color: #727cf5 !important;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
  opacity: 1 !important;
}
</style>
