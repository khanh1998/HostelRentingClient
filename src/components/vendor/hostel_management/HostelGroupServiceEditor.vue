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
          v-model="item.unit"
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
          v-model="item.time"
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
            v-model="addNew.id"
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
            v-model="addNew.unit"
            class="pa-1"
          ></v-select>
          <v-select
            :items="servicesBox.times"
            label="Tần suất thanh toán"
            dense
            hide-details
            v-model="addNew.time"
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
          value: 'name',
        },
        { text: 'Giá (Nghìn đồng)', value: 'price' },
        { text: 'Đơn vị', value: 'unit' },
        { text: 'Tần suất thanh toán', value: 'time' },
        { text: 'Xoá', value: 'delete' },
      ],
      units: ['m³', 'kWh', 'người', 'phòng', 'xe'],
      times: ['tuần', 'tháng', 'năm'],
    },
    addNew: {
      name: '',
      id: null,
      price: 0,
      unit: '',
      time: '',
    },
    newServices: [],
  }),
  computed: {
    groupServiceDesserts() {
      return this.groupService.map((service) => ({
        name: service.serviceName,
        price: service.price,
        time: service.timeUnit,
        unit: service.userUnit,
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
      const { id, unit, time } = this.addNew;
      if (!id || !unit || !time) {
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
      return this.newServices.findIndex((service) => service.id === serviceId) > -1;
    },
    isNewServiceValid() {
      if (this.isDuplicateService(this.addNew.id)) {
        this.showSnackBar('Dịch vụ bị trùng', { color: 'black' });
        return false;
      }
      // eslint-disable-next-line
      const { id, price, unit, time } = this.addNew;
      if (!id || !unit || !time) {
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
        this.addNew.name = this.getService(this.addNew.id).serviceName;
        this.newServices.push(this.addNew);
        this.resetAddNew();
      }
    },
    resetAddNew() {
      this.addNew = {
        name: '',
        id: null,
        price: 0,
        unit: '',
        time: '',
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
};
</script>
