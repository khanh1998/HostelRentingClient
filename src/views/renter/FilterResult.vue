<template>
  <div class="px-0">
    <v-overlay :value="(isLoadingTopView && isLoadingCategories)" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container fluid v-if="!(isLoadingTopView || isLoadingCategories)" class="px-0">
      <v-row justify="center" style="background-color: #f3f4f9;">
        <v-col cols="12" sm="12" md="10" lg="10" xl="10">
          <div
            class="d-flex flex-column justify-center align-center"
            style="
              font-size: 25px;
              color: rgba(47, 100, 162, 0.7);
              font-family: Oswald;
              font-weight: 400 !important;
            "
          >
            <div
              style="
                width: 140px;
                border: 1px solid #6c98c6;
                margin-bottom: 20px;
                margin-bottom: 20px;
                margin-top: 70px;
              "
            ></div>
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
        <v-col cols="9 p-0" v-if="list.length !== 0">
          <v-row class="d-flex flex-direction: row">
            <v-col cols="8">
              <v-row>
                <v-col
                  cols="7"
                  sm="7"
                  md="12"
                  lg="12"
                  xl="12"
                  class="pl-5 pr-0 pt-7 pb-7 white d-flex mb-4"
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
                      :style="'width: 350px'"
                    ></v-select>
                  </v-sheet>
                </v-col>
                <v-col cols="12">
                  <ArticleList :list="list" />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols="11 ml-auto pt-0 mt-0">
                  <v-sheet class="pt-5">
                    <p class="text-h6 pt-2 text-center">Lọc nâng cao</p>
                    <HostelFilter />
                  </v-sheet>
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
  },
};
</script>
