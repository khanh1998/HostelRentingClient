<template>
  <v-row no-gutters class="d-flex justify-center white">
    <v-col cols="12" md="11">
      <!-- <v-overlay :value="(isLoading && isLoadingProvinces)" absolute> -->
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-container v-if="!isLoading">
        <v-dialog width="400" v-model="chatBox.show">
          <chatBox v-if="renter" v-on:close="chatBox.show = false" :info="info" :group="group" />
          <v-card v-if="!renter">
            <v-card-title>Đăng nhập để nhắn tin</v-card-title>
            <v-card-actions>
              <v-btn :to="registerRouteObject" dark class="green lighten-3">
                <v-icon>create</v-icon>Tạo tài khoản mới
              </v-btn>
              <v-spacer />
              <v-btn :to="loginRouteObject" dark class="blue lighten-3">
                <v-icon>login</v-icon>Đăng nhập
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row no-gutters>
          <!-- eslint-disable max-len -->
          <v-col cols="12" md="8">
            <div class="d-flex flex-column justify-sm-center">
              <h2
                class="font-weight-bold font-nunito"
                :style="{color: '#656565',fontSize: '28px'}"
              >{{ info.title }}</h2>
              <span
                class="text-body-2"
                style="color: #9a9a9a; font-family: 'Lato' !important;"
              >{{ group.address.streetName }}, {{group.address.districtName}}, {{group.address.provinceName}}</span>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="pl-10">
            <div class="d-flex flex-column justify-end">
              <span
                class="font-weight-medium text-h5 blue--text text-center"
              >{{ info.price }} {{ info.priceUnit }}/tháng</span>
              <div class="d-flex rounded-0 d-flex justify-space-between mt-3 px-10">
                <div>
                  <div class="d-flex justify-center align-center">
                    <v-img
                      src="@/assets/home/superficies.svg"
                      transition="scale-transition"
                      class="shrink mr-2"
                      max-width="25"
                      max-height="25"
                    />
                    <span class="text-body-1" style="color: #444">
                      {{ info.superficiality }}m
                      <sup>2</sup>
                    </span>
                  </div>
                  <span class="text-caption" style="color: #555;">Diện tích</span>
                </div>
                <div>
                  <div class="d-flex justify-center align-center">
                    <v-img
                      src="@/assets/home/people.png"
                      transition="scale-transition"
                      class="shrink"
                      max-width="25"
                      max-height="25"
                    />
                    <span class="text-body-1 ml-2" style="color: #444">{{ info.capacity }} người</span>
                  </div>
                  <span
                    class="text-caption ml-auto"
                    style="color: #555"
                    :style="{float: 'right'}"
                  >Sức chứa</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8" md="8" lg="8">
            <v-carousel
              cycle
              height="400"
              delimiter-icon="mdi-circle-medium"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item v-for="(image, i) in images" :key="i" :src="images[i]">
                <div class="category">
                  <!-- eslint-disable max-len -->
                  <span
                    class="font-weight-bold text-body-1 yellow--text"
                  >{{ info.category.categoryName }}</span>
                  <br />
                  <span class="text-caption">{{ info.view }} lượt xem</span>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="4" class="pl-10">
            <dateTimePickerBox
              :name="group.groupName"
              :avatar="group.imgUrl"
              :rating="{ average: 3.5, total: 30 }"
              :groupId="group.groupId"
              :typeId="info.typeId"
              :vendorId="group.vendorId"
              v-on:openMessage="chatBox.show = true"
            />
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col cols="12" md="4">
            <span
              class="text-subtitle-1 font-nunito font-weight-bold"
              :style="{color: '#484848'}"
            >TIỆN ÍCH</span>
            <div class="d-flex mt-3" :style="{width: '100%'}">
              <div class="line-after" :style="{width: '30%'}"></div>
              <div class="line-before" :style="{width: '90%'}"></div>
            </div>
            <facilitiesBox :facilities="info.facilities" />
          </v-col>
          <v-col cols="12" md="4">
            <servicesBox :services="info.services" />
          </v-col>
          <!-- tien nghi xung quanh -->
          <v-col cols="12" md="4" class="pl-10">
            <span
              class="text-subtitle-1 font-nunito font-weight-bold"
              :style="{color: '#484848'}"
            >TIỆN NGHI XUNG QUANH</span>
            <div class="d-flex mt-3" :style="{width: '100%'}">
              <div class="line-after" :style="{width: '30%'}"></div>
              <div class="line-before" :style="{width: '90%'}"></div>
            </div>
            <!-- <v-btn color="success" class="ml-1" depressed tile>
                  <v-icon small>fas fa-map-signs</v-icon>Bản đồ
            </v-btn>-->
            <treeView />
          </v-col>
        </v-row>
        <v-row v-if="!isLoadingProvinces" class="mt-5">
          <v-col cols="12" md="8">
            <span
              class="text-subtitle-1 font-nunito font-weight-bold"
              :style="{color: '#484848'}"
            >GIÁ TRUNG BÌNH</span>
            <div class="d-flex mt-3" :style="{width: '100%'}">
              <div class="line-after" :style="{width: '15%'}" />
              <div class="line-before" :style="{width: '85%'}" />
            </div>
            <v-row class="d-flex flex-wrap mx-0 font-nunito text-subtitle-2">
              <v-col cols="6">
                <div class="average-item d-flex align-center">
                  <v-col cols="7" class="d-flex average-infor">{{ district.districtName }}</v-col>
                  <span class="font-weight-bold mx-auto">{{ wardAverage.price }} triệu / tháng</span>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="average-item d-flex align-center">
                  <v-col cols="7" class="d-flex average-infor">{{ ward.wardName }}</v-col>
                  <span class="font-weight-bold mx-auto">{{ districtAverage.price }} triệu / tháng</span>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="average-item d-flex align-center">
                  <v-col cols="7" class="d-flex average-infor">{{ group.address.streetName }}</v-col>
                  <span class="font-weight-bold mx-auto">{{ streetAverage.price }} triệu / tháng</span>
                </div>
              </v-col>
              <v-col cols="6">
                <v-btn
                  class="align-end font-weight-medium"
                  text
                  _height="100%"
                  color="primary"
                  :to="`/discovery/${this.district.districtId}`"
                >
                  Xem thêm
                  <v-icon>double_arrow</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="12" md="8">
            <span
              class="text-subtitle-1 font-nunito font-weight-bold"
              :style="{color: '#484848'}"
            >ĐÁNH GIÁ PHÒNG TRỌ</span>
            <div class="d-flex mt-3" :style="{width: '100%'}">
              <div class="line-after" :style="{width: '15%'}" />
              <div class="line-before" :style="{width: '85%'}" />
            </div>
            <ratingBox class="mt-5" :rating="{ average: 3.5, total: 30 }" />
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="12" md="8">
            <div class="d-flex">
              <span
                class="text-subtitle-1 font-nunito font-weight-bold"
                :style="{color: '#484848'}"
              >CÓ THỂ BẠN SẼ THÍCH</span>
              <v-btn
                class="align-end font-weight-medium ml-auto"
                text
                height="100%"
                color="primary"
                _:to="`/discovery/${this.district.districtId}`"
              >
                Xem thêm
                <!-- <v-icon>double_arrow</v-icon> -->
              </v-btn>
            </div>
            <div class="d-flex mt-3" :style="{width: '100%'}">
              <div class="line-after" :style="{width: '15%'}" />
              <div class="line-before" :style="{width: '85%'}" />
            </div>
            <SuggestionList :list="topView" class="mt-5" />
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="12" md="12">
            <div class="d-flex">
              <span
                class="text-subtitle-1 font-nunito font-weight-bold"
                :style="{color: '#484848'}"
              >
                CÁC LOẠI PHÒNG KHÁC CỦA
                <span class="text-uppercase">{{group.groupName}}</span>
              </span>
              <v-btn
                class="align-end font-weight-medium ml-auto"
                text
                height="100%"
                color="primary"
                _:to="`/discovery/${this.district.districtId}`"
              >
                Xem thêm
                <!-- <v-icon>double_arrow</v-icon> -->
              </v-btn>
            </div>
            <div class="d-flex mt-3" :style="{width: '100%'}">
              <div class="line-after" :style="{width: '15%'}" />
              <div class="line-before" :style="{width: '85%'}" />
            </div>
            <GroupHostelTypes :list="topView" class="mt-5" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import dateTimePickerBox from '@/components/hostel_type/dateTimePickerBox.vue';
import treeView from '@/components/hostel_type/treeView.vue';
import chatBox from '@/components/hostel_type/chatBox.vue';
import { mapActions, mapGetters } from 'vuex';
import facilitiesBox from '../../components/hostel_type/facilitiesBox.vue';
import servicesBox from '../../components/hostel_type/servicesBox.vue';
import ratingBox from '../../components/hostel_type/ratingBox.vue';
import SuggestionList from '../../components/hostel_type/SuggestionList.vue';
import GroupHostelTypes from '../../components/hostel_type/GroupHostelTypes.vue';

export default {
  name: ' ',
  components: {
    dateTimePickerBox,
    servicesBox,
    treeView,
    chatBox,
    facilitiesBox,
    ratingBox,
    SuggestionList,
    GroupHostelTypes,
  },
  data: () => ({
    chatBox: {
      show: false,
    },
  }),
  methods: {
    ...mapActions({
      getTypeAndGroup: 'renter/hostelType/getTypeAndGroup',
      getProvinces: 'renter/common/getProvinces',
      getStreetStats: 'renter/discovery/getStreetStats',
      getTopView: 'renter/home/getTopViewHostelTypes',
    }),
  },
  computed: {
    ...mapGetters({
      getAverage: 'renter/discovery/getAverage',
    }),
    typeId() {
      return this.$route.params.typeId;
    },
    ward() {
      const res = this.$store.getters['renter/common/getWardByStreetId'](
        this.group.address.streetId,
      );
      return res;
    },
    district() {
      const { wardId } = this.ward;
      return this.$store.getters['renter/common/getDistrictByWardId'](wardId);
    },
    allStreetIds() {
      const { wards } = this.district;
      const streets = wards.map((ward) => ward.streets);
      const streetIds = streets.flat().map((street) => street.streetId);
      return streetIds;
    },
    districtAverage() {
      return this.getAverage(this.allStreetIds);
    },
    wardAverage() {
      const { streets } = this.ward;
      const streetIds = streets.map((street) => street.streetId);
      return this.getAverage(streetIds);
    },
    streetAverage() {
      const { streetId } = this.group;
      return this.getAverage([streetId]);
    },
    province() {
      const { districtId } = this.district;
      return this.$store.getters['renter/common/getProvinceByDistrictId'](districtId);
    },
    topView: {
      get() {
        return this.$store.state.renter.home.topView.data;
      },
    },
    images: {
      get() {
        if (this.info) {
          return this.info.typeImages.map((item) => item.resourceUrl);
        }
        return [];
      },
    },
    hostelTypes: {
      get() {
        return this.$store.state.renter.home.hostelTypes.data;
      },
    },
    isLoading() {
      const type = this.$store.state.renter.hostelType.hostelType.isLoading;
      const group = this.$store.state.renter.hostelType.hostelGroup.isLoading;
      const street = this.$store.state.renter.discovery.stats.streets.isLoading;
      const suggestionList = this.$store.state.renter.home.topView.isLoading;
      return (type || group || street) && suggestionList;
    },
    isLoadingProvinces() {
      return this.$store.state.renter.common.provinces.isLoading;
    },
    info() {
      let data = this.$store.getters['renter/home/getHostelTypeById'](this.typeId);
      if (data === null) {
        data = this.$store.state.renter.hostelType.hostelType.data;
      }
      return data;
    },
    group() {
      let data = null;
      if (this.info != null) {
        const { groupId } = this.info;
        data = this.$store.getters['renter/home/getHostelGroupById'](groupId);
      }
      if (data === null) {
        data = this.$store.state.renter.hostelType.hostelGroup.data;
      }
      return data;
    },
    renter() {
      return this.$store.state.user.user.data;
    },
    loginRouteObject() {
      return {
        name: 'Login',
        params: {
          preUrl: this.$route.path,
        },
      };
    },
    registerRouteObject() {
      return {
        name: 'Register',
        params: {
          preUrl: this.$route,
        },
      };
    },
  },
  created() {
    this.getTypeAndGroup(this.typeId); // if home.js store is empty then start to call api
    this.getProvinces().then(() => this.getStreetStats(this.allStreetIds));
    if (this.topView.length === 0) {
      this.getTopView({ size: 10 });
    }
  },
};
</script>
<style scoped>
.info-card {
  width: 100%;
  height: 100%;
  border: 2.5px solid #edefee;
  box-sizing: border-box;
  border-radius: 10px;
}
.above {
  width: 100%;
}
.below {
  width: 100%;
  background: #f3f5f5;
  /* background: #f7f7f7; */
}
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
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
  border-bottom-left-radius: 24px;
  box-sizing: border-box;
}
.line-before {
  height: 2px;
  background-color: #eee;
}
.line-after {
  height: 2px;
  background-color: #2c92d5;
}
.average-item {
  border: solid 1px #eeeeee;
}
.average-infor {
  background-color: #eeeeee;
}
</style>
<style>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
