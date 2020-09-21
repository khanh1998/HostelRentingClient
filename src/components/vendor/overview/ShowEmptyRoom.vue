<template>
  <v-sheet v-if="!groups.isLoading" class="pa-2">
    <div class="text-h5 font-weight-medium">Thống kê</div>
    <v-row>
      <v-col v-for="group in groups.data" :key="group.groupId" cols="12" md="6">
        <v-card>
          <v-card-title>{{ group.groupName }}</v-card-title>
          <v-card-subtitle>{{ group.address.streetName }}</v-card-subtitle>
          <v-divider />
          <v-card-text>
            <div>
              Tổng số:
              <span class="font-weight-bold">{{ groupStat[group.groupId].total }}</span>
              phòng
            </div>
            <div>
              Trống:
              <span class="font-weight-bold">{{ groupStat[group.groupId].empty }}</span>
              phòng
            </div>
            <div>
              Tỷ lệ lấp đầy:
              <span class="font-weight-bold">
                {{
                  Number(
                    (
                      100 -
                      (groupStat[group.groupId].empty / groupStat[group.groupId].total) * 100
                    ).toFixed(2),
                  )
                }}
              </span>
              %
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  name: 'showEmptyRoom',
  data: () => ({}),
  methods: {},
  computed: {
    groups() {
      return this.$store.state.vendor.group.groups;
    },
    groupList() {
      return this.$store.state.vendor.group.groups.data;
    },
    groupStat() {
      const count = {};
      if (this.groupList.length > 0) {
        console.log('number of groups: ', this.groupList.length);
        this.groupList.forEach((group) => {
          const { types } = group;
          let total = 0;
          let empty = 0;
          // eslint-disable-next-line
          for (const type of types) {
            if (type.rooms) {
              total += type.rooms.length;
              empty += type.rooms.filter((room) => !room.available).length;
            }
          }
          count[group.groupId] = {
            total,
            empty,
          };
        });
      }
      return count;
    },
  },
};
</script>
