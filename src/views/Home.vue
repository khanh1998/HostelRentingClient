<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Banner/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="10" lg="10" xl="10">
        <div class="d-flex flex-column justify-center align-center">
          <div class="line-blue"></div>
          <p class="blue--text text-h6 font-weight-medium">Lượt Xem Nhiều Nhất</p>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="10" lg="10" xl="10">
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
          <v-col cols="6" sm="6" md="12" lg="12" xl="12">
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
          <v-col cols="6" sm="6" md="0" lg="0" xl="0" class="hidden-md-and-up">
            <v-sheet style="height: 100%">
              <v-bottom-sheet v-model="bottomSheet.show" scrollable>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="green"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="mt-6 ml-6"
                  >
                    Bộ lọc
                  </v-btn>
                </template>
                <v-sheet light class="pt-6">
                  <HostelFilter/>
                </v-sheet>
              </v-bottom-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <ArticleList :list="hostelTypes"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="4" md="5" class="hidden-sm-and-down">
        <v-row>
          <v-col cols="12">
            <v-sheet>
              <p class="text-h6 pt-2 ml-6">Bộ lọc</p>
              <HostelFilter/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="7" xl="8" lg="8">
        <v-pagination
          light
          v-model="paging.page"
          :length="5"
          :total-visible="5"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
</style>
<script>
import { mapActions } from 'vuex';
// import actionName from '../store/modules/home.action_name';
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
    paging: {
      page: 1,
    },
  }),
  methods: {
    ...mapActions({
      getHostelTypes: 'Home/getHostelTypes',
    }),
  },
  async mounted() {
    // this.$store.dispatch(`Home/${actionName.getHostelTypes}`);
    await this.getHostelTypes();
  },
  computed: {
    hostelTypes: {
      get() {
        return this.$store.state.Home.hostelTypes.data;
      },
    },
    isLoading: {
      get() {
        return this.$store.state.Home.hostelTypes.isLoading;
      },
    },
  },
};
</script>
