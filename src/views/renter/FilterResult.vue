<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="d-flex flex-column align-center justify-center">
            <v-card-title>Kết quả tìm kiếm ({{ list.length }})</v-card-title>
            <v-card-actions class="hidden-md-and-up">
              <v-bottom-sheet v-model="bottomSheet.show" scrollable>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green" dark v-bind="attrs" v-on="on"
                    >Lọc nâng cao</v-btn
                  >
                </template>
                <v-sheet light class="pt-6">
                  <HostelFilter v-on:submitFilter="onFilterSubmit($event)" />
                </v-sheet>
              </v-bottom-sheet>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8" v-if="list.length != 0">
          <ArticleList :list="list" />
        </v-col>
        <v-col cols="12" md="8" v-if="list.length === 0">
          <v-card>
            <v-card-text>Không tìm thấy kết quả nào</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="0" md="4" class="hidden-sm-and-down">
          <v-sheet>
            <p class="text-h6 ml-5 pt-3">Bộ lọc kết quả</p>
            <HostelFilter v-on:submitFilter="onFilterSubmit($event)" />
          </v-sheet>
        </v-col>
        <v-col cols="12" md="8" v-if="list.length != 0">
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
    onUpdatePaging(pageNumber) {
      this.getFilterResult({ page: pageNumber, size: 5 });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.renter.filterResult.results.isLoading;
    },
    list() {
      return this.$store.state.renter.filterResult.results.data.types;
    },
  },
  created() {
    // this.getFilterResult({ page: 1, size: 10 });
  },
};
</script>
