<template>
  <div>
    <!-- eslint-disable max-len -->
    <span class="text-subtitle-1 font-nunito font-weight-bold" :style="{color: '#484848'}">DỊCH VỤ</span>
    <div class="d-flex mt-3" :style="{width: '100%'}">
      <div class="line-after" :style="{width: '30%'}"></div>
      <div class="line-before" :style="{width: '90%'}"></div>
    </div>
    <v-list-item-group>
      <v-list-item
        dense
        v-for="item in services"
        :key="item.serviceId"
        style="border-bottom: 1px dashed rgba(0, 0, 0, 0.1);"
        class="px-0"
      >
        <!-- <v-icon color="#78A0CA">fa-caret-right</v-icon> -->
        <v-list-item-title class="font-weight-bold">
          {{
          item.serviceName
          }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-right">
          <div v-if="item.price > 0">
            <span style="color: #78A0CA" class="font-weight-bold">{{ item.price }}</span>
            {{ item.priceUnit }}/{{ item.userUnit }}
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
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.line-before {
  height: 2px;
  background-color: #eee;
}
.line-after {
  height: 2px;
  background-color: #2c92d5;
}
</style>
