<template>
  <v-card elevation="2">
    <v-card-title>{{ columnName }}</v-card-title>
    <v-list-item-group>
      <ColumnCell
        v-for="item in items"
        :key="item.now"
        :value="item"
      />
      <v-list-item
        dense
        v-if="items.length === 0"
      >
        <v-list-item-subtitle class="d-flex justify-center">
          Không có dữ liệu
        </v-list-item-subtitle>
      </v-list-item>
    </v-list-item-group>
    <v-card-actions class="d-flex justify-center">
      <ColumnCellInput
        v-on:selected="receiveSelectedTimeRange"
        :minTime="lastItem.endTime"
      />
    </v-card-actions>
  </v-card>
</template>
<script>
import ColumnCell from './ScheduleTableColumnCell.vue';
import ColumnCellInput from './ScheduleTableColumnCellInput.vue';

export default {
  name: 'VendorScheduleTableColumn',
  props: ['columnName'],
  components: { ColumnCell, ColumnCellInput },
  data: () => ({
    items: [],
  }),
  methods: {
    receiveSelectedTimeRange(range) {
      this.items.push({
        now: Date.now(),
        ...range,
      });
    },
  },
  computed: {
    lastItem() {
      return this.items[this.items.length - 1] || {};
    },
  },
};
</script>
