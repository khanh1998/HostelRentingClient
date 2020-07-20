<template>
  <v-card class="mx-auto">
    <v-img class="white--text align-end" height="175px" light :src="imgUrl">
      <div class="category">
        <h4>Kí túc xá</h4>
      </div>
      <div class="arrow-price">
        <span class="price">500.000 đ</span>
      </div>
    </v-img>
    <v-divider class="mx-4" />
    <v-row class="d-flex align-center justify-center">
      <v-col cols="10">
        <div class="type-name">
          <p class="font-weight-bold mb-0">Ký túc xá đại học quốc gia</p>
        </div>
        <div class="mt-3">
          <span class="item-text">
            <!-- <v-img
              class="shrink mr-2"
              contain
              src="@/assets/home-topview/distance.png"
              transition="scale-transition"
              max-width="30"
              max-height="30"
            /> -->
            <!-- <img
              src="https://image.flaticon.com/icons/svg/3081/3081172.svg"
              alt="Distance"
              class="replaced-svg"
            /> -->
            <p>
              <!-- <v-icon small color="#656565" class="w-25" left>
                place
              </v-icon>-->
              Linh Trung, Thủ Đức, TP.HCM
            </p>
          </span>
          <!-- <img src="https://image.flaticon.com/icons/svg/3081/3081172.svg" alt="Distance" class="replaced-svg"> -->
        </div>
      </v-col>
    </v-row>
    <!-- <div class="d-flex align-center justify-space-between red property-item">
      <span class="mx-2 mt-4">
          Ký túc xá đại học quốc gia
      </span>
    </div>
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
    </div>-->
    <v-card-actions>
      <v-btn color="amber" dark>
        <v-icon class="ma-2">fas fa-info-circle</v-icon>Chi tiết
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'TopCarouselItem',
  props: ['imgUrl', 'i'],
};
</script>
<style scoped>
.v-card {
  border-radius: 0;
}
.category {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: auto;
  max-width: 80%;
  padding: 8px 16px;
  background: rgba(32, 112, 185, 0.66);
  color: #fff;
  text-align: center;
  line-height: 22px;
  font-weight: 400;
  border-bottom-left-radius: 24px;
  box-sizing: border-box;
}
.arrow-price {
  background-image: linear-gradient(to right, rgba(216, 36, 96, 0.6), #d82460);
  color: #fff;
  padding: 4px 10px;
  position: absolute;
  bottom: 0;
  right: -1px;
  font-size: 13px;
}
.arrow-price:before {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  content: '';
  left: -12px;
  border-top: 15px solid transparent;
  border-right: 12px solid rgba(216, 36, 96, 0.6);
  border-bottom: 15px solid transparent;
  width: 0;
}
.type-name {
  border-bottom: 1px solid #e2e6ed;
  padding-bottom: 10px;
  color: #3476b2;
  font-size: 16.5px;
}
.item-text {
  color: #656565;
  font-size: 13px;
  font-weight: normal;
  font-family: 'Lato';
}
</style>
