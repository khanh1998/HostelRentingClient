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
        <div class="mt-3 d-flex align-center">
          <v-img
            class="shrink mr-3"
            src="@/assets/home/address.png"
            transition="scale-transition"
            max-width="20"
            max-height="20"
          />
          <span class="item-text">Linh Trung, Thủ Đức, TP.HCM</span>
        </div>
        <div class="mt-3 d-flex align-center">
          <v-img
            class="shrink mr-2"
            src="@/assets/home/distance.png"
            transition="scale-transition"
            max-width="25"
            max-height="25"
          />
          <span class="item-text blue--text">BigC:</span>
          <span class="item-text item-text-detail ml-auto">300 m</span>
        </div>
        <div class="mt-3 d-flex align-center">
          <v-img
            class="shrink mr-5"
            src="@/assets/home/superficies.svg"
            transition="scale-transition"
            max-width="15"
            max-height="15"
          />
          <span class="item-text">20m2</span>
          <div class="ml-auto d-flex">
            <v-img
              class="shrink mr-4 ml-auto"
              src="@/assets/home/people.png"
              transition="scale-transition"
              max-width="15"
              max-height="15"
            />
            <span class="item-text">3 người</span>
          </div>
        </div>
        <v-card-actions class="pl-0 mt-3">
          <v-btn color="#484848" class="btnDetail pl-3 pr-3">Chi tiết</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
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
  /* background-image: linear-gradient(to right, rgba(216, 36, 96, 0.6), #d82460); */
  background-image: linear-gradient(to right, rgba(52, 203, 247, 0.71) , #1c63b8);
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
  border-right: 12px solid rgba(52, 203, 247, 0.71);
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
.item-text-detail {
  color: #3357b4 !important;
}
.btnDetail {
  font-size: 13px;
  color: #fff;
  padding: 0 0 20px 25px;
  font-family: 'Nunito';
}
.v-btn:hover {
  background-color: #6C98C6 !important;
}
</style>
