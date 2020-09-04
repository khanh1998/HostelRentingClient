<template>
  <v-list-item dense>
    <v-list-item-title>
      <span>{{ value.startTime }}</span>
      <v-icon class="mx-1">arrow_right_alt</v-icon>
      <span>{{ value.endTime }}</span>
    </v-list-item-title>
    <v-list-item-action>
      <v-btn icon small>
        <v-icon color="red" small>clear</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
export default {
  name: 'VendorScheduleTableColumnCell',
  props: ['value'],
  methods: {},
};
</script>
