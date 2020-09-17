<template>
  <div>
    <!-- eslint-disable max-len -->
    <span
      class="text-subtitle-1 font-nunito font-weight-bold"
      :style="{color: '#484848'}"
    >TIỆN NGHI XUNG QUANH</span>
    <div class="d-flex mt-3" :style="{width: '100%'}">
      <div class="line-after" :style="{width: '30%'}"></div>
      <div class="line-before" :style="{width: '90%'}"></div>
    </div>
    <v-card class="mt-5" outlined>
      <v-tabs background-color="#EEF2F7" slider-size="0">
        <v-tab
          v-for="item in utitlities"
          :key="item.categoryId"
          style="color: #6c757d; font-weight: 600;"
          :style="{width: getCategoryWidth()}"
          class="text-subtitle-2 font-nunito text-capitalize category"
        >
          <span>{{item.name}}</span>
        </v-tab>

        <v-tab-item v-for="item in utitlities" :key="item.categoryId">
          <v-card flat min-height="200">
            <v-tabs vertical color="#727cf5">
              <v-tab
                v-for="child in item.utilityTypes"
                :key="child.name"
                class="text-subtitle-2 font-nunito text-capitalize font-weight-black"
                style="justify-content: left"
              >{{child.name}}</v-tab>
              <v-tab-item v-for="child in item.utilityTypes" :key="child.name">
                <v-virtual-scroll :items="child.utilities" :item-height="50" height="200">
                  <template v-slot="{ item }">
                    <v-list-item
                      :key="item.id"
                      class="pl-10"
                      style="border-bottom: thin dashed rgba(0,0,0,.12);"
                    >
                      <span
                        class="font-nunito"
                        style="color: #27406d; font-size: .875rem; font-weight: 600;"
                      >{{item.name}}</span>
                      <v-spacer></v-spacer>
                      <span class="font-nunito" style="font-size: .875rem;">
                        <v-icon class="material-icons">place</v-icon>
                        <span class="font-weight-bold">{{item.distance}}</span> km
                      </span>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<style scoped></style>
<script>
export default {
  name: 'treeView',
  props: ['utitlities'],
  data: () => ({
    length: 15,
    tabs: null,
    childTabs: null,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  computed: {},
  methods: {
    getCategoryWidth() {
      return `${100 / this.utitlities.length}%`;
    },
  },
  created() {},
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
<style>
.v-tabs--vertical > .v-tabs-bar {
  width: 20% !important;
}
.category.v-tab--active {
  color: #fff !important;
  background-color: #727cf5;
}
</style>
