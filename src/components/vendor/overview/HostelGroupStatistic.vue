<template>
  <div class="d-flex flex-column pa-1" style="height: 100%; width: 100%; overflow-y: auto;">
    <div style="width: 100%;" elevation="0">
      <div class="font-weight-thin text-h6">Thống kê</div>
      <v-divider />
      <v-card-text>
        <div>
          Tổng số:
          <span class="font-weight-bold">{{ stat.total }}</span>
          phòng
        </div>
        <div>
          Trống:
          <span class="font-weight-bold">{{ stat.empty }}</span>
          phòng
        </div>
        <div>
          Tỷ lệ lấp đầy:
          <span class="font-weight-bold">
            {{ stat.total == 0 ? 100 : Number((100 - (stat.empty / stat.total) * 100).toFixed(2)) }}
          </span>
          %
        </div>
      </v-card-text>
    </div>
  </div>
</template>
<script>
export default {
  name: 'showEmptyRoom',
  props: ['group'],
  data: () => ({
    stat: {
      total: 0,
      empty: 0,
    },
  }),
  methods: {
    calcStat(group) {
      const { types } = group;
      this.stat = {
        total: 0,
        empty: 0,
      };
      this.stat = types.reduce((c, type) => {
        const newCount = c;
        if (type.rooms) {
          newCount.total += type.rooms.length;
          newCount.empty += type.rooms.filter((room) => !room.available).length;
        }
        return newCount;
      }, this.stat);
    },
  },
  computed: {
    groups() {
      return this.$store.state.vendor.group.groups;
    },
    groupList() {
      return this.$store.state.vendor.group.groups.data;
    },
  },
  watch: {
    group(newGroup) {
      this.calcStat(newGroup);
    },
  },
  created() {
    this.calcStat(this.group);
  },
};
</script>
