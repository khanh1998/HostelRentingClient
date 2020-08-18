<template>
  <v-sheet v-if="!groups.isLoading" class="pa-2">
    <p class="text-h5 font-weight-medium">Thống kê</p>
    <v-row>
      <v-col v-for="group in groups.data" :key="group.groupId" cols="6">
        <v-card>
          <v-card-title>{{ group.groupName }}</v-card-title>
          <v-card-subtitle>{{ group.street }}</v-card-subtitle>
          <v-card-text>
            <p>
              Tổng số:
              <span class="font-weight-bold">{{
                groupStat[group.groupId].total
              }}</span>
              phòng
            </p>
            <p>
              Trống:
              <span class="font-weight-bold">{{
                groupStat[group.groupId].empty
              }}</span>
              phòng
            </p>
            <p>
              Tỷ lệ lấp đầy:
              <span class="font-weight-bold">
                {{
                  Number(
                    (
                      100 -
                      (groupStat[group.groupId].empty /
                        groupStat[group.groupId].total) *
                        100
                    ).toFixed(2),
                  )
                }}
              </span>
              %
            </p>
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
          for (const type of types) {// eslint-disable-line
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
