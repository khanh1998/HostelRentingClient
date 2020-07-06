<template>
  <vueper-slides
    class="no-shadow"
    fractions
    bulletsOutside
    transition-speed="250"
    infinite
    pauseOnHover
    autoplay
    slide
    :breakpoints="breakpoints"
  >
    <template v-slot:arrow-left>
      <v-btn icon light large fab>
        <v-icon light>fas fa-chevron-left</v-icon>
      </v-btn>
    </template>

    <template v-slot:arrow-right>
      <v-btn icon light large fab>
        <v-icon light>fas fa-chevron-right</v-icon>
      </v-btn>
    </template>
    <vueper-slide v-for="i in 9" :key="i">
      <template v-slot:content>
        <TopCarouselItem :imgUrl="images[i%3]" :i="i" />
      </template>
    </vueper-slide>
  </vueper-slides>
</template>
<style scoped>
.line-blue {
  width: 150px;
  border: 2px solid #6c98c6;
  margin-bottom: 30px;
}
</style>
<script>
import 'vueperslides/dist/vueperslides.css';
import { VueperSlides, VueperSlide } from 'vueperslides';
import TopCarouselItem from './TopCarouselItem.vue';

export default {
  name: 'TopCarousel',
  components: { VueperSlides, VueperSlide, TopCarouselItem },
  data: () => ({
    images: [
      'https://cafefcdn.com/thumb_w/650/2020/2/13/can20ho20mini207-15815635464611185990805-crop-1581563557061967924017.jpg',
      'https://cafebiz.cafebizcdn.vn/thumb_w/600/2020/2/13/8089c20df331176f4e2088eca6e8692e446da5ee74cf9690ac8f1024x1024-1581505343931414861121-crop-1581505355563750746684-15815581031811841714750-crop-158155810828255785255.jpg',
      'https://img.homedy.com/store/images/2019/06/19/can-ho-mini-gia-re-1-636965585916507395.jpg',
    ],
    breakpoints: {
      1904: {
        arrowsOutside: true,
        visibleSlides: 3,
        gap: 5,
        draggingDistance: 70,
        fixedHeight: '440px',
      },
      1264: {
        arrowsOutside: true,
        visibleSlides: 2,
        gap: 5,
        draggingDistance: 70,
        fixedHeight: '440px',
      },
      960: {
        arrowsOutside: false,
        visibleSlides: 1,
        gap: 5,
        draggingDistance: 70,
        fixedHeight: '440px',
      },
      600: {
        arrowsOutside: false,
        visibleSlides: 1,
        gap: 5,
        draggingDistance: 70,
        fixedHeight: '440px',
      },
    },
  }),
};
</script>
