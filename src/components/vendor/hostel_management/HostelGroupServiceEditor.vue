<template>
  <v-card class="pa-2" height="auto">
    <v-data-table
      :headers="servicesBox.headers"
      :items="groupServiceDesserts"
      class="elevation-1"
      hide-default-footer
      dense
      locale="vi"
    >
      <template v-slot:item.price="{ item }">
        <v-text-field v-model="item.price" hide-details prepend-icon="attach_money"></v-text-field>
      </template>
      <template v-slot:item.unit="{ item }">
        <v-select
          v-model="item.unit"
          menu-props="auto"
          label="Select"
          hide-details
          prepend-icon="straighten"
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
          prepend-icon="timeline"
          single-line
          :items="servicesBox.times"
        ></v-select>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'HostelGroupServiceEditor',
  props: ['groupService'],
  data: () => ({
    servicesBox: {
      headers: [
        {
          text: 'Tên dịch vụ',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Giá (Nghìn đồng)', value: 'price' },
        { text: 'Đơn vị', value: 'unit' },
        { text: 'Thời gian thanh toán', value: 'time' },
      ],
      units: ['m³', 'kWh', 'người', 'phòng', 'xe'],
      times: ['tuần', 'tháng', 'năm'],
    },
    addNew: {
      name: '',
      units: '',
      times: '',
    },
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
  },
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/common/getAllFacilities1',
      getAllServices: 'renter/common/getAllServices1',
    }),
  },
  created() {
    console.log('hostel group service editor is created');
    // this.getAllFacilities();
    this.getAllServices();
  },
};
</script>
