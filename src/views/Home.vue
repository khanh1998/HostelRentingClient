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
    <v-row class="d-flex">
      <v-col cols="12" lg="8" md="7">
        <v-row>
          <v-col cols="6">
            <v-sheet light class="px-6 pt-6">
              <v-select
                v-model="roomType.select"
                :items="roomType.items"
                light
                outlined
                dense
                label="Loại phòng"
                class=""
                :style="'width: 300px'">
              </v-select>
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet light class="px-6 pt-6" style="height: 100%">
              <v-bottom-sheet v-model="bottomSheet.show" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="green"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Open Persistent
                  </v-btn>
                </template>
                <HostelFilter/>
              </v-bottom-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <ArticleList/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="4" md="5" class="hidden-xs-only">
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
import HostelFilter from '../components/home/HostelFilter.vue';

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
    bottomSheet: {
      show: false,
    },
  }),
  methods: {},
};
</script>
