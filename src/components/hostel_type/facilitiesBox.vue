<template>
  <div>
    <v-chip-group column>
      <v-chip v-for="item in facilities" v-bind:key="item.facilityId">{{item.facilityName}}</v-chip>
    </v-chip-group>
  </div>
</template>
<script>
export default {
  name: 'FacilitiesBox',
  data: () => ({
    icons: ['ac_unit', 'kitchen'],
  }),
  props: ['facilities'],
};
</script>
