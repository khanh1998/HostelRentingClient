<template>
  <vueper-slides
    class="no-shadow"
    fractions
    bulletsOutside
    transition-speed="250"
    fixed-height="480px"
    prevent-y-scroll
    infinite
    pauseOnHover
    autoplay
    :arrows-outside="false"
    :visible-slides="3"
    :gap="5"
    :slide-ratio="1 / 4"
    :dragging-distance="70"
    :link="'#'"
  >
    <template v-slot:arrow-left>
      <v-btn icon light large fab>
        <v-icon light>fas fa-chevron-left</v-icon>
      </v-btn>
    </template>

    <template v-slot:arrow-right>
      <v-btn icon light large fab>
        <v-icon light>fas fa-chevron-right</v-icon>
      </v-btn>
    </template>
    <vueper-slide v-for="i in 9" :key="i">
      <template v-slot:content>
        <v-card class="mx-auto">
          <v-img class="white--text align-end" height="200px" light :src="images[i%3]">
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
            <v-chip-group class="mx-2">
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
    </vueper-slide>
  </vueper-slides>
</template>
<style scoped>
.line-blue {
  width: 150px;
  border: 2px solid #6C98C6;
  margin-bottom: 30px;
}
</style>
<script>
import 'vueperslides/dist/vueperslides.css';
import { VueperSlides, VueperSlide } from 'vueperslides';

export default {
  name: 'TopCarousel',
  components: { VueperSlides, VueperSlide },
  data: () => ({
    images: [
      'https://cafefcdn.com/thumb_w/650/2020/2/13/can20ho20mini207-15815635464611185990805-crop-1581563557061967924017.jpg',
      'https://cafebiz.cafebizcdn.vn/thumb_w/600/2020/2/13/8089c20df331176f4e2088eca6e8692e446da5ee74cf9690ac8f1024x1024-1581505343931414861121-crop-1581505355563750746684-15815581031811841714750-crop-158155810828255785255.jpg',
      'https://img.homedy.com/store/images/2019/06/19/can-ho-mini-gia-re-1-636965585916507395.jpg',
    ],
  }),
};
</script>
