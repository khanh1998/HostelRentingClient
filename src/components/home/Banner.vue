<template>
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
              <v-btn @click="closeLeftBanner" icon color="amber" v-on="on" v-bind="attrs">
                <v-icon>far fa-times-circle</v-icon>
              </v-btn>
            </template>
            <span>Close</span>
          </v-tooltip>
        </div>
        <p
          class="white--text font-weight-medium pa-6"
        >HỖ TRỢ TÌM KIẾM ĐỂ ĐỀ XUẤT PHÒNG TRỌ PHÙ HỢP NHẤT</p>
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
</template>
<style scoped>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');
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
</style>
<script>
export default {
  name: 'Banner',
  data: () => ({
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
};
</script>
