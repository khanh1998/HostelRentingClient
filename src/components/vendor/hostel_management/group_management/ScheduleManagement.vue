<template>
  <v-row class="mx-0 mt-3 d-flex flex-column">
    <span style="text-align: center" class="text-primary-dark font-nunito size9rem mb-2"
      >Cài đặt lịch rảnh các ngày trong tuần để người thuê có thể gặp bạn hoặc quản lý của khu trọ
      để xem phòng trọ.</span
    >
    <v-row>
      <v-col cols="4">
        <div class="d-flex flex-row mt-2">
          <el-time-select
            placeholder="Từ"
            v-model="from"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:30',
            }"
          >
          </el-time-select>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="d-flex flex-row mt-2">
          <el-time-select
            placeholder="Đến"
            v-model="to"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:30',
            }"
          >
          </el-time-select>
        </div>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ScheduleManagement',
  data: () => ({
    selected: [],
    recommendList: [],
    values: '',
    from: '',
    to: '',
  }),
  computed: {
    allRules() {
      return this.$store.state.renter.common.rules.data;
    },
    newGroup() {
      return this.$store.state.vendor.group.newGroup;
    },
  },
  methods: {
    ...mapActions({
      getAllRules: 'renter/common/getAllRules',
      setNewGroupValue: 'vendor/group/setNewGroupValue',
    }),
    selectCheckBox() {
      this.newGroup.regulation = this.selected;
      this.setNewGroupValue(this.newGroup);
    },
  },
  created() {
    if (this.allRules.length > 2) {
      this.recommendList = this.allRules.slice(2, this.allRules.length);
    }
    this.selected = this.newGroup.regulation;
  },
};
</script>

<style>
.dropzone {
  border: 2px dashed #dee2e6;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  min-height: 150px;
  padding: 20px;
}
</style>
