<template>
  <div>
    <v-overlay :value="rules.isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="d-flex flex-column inner" v-if="!rules.isLoading">
      <span class="text-h6 my-2"><v-icon>warning</v-icon> Nội quy khu trọ</span>
      <v-switch
        label="Giờ giấc tự do"
        v-model="picker.openAllDay"
        hide-details
        color="red"
        inset
      ></v-switch>
      <div v-if="!picker.openAllDay" class="d-flex flex-column justify-center">
        <p class="ma-1 text-center">Giờ mở cửa</p>
        <div class="d-flex flex-row ma-1">
          <span class="font-weight-bold ma-1">Từ</span>
          <el-time-select
            placeholder="Giờ mở cửa"
            v-model="picker.startTime"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:59',
            }"
          >
          </el-time-select>
          <span class="font-weight-bold ma-1">đến</span>
          <el-time-select
            placeholder="Giờ đóng cửa"
            v-model="picker.endTime"
            :picker-options="{
              start: picker.startTime || '06:00',
              step: '00:30',
              end: '23:59',
              minTime: picker.startTime,
            }"
          >
          </el-time-select>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap">
        <v-switch
          v-for="(rule, index) in rules.data"
          :key="rule.regulationId"
          :label="rule.regulationName"
          color="red"
          v-model="activeRules[index]"
          inset
          hide-details
        ></v-switch>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HostelGroupRules',
  data: () => ({
    picker: {
      startTime: '',
      endTime: '',
      openAllDay: true,
    },
    activeRules: [],
  }),
  computed: {
    ...mapState('renter/common', ['rules']),
    listOfActiveRules() {
      return this.activeRules.map((item, index) => {
        const { regulationName, regulationId } = this.rules.data[index];
        const obj = {
          regulationId,
          regulationName,
          allowed: item,
          active: true,
        };
        return obj;
      });
    },
  },
  methods: {
    ...mapActions({
      getAllRules: 'renter/common/getAllRules',
    }),
  },
  created() {
    if (this.rules.data.length === 0) {
      this.getAllRules().then(() => {
        this.activeRules = Array(this.rules.data.length).fill(false);
      });
    }
  },
  watch: {
    activeRules: {
      handler() {
        this.$emit('newValue', { rules: this.listOfActiveRules, time: this.picker });
      },
      deep: true,
    },
    picker: {
      handler() {
        this.$emit('newValue', { rules: this.listOfActiveRules, time: this.picker });
      },
      deep: true,
    },
  },
};
</script>
