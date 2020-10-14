<template>
  <div class="px-0">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container fluid v-if="!isLoading" class="px-0">
      <v-row justify="center" style="background-color: #f3f4f9;">
        <v-col cols="12" sm="12" md="10" lg="10" xl="10">
          <div class="d-flex flex-column justify-center align-center topview-lable mt-16">
            <div class="line-blue mb-5"></div>
            <p>Các Phòng Được Đề Xuất Tốt Nhất</p>
          </div>
        </v-col>
        <v-col cols="8" v-if="list.length === 0">
          <v-card>
            <v-card-text>Không tìm thấy kết quả phù hợp</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="d-flex flex-column align-center justify-center">
            <v-card-actions class="hidden-md-and-up">
              <v-bottom-sheet v-model="bottomSheet.show" scrollable>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green" dark v-bind="attrs" v-on="on">Lọc nâng cao</v-btn>
                </template>
                <v-sheet light class="pt-6">
                  <HostelFilter />
                </v-sheet>
              </v-bottom-sheet>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mx-0" justify="center">
        <v-col cols="9" _v-if="list.length !== 0">
          <!-- <v-col cols="9 p-0"> -->
          <v-row class="d-flex flex-direction: row">
            <v-col cols="8">
              <v-row>
                <v-col cols="12">
                  <ArticleList :list="list" />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols="11 ml-auto pt-0 mt-0">
                  <HostelFilter />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="7" xl="8" lg="8" class="mt-10">
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
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import HostelFilter from '../../components/home/HostelFilter.vue';
import ArticleList from '../../components/home/ArticleList.vue';

export default {
  name: 'FilterResult',
  components: { HostelFilter, ArticleList },
  props: ['criteria'],
  data: () => ({
    paging: {
      page: 1,
    },
    bottomSheet: {
      show: false,
    },
  }),
  methods: {
    onFilterSubmit() {
      this.getFilterResult({ page: 1, size: 5 });
      this.bottomSheet.show = false;
    },
    ...mapActions({
      getFilterResult: 'renter/filterResult/getFilterResult',
    }),
    ...mapActions({
      getAllCategories: 'renter/home/getAllCategories',
    }),
    onUpdatePaging(pageNumber) {
      this.getFilterResult({ page: pageNumber, size: 5 });
    },
  },
  computed: {
    isLoading() {
      const facilities = this.$store.state.renter.filterResult.filter.facility.isLoading;
      const result = this.$store.state.renter.filterResult.results.isLoading;
      const categories = this.$store.state.renter.filterResult.filter.categories.isLoading;
      const regulation = this.$store.state.renter.filterResult.filter.regulations.isLoading;
      return facilities || categories || regulation || result;
    },
    isLoadingTopView() {
      return this.$store.state.renter.filterResult.results.isLoading;
    },
    list() {
      return this.$store.state.renter.filterResult.results.data.types;
    },
    categories: {
      get() {
        return this.$store.state.renter.home.categories.data;
      },
    },
    filter() {
      return this.$store.state.renter.filterResult.filter;
    },
  },
  created() {
    if (this.categories.length === 0) {
      this.getAllCategories();
    }
    // console.log(this.$session.get('searchValue'));
  },
};
</script>
