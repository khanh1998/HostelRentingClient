<template>
  <div>
    <v-row no-gutters>
      <v-col
        ><p class="font-weight-bold text-center text-h5 mt-2 grey--text">
          <v-icon>schedule</v-icon>
          Lịch rảnh xem phòng
        </p></v-col
      >
    </v-row>
    <v-divider />
    <v-row no-gutters>
      <v-col v-for="day in daysOfWeek" :key="day">
        <TableColumn :columnName="day" />
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn depressed color="green" dark outlined tile class="ma-2"
            ><v-icon>save</v-icon>Lưu thay đổi</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import TableColumn from './ScheduleTableColumn.vue';

export default {
  name: 'VendorScheduleTalbe',
  components: { TableColumn },
  data: () => ({
    daysOfWeek: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'],
  }),
};
</script>
