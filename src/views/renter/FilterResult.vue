<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-row>
        <v-col>
          <p>Kết quả tìm kiếm</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <ArticleList :list="list"/>
        </v-col>
        <v-col cols="4">
          <HostelFilter v-on:submitFilter="onFilterSubmit($event)"/>
        </v-col>
        <v-col cols="12">
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
  }),
  methods: {
    onFilterSubmit() {
      this.getFilterResult({ page: 1, size: 10 });
    },
    ...mapActions({
      getFilterResult: 'renter/filterResult/getFilterResult',
    }),
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
