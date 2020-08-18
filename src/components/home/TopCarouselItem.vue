<template>
  <v-card class="ml-5 mr-5">
    <v-img
      :src="type.typeImages[0].resourceUrl"
      v-if="type.typeImages.length !== 0"
      style="height: 180px;"
    >
      <div class="category">
        <!-- eslint-disable max-len -->
        <span class="font-weight-bold text-body-1 yellow--text"
          >{{ type.price }} {{ type.priceUnit }}</span
        >
        <br />
        <span class="text-caption">{{ type.view }} lượt xem</span>
      </div>
      <div class="arrow-price">
        <span class="transition-swing text-caption">{{ type.category.categoryName }}</span>
      </div>
    </v-img>
    <v-img style="height: 180px;" src="@/assets/image-error.png" v-else>
      <div class="category">
        <!-- eslint-disable max-len -->
        <span class="font-weight-bold text-body-1 yellow--text"
          >{{ type.price }} {{ type.priceUnit }}</span
        >
        <br />
        <span class="text-caption">{{ type.view }} lượt xem</span>
      </div>
      <div class="arrow-price">
        <span class="transition-swing text-caption">{{ type.category.categoryName }}</span>
      </div>
    </v-img>
    <v-divider class="mx-4" />
    <v-row class="d-flex align-center justify-center">
      <v-col cols="10 pt-0">
        <div class="type-name d-flex align-center py-3" style="height: 60px;">
          <p
            style="
              display: block;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            "
            class="font-weight-bold mb-0"
          >
            {{ type.title }}
          </p>
        </div>
        <div class="mt-3 d-flex align-center" style="height: 30px;">
          <v-img
            class="shrink mr-3"
            src="@/assets/home/address.png"
            transition="scale-transition"
            max-width="20px"
            max-height="20px"
          />
          <span class="item-text" v-if="!isLoadingProvinces">
            {{ group.street }}, {{ ward.wardName }}, {{ district.districtName }},
            {{ province.provinceName }}
          </span>
        </div>
        <div class="mt-3 d-flex align-center">
          <v-img
            class="shrink mr-2"
            src="@/assets/home/distance.png"
            transition="scale-transition"
            max-width="25px"
            max-height="25px"
          />
          <span class="blue--text">BigC:</span>
          <span class="item-text item-text-detail ml-auto">300 m</span>
        </div>
        <div class="mt-3 d-flex align-center">
          <v-img
            class="shrink mr-5"
            src="@/assets/home/superficies.svg"
            transition="scale-transition"
            max-width="15px"
            max-height="15px"
          />
          <span class="item-title font-weight-black">DIỆN TÍCH</span>
          <span class="item-text ml-auto">{{ type.superficiality }}m2</span>
        </div>
        <div class="mt-3 d-flex align-center">
          <v-img
            class="shrink mr-5"
            src="@/assets/home/people.png"
            transition="scale-transition"
            max-width="15"
            max-height="15"
          />
          <span class="item-title font-weight-black">SỨC CHỨA</span>
          <span class="item-text ml-auto">{{ type.capacity }} người</span>
        </div>
        <v-card-actions class="px-0 mt-3" md="auto">
          <!-- eslint-disable -->
          <v-btn color="#484848" class="btnDetail pl-3 pr-3" :to="'/detail/' + type.typeId"
            >CHI TIẾT</v-btn
          >
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'TopCarouselItem',
  props: {
    type: Object,
  },
  computed: {
    isLoadingProvinces() {
      return this.$store.state.renter.common.provinces.isLoading;
    },
    group: {
      get() {
        const id = this.type.groupId;
        return this.$store.getters['renter/home/getTopViewHostelGroupById'](id);
      },
    },
    ward() {
      const { wardId } = this.group;
      const res = this.$store.getters['renter/common/getWardById'](wardId);
      return res;
    },
    district() {
      const { wardId } = this.group;
      return this.$store.getters['renter/common/getDistrictByWardId'](wardId);
    },
    province() {
      const { districtId } = this.district;
      return this.$store.getters['renter/common/getProvinceByDistrictId'](districtId);
    },
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
    }),
  },
  created() {
    this.getProvinces();
  },
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
  border-bottom-left-radius: 24px;
  box-sizing: border-box;
}
.arrow-price {
  background-image: linear-gradient(to right, rgba(216, 36, 96, 0.6), #d82460);
  background-image: linear-gradient(to right, rgba(52, 203, 247, 0.71), #1c63b8);
  color: #fff;
  padding: 4px 10px;
  position: absolute;
  bottom: 0;
  right: -1px;
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
  color: #3476b2;
  font-size: 16.5px;
}
.item-title {
  color: #838e9d;
  font-size: 13px;
  font-weight: normal;
  font-family: 'Lato';
}
.item-text {
  color: #656565;
  font-size: 14px;
  font-weight: normal;
  font-family: 'Lato';
}
.item-text-detail {
  color: #3357b4 !important;
}
.btnDetail {
  font-size: 13px;
  color: #fff;
  font-family: 'Nunito';
  width: 100%;
}
.v-btn:hover {
  background-color: #6c98c6 !important;
}
</style>
