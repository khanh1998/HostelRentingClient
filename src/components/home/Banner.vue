<template>
  <div class="d-flex">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
      :duration="{ leave: 500 }"
    >
      <div
        class="banner-left flex-column align-center px-10 py-5"
        v-bind:style="banner.left.style"
        v-if="banner.left.show"
      >
        <div class="d-flex justify-end align-center" :style="{ width: '100%' }">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
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
        <v-row style="height: 80px;">
          <v-col cols="7" style="height: 50px;">
            <v-autocomplete
              v-model="banner.left.select.school"
              :items="banner.left.schools"
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
              v-model="banner.left.select.hometown"
              :items="banner.left.provinces"
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
        <v-col cols="12" class="mt-2" style="padding: 0px !important;">
          <div class="d-flex justify-center align-center" :style="{ width: '100%' }">
            <div
              class="d-flex justify-center align-center white"
              :style="{
                width: '100%',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
                border: '1px solid #F3E5',
                margin: '0px 0px 4px',
                height: '50px',
              }"
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
          <!-- <p>{{school}} - {{hometown}} - {{searchValue}}</p> -->
          <v-col cols="4" class="ml-auto">
            <v-btn
              class="white--text text-button"
              :style="{ width: '100%', height: '50px', borderRadius: '0px', boxShadow: 'none' }"
              color="amber"
              @click="searchByCoordinates"
            >TÌM KIẾM</v-btn>
          </v-col>
        </v-row>
      </div>
    </transition>
    <!-- main thumnail -->
    <div class="banner-right d-flex justify-center" :style="banner.right.style">
      <v-col cols="8">
        <!-- search by location -->
        <div v-show="!advanceSearch">
          <div class="d-flex flex-column align-center justify-center mt-16">
            <p
              class="font-weight-medium white--text transition-swing text-h5"
              style="letter-spacing: 0.001em !important;"
            >HỖ TRỢ TÌM KIẾM ĐỀ XUẤT PHÒNG TRỌ PHÙ HỢP NHẤT</p>
            <p class="white--text text-h2">TD HOSTEL</p>
            <div class="flex d-flex px-10" :style="{ width: '100%' }">
              <v-col cols="9">
                <div
                  class="d-flex justify-center align-center white"
                  :style="{
                width: '100%',
                _borderTopLeftRadius: '4px',
                _borderTopRightRadius: '4px',
                border: '1px solid #F3E5',
                margin: '0px 0px 4px',
                height: '50px',
              }"
                >
                  <gmap-autocomplete
                    placeholder="Địa điểm, khu vực bạn muốn ở gần"
                    class="col-11 gmap-input text-body-2 blue-grey--text"
                    @place_changed="setPlace"
                    @change="changeSearchValue"
                    :value="searchValue"
                  ></gmap-autocomplete>
                  <v-btn
                    icon
                    @click="clearField()"
                    v-bind:style="{ visibility: computedClearable }"
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="3" class="ml-auto">
                <v-btn
                  class="text-button"
                  :style="{ width: '100%', height: '50px', borderRadius: '0px',
                  boxShadow: 'none', color: '#151515' }"
                  color="#fdde52"
                  @click="searchByCoordinates"
                >TÌM KIẾM</v-btn>
              </v-col>
            </div>
          </div>
          <div class="flex d-flex justify-end align-center px-10" :style="{ width: '100%'}">
            <!-- eslint-disable max-len -->
            <v-subheader
              class="white--text text-subtitle-1 font-weight-regular px-0 ml-auto"
            >Tùy chọn nâng cao</v-subheader>
            <v-btn icon @click="advanceSearch = !advanceSearch">
              <v-icon color="white">{{ advanceSearch ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </div>
        </div>
        <!-- search like filter -->
        <div v-show="advanceSearch">
          <div class="flex d-flex justify-end align-center" :style="{ width: '100%'}">
            <!-- eslint-disable max-len -->
            <v-subheader
              class="white--text text-subtitle-1 font-weight-regular px-0 ml-auto"
            >Tùy chọn nâng cao</v-subheader>
            <v-btn icon @click="advanceSearch = !advanceSearch">
              <v-icon color="white">{{ advanceSearch ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </div>
          <!-- address -->
          <div class="flex d-flex" :style="{ width: '100%', height: '76px' }">
            <v-col cols="9" :style="{height: '100%'}">
              <div
                class="d-flex justify-center align-center white"
                :style="{
                width: '100%',
                _borderTopLeftRadius: '4px',
                _borderTopRightRadius: '4px',
                border: '1px solid #F3E5',
                margin: '0px 0px 4px',
                height: '100%',
              }"
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
            </v-col>
            <v-col cols="3" :style="{height: '100%'}">
              <v-select
                v-model="banner.left.select.distance"
                :items="banner.left.distance"
                label="Khoảng cách tối đa"
                class="text-subtitle-2"
                filled
                cache-items
                dense
                color="indigo"
                _clearable
                background-color="white"
                :style="{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',}"
              ></v-select>
            </v-col>
          </div>
          <!-- university & hometown -->
          <div class="flex d-flex" :style="{ width: '100%', height: '76px' }">
            <v-col cols="7">
              <v-autocomplete
                v-model="banner.left.select.school"
                :items="banner.left.schools"
                label="Bạn học trường"
                class="text-body-2"
                filled
                cache-items
                dense
                color="indigo"
                clearable
                background-color="white"
                no-data-text="Không có kết quả phù hợp"
                :style="{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px'}"
              ></v-autocomplete>
            </v-col>
            <v-col cols="5" style="padding-right: 0px !important, height: 50px">
              <v-autocomplete
                v-model="banner.left.select.hometown"
                :items="banner.left.provinces"
                label="Quê ở"
                class="text-body-2"
                filled
                cache-items
                dense
                color="indigo"
                clearable
                background-color="white"
                no-data-text="Không có kết quả phù hợp"
                :style="{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px'}"
              ></v-autocomplete>
            </v-col>
          </div>
          <!-- category & price & area -->
          <div class="flex d-flex" :style="{ width: '100%'}">
            <v-col cols="7" class="flex d-flex" :style="{height: '76px' }">
              <div :style="{width: '30%'}">
                <v-select
                  v-model="banner.left.select.category"
                  :items="banner.left.category"
                  label="Loại"
                  class="text-subtitle-2 mr-3"
                  filled
                  cache-items
                  dense
                  color="indigo"
                  background-color="white"
                  :style="{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                }"
                ></v-select>
              </div>
              <div :style="{width: '40%'}">
                <v-select
                  _v-model="banner.left.select.distance"
                  :items="banner.left.distance"
                  label="Diện tích tối thiểu"
                  class="text-subtitle-2"
                  filled
                  cache-items
                  dense
                  color="indigo"
                  clearable
                  background-color="white"
                  :style="{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                }"
                ></v-select>
              </div>
              <div :style="{width: '30%'}" class="d-flex align-end">
                <v-switch class="ml-auto" hide-details v-model="disabled" />
                <span
                  class="text-body-1 font-weight-medium px-0"
                  style="line-height: normal; color: #FFFF00"
                >Giá thuê</span>
              </div>
            </v-col>
            <v-col cols="5" class="pt-0 mt-10 pl-3">
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                class="price"
                hide-details
                :thumb-size="28"
                thumb-label="always"
                step="0.1"
                :disabled="!disabled"
              />
              <v-row class="justify-center align-center">
                <!-- eslint-disable max-len -->
                <v-subheader class="subtitle-2" :style="{height:'20px'}">{{ min }} tr</v-subheader>
                <v-subheader class="ml-auto subtitle-2" :style="{height:'20px'}">{{ max }} tr</v-subheader>
                <v-btn
                  icon
                  color="indigo"
                  height="30"
                  width="30"
                  :disabled="!disabled"
                  @click="changeMaxPrice()"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </div>
          <!-- category & utility & facility -->
          <div class="d-flex" :style="{width: '100%'}">
            <v-col cols="3">
              <div :style="{width: '100%',border: '2px solid #b2ccf7' }">
                <div class="flex d-flex justify-center align-center">
                  <v-subheader class="white--text text-subtitle-1 font-weight-regular">Tiện nghi</v-subheader>
                  <v-btn
                    color="white"
                    icon
                    class="ml-auto mr-2"
                    @click="showMoreFacilities = ! showMoreFacilities"
                  >
                    <v-icon>{{ showMoreFacilities ? 'remove_circle' : 'add_circle' }}</v-icon>
                  </v-btn>
                </div>
                <div v-show="showMoreFacilities">
                  <div>
                    <v-list>
                      <v-list-item-group
                        :style="{width: '100%'}"
                        v-model="banner.left.select.facilities"
                        multiple
                      >
                        <template v-for="(item, i) in facilities">
                          <v-list-item
                            :key="`item-${i}`"
                            :value="item.facilityId"
                            active-class="deep-purple--text text--accent-4"
                          >
                            <template v-slot:default="{ active }">
                              <v-list-item-action>
                                <v-checkbox :input-value="active" color="deep-purple accent-4" />
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="item.facilityName"
                                  class="text-caption noWrap"
                                />
                              </v-list-item-content>
                            </template>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="6">
              <div :style="{width: '100%',border: '2px solid #b2ccf7' }">
                <div class="flex d-flex justify-center align-center">
                  <v-subheader
                    class="white--text text-subtitle-1 font-weight-regular"
                  >Tiện ích xung quanh</v-subheader>
                  <v-btn
                    color="white"
                    icon
                    class="ml-auto mr-2"
                    @click="showMoreAround = ! showMoreAround"
                  >
                    <v-icon>{{ showMoreAround ? 'remove_circle' : 'add_circle' }}</v-icon>
                  </v-btn>
                </div>
                <div v-show="showMoreAround">
                  <div>
                    <v-list shaped>
                      <v-list-item-group v-model="banner.left.select.around" multiple>
                        <template v-for="(item, i) in filter.around.items">
                          <v-list-item
                            :key="`item-${i}`"
                            :value="item"
                            active-class="deep-purple--text text--accent-4"
                          >
                            <template v-slot:default="{ active }">
                              <v-list-item-content>
                                <v-list-item-title v-text="item" class="text-body-2 noWrap" />
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-checkbox :input-value="active" color="deep-purple accent-4" />
                              </v-list-item-action>
                            </template>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="3" class="ml-auto">
              <v-btn
                class="text-button"
                :style="{ width: '100%', height: '50px', borderRadius: '0px',
                  boxShadow: 'none', color: '#151515' }"
                color="#fdde52"
                @click="searchByCoordinates"
              >TÌM KIẾM</v-btn>
            </v-col>
          </div>
        </div>

        <!-- <v-row>
      <v-col cols="2" class="red"></v-col>
      <v-col cols="8"></v-col>
        <v-col cols="2" class="red"></v-col>-->
        <!-- <div class="mb-10" style="width: 150px; border: 1px solid #f5b507;" />
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
        >TÌM KIẾM NÂNG CAO</v-btn>-->
      </v-col>
    </div>
  </div>
</template>
<style>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');
.banner-right {
  background-image: linear-gradient(rgba(96, 138, 206, 0.85), rgba(96, 138, 206, 0.85)),
    url(../../assets/home/blue-thumnail.png);
  /* background-image: linear-gradient(rgba(49, 94, 154, 0.85), rgba(49, 94, 154, 0.85)),
    url(../../assets/home/blue-thumnail.png); */
  background-size: cover;
  height: 550px;
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
.price .v-slider--horizontal .v-slider__track-container {
  height: 6px !important;
}
.v-application--is-ltr .v-text-field .v-label {
  font-size: revert !important;
}
.v-list {
  height: 130px;
  overflow-y: auto;
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Banner',
  data: () => ({
    showMore: false,
    showMoreFacilities: false,
    showMoreAround: false,
    advanceSearch: false,
    min: 0,
    max: 15,
    range: [0, 2.5],
    disabled: false,
    banner: {
      left: {
        show: false,
        select: {
          school: '',
          hometown: '',
          distance: '5km',
          category: 'Phòng trọ',
          around: '',
          facilities: '',
        },
        schools: [
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
        provinces: [
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
        distance: ['3km', '5km', '7km', '10km'],
        category: ['Phòng trọ', 'Kí túc xá'],
        around: [
          'Chợ, siêu thị, cửa hàng tiện lợi',
          'Trạm xe buýt',
          'Bệnh viện, trạm y tế',
          'Ngân hàng',
        ],
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
      setNameAddress: 'renter/home/setNameAddress',
      setSchool: 'renter/home/setSchool',
      setHometown: 'renter/home/setHometown',
      setSearchValue: 'renter/filterResult/setSearchValue',
      searchByCoordinator: 'renter/filterResult/searchByCoordinator',
      getAllFacilities: 'renter/filterResult/getAllFacilities',
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
      this.address = `${place.name}-${place.formatted_address}`;
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
    changeMaxPrice() {
      if (this.max < 50) this.max += 5;
    },
    searchByCoordinates() {
      if (this.currentPlace) {
        const coordinates = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.searchByCoordinator({
          lat: coordinates.lat,
          long: coordinates.lng,
          coordinator: coordinates,
        });
        this.setSearchValue(this.coordinates);
        this.school = this.banner.left.select.school;
        this.hometown = this.banner.left.select.hometown;
        this.nameAddress = this.searchValue.split('-');
        this.isSearchOptional = true;
        this.$router.push('/filter');
      }
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
    filter() {
      return this.$store.state.renter.filterResult.filter;
    },
    facilities() {
      return this.$store.state.renter.filterResult.filter.facility.data;
    },
    nameAddress: {
      get() {
        return this.$store.state.renter.home.searchType.nameAddress;
      },
      set(value) {
        this.setNameAddress(value);
      },
    },
    school: {
      get() {
        return this.$store.state.renter.home.searchType.school;
      },
      set(value) {
        this.setSchool(value);
      },
    },
    hometown: {
      get() {
        return this.$store.state.renter.home.searchType.hometown;
      },
      set(value) {
        this.setHometown(value);
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
    moreProperties() {
      return this.showMore;
    },
    computedClearable() {
      return this.visibleProperty;
    },
  },
  created() {
    this.isSearchOptional = false;
    if (this.facilities.length === 0) {
      this.getAllFacilities();
    }
  },
};
</script>
