<template>
  <v-row class="mx-0 mt-3 d-flex flex-column">
    <span style="text-align: center" class="text-primary-dark font-nunito size9rem mb-2"
      >Cài đặt lịch rảnh các ngày trong tuần để người thuê có thể gặp bạn hoặc quản lý của khu trọ
      để xem phòng trọ.</span
    >
    <div style="background-color: #f7f7f9" class="d-flex justify-space-between">
      <div style="width: 14%" class="red">thuy</div>
    </div>
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
