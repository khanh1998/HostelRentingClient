<template>
  <v-card class="mx-auto" :width="responsive.article.width">
    <v-row class="mr-0 ml-0">
      <v-col cols="12" class="d-flex flex-xl-row flex-lg-row flex-md-column flex-sm-column
      flex-column item-classic item-classic-horizontal">
        <v-col cols="12" class="item-classic-inner d-flex justify-start">
          <v-col cols="4" class="item-classic-left left">
            <div class="item-classic-media">
            <v-img
              _:max-height="responsive.image.height"
              _:max-width="responsive.image.width"
              :src="'https://tiendoduan.org/wp-content/uploads/2020/04/can-ho-mini-25m2.jpg'"
            >
              <div class="top">
                Top
                <v-icon right color="white">{{numberIcons[index-1]}}</v-icon>
              </div>
            </v-img>
            <div class="item-classic-price">
              <span>1.500.000 đ</span>
            </div>
          </div>
          </v-col>
          <v-col cols="8" class="right d-flex align-center justify-center">
            <v-col cols="11">
              <span class="item-address">{{group.street}}</span>
              <div class="type-name">
                <p class="font-weight-bold mb-0">Ký túc xá đại học quốc gia</p>
              </div>
              <div class="mt-3 d-flex align-center">
                <v-img
                  class="shrink mr-5"
                  src="@/assets/home/superficies.svg"
                  transition="scale-transition"
                  max-width="20"
                  max-height="20"
                />
                <span class="item-text">20m2</span>
                <div class="ml-auto d-flex">
                  <v-img
                    class="shrink mr-4 ml-auto"
                    src="@/assets/home/people.png"
                    transition="scale-transition"
                    max-width="25"
                    max-height="25"
                  />
                  <span class="item-text">3 người</span>
                </div>
                <div class="ml-auto d-flex">
                  <v-img
                    class="shrink mr-4 ml-auto"
                    src="@/assets/home/toilet.png"
                    transition="scale-transition"
                    max-width="25"
                    max-height="25"
                  />
                  <span class="item-text">Dùng riêng</span>
                </div>
              </div>
              <div class="mt-3 d-flex align-center">
                <v-img
                  class="shrink mr-5"
                  src="@/assets/home/energy.png"
                  transition="scale-transition"
                  max-width="20"
                  max-height="20"
                />
                <span class="item-text">3k/kwh</span>
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
                  <span class="item-text">50k/phòng</span>
                </div>
              </div>
              <div class="mt-3 d-flex align-center">
                <span class="item-text">Giới nghiêm:</span>
                <div class="ml-auto d-flex left">
                  <span class="item-text">Trước 12h đêm</span>
                </div>
                <div class="ml-auto d-flex">
                  <span class="item-text">Không chung chủ</span>
                </div>
              </div>
              <v-card-actions class="pl-0 mt-3">
                <v-btn color="#484848" class="btnDetail pl-3 pr-3 ml-auto">
                  Chi tiết
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
    <!-- <div class="d-flex flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column
    item-classic item-classic-horizontal">
      <div class="item-classic-inner d-flex"> -->
        <!-- <div class="item-classic-left">
          <div class="item-classic-media">
            <v-img
              :max-height="responsive.image.height"
              :max-width="responsive.image.width"
              :src="'https://tiendoduan.org/wp-content/uploads/2020/04/can-ho-mini-25m2.jpg'"
            >
              <div class="top">
                Top
                <v-icon right color="white">{{numberIcons[index-1]}}</v-icon>
              </div>
            </v-img>
            <div class="item-classic-price">
              <span>1.500.000 đ</span>
            </div>
          </div>
        </div> -->
        <!-- <v-row class="d-flex">
          <v-col cols="10" class="red">
            <div class="item-classic-right pl-5">
              <div class="type-name">
                <p class="font-weight-bold mb-0">Ký túc xá đại học quốc gia</p>
              </div>
          </div>
          </v-col>
        </v-row>
      </div> -->
      <!-- <div class="right d-flex flex-column">
        <div class="d-flex justify-space-center align-center type-name flex-xl-row">
          <v-card-title>{{group.groupName}} - {{type.typeName}}</v-card-title>
          <v-btn outlined :to="'/detail/' + type.typeId">Chi tiết</v-btn>
        </div>
        <v-card-subtitle class="amber--text font-weight-medium"> -->
          <!-- <v-icon>mdi-currency-usd-circle-outline</v-icon>{{type.price}} {{type.priceUnit}} -->
        <!-- </v-card-subtitle>
        <div class="ml-4" style="border: 1px solid #6C98C6; width: 200px"></div>
        <div class="d-flex align-center justify-space-between">
          <span class="mx-2 mt-4">
            <p>
              <v-icon class="mx-2" x-small>fas fa-map-marker-alt</v-icon>{{group.street}}
            </p>
          </span>
        </div>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <span class="mx-2">
            <p class="success--text">
              <v-icon class="mx-2" x-small>fas fa-store</v-icon>Chợ Hoàng Hoa Thám
            </p>
          </span>
          <span class="mx-2">
            <p>
              <v-icon class="mx-2" x-small>fas fa-ruler</v-icon>0.2 Km
            </p>
          </span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-ruler-combined</v-icon>20m2
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-users</v-icon>{{type.capacity}} người
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>mdi-toilet</v-icon>Dùng riêng
          </span>
        </div>
        <div class="d-flex align-center justify-space-between mt-4">
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-bolt</v-icon>3.5k/Kwh
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-tint</v-icon>50k/người
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>mdi-wifi</v-icon>Miễn phí
          </span>
        </div>
        </div>
        </div>
        <div class="d-flex align-center justify-space-between mt-2 ml-2">
          <v-chip-group
            class=""
            center-active
            light
            show-arrows
            mandatory
          >
            <v-chip outlined>
              <v-icon class="mr-2" x-small>mdi-weather-windy</v-icon>May Lanh
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-2" x-small>mdi-fridge</v-icon>Tu Lanh
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-2" x-small>fas fa-motorcycle</v-icon>Cho dau xe
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-2" x-small>mdi-washing-machine</v-icon>May giat
            </v-chip>
          </v-chip-group>
        </div>
      </div> -->
    <div style="background-color: #f3f4f9">
      <div class="ml-2" style="background-color: #e7e9f0;">
        <div class="d-flex align-center justify-space-between ml-2 pt-2 pb-2">
          <v-chip-group
            class=""
            center-active
            light
            show-arrows
            mandatory
          >
            <div class="d-flex align-center pl-7 pr-7">
              <v-img
                class="shrink mr-2"
                src="@/assets/home/air-conditioner.png"
                transition="scale-transition"
                max-width="15"
                max-height="15"
              />
              <span class="equipment-name ml-2">Máy lạnh</span>
            </div>
            <div class="d-flex align-center pl-7 pr-7">
              <v-img
                class="shrink mr-2"
                src="@/assets/home/fridge.png"
                transition="scale-transition"
                max-width="15"
                max-height="15"
              />
              <span class="equipment-name ml-2">Tủ lạnh</span>
            </div>
            <div class="d-flex align-center pl-7 pr-7">
              <v-img
                class="shrink mr-2"
                src="@/assets/home/parking.png"
                transition="scale-transition"
                max-width="15"
                max-height="15"
              />
              <span class="equipment-name ml-2">Chỗ đậu xe</span>
            </div>
            <!-- </v-chip> -->
            <!-- <v-chip>
              <v-icon class="mr-2" x-small>mdi-fridge</v-icon>Tu Lanh
            </v-chip>
            <v-chip>
              <v-icon class="mr-2" x-small>fas fa-motorcycle</v-icon>Cho dau xe
            </v-chip>
            <v-chip>
              <v-icon class="mr-2" x-small>mdi-washing-machine</v-icon>May giat
            </v-chip> -->
          </v-chip-group>
        </div>
      </div>
    </div>
  </v-card>
</template>
<style scoped>
  .item-classic {
    position: relative;
    overflow: hidden !important;
    z-index: 1;
    letter-spacing: 0;
    transition: .15s ease-out all;
    backface-visibility: hidden;
    min-height: 250px;
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
  }
  .item-classic-left {
    display: flex;
    /* width: 100%; */
    flex-shrink: 0;
    /* max-width: 265px; */
    background-color: #f3f4f9;
    padding: 0;
  }
  .v-responsive__sizer {
    padding-bottom: 100% !important;
  }
  .item-classic-price {
    left: 0 !important;
    top: 28px;
    bottom: auto !important;
    z-index: 100;
    position: absolute;
    padding: 2px 21px 2px 11px;
    font-family: "Poppins", sans-serif;
    color: #ffffff;
    background-color: #2170B9;
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
  }
  .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.14),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14),
    0px 0px 0px 0px rgba(0, 0, 0, 0.12);
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
  background:  rgba(32, 112, 185, 0.66);
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
  color: #656565;
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
  background-color: #6C98C6 !important;
}
</style>
<script>
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
  created() {},
  computed: {
    res() {
      return this.$vuetify.breakpoint.name;
    },
    responsive: {
      get() {
        const breakpoint = this.$vuetify.breakpoint.name;
        switch (breakpoint) {
          case 'xs':
          case 'sm':
          case 'md': return {
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
          default: return {
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
          data = this.$store.getters['renter/filterResult/getHostelGroupById'](id);
        }
        return data;
      },
    },
  },
};
</script>
