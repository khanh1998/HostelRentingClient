<template>
  <div class="d-flex flex-column justify-center align-start">
    <v-card width="100%" class="d-flex flex-row justify-center align-center pa-2">
      <v-badge color="red" content="6" bordered overlap class="mr-6">
        <v-img :src="require('@/assets/notification.svg')" height="30" width="30"></v-img>
      </v-badge>
      <div class="d-flex flex-nowrap align-center">
        <v-avatar>
          <v-img src="@/assets/suzy-avatar.jpg"></v-img>
        </v-avatar>
        <p class="font-weight-medium mb-0 ml-2">Bae Suzy</p>
      </div>
    </v-card>
    <v-card class="mt-3">
      <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
      <v-card-title class="text-color">Phòng trọ lalahome</v-card-title>

      <v-card-text>
        <div class="subtitle-1">Loại phòng</div>
        <div class="text-color">Phòng trọ gác lửng có máy lạnh</div>

        <div class="my-4 subtitle-1">Địa chỉ</div>
        <div class="text-color my-4">
          939 Kha Vạn Cân, phường Linh Tây, quận Thủ Đức
        </div>

        <div class="my-4 subtitle-1">Giá</div>
        <div class="text-color my-4">1.900.000 Đ</div>
      </v-card-text>
      <v-col cols="12" sm="6" md="10" class="ml-6">
        <v-select :items="chooses" placeholder="Phòng còn trống" solo></v-select>
      </v-col>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="reserve">Chi tiết</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// import NotificationBell from 'vue-notification-bell';

export default {
  name: 'HostelInfo',
  data() {
    return {
      chooses: ['B1', 'D1', 'C2', 'C3'],
    };
  },
  // components: {
  //   NotificationBell,
  // },
};
</script>
<style>
.text-color {
  color: #0022d5;
  font-size: 18px;
}
</style>
