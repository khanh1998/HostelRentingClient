<template>
  <div class="d-flex">
    <!-- main thumnail -->
    <div class="banner-right d-flex justify-center" :style="{ width: '100%' }">
      <v-col cols="8">
        <!-- search by location -->
        <div v-show="!advanceSearch">
          <div class="d-flex flex-column align-center justify-center mt-16">
            <p
              class="white--text px-2 font-weight-bold slogan"
              style="letter-spacing: 0.001em !important"
            >HỖ TRỢ TÌM KIẾM, ĐỀ XUẤT VÀ ĐẶT LỊCH XEM PHÒNG TRỌ PHÙ HỢP NHẤT</p>
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
                    :value="coordinator.address"
                    autofocus
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
                  :style="{
                    width: '100%',
                    height: '50px',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    color: '#151515',
                  }"
                  color="#fdde52"
                  @click="searchByCoordinates()"
                >TÌM KIẾM</v-btn>
              </v-col>
            </div>
          </div>
          <div class="flex d-flex justify-end align-center px-10" :style="{ width: '100%' }">
            <!-- eslint-disable max-len -->
            <v-subheader
              class="white--text text-subtitle-1 font-weight-regular px-0 ml-auto"
            >Tùy chọn nâng cao</v-subheader>
            <v-btn icon @click="advanceSearch = !advanceSearch">
              <v-icon color="white">
                {{
                advanceSearch ? 'mdi-chevron-up' : 'mdi-chevron-down'
                }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <!-- search like filter -->
        <div v-show="advanceSearch">
          <div class="flex d-flex justify-end align-center" :style="{ width: '100%' }">
            <!-- eslint-disable max-len -->
            <p></p>
            <v-subheader
              class="white--text text-subtitle-1 font-weight-regular px-0 ml-auto"
            >Tùy chọn nâng cao</v-subheader>
            <v-btn icon @click="advanceSearch = !advanceSearch">
              <v-icon color="white">
                {{
                advanceSearch ? 'mdi-chevron-up' : 'mdi-chevron-down'
                }}
              </v-icon>
            </v-btn>
          </div>
          <!-- address -->
          <div class="flex d-flex" :style="{ width: '100%', height: '76px' }">
            <v-col cols="9" :style="{ height: '100%' }">
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
                  :value="filter.coordinator.address"
                  autofocus
                ></gmap-autocomplete>
                <v-btn icon @click="clearField()" v-bind:style="{ visibility: computedClearable }">
                  <v-icon>clear</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="3" :style="{ height: '100%' }">
              <v-select
                v-model="filter.distance.select"
                :items="filter.distance.items"
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
                  borderTopRightRadius: '0px',
                }"
              ></v-select>
            </v-col>
          </div>
          <!-- university & hometown -->
          <div class="flex d-flex" :style="{ width: '100%', height: '76px' }">
            <v-col cols="7">
              <v-autocomplete
                v-model="filter.schools.select"
                :items="filter.schools.items"
                item-text="schoolName"
                item-value="schoolId"
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
              >
                <template slot="selection" slot-scope="{ item }">
                  <span class="font-nunito font-weight-medium text-body-2">{{ item.schoolName }}</span>
                  <span
                    class="font-nunito font-italic text-body-2"
                  >- {{ item.address.districtName }}, {{item.address.province.provinceName}}</span>
                </template>
                <template slot="item" slot-scope="{ item }">
                  <span class="font-nunito font-weight-medium text-body-2">{{ item.schoolName }}</span>
                  <span
                    class="font-nunito font-italic text-body-2"
                  >- {{ item.address.districtName }}, {{item.address.province.provinceName}}</span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="5" style="padding-right: 0px !important, height: 50px">
              <v-autocomplete
                v-model="filter.hometown.select"
                :items="filter.hometown.items"
                label="Quê ở"
                item-text="provinceName"
                item-value="provinceId"
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
                  borderTopRightRadius: '0px',
                }"
              ></v-autocomplete>
            </v-col>
          </div>
          <!-- category & price & area -->
          <div class="flex d-flex" :style="{ width: '100%' }">
            <v-col cols="7" class="flex d-flex" :style="{ height: '76px' }">
              <div :style="{ width: '30%' }">
                <v-select
                  v-model="filter.categories.select"
                  :items="filter.categories.data"
                  item-text="categoryName"
                  item-value="categoryId"
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
              <div :style="{ width: '40%' }">
                <v-select
                  v-model="filter.minArea.select"
                  :items="filter.minArea.items"
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
              <div :style="{ width: '30%' }" class="d-flex align-end">
                <v-switch class="ml-auto" hide-details v-model="disabled" />
                <span
                  class="text-body-1 font-weight-medium px-0"
                  style="line-height: normal; color: #ffff00"
                >Giá thuê</span>
              </div>
            </v-col>
            <v-col cols="5" class="pt-0 mt-10 pl-3">
              <v-range-slider
                v-model="filter.price.range"
                :max="filter.price.max"
                :min="filter.price.min"
                class="price"
                hide-details
                :thumb-size="28"
                thumb-label="always"
                step="0.1"
                :disabled="!disabled"
              />
              <v-row class="justify-center align-center">
                <!-- eslint-disable max-len -->
                <v-subheader
                  class="subtitle-2"
                  :style="{ height: '20px' }"
                >{{ filter.price.min }} triệu</v-subheader>
                <v-subheader
                  class="ml-auto subtitle-2"
                  :style="{ height: '20px' }"
                >{{ filter.price.max }} triệu</v-subheader>
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
          <!-- utility & facility -->
          <div class="d-flex" :style="{ width: '100%' }">
            <v-col cols="3">
              <div :style="{ width: '100%', border: '2px solid #b2ccf7' }">
                <div class="flex d-flex justify-center align-center">
                  <v-subheader class="white--text text-subtitle-1 font-weight-regular">Tiện nghi</v-subheader>
                  <v-btn
                    color="white"
                    icon
                    class="ml-auto mr-2"
                    @click="showMoreFacilities = !showMoreFacilities"
                  >
                    <v-icon>{{ showMoreFacilities ? 'remove_circle' : 'add_circle' }}</v-icon>
                  </v-btn>
                </div>
                <div v-show="showMoreFacilities" class="banner">
                  <div>
                    <v-list>
                      <v-list-item-group
                        :style="{ width: '100%' }"
                        v-model="filter.facility.selects"
                        multiple
                      >
                        <template v-for="(item, i) in filter.facility.data">
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
              <div :style="{ width: '100%', border: '2px solid #b2ccf7' }">
                <div class="flex d-flex justify-center align-center">
                  <v-subheader
                    class="white--text text-subtitle-1 font-weight-regular"
                  >Tiện ích xung quanh</v-subheader>
                  <v-btn
                    color="white"
                    icon
                    class="ml-auto mr-2"
                    @click="showMoreAround = !showMoreAround"
                  >
                    <v-icon>{{ showMoreAround ? 'remove_circle' : 'add_circle' }}</v-icon>
                  </v-btn>
                </div>
                <div v-show="showMoreAround" class="banner">
                  <div>
                    <v-list shaped>
                      <v-list-item-group v-model="filter.around.selects" multiple>
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
                :style="{
                  width: '100%',
                  height: '50px',
                  borderRadius: '0px',
                  boxShadow: 'none',
                  color: '#151515',
                }"
                color="#fdde52"
                @click="searchByCoordinates()"
              >TÌM KIẾM</v-btn>
            </v-col>
          </div>
        </div>
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
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url('http://thicongnhadanang.com/uploads/image/images/thiet%20ke%20can%20ho%20mini-dep-da-nang%20(2).jpg');
  background-position: center; */
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
.banner .v-list {
  height: 130px;
  overflow-y: auto;
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Banner',
  data: () => ({
    showMoreFacilities: false,
    showMoreAround: false,
    advanceSearch: false,
    disabled: false,
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
      searchLikeFilter: 'renter/filterResult/filterSearchByCoordinatorResult',
      getAllFacilities: 'renter/filterResult/getAllFacilities',
      getAllCategories: 'renter/filterResult/getAllCategories',
      getAllSchools: 'renter/filterResult/getAllSchools',
      getAllProvinces: 'renter/filterResult/getAllProvinces',
    }),
    setPlace(place) {
      this.currentPlace = place;
      this.searchValue = place.formatted_address;
      this.address = `${place.name}-${place.formatted_address}`;
      this.coordinator.address = `${place.name}-${place.formatted_address}`;
      this.filter.coordinator.address = `${place.name}-${place.formatted_address}`;
      this.filter.coordinator.latitude = place.geometry.location.lat();
      this.filter.coordinator.longitude = place.geometry.location.lng();
    },
    changeSearchValue() {
      this.visibleProperty = 'visible';
    },
    checkSearchValue() {},
    clearField() {
      this.searchValue = '';
      this.address = '';
      this.coordinator.address = '';
      this.visibleProperty = 'hidden';
      this.currentPlace = null;
      this.filter.coordinator.address = '';
      this.filter.coordinator.latitude = '';
      this.filter.coordinator.longitude = '';
    },
    changeMaxPrice() {
      if (this.filter.price.max < 50) this.filter.price.max += 5;
    },
    searchByCoordinates() {
      console.log('vao');
      if (this.currentPlace || this.filter.coordinator.address) {
        console.log('nua');
        console.log(this.filter.coordinator);
        if (this.advanceSearch) {
          console.log(this.filter);
          this.searchLikeFilter({
            filterProperties: this.filter,
          });
        } else {
          this.filter.price.disable = this.disabled;
          this.searchByCoordinator({
            lat: this.filter.coordinator.latitude,
            long: this.filter.coordinator.longitude,
          });
        }
        this.setSearchValue(this.coordinates);
        this.coordinator.latitude = this.filter.coordinator.latitude.lat;
        this.coordinator.longitude = this.filter.coordinator.latitude.lng;
        this.nameAddress = this.searchValue.split('-');
        this.isSearchOptional = true;
        this.$router.push('/filter');
      }
      console.log(this.filter);
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
      // this.changeSearchValue();
      return this.$store.state.renter.filterResult.filter;
    },
    facilities() {
      return this.$store.state.renter.filterResult.filter.facility.data;
    },
    schools() {
      return this.$store.state.renter.filterResult.filter.schools.items;
    },
    coordinator() {
      return this.$store.state.renter.filterResult.coordinator;
    },
    categories() {
      return this.$store.state.renter.filterResult.filter.categories.data;
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
    computedClearable() {
      return this.visibleProperty;
    },
  },
  created() {
    this.isSearchOptional = true;
    if (this.facilities.length === 0) {
      this.getAllFacilities();
    }
    if (this.categories.length === 0) {
      this.getAllCategories();
    }
    if (this.filter.schools.items.length === 0) {
      this.getAllSchools();
    }
    if (this.filter.hometown.items.length === 0) {
      this.getAllProvinces();
    }
  },
  destroyed() {
    this.isSearchOptional = false;
  },
};
</script>
