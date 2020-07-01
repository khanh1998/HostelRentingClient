<template>
  <v-card class="mx-auto" light>
    <div class="d-flex">
      <v-avatar class size="300" tile>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <div class="d-flex align-start justify-end">
            <v-chip class="ma-6" color="red lighten-1" light text-color="white">
              Top
              <v-icon right>mdi-numeric-1-circle</v-icon>
            </v-chip>
          </div>
        </v-img>
      </v-avatar>
      <div class="right d-flex flex-column">
        <v-card-title>Nhà trọ Lalahome</v-card-title>
        <v-card-subtitle class="amber--text font-weight-medium">
          <v-icon>mdi-currency-usd-circle-outline</v-icon>3.500.000 vnd
        </v-card-subtitle>
        <div class="ml-4" style="border: 1px solid #6C98C6; width: 200px"></div>
        <div class="d-flex align-center justify-space-between">
          <span class="mx-2 mt-4">
            <p>
              <v-icon class="mx-2" small>fas fa-map-marker-alt</v-icon>Linh Trung, Thủ Đức, TP.HCM
            </p>
          </span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <span class="mx-2">
            <p class="success--text">
              <v-icon class="mx-2" small>fas fa-store</v-icon>Chợ Hoàng Hoa Thám
            </p>
          </span>
          <span class="mx-2">
            <p>
              <v-icon class="mx-2" small>fas fa-ruler</v-icon>0.2 Km
            </p>
          </span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <span class="mx-2">
            <v-icon class="mx-2" small>fas fa-ruler-combined</v-icon>20m2
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" small>fas fa-users</v-icon>3 người
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" small>mdi-toilet</v-icon>Dùng riêng
          </span>
        </div>
        <div class="d-flex align-center justify-space-between mt-4">
          <span class="mx-2">
            <v-icon class="mx-2" small>fas fa-bolt</v-icon>3.5k/Kwh
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" small>fas fa-tint</v-icon>50k/người
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" small>mdi-wifi</v-icon>Miễn phí
          </span>
        </div>
        <div class="d-flex align-center justify-space-between mt-4">
          <v-chip-group class="mx-2">
            <v-chip outlined>
              <v-icon class="mr-4" small>mdi-weather-windy</v-icon>May Lanh
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-4" small>mdi-fridge</v-icon>Tu Lanh
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-4" small>fas fa-motorcycle</v-icon>Cho dau xe
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-4" small>mdi-washing-machine</v-icon>May giat
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </div>
  </v-card>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'ArticleList',
  data: () => ({}),
};
</script>
