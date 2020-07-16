<template>
  <v-card
    height="100%"
    class="overflow-hidden rounded-0 d-flex align-strench"
  >
    <v-list
      nav
      class="py-0 rounded-1"
      height="100%"
    >
      <v-list-item class="item-image">
        <v-img
          alt="Hostel Renting"
          class="shrink mr-2"
          contain
          src="@/assets/logo2.png"
          transition="scale-transition"
          max-width="300"
          max-height="300"
        />
      </v-list-item>

      <div class="text-display mt-3 mb-3 ml-7">Danh mục</div>

      <v-list-item
        v-for="item in itemsplus"
        :key="item.title"
        link
      >
        <v-list-item-icon class="ml-5">
          <v-img
            :src="require('@/assets/'+ item.icon + '.png')"
            max-height="30"
            max-width="30"
          />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="item-text-display flex-1 px-4 py-2 m-2
          text-h6 font-weight-regular">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div class="text-display mt-3 mb-3 ml-7">Mở rộng</div>

      <v-list-item
        v-for="itemadd in itemadds"
        :key="itemadd.title"
        link
      >
        <v-list-item-icon class="ml-5">
          <v-img
            :src="require('@/assets/'+ itemadd.icon + '.png')"
            max-height="30p"
            max-width="30"
          />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="item-text-display flex-1 px-4 py-2 m-2
          text-h6 font-weight-regular">{{ itemadd.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div class="bottom-item">
        <v-list-item link>
          <v-list-item-icon class="ml-5">
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="item-text-display text-h6">Đăng xuất</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'SideMenuBar',
  data() {
    return {
      drawer: true,
      itemsplus: [
        { title: 'Tổng quan', icon: 'menu_dashboard' },
        { title: 'Lịch xem phòng', icon: 'menu_calendar' },
        { title: 'Thống kê', icon: 'menu_chart' },
        { title: 'Quản lý nhà trọ', icon: 'menu_room' },
      ],

      itemadds: [
        { title: 'Tài khoản', icon: 'menu_profile' },
        { title: 'Liên hệ', icon: 'menu_contact' },
      ],
      color: 'success',
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
    };
  },
};
</script>
<style>
.item-image {
  height: 200px;
}
.item-text-display {
  color: #031d5f;
}
.text-display {
  color: #b4b7c8;
}
.bottom-item {
  margin-top: 110px;
  background-color: ghostwhite;
}
</style>
