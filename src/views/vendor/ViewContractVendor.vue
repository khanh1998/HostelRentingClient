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
              <v-card v-if="currentContract">
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Thông tin hợp đồng</v-toolbar-title>
                </v-toolbar>
                <div style="height: calc(100vh - 64px); overflow: hidden">
                  <v-progress-linear
                    v-model="progressBar.value"
                    :active="true"
                    :indeterminate="false"
                    :query="true"
                  ></v-progress-linear>
                  <WebViewer :initialDoc="currentContract.contractUrl" />
                </div>
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
          <v-btn
            depressed
            icon
            v-if="item.statusCode === 'INACTIVE'"
            :to="`/vendor/contract?contractId=${item.contractId}&mode=update`"
          >
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
import WebViewer from '../../components/vendor/contract/WebViewer.vue';

export default {
  name: 'ViewContractVendor',
  components: { WebViewer },
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
    currentContract: null,
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
    progressBar: {
      value: 0,
    },
    pdfViewer: {
      pdf: null,
      currentPage: 1,
      zoom: 1,
      isLoading: false,
    },
  }),
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
      getUser: 'user/getUser',
    }),
    ...mapGetters({
      findContractById: 'user/findContractById',
    }),
    updateProgressBar(p) {
      console.log(p);
      this.progressBar.value = Math.ceil(p * 100);
    },
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
      this.currentContract = createdContract;
      this.vendor = createdContract.vendor;
      this.renter = createdContract.renter;
      // this.school = createdContract.renter.school;
      // this.address = createdContract.renter.school.address;
      // this.rules = createdContract.group.regulations;
      this.groupName = createdContract.group.groupName;
      this.roomName = createdContract.room.roomName;
      // this.startTime = this.getDateByTimestamp(createdContract.startTime);
      // this.duration = createdContract.duration;
      this.price = createdContract.type.price;
      this.deposit = createdContract.type.deposit;
      // this.services = createdContract.group.services;
      // this.facilities = createdContract.type.facilities;
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
        statusCode: item.status,
        color: this.getStatus(item.status).color,
        buildingNo: item.group.buildingNo,
        streetName: item.group.address.streetName,
        wardName: item.group.address.wardName,
        districtName: item.group.address.districtName,
        provinceName: item.group.address.provinceName,
        contractUrl: item.contractUrl,
      }));
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
