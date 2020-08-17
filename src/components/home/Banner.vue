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
          <v-select
            v-model="banner.left.select"
            :items="banner.left.items"
            color="success"
            label="Bạn là"
            autofocus
            outlined
            dense
            dark
          ></v-select>
        </div>
        <v-btn color="amber">TÌM KIẾM</v-btn>
      </div>
    </transition>
    <div
      class="banner-right d-flex flex-column justify-center align-center"
      :style="banner.right.style"
    >
      <div class="line"></div>
      <p class="white--text text-h2">TD HOSTEL</p>
      <p
        class="white--text px-2 font-weight-bold"
      >HỖ TRỢ TÌM KIẾM, ĐỀ XUẤT VÀ ĐẶT LỊCH XEM PHÒNG TRỌ PHÙ HỢP NHẤT</p>
      <v-btn color="#F9B707" light @click="openLeftBanner" id="search-optional">TÌM KIẾM NÂNG CAO</v-btn>
    </div>
  </div>
</template>
<style scoped>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');
.banner-right {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('http://thicongnhadanang.com/uploads/image/images/thiet%20ke%20can%20ho%20mini-dep-da-nang%20(2).jpg');
  background-position: center;
  background-size: cover;
  height: 500px;
  overflow: hidden;
  background-color: red;
}
.banner-left {
  background-color: #282828;
  overflow: hidden;
}
.line {
  width: 150px;
  border: 1px solid #f5b507;
  margin-bottom: 50px;
}
.v-application .text-h2 {
  font-size: 60px !important;
  font-weight: bold;
  letter-spacing: 0.1em !important;
  font-family: 'Montserrat' !important;
}
.px-2 {
  font-size: 20px !important;
  font-family: Montserrat;
  letter-spacing: 0.1em !important;
}
.v-application p {
  margin-bottom: 36px;
}
#search-optional {
  height: 60px;
  width: 300px;
  color: white;
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
      right: {
        style: {
          width: '100%',
        },
      },
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
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.banner.right.style.width = '100%';
      }
    },
    openLeftBanner() {
      this.banner.left.show = true;
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.banner.right.style.width = 0;
      }
    },
  },
  computed: {
    responsive() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return {};
        default:
          return {};
      }
    },
  },
};
</script>
