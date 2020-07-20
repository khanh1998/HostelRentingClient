<template>
  <div>
    <v-list-item-group>
      <v-list-item dense v-for="item in services" v-bind:key="item.serviceId">
        <v-list-item-title>{{item.serviceName}}</v-list-item-title>
        <v-list-item-subtitle>
          {{item.servicePrice}} {{item.priceUnit}}/{{item.userUnit}}/{{item.timeUnit}}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>
<script>
export default {
  name: 'FacilitiesBox',
  data: () => ({
    icons: ['ac_unit', 'kitchen'],
  }),
  props: ['services'],
};
</script>
