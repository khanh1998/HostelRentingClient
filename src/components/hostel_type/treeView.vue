<template>
  <div>
    <v-treeview
      v-model="treeview.tree"
      :open="treeview.open"
      :items="treeview.items"
      activatable
      item-key="name"
      dense
      hoverable
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
          name: 'Trường học',
          icon: 'school',
          children: [
            {
              name: 'Đại học Fpt',
              distance: '5km',
            },
            {
              name: 'Đại học Tài Chính - Marketing',
              distance: '3km',
            },
          ],
        },
        {
          name: 'Chợ',
          icon: 'market',
          children: [
            {
              name: 'Bách Hoá Xanh',
              distance: '0.5km',
            },
            {
              name: 'Cicle K',
              distance: '1km',
            },
          ],
        },
        {
          name: 'Bến xe',
          icon: 'bus',
          children: [
            {
              name: '123 Trần Thánh Tông',
              distance: '0.1km',
            },
            {
              name: '424 Trần Đại Nghĩa',
              distance: '0.5km',
            },
          ],
        },
        {
          name: 'Bệnh Viện',
          icon: 'hospital',
          children: [
            {
              name: 'Bệnh Viện Quận 9',
              distance: '2km',
            },
          ],
        },
        {
          name: 'Ngân hàng',
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
