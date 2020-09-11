<template>
  <div>
    <v-dialog v-model="dialog.show" max-width="300">
      <v-card>
        <v-card-title>Chọn khoảng thời gian</v-card-title>
        <div class="d-flex flex-row ma-1">
          <span class="font-weight-bold ma-1">Từ</span>
          <el-time-select
            placeholder="Bắt đầu"
            v-model="picker.startTime"
            :picker-options="{
              start: minTime || '06:00',
              step: '00:05',
              end: '23:55',
              minTime,
            }"
          >
          </el-time-select>
          <span class="font-weight-bold ma-1">đến</span>
          <el-time-select
            placeholder="Kết thúc"
            v-model="picker.endTime"
            :picker-options="{
              start: picker.startTime || '06:00',
              step: '00:05',
              end: '23:55',
              minTime: picker.startTime,
            }"
          >
          </el-time-select>
        </div>
        <v-card-actions>
          <div class="d-flex flex-row justify-center">
            <v-btn color="red" text @click="dialog.show = false">Hủy</v-btn>
            <v-btn color="green" v-if="isValid" text @click="add">Thêm</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn @click="dialog.show = true" color="amber" tile outlined>
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'VendorScheduleTableColumnCellInput',
  props: ['minTime'],
  data() {
    return {
      picker: {
        startTime: '',
        endTime: '',
      },
      dialog: {
        show: false,
      },
    };
  },
  methods: {
    add() {
      this.$emit('selected', this.picker);
      this.dialog.show = false;
      this.picker.startTime = '';
      this.picker.endTime = '';
    },
  },
  computed: {
    isValid() {
      return this.picker.startTime && this.picker.endTime;
    },
  },
};
</script>
