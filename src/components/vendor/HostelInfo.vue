<template>
  <v-row class="mx-3 mt-2 d-flex align-baseline">
    <v-card height="8%" width="100%">
      <v-form>
        <v-row>
          <v-col cols="3" sm="2" md="2" class="ml-15 mt-3">
            <notification-bell
              count="70"
              counterStyle="round"
              counterPadding="2px"
              :icon="require('@/assets/notification.svg')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="7">
            <v-row>
              <v-list-item link>
                <v-list-item-avatar>
                  <v-img src="@/assets/suzy-avatar.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-regular">
                      Bae Suzy</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-card class="mx-auto">
      <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
      <v-card-title class="text-color">Phòng trọ lalahome</v-card-title>

      <v-card-text>
        <div class="subtitle-1">Loại phòng</div>
        <div class="text-color">Phòng trọ gác lửng có máy lạnh</div>

        <div class="my-4 subtitle-1">Địa chỉ</div>
        <div class="text-color my-4">939 Kha Vạn Cân, phường Linh Tây, quận Thủ Đức</div>

        <div class="my-4 subtitle-1">Giá</div>
        <div class="text-color my-4">1.900.000 Đ</div>
      </v-card-text>
      <v-col cols="12" sm="6" md="10" class="ml-6">
          <v-select :items="chooses" solo></v-select>
        </v-col>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="reserve">Chi tiết</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import NotificationBell from 'vue-notification-bell';

export default {
  name: 'HostelInfo',
  data() {
    return {
      chooses: ['Phòng còn trống', 'Phòng sắp trống'],
    };
  },
  components: {
    NotificationBell,
  },
};
</script>
<style>
.text-color{
    color: #0022D5;
    font-size: 18px;
}
</style>
