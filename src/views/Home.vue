<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Banner/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center">
          <div class="line-blue"></div>
          <p class="blue--text text-h6 font-weight-medium">Lượt Xem Nhiều Nhất</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TopCarousel/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center">
          <div class="line-blue"></div>
          <p class="blue--text text-h6 font-weight-medium">Các Phòng Được Đề Xuất Tốt Nhất</p>
        </div>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <v-sheet light class="px-6 pt-6">
              <v-combobox
                v-model="roomType.select"
                :items="roomType.items"
                light
                outlined
                dense
                label="Loại phòng"
                class=""
                :style="'width: 300px'">
              </v-combobox>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <ArticleList/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <HostelFilter/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
</style>
<script>
import Banner from '../components/home/Banner.vue';
import TopCarousel from '../components/home/TopCarousel.vue';
import ArticleList from '../components/home/ArticleList.vue';
import HostelFilter from '../components/home/Filter.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    TopCarousel,
    ArticleList,
    HostelFilter,
  },
  data: () => ({
    roomType: {
      select: ['Phòng trọ'],
      items: ['Phòng trọ', 'Ký túc xá', 'Nhà nguyên căn'],
    },
  }),
  methods: {},
};
</script>
