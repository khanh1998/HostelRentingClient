<template>
  <v-card class="pa-2" height="100%" elevation="0" :loading="isServiceLoading">
    <span class="text-h6"><v-icon>room_service</v-icon> Dịch vụ</span>
    <v-data-table
      :headers="servicesBox.headers"
      :items="newServices"
      hide-default-footer
      dense
      locale="vi-VN"
      class="mt-2"
    >
      <template v-slot:item.price="{ item }">
        <v-text-field v-model="item.price" hide-details dense></v-text-field>
      </template>
      <template v-slot:item.unit="{ item }">
        <v-select
          v-model="item.userUnit"
          menu-props="auto"
          label="Select"
          hide-details
          dense
          single-line
          :items="servicesBox.units"
        ></v-select>
      </template>
      <template v-slot:item.time="{ item }">
        <v-select
          v-model="item.timeUnit"
          menu-props="auto"
          label="Select"
          hide-details
          dense
          single-line
          :items="servicesBox.times"
        ></v-select>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn @click="removeService(item)" icon>
          <v-icon>clear</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-divider />
    <v-card class="pa-1 mt-2">
      <p class="text-h6 text-center pa-0 ma-2">Tạo mới dịch vụ</p>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row flex-nowrap">
          <v-select
            :items="services"
            label="Dịch vụ"
            item-text="serviceName"
            item-value="serviceId"
            dense
            hide-details
            v-model="addNew.serviceId"
            class="pa-1"
          ></v-select>
          <v-text-field
            v-model="addNew.price"
            dense
            hide-details
            label="Giá tiền"
            type="number"
            class="pa-1"
            suffix="nghìn đ"
          />
        </div>
        <div class="d-flex flex-row flex-nowrap">
          <v-select
            :items="servicesBox.units"
            label="Đơn vị"
            dense
            hide-details
            v-model="addNew.userUnit"
            class="pa-1"
          ></v-select>
          <v-select
            :items="servicesBox.times"
            label="Tần suất thanh toán"
            dense
            hide-details
            v-model="addNew.timeUnit"
            class="pa-1"
          ></v-select>
        </div>
        <v-btn small color="primary" @click="addService" :disabled="!addable" class="mt-2">
          <v-icon>add</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex';
import snackBarMixin from '../../mixins/snackBar';

export default {
  name: 'HostelGroupServiceEditor',
  props: ['groupService', 'create', 'update'],
  mixins: [snackBarMixin],
  data: () => ({
    servicesBox: {
      headers: [
        {
          text: 'Tên',
          align: 'start',
          sortable: false,
          value: 'serviceName',
        },
        { text: 'Giá (Nghìn đồng)', value: 'price' },
        { text: 'Đơn vị', value: 'userUnit' },
        { text: 'Tần suất thanh toán', value: 'timeUnit' },
        { text: 'Xoá', value: 'delete' },
      ],
      units: ['m³', 'kWh', 'người', 'phòng', 'xe'],
      times: ['tuần', 'tháng', 'năm'],
    },
    addNew: {
      serviceName: '',
      serviceId: null,
      price: null,
      userUnit: '',
      timeUnit: '',
      priceUnit: 'Nghìn',
    },
    newServices: [],
  }),
  computed: {
    groupServiceDesserts() {
      return this.groupService.map((service) => ({
        serviceName: service.serviceName,
        price: service.price,
        timeUnit: service.timeUnit,
        userUnit: service.userUnit,
      }));
    },
    services() {
      return this.$store.state.renter.common.services.data;
    },
    serviceNames() {
      return this.services.map((item) => item.serviceName);
    },
    isServiceLoading() {
      return this.$store.state.renter.common.services.isLoading;
    },
    addable() {
      // eslint-disable-next-line
      const { serviceId, userUnit, timeUnit } = this.addNew;
      if (!serviceId || !userUnit || !timeUnit) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/common/getAllFacilities1',
      getAllServices: 'renter/common/getAllServices1',
    }),
    getService(serviceId) {
      return this.services.find((service) => service.serviceId === serviceId);
    },
    isDuplicateService(serviceId) {
      return this.newServices.findIndex((service) => service.serviceId === serviceId) > -1;
    },
    isNewServiceValid() {
      if (this.isDuplicateService(this.addNew.serviceId)) {
        this.showSnackBar('Dịch vụ bị trùng', { color: 'black' });
        return false;
      }
      // eslint-disable-next-line
      const { serviceId, price, userUnit, timeUnit } = this.addNew;
      if (!serviceId || !userUnit || !timeUnit) {
        this.showSnackBar('Vui lòng điền đầy đủ tất cả các trường', { color: 'black' });
        return false;
      }
      if (price < 0) {
        this.showSnackBar('Giá tiền phải là số dương', { color: 'black' });
        return false;
      }
      return true;
    },
    addService() {
      if (this.isNewServiceValid()) {
        this.addNew.serviceName = this.getService(this.addNew.serviceId).serviceName;
        this.newServices.push(this.addNew);
        this.resetAddNew();
      }
    },
    resetAddNew() {
      this.addNew = {
        serviceName: '',
        serviceId: null,
        price: null,
        timeUnit: '',
        userUnit: '',
        priceUnit: 'Nghìn',
      };
    },
    removeService(item) {
      const index = this.newServices.findIndex((i) => i === item);
      if (index > -1) {
        this.newServices = [
          ...this.newServices.slice(0, index),
          ...this.newServices.slice(index + 1),
        ];
      }
    },
  },
  created() {
    console.log('hostel group service editor is created');
    if (this.services.length === 0) {
      this.getAllServices();
    }
    if (this.update) {
      this.newServices = [...this.groupServiceDesserts];
    }
  },
  watch: {
    newServices: {
      handler() {
        this.$emit('newValue', this.newServices);
      },
      deep: true,
    },
  },
};
</script>
