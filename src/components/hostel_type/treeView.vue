<template>
  <div>
    <span
      class="text-subtitle-1 font-nunito font-weight-bold"
      :style="{color: '#484848'}"
    >TIỆN NGHI XUNG QUANH</span>
    <div class="d-flex mt-3" :style="{width: '100%'}">
      <div class="line-after" :style="{width: '30%'}"></div>
      <div class="line-before" :style="{width: '90%'}"></div>
    </div>
    <!-- <v-treeview :items="items" activatable dense hoverable>
      <template v-slot:prepend="{ item }">
        <v-icon v-if="!item.icon">{{ open ? 'mdi-folder-open' : 'fas fa-map-marker-alt' }}</v-icon>
      </template>
      <template v-slot:append="{ item, leaf }">
        <div class="blue--text font-weight-bold" v-if="leaf">{{ item.distance }}</div>
        <div v-else class="green--text font-weight-bold">({{ item.children.length }})</div>
      </template>
    </v-treeview>-->
    <v-card outlined style="100%" class="mt-3">
      <v-tabs v-model="tabs" fixed-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          v-for="(item, i) in utitlities"
          :key="`item-${i}`"
          :value="i"
          :href="'#tab' + item"
          style="background-color: #eeeeee;"
        >{{item.name}}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="(item, i) in utitlities" :key="`item-${i}`" :value="i">
          <v-card flat>
            <!-- <v-card-text>{{item.code}}</v-card-text> -->
            <v-tabs v-model="childTabs" fixed-tabs>
              <v-tabs-slider></v-tabs-slider>
              <v-tab
                v-for="(child, j) in item.utilityTypes"
                :key="`child-${j}`"
                :value="'tab-' + item"
                _style="background-color: #eeeeee;"
              >{{child.name}}</v-tab>
            </v-tabs>

            <!-- <v-tabs-items v-model="childTabs">
              <v-tab-item v-for="(child, j) in item.utilityTypes" :key="`child-${j}`" :value="j">
                <v-card flat>
                  <v-card-text>{{j}}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>-->
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
  computed: {
    items() {
      return this.utitlities.map((u) => ({
        name: u.name,
        icon: u.code,
        children: u.utilityTypes.map((c) => ({
          name: c.name,
          children: c.utilities,
        })),
      }));
    },
  },
  created() {
    console.log(this.items);
  },
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
