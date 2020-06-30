<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex">
          <transition
            name="custom-classes-transition"
            enter-active-class="animated tada"
            leave-active-class="animated bounceOutRight"
            :duration="{leave: 500}"
          >
            <div
              class="banner-left d-flex flex-column justify-center align-center"
              v-bind:style="banner.left.style"
              v-if="banner.left.show"
            >
              <div class="d-flex justify-end align-center" :style="{width: '100%'}">
                <v-tooltip left>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                      @click="closeLeftBanner"
                      icon color="amber"
                      v-on="on" v-bind="attrs"
                    >
                      <v-icon>far fa-times-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>Close</span>
                </v-tooltip>
              </div>
              <p class="white--text font-weight-medium pa-6">
                HỖ TRỢ TÌM KIẾM ĐỂ ĐỀ XUẤT PHÒNG TRỌ PHÙ HỢP NHẤT
              </p>
              <div class="d-flex justify-center align-center pa-6" :style="{width: '100%'}">
                <p></p>
                <v-combobox
                  v-model="banner.left.select"
                  :items="banner.left.items"
                  allow-overflow="false"
                  color="success"
                  label="Bạn là"
                  autofocus
                  outlined
                  dense
                  dark
                  clearable
                ></v-combobox>
              </div>
              <v-btn color="amber">TÌM KIẾM</v-btn>
            </div>
          </transition>
          <div class="banner-right d-flex flex-column justify-center align-center">
            <div class="line"></div>
            <p class="white--text text-h2 font-weight-medium">TD HOSTEL</p>
            <p
              class="white--text font-weight-medium"
            >HỖ TRỢ TÌM KIẾM, ĐỀ XUẤT VÀ ĐẶT LỊCH XEM PHÒNG TRỌ PHÙ HỢP NHẤT</p>
            <v-btn color="warning" light @click="openLeftBanner">TÌM KIẾM NÂNG CAO</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center">
          <div class="line-blue"></div>
          <p class="blue--text text-h6 font-weight-medium">Lượt Xem Nhiều Nhất</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <vueper-slides
          class="no-shadow"
          fractions
          bulletsOutside
          transition-speed='250'
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
          :link="'#'">
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
          <vueper-slide
            v-for="i in 9"
            :key="i">
            <template v-slot:content>
              <v-card class="mx-auto" >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  light
                  :src="images[i%3]"
                >
                    <v-chip
                    class="ma-2"
                    color="white"
                    text-color="blue"
                    >
                      <v-icon left>fas fa-coins</v-icon>
                      500.000vnd
                    </v-chip>
                  <v-card-title class="white--text">
                    Ký túc xá đại học quốc gia {{i}}
                  </v-card-title>
                </v-img>
                <v-divider class="mx-4"/>
                  <div class="d-flex align-center justify-space-between">
                    <span class="mx-2 mt-4">
                      <p>
                        <v-icon class="mx-2" small>fas fa-map-marker-alt</v-icon>
                        Linh Trung, Thủ Đức, TP.HCM
                      </p>
                    </span>
                  </div>
                  <div class="d-flex align-center justify-space-between">
                      <span class="mx-2">
                        <p class="success--text">
                          <v-icon class="mx-2" small>fas fa-store</v-icon>
                          Chợ Hoàng Hoa Thám</p>
                      </span>
                      <span class="mx-2">
                        <p>
                          <v-icon class="mx-2" small>fas fa-ruler</v-icon>
                          0.2 Km
                        </p>
                      </span>
                  </div>
                  <div class="d-flex align-center justify-space-between">
                    <span class="mx-2">
                      <v-icon class="mx-2" small>fas fa-ruler-combined</v-icon>
                      20m2
                    </span>
                    <span class="mx-2">
                      <v-icon class="mx-2" small>fas fa-users</v-icon>
                      3 người
                    </span>
                    <span class="mx-2">
                      <v-icon class="mx-2" small>mdi-toilet</v-icon>
                      Dùng riêng
                    </span>
                  </div>
                  <div class="d-flex align-center justify-space-between mt-4">
                    <v-chip-group class="mx-2">
                      <v-chip>
                        <v-icon class="mx-4" small>mdi-weather-windy</v-icon>
                        May Lanh
                      </v-chip>
                      <v-chip>
                        <v-icon class="mx-4" small>mdi-fridge</v-icon>
                        Tu Lanh
                      </v-chip>
                      <v-chip>
                        <v-icon class="mx-4" small>fas fa-motorcycle</v-icon>
                        Cho dau xe
                      </v-chip>
                      <v-chip>
                        <v-icon class="mx-4" small>mdi-washing-machine</v-icon>
                        May giat
                      </v-chip>
                    </v-chip-group>
                  </div>
                <v-card-actions>
                  <v-btn
                    color="amber"
                    dark
                  >
                    <v-icon class="ma-2">fas fa-info-circle</v-icon>
                    Chi tiết
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </vueper-slide>
        </vueper-slides>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center">
          <div class="line-blue"></div>
          <p class="blue--text text-h6 font-weight-medium">Các Phòng Được Đề Xuất Tốt Nhất</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-sheet light>

        </v-sheet>
      </v-col>
      <v-col cols="4">

      </v-col>
    </v-row>
  </v-container>
</template>
<style>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');
body {
  background-color: #F3F4F9;
}
.banner-right {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://img.homedy.com/store/images/2019/06/19/can-ho-mini-gia-re-1-636965585916507395.jpg");
  background-position: center;
  background-size: cover;
  height: 500px;
  width: 100%;
}
.banner-left {
  background-color: #282828;
  overflow: hidden;
}
.line {
  width: 150px;
  border: 2px solid #f5b507;
  margin-bottom: 30px;
}
.line-blue {
  width: 150px;
  border: 2px solid #6C98C6;
  margin-bottom: 30px;
}
</style>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

export default {
  name: 'Home',
  data: () => ({
    images: [
      'https://cafefcdn.com/thumb_w/650/2020/2/13/can20ho20mini207-15815635464611185990805-crop-1581563557061967924017.jpg',
      'https://cafebiz.cafebizcdn.vn/thumb_w/600/2020/2/13/8089c20df331176f4e2088eca6e8692e446da5ee74cf9690ac8f1024x1024-1581505343931414861121-crop-1581505355563750746684-15815581031811841714750-crop-158155810828255785255.jpg',
      'https://img.homedy.com/store/images/2019/06/19/can-ho-mini-gia-re-1-636965585916507395.jpg',
    ],
    banner: {
      left: {
        show: false,
        select: [],
        items: ['Sinh viên', 'Công nhân', 'Nhân viên'],
        style: {},
      },
      right: {},
    },
    slides: [
      {
        title: 'Slide #1',
        content: 'Slide content',
        image: '',
      },
    ],
  }),
  methods: {
    closeLeftBanner() {
      this.banner.left.show = false;
    },
    openLeftBanner() {
      this.banner.left.show = true;
    },
  },
  components: { VueperSlides, VueperSlide },
};
</script>
