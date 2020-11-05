<template>
  <div
    class="d-flex mx-4"
    v-bind:style="index % 2 === 0 ? 'background-color: #f1f3fa;' : 'background-color: #fff;'"
  >
    <v-col cols="2" class="d-flex align-center py-1">
      <span class="font-nunito text-gray size-sub-2">{{ group.groupName }}</span>
    </v-col>
    <v-col cols="4" class="d-flex flex-column justify-center py-1">
      <HostelGroupStatistic :group="group" />
      <span class="font-nunito text-info size-sub-2 ml-auto"
        >{{ group.types.length }} <span>loại</span></span
      >
    </v-col>
    <v-col cols="3" class="d-flex align-center py-1">
      <span class="font-nunito text-gray size-sub-2"
        >{{ group.buildingNo }} {{ group.address.streetName }}, {{ group.address.wardName }},
        {{ group.address.provinceName }}</span
      >
    </v-col>
    <v-col cols="2" class="d-flex align-center justify-center py-1">
      <span class="font-nunito text-gray size-sub-2">{{ group.managerName }}</span>
    </v-col>
    <v-col cols="1" class="d-flex align-center justify-center py-1">
      <v-btn icon><v-icon small color="#98a6ad">mdi mdi-pencil</v-icon></v-btn>
      <v-btn icon><v-icon small color="#98a6ad">mdi mdi-delete</v-icon></v-btn>
    </v-col>
  </div>
</template>

<script>
import HostelGroupStatistic from '../overview/HostelGroupStatistic.vue';

export default {
  name: 'groupItem',
  props: { group: Object, index: Number },
  components: { HostelGroupStatistic },
};
</script>

<style>
</style>
