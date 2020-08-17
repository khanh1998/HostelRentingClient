<template>
  <div class="d-flex">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
      :duration="{leave: 500}"
    >
      <div
        class="banner-left flex-column align-center px-10 py-5"
        v-bind:style="banner.left.style"
        v-if="banner.left.show"
      >
        <div class="d-flex justify-end align-center" :style="{width: '100%'}">
          <v-tooltip left>
            <template v-slot:activator="{on, attrs}">
              <v-btn @click="closeLeftBanner()" color="amber" icon v-on="on" v-bind="attrs">
                <v-icon>far fa-times-circle</v-icon>
              </v-btn>
            </template>
            <span>Close</span>
          </v-tooltip>
        </div>
        <p
          class="font-weight-medium white--text transition-swing text-h5"
          style="letter-spacing: 0.001em !important;"
        >HỖ TRỢ TÌM KIẾM ĐỂ ĐỀ XUẤT PHÒNG TRỌ PHÙ HỢP NHẤT</p>
        <v-row style="height: 80px">
          <v-col cols="7" style="height: 50px">
            <v-autocomplete
              v-model="model"
              :items="states"
              label="Bạn học trường"
              class="text-body-2"
              filled
              cache-items
              dense
              color="indigo"
              _autofocus
              clearable
              background-color="white"
              no-data-text="Không có kết quả phù hợp"
            ></v-autocomplete>
          </v-col>
          <v-col cols="5" style="padding-right: 0px !important, height: 50px">
            <v-autocomplete
              v-model="model"
              :items="province"
              label="Quê ở"
              class="text-body-2"
              filled
              cache-items
              dense
              color="indigo"
              clearable
              background-color="white"
              no-data-text="Không có kết quả phù hợp"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-col cols="12" class="mt-2" style="padding: 0px !important">
          <div class="d-flex justify-center align-center" :style="{width: '100%'}">
            <div
              class="d-flex justify-center align-center white"
              :style="{width: '100%',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            border: '1px solid #F3E5',
            margin: '0px 0px 4px',
            height: '50px'}"
            >
              <gmap-autocomplete
                placeholder="Địa điểm, khu vực bạn muốn ở gần"
                class="col-11 gmap-input text-body-2 blue-grey--text"
                @place_changed="setPlace"
                @change="changeSearchValue"
                :value="searchValue"
              ></gmap-autocomplete>
              <v-btn icon @click="clearField()" v-bind:style="{ visibility: computedClearable }">
                <v-icon>clear</v-icon>
              </v-btn>
            </div>
            <!-- </v-col> -->
          </div>
        </v-col>
        <v-row class="mt-2">
          <!-- <v-col cols="8" style="margin-right: -20px">
            <div class="flex d-flex" :style="{width: '100%',border: '2px solid #b2ccf7'}">
              <v-col cols="10" class="red">
                <div style="height: 46px" v-show="!showMore">
                  <div class="flex d-flex justify-center align-center">
                    <v-subheader
                      class="white--text text-subtitle-1 font-weight-regular"
                    >Xem thêm các thuộc tính khác</v-subheader>
                    <v-btn color="white" icon class="ml-auto mr-2" @click="showMore = ! showMore">
                      <v-icon>add_circle</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div v-show="showMore">
                  <div class="flex d-flex justify-center align-center">
                    <v-col cols="10"></v-col>
                    <v-col cols="2">
                      <v-btn color="white" icon class="ml-auto mr-2" @click="showLessProperties()">
                        <v-icon>remove_circle</v-icon>
                      </v-btn>
                    </v-col>
                  </div>
                </div>
              </v-col>
              <v-btn color="white" class="ml-auto" icon @click="showMore = ! showMore">
                <v-icon>add_circle</v-icon>
              </v-btn>
            </div>
          </v-col>-->
          <v-col cols="4" class="ml-auto">
            <v-btn
              class="white--text text-button"
              :style="{width: '100%', height: '50px',
                borderRadius: '0px',
                boxShadow: 'none'}"
              color="amber"
            >TÌM KIẾM</v-btn>
          </v-col>
        </v-row>
      </div>
    </transition>
    <div
      class="banner-right d-flex flex-column justify-center align-center"
      :style="banner.right.style"
    >
      <div class="mb-10" style="width: 150px; border: 1px solid #f5b507;" />
      <p class="white--text text-h2">TD HOSTEL</p>
      <p
        class="white--text px-2 font-weight-bold slogan"
        v-bind:style="{ visibility: visibleSearchOptional }"
      >HỖ TRỢ TÌM KIẾM, ĐỀ XUẤT VÀ ĐẶT LỊCH XEM PHÒNG TRỌ PHÙ HỢP NHẤT</p>
      <v-btn
        color="#F9B707"
        class="white--text"
        light
        height="60"
        width="300"
        @click="openLeftBanner()"
        v-bind:style="{ visibility: visibleSearchOptional }"
      >TÌM KIẾM NÂNG CAO</v-btn>
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
}
.slogan {
  font-size: 20px !important;
  font-family: Montserrat;
  letter-spacing: 0.1em !important;
  text-align: center;
}
.slogan-left {
  font-family: Montserrat;
  letter-spacing: 0.1em !important;
  text-align: center;
}
.banner-left {
  background-image: linear-gradient(
    rgba(96, 138, 206, 0.95),
    rgba(96, 138, 206, 0.95)
  );
  /* url('https://livedemo00.template-help.com/wt_prod-3844/images/bg-shape-1.svg'); */
  background-position: right;
  background-size: cover;
  overflow: hidden;
  margin-right: 20px;
}
.v-application .text-h2 {
  font-size: 60px !important;
  font-weight: bold;
  letter-spacing: 0.1em !important;
  font-family: 'Montserrat' !important;
}
.v-application p {
  margin-bottom: 36px;
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Banner',
  data: () => ({
    showMore: false,
    banner: {
      left: {
        show: false,
        select: [],
        items: ['Sinh viên', 'Công nhân', 'Nhân viên'],
        style: {
          width: '75%',
        },
      },
      right: {
        style: {
          width: '100%',
        },
      },
    },
    states: [
      'Trường Đại học Bách khoa, Đại học Quốc gia Thành phố Hồ Chí Minh',
      'Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh',
      'Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh',
      'Trường Đại học Quốc tế, Đại học Quốc gia Thành phố Hồ Chí Minh',
      'Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh',
      'Trường Đại học Trần Đại Nghĩa',
      'Trường Đại học Thông tin Liên lạc',
      'Trường Đại học Tôn Đức Thắng',
      'Trường Đại học Công nghiệp Thành phố Hồ Chí Minh',
      'Trường Đại học Công nghiệp Thực phẩm Thành phố Hồ Chí Minh',
      'Trường Đại học Giao thông vận tải Thành phố Hồ Chí Minh',
      'Trường Đại học Nông Lâm Thành phố Hồ Chí Minh',
      'Trường Đại học Sài Gòn',
      'Trường Đại học Sư phạm Thành phố Hồ Chí Minh',
      'Trường Đại học Mở Thành phố Hồ Chí Minh',
      'Trường Đại học Công nghệ Sài Gòn',
      'Trường Đại học Quốc tế Hồng Bàng',
      'Trường Đại học Hùng Vương',
      'Trường Đại học Kỹ thuật - Công nghệ Thành phố Hồ Chí Minh',
      'Trường Đại học Ngoại ngữ - Tin học Thành phố Hồ Chí Minh',
      'Trường Đại học Văn Hiến',
      'Trường Đại học Văn Lang',
      'Trường Đại học Kinh tế - Tài chính Thành phố Hồ Chí Minh',
      'Trường Đại học Hoa Sen',
      'Trường Đại học Công nghệ thông tin Gia Định',
      'Trường Đại học Quốc tế Sài Gòn',
      'Trường Cao đẳng BC Công nghệ và Quản trị doanh nghiệp',
      'Trường Cao đẳng Công nghệ Thủ Đức',
      'Trường Cao đẳng Kinh tế - Kỹ thuật Vinatex TP.HCM',
      'Trường Đại học FPT',
    ],
    province: [
      'An Giang',
      'Bà rịa – Vũng tàu',
      'Bắc Giang',
      'Bắc Kạn',
      'Bạc Liêu',
      'Bắc Ninh',
      'Bến Tre',
      'Bình Định',
      'Bình Dương',
      'Bình Phước',
      'Bình Thuận',
      'Cà Mau',
      'Cần Thơ',
      'Cao Bằng',
      'Đà Nẵng',
      'Đắk Lắk',
      'Đắk Nông',
      'Điện Biên',
      'Đồng Nai',
      'Đồng Tháp',
      'Gia Lai',
      'Hà Giang',
      'Hà Nam',
      'Hà Nội',
      'Hà Tĩnh',
      'Hải Dương',
      'Hải Phòng',
      'Hậu Giang',
      'Hòa Bình',
      'Hưng Yên',
      'Khánh Hòa',
      'Kiên Giang',
      'Kon Tum',
      'Lai Châu',
      'Lâm Đồng',
      'Lạng Sơn',
      'Lào Cai',
      'Long An',
      'Nam Định',
      'Nghệ An',
      'Ninh Bình',
      'Ninh Thuận',
      'Phú Thọ',
      'Phú Yên',
      'Quảng Bình',
      'Quảng Nam',
      'Quảng Ngãi',
      'Quảng Ninh',
      'Quảng Trị',
      'Sóc Trăng',
      'Sơn La',
      'Tây Ninh',
      'Thái Bình',
      'Thái Nguyên',
      'Thanh Hóa',
      'Thừa Thiên Huế',
      'Tiền Giang',
      'Thành phố Hồ Chí Minh',
      'Trà Vinh',
      'Tuyên Quang',
      'Vĩnh Long',
      'Vĩnh Phúc',
      'Yên Bái',
    ],
    slides: [
      {
        title: 'Slide #1',
        content: 'Slide content',
        image: '',
      },
    ],
    visibleSearchOptional: 'visible',
    address: '',
    center: { lat: 10.7542893, lng: 106.1346955 },
    places: [],
    currentPlace: null,
    visibleProperty: 'hidden',
  }),
  methods: {
    ...mapActions({
      setIsSearchOptional: 'renter/home/setSearchTypeValue',
      setSearchValue: 'renter/filterResult/setSearchValue',
    }),
    closeLeftBanner() {
      this.isSearchOptional = true;
      this.banner.left.show = false;
      this.visibleSearchOptional = 'visible';
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.banner.right.style.width = '100%';
      }
    },
    openLeftBanner() {
      this.isSearchOptional = false;
      this.banner.left.show = true;
      this.visibleSearchOptional = 'hidden';
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.banner.right.style.width = 0;
      }
    },
    setPlace(place) {
      this.currentPlace = place;
      this.address = place.name;
      this.searchValue = place.formatted_address;
    },
    changeSearchValue() {
      this.visibleProperty = 'visible';
    },
    clearField() {
      this.searchValue = '';
      this.address = '';
      this.visibleProperty = 'hidden';
      this.currentPlace = null;
    },
  },
  computed: {
    isSearchOptional: {
      get() {
        return this.$store.state.renter.home.searchType.isOptional;
      },
      set(value) {
        this.setIsSearchOptional(value);
      },
    },
    searchValue: {
      get() {
        return this.address;
      },
      set(value) {
        this.setSearchValue(value);
      },
    },
    responsive() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return {};
        default:
          return {};
      }
    },
    visibleSearchOptional() {
      return this.visibleSearchOptional;
    },
    moreProperties() {
      return this.showMore;
    },
    computedClearable() {
      return this.visibleProperty;
    },
  },
};
</script>
