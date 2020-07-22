<template>
  <div>
    <v-list-item-group>
      <v-list-item dense v-for="item in services" v-bind:key="item.serviceId">
        <v-list-item-title class="font-weight-bold">{{item.serviceName}}</v-list-item-title>
        <v-list-item-subtitle>
          <div v-if="item.servicePrice > 0">
            <span class="primary--text font-weight-bold">{{item.servicePrice}}</span>
            {{item.priceUnit}}/{{item.userUnit}}
          </div>
          <div v-else>
            <span class="primary--text font-weight-bold">Miễn phí</span>
          </div>
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
