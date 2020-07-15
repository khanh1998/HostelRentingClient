<template>
  <div>
    <div class="primary d-flex justify-space-between">
      <v-card-title class="white--text text-h6">Tiện nghi xung quanh</v-card-title>
      <v-card-actions>
        <v-btn color="success" class="ma-1">
          <v-icon>fas fa-map-signs</v-icon>Bản đồ
        </v-btn>
      </v-card-actions>
    </div>
    <v-treeview
      v-model="treeview.tree"
      :open="treeview.open"
      :items="treeview.items"
      activatable
      item-key="name"
      dense
      hoverable
      rounded
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.icon">{{ open ? 'mdi-folder-open' : 'fas fa-map-marker-alt' }}</v-icon>
        <v-icon v-else>{{ treeview.icons[item.icon] }}</v-icon>
      </template>
      <template v-slot:append="{item, leaf}">
        <div class="blue--text font-weight-bold" v-if="leaf">{{item.distance}}</div>
        <div v-else class="green--text font-weight-bold">({{item.children.length}})</div>
      </template>
    </v-treeview>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'treeView',
  data: () => ({
    treeview: {
      open: [],
      icons: {
        market: 'fas fa-shopping-cart',
        school: 'fas fa-graduation-cap',
        bus: 'fas fa-bus',
        hospital: 'fas fa-hospital',
        bank: 'fas fa-hand-holding-usd',
      },
      tree: [],
      items: [
        {
          name: 'School',
          icon: 'school',
          children: [
            {
              name: 'Fpt University',
              distance: '5km',
            },
            {
              name: 'University of Finance and Marketing',
              distance: '3km',
            },
          ],
        },
        {
          name: 'Market',
          icon: 'market',
          children: [
            {
              name: 'Bach Hoa Xanh',
              distance: '0.5km',
            },
            {
              name: 'Cicle K',
              distance: '1km',
            },
          ],
        },
        {
          name: 'Bus station',
          icon: 'bus',
          children: [
            {
              name: '123 Tran Thanh Tong',
              distance: '0.1km',
            },
            {
              name: '424 Tran Dai Nghia',
              distance: '0.5km',
            },
          ],
        },
        {
          name: 'Hospital',
          icon: 'hospital',
          children: [
            {
              name: 'Benh vien Quan 9',
              distance: '2km',
            },
          ],
        },
        {
          name: 'Bank',
          icon: 'bank',
          children: [
            {
              name: 'TP bank',
              distance: '1km',
            },
            {
              name: 'VP bank',
              distance: '4km',
            },
          ],
        },
      ],
    },
  }),
};
</script>
