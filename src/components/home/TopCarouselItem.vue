<template>
  <v-card class="mx-auto" width="350">
    <v-img class="white--text align-end" height="200px" light :src="imgUrl">
      <v-chip class="ma-2" color="white" text-color="blue">
        <v-icon left>mdi-currency-usd-circle-outline</v-icon>500.000vnd
      </v-chip>
      <v-card-title class="white--text">Ký túc xá đại học quốc gia {{i}}</v-card-title>
    </v-img>
    <v-divider class="mx-4" />
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
      <v-chip-group
        center-active
        light
        show-arrows
        mandatory class=""
      >
        <v-chip>
          <v-icon class="mx-4" small>mdi-weather-windy</v-icon>May Lanh
        </v-chip>
        <v-chip>
          <v-icon class="mx-4" small>mdi-fridge</v-icon>Tu Lanh
        </v-chip>
        <v-chip>
          <v-icon class="mx-4" small>fas fa-motorcycle</v-icon>Cho dau xe
        </v-chip>
        <v-chip>
          <v-icon class="mx-4" small>mdi-washing-machine</v-icon>May giat
        </v-chip>
      </v-chip-group>
    </div>
    <v-card-actions>
      <v-btn color="amber" dark>
        <v-icon class="ma-2">fas fa-info-circle</v-icon>Chi tiết
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'TopCarouselItem',
  props: ['imgUrl', 'i'],
};
</script>
