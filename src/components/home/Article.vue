<template>
  <v-card class="mx-auto" :width="responsive.article.width" :to="'/detail/' + type.typeId">
    <v-row class="mr-0 ml-0">
      <!-- eslint-disable -->
      <v-col
        cols="12"
        class="d-flex flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column item-classic item-classic-horizontal"
      >
        <!-- eslint-enable -->
        <v-col cols="12" class="item-classic-inner d-flex justify-start">
          <v-col cols="5" class="item-classic-left left">
            <div class="item-classic-media">
              <v-img
                :src="type.typeImages[0].resourceUrl"
                v-if="type.typeImages.length !== 0"
                style="height:180px"
                class="image-box"
              >
                <div class="top">
                  Top
                  <v-icon right color="white">{{numberIcons[index-1]}}</v-icon>
                </div>
              </v-img>
              <div class="item-classic-price">
                <span>{{type.price}} {{type.priceUnit}}</span>
              </div>
            </div>
          </v-col>
          <v-col cols="7" class="right no-padding d-flex">
            <v-col cols="12" class="px-5 py-0">
              <span
                class="item-address"
                v-if="!isLoadingProvinces"
                style="display: block; display: -webkit-box;-webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;overflow: hidden; text-overflow: ellipsis;"
              >
                {{group.street}},
                {{ward.wardName}},
                {{district.districtName}},
                {{province.provinceName}}
              </span>
              <div class="type-name mt-2" style="height: 40px">
                <p
                  style="display: block; display: -webkit-box;-webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;overflow: hidden; text-overflow: ellipsis;"
                  class="font-weight-bold mb-0"
                >{{type.title}}</p>
              </div>
              <div class="align-center justify-center">
                <div class="mt-3 d-flex align-center">
                  <v-img
                    src="@/assets/home/superficies.svg"
                    transition="scale-transition"
                    class="shrink mr-3"
                    max-width="15"
                    max-height="15"
                  />
                  <span class="item-text">
                    {{type.superficiality}}
                    m
                    <sup>2</sup>
                  </span>
                  <div class="ml-auto d-flex justify-center align-center">
                    <v-img
                      src="@/assets/home/people.png"
                      transition="scale-transition"
                      class="shrink mr-3"
                      max-width="15"
                      max-height="15"
                    />
                    <span class="item-text">{{type.capacity}} người</span>
                  </div>
                  <div
                    class="ml-auto d-flex align-center"
                    v-if="type.facilities.filter(f => f.facilityName.includes('WC')).length !== 0"
                  >
                    <v-img
                      src="@/assets/home/toilet.png"
                      transition="scale-transition"
                      class="shrink mr-3"
                      max-width="15"
                      max-height="15"
                    />
                    <span class="item-text">
                      <!-- eslint-enable -->
                      {{type.facilities.filter(f => f.facilityName.includes("WC"))[0].facilityName}}
                    </span>
                  </div>
                </div>
                <!-- <p
                  style="font-family: 'Nunito', Helvetica, Arial, sans-serif;
                  color: #656565;
                  font-size: 12px;"
                  class="align-self-center"
                >Diện tích</p>-->
              </div>
              <!-- <div class="mt-3 d-flex align-center">
                <v-img
                  class="shrink mr-5"
                  src="@/assets/home/energy.png"
                  transition="scale-transition"
                  max-width="20"
                  max-height="20"
                />
                <span class="item-text">{{services.find(s=> s.name === "điện").price}}</span>
                <div class="ml-auto d-flex">
                  <v-img
                    class="shrink mr-4 ml-auto"
                    src="@/assets/home/water.png"
                    transition="scale-transition"
                    max-width="25"
                    max-height="25"
                  />
                  <span class="item-text">50k/người</span>
                </div>
                <div class="ml-auto d-flex">
                  <v-img
                    class="shrink mr-4 ml-auto"
                    src="@/assets/home/wifi.png"
                    transition="scale-transition"
                    max-width="25"
                    max-height="25"
                  />
                </div>
              </div>-->
              <div class="mt-3 d-flex align-center">
                <span class="item-text" style="color: #656565">Giới nghiêm:</span>
                <div class="d-flex ml-1 left">
                  <span class="item-text" v-if="group.curfewTime === null">Giờ giấc tự do</span>
                  <span class="item-text">{{group.curfewTime}}</span>
                </div>
                <div class="ml-auto d-flex">
                  <span class="item-text" v-if="group.ownerJoin == false">Không chung chủ</span>
                  <span class="item-text" v-else>Chung chủ</span>
                </div>
              </div>
            </v-col>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped>
.item-classic {
  position: relative;
  overflow: hidden !important;
  z-index: 1;
  letter-spacing: 0;
  transition: 0.15s ease-out all;
  backface-visibility: hidden;
}
.v-card:hover {
  box-shadow: 0 0 29px 0 rgba(0, 0, 0, 0.16) !important;
}
.item-classic-horizontal {
  padding: 0;
  box-shadow: none;
  overflow: visible !important;
  text-align: left;
}
.item-classic-horizontal .item-classic-inner {
  position: relative;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  padding-left: 10px !important;
}
.item-classic-left {
  display: flex;
  flex-shrink: 0;
  padding: 0;
}
.no-padding {
  padding: 0 !important;
}
.item-classic-price {
  left: 0 !important;
  top: 28px;
  bottom: auto !important;
  z-index: 100;
  position: absolute;
  padding: 2px 21px 2px 11px;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  background-image: linear-gradient(to right, rgba(52, 203, 247), #1c63b8);
}
.item-classic-price::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 8px 0;
  border-color: transparent #367dc3 transparent transparent;
}
.item-classic-media {
  position: relative;
  padding-left: 7px;
  overflow: hidden;
  padding-right: 20px;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.14),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}
.v-img {
  background-size: contain, cover !important;
}

.item-equipment {
  background-color: #e7e9f0;
}
.top {
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
.equipment-name {
  /* #656565 */
  color: #0d0d0d;
  font-size: 15px;
  font-family: 'Lato';
  font-weight: normal;
  min-height: 15px;
  line-height: 15px;
}
.type-name {
  border-bottom: 1px solid #e2e6ed;
  padding-bottom: 10px;
  color: #3476b2;
  font-size: 16.5px;
}
.item-text {
  /* color: #656565; */
  color: #000;
  font-size: 15px;
  font-weight: normal;
  font-family: 'Lato';
}
.item-address {
  color: #9a9a9a;
  font-size: 13px;
}
.btnDetail {
  font-size: 13px;
  color: #fff;
  padding: 0 0 30px 30px;
  font-family: 'Nunito';
}
.v-btn:hover {
  background-color: #6c98c6 !important;
}
.image-box {
  transition: all 3s;
  /* height: 100%; */
  transform: scale(1);
}
.image-box:hover {
  transform: scale(1.3);
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Article',
  props: {
    index: Number,
    type: Object,
  },
  data: () => ({
    numberIcons: [
      'mdi-numeric-1-circle-outline',
      'mdi-numeric-2-circle-outline',
      'mdi-numeric-3-circle-outline',
      'mdi-numeric-4-circle-outline',
      'mdi-numeric-5-circle-outline',
    ],
  }),
  created() {
    this.getProvinces();
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
    }),
  },
  computed: {
    isLoadingProvinces() {
      return this.$store.state.renter.common.provinces.isLoading;
    },
    services() {
      return this.type.services.map((s) => ({
        name: s.service.serviceName,
        price: `${s.servicePrice} ${s.priceUnit}/${s.userUnit}`,
      }));
    },
    facilities() {
      return this.type.facilities.map((f) => ({
        name: f.facilityName,
      }));
    },
    res() {
      return this.$vuetify.breakpoint.name;
    },
    responsive: {
      get() {
        const breakpoint = this.$vuetify.breakpoint.name;
        switch (breakpoint) {
          case 'xs':
          case 'sm':
          case 'md':
            return {
              image: {
                height: 300,
                width: '100%',
              },
              article: {
                width: 390,
              },
            };
          // case 'lg': return {};
          // case 'xl': return {};
          default:
            return {
              image: {
                height: 300,
                width: 300,
              },
              article: {
                width: '100%',
              },
            };
        }
      },
    },
    group: {
      get() {
        const id = this.type.groupId;
        let data = this.$store.getters['renter/home/getHostelGroupById'](id);
        if (!data) {
          data = this.$store.getters['renter/filterResult/getHostelGroupById'](
            id,
          );
        }
        return data;
      },
    },
    ward() {
      const { wardId } = this.group;
      return this.$store.getters['renter/common/getWardById'](wardId);
    },
    district() {
      const { wardId } = this.group;
      return this.$store.getters['renter/common/getDistrictByWardId'](wardId);
    },
    province() {
      const { districtId } = this.district;
      return this.$store.getters['renter/common/getProvinceByDistrictId'](
        districtId,
      );
    },
  },
};
</script>
