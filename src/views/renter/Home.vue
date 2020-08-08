<template>
  <div>
    <v-overlay
      :value="(isLoadingTopView && isLoadingTopSuggestion && isLoadingCategories)"
      absolute
    >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container fluid v-if="!(isLoadingTopView || isLoadingTopSuggestion || isLoadingCategories)">
      <v-row>
        <v-col cols="12">
          <Banner />
        </v-col>
      </v-row>
      <v-row justify="center" class="content">
        <v-col cols="12" sm="12" md="10" lg="10" xl="10">
          <div class="d-flex flex-column justify-center align-center topview-lable">
            <div class="line-blue"></div>
            <p>Lượt Xem Nhiều Nhất</p>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="content">
        <v-col cols="10" mt="5">
          <TopCarousel :list="topView" />
        </v-col>
      </v-row>
      <v-row justify="center" class="content">
        <v-col cols="12" sm="12" md="10" lg="10" xl="10">
          <div class="d-flex flex-column justify-center align-center topview-lable">
            <div class="line-blue"></div>
            <p>Các Phòng Được Đề Xuất Tốt Nhất</p>
          </div>
        </v-col>
      </v-row>
      <v-row class="content pt-3">
        <v-col cols="1"></v-col>
        <v-col cols="10 p-0">
          <v-row class="d-flex flex-direction: row px-5">
            <v-col cols="8">
              <v-row>
                <v-col
                  cols="7"
                  sm="7"
                  md="12"
                  lg="12"
                  xl="12"
                  class="pl-5 pr-0 pt-7 pb-7 white d-flex"
                >
                  <v-sheet class="ml-4">
                    <v-select
                      v-bind:items="categories"
                      item-text="categoryName"
                      item-value="categoryName"
                      _v-model="categories[0].categoryName"
                      light
                      outlined
                      hide-details
                      dense
                      label="Loại phòng"
                      class
                      :style="'width: 350px'"
                    ></v-select>
                  </v-sheet>
                  <!-- <v-sheet light>
                    <v-btn
                      outlined
                      class="ml-5"
                      :style="'height: 40px'"
                      @click="overlay = !overlay"
                    >Bộ lọc</v-btn>
                    <v-overlay :value="overlay">
                      <v-btn icon @click="overlay = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <HostelFilter
                        v-on:submitFilter="onFilterSubmit($event)"
                        style="background-color: #fff; border-radius: 5px;"
                      />
                    </v-overlay>
                  </v-sheet>-->
                </v-col>
                <!-- <v-col cols="6" sm="6" md="0" lg="0" xl="0" class="hidden-md-and-up">
                  <v-sheet style="height: 100%">
                    <v-bottom-sheet v-model="bottomSheet.show" scrollable>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="green"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        class="mt-6 ml-6">
                          Bộ lọc
                        </v-btn>
                      </template>
                      <v-sheet light class="pt-6">
                        <HostelFilter v-on:submitFilter="onFilterSubmit($event)" />
                      </v-sheet>
                    </v-bottom-sheet>
                  </v-sheet>
                </v-col>-->
                <v-col cols="12">
                  <ArticleList :list="hostelTypes" />
                </v-col>
              </v-row>
            </v-col>
            <!-- <v-col cols="4" lg="4" md="5" class="hidden-sm-and-down"> -->
            <v-col cols="4">
              <v-row>
                <v-col cols="11 ml-auto pt-0 mt-0">
                  <v-sheet>
                    <p class="text-h6 pt-2 ml-6">Bộ lọc</p>
                    <HostelFilter v-on:submitFilter="onFilterSubmit($event)" />
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
                v-on:input="onUpdatePaging"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.content {
  background-color: #f3f4f9;
}
.col-12 {
  padding: 0;
}
.container {
  padding: 0;
  background: #ffffff;
}
.topview-lable {
  font-size: 25px;
  color: rgba(47, 100, 162, 0.7);
  font-family: Oswald;
  font-weight: 400 !important;
}
.line-blue {
  width: 140px;
  border: 1px solid #6c98c6;
  margin-bottom: 20px;
  margin-bottom: 20px;
  margin-top: 70px;
}
</style>
<script>
import Banner from '@/components/home/Banner.vue';
import TopCarousel from '@/components/home/TopCarousel.vue';
import ArticleList from '@/components/home/ArticleList.vue';
import HostelFilter from '@/components/home/HostelFilter.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Banner,
    TopCarousel,
    ArticleList,
    HostelFilter,
  },
  data: () => ({
    overlay: false,
    roomType: {
      select: 'Phòng trọ',
      items: ['Phòng trọ', 'Ký túc xá', 'Nhà nguyên căn', 'thuy'],
    },
    bottomSheet: {
      show: false,
    },
    paging: {
      page: 1,
    },
    filterCriteria: null,
  }),
  methods: {
    ...mapActions({
      getAllCategories: 'renter/home/getAllCategories',
    }),
    ...mapActions({
      getHostelTypes: 'renter/home/getHostelTypes',
    }),
    ...mapActions({
      getTopView: 'renter/home/getTopViewHostelTypes',
    }),
    ...mapActions({
      getFilterResult: 'renter/filterResult/getFilterResult',
    }),
    onFilterSubmit(data) {
      this.getFilterResult({ page: 1, size: 10 });
      this.$router.push({
        path: '/filter',
        query: {
          ...data,
        },
        params: {
          criteria: 'criteria',
        },
      });
    },
    onUpdatePaging(pageNumber) {
      this.getHostelTypes({ page: pageNumber, size: 5 });
    },
  },
  computed: {
    categories: {
      get() {
        return this.$store.state.renter.home.categories.data;
      },
    },
    hostelTypes: {
      get() {
        return this.$store.state.renter.home.hostelTypes.data;
      },
    },
    topView: {
      get() {
        return this.$store.state.renter.home.topView.data;
      },
    },
    isLoadingTopView: {
      get() {
        return this.$store.state.renter.home.topView.isLoading;
      },
    },
    isLoadingTopSuggestion: {
      get() {
        return this.$store.state.renter.home.hostelTypes.isLoading;
      },
    },
    isLoadingCategories: {
      get() {
        return this.$store.state.renter.home.categories.isLoading;
      },
    },
  },
  created() {
    if (this.categories.length === 0) {
      this.getAllCategories();
    }
    if (this.hostelTypes.length === 0) {
      this.getHostelTypes({ page: 1, size: 5 });
    }
    if (this.topView.length === 0) {
      this.getTopView({ size: 10 });
    }
  },
};
</script>
