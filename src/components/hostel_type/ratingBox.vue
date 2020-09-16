<template>
  <div>
    <!-- eslint-disable max-len -->
    <div class="d-flex" style="border: 1px solid #ccc !important; background: #f7f7f7 !important">
      <v-col cols="3" class="flex justify-center">
        <span class="text-h5 font-nunito font-weight-bold" :style="{ color: '#F9A825' }">
          {{ rating.average }}
          <span class="text-subtitle-1 font-weight-regular">trên 5</span>
        </span>
        <v-rating
          v-model="rating.average"
          color="yellow darken-3"
          background-color="grey darken-1"
          _empty-icon="$ratingFull"
          half-increments
          small
          class="px-0 rating"
        ></v-rating>
        <span class="text-body-2 font-nunito gray--text">({{ rating.total }} đánh giá)</span>
      </v-col>
      <v-col cols="9" class="d-flexd-flex flex-wrap">
        <v-btn small class="ma-2 font-weight-bold" tile color="primary">Tất cả</v-btn>
        <v-btn small class="ma-2 font-weight-bold" tile outlined color="primary">5 sao (20)</v-btn>
        <v-btn small class="ma-2 font-weight-bold" tile outlined color="primary">4 sao (3)</v-btn>
        <v-btn small class="ma-2 font-weight-bold" tile outlined color="primary">3 sao (3)</v-btn>
        <v-btn small class="ma-2 font-weight-bold" tile outlined color="primary">2 sao (3)</v-btn>
        <v-btn small class="ma-2 font-weight-bold" tile outlined color="primary">1 sao (1)</v-btn>
        <v-btn small class="ma-2 font-weight-bold" tile outlined color="primary"
          >Có bình luận (12)</v-btn
        >
        <v-btn small class="ma-2 font-weight-bold" tile outlined color="primary"
          >Có hình ảnh / video (10)</v-btn
        >
      </v-col>
    </div>
    <ratingItem class="py-3" />
    <ratingItem class="py-3" />
    <ratingItem class="py-3" />
    <ratingItem class="py-3" />
    <v-row class="d-flex mt-5">
      <v-pagination
        class="ml-auto"
        v-model="page"
        :length="4"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-row>
  </div>
</template>
<script>
import ratingItem from './ratingItem.vue';

export default {
  name: 'RatingBox',
  components: { ratingItem },
  data: () => ({
    page: 1,
  }),
  props: {
    rating: Object,
  },
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
<style>
.v-application--is-ltr .v-rating .v-icon {
  transform: scaleX(1);
  padding: 0;
}
</style>
