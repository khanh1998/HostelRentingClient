<template>
  <!-- eslint-disable max-len -->
  <v-card style="width: 100%;" outlined>
    <v-card-title
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);"
      class="d-flex align-center justify-center text-capitalize text-primary-dark font-nunito"
      >Bộ lọc nâng cao</v-card-title
    >
    <v-expansion-panels focusable multiple accordion v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>Khoảng cách tối đa</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          <v-chip-group v-model="filter.distance.select" column>
            <v-chip
              filter
              outlined
              v-for="(item, i) in filter.distance.items"
              :key="`item-${i}`"
              :value="item"
            >
              {{ item }}
            </v-chip>
          </v-chip-group>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Loại</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          <v-chip-group v-model="filter.categories.select" column>
            <v-chip
              filter
              outlined
              v-for="(item, i) in filter.categories.data"
              :key="`item-${i}`"
              :value="item.categoryId"
            >
              {{ item.categoryName }}
            </v-chip>
          </v-chip-group>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Tiện nghi xung quanh</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          <v-chip-group v-model="filter.around.selects" column multiple>
            <v-chip
              filter
              outlined
              v-for="(item, i) in filter.around.items"
              :key="`item-${i}`"
              :value="item"
              >{{ item }}</v-chip
            >
          </v-chip-group>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Tiện ích</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          <v-chip-group v-model="filter.facility.selects" column multiple>
            <v-chip
              filter
              outlined
              v-for="(item, i) in facilities"
              :key="`item-${i}`"
              :value="item.facilityId"
              >{{ item.facilityName }}</v-chip
            >
          </v-chip-group>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Giá thuê</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          {{ filterSelected.disabledPrice }}
          <v-row>
            <v-col class="px-5 pt-0">
              <v-switch
                class="ml-auto mb-4"
                height="10"
                v-model="filterSelected.disabledPrice"
                label="Lọc"
                color="#727cf5"
              />
              <v-range-slider
                v-model="filter.price.range"
                :max="filter.price.max"
                :min="filter.price.min"
                hide-details
                :thumb-size="28"
                thumb-label="always"
                step="0.1"
                :disabled="!filterSelected.disabledPrice"
                color="#3645f1"
              />
              <v-row class="justify-center align-center">
                <v-subheader>{{ min }} tr</v-subheader>
                <v-subheader class="ml-auto">{{ max }} tr</v-subheader>
                <v-btn
                  icon
                  color="indigo"
                  height="30"
                  width="30"
                  :disabled="!filterSelected.disabledPrice"
                  @click="changeMaxPrice()"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="lastItem">
        <v-expansion-panel-header>Diện tích tối thiểu</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          <v-chip-group v-model="filter.minArea.select" column>
            <v-chip
              outlined
              v-for="(item, i) in filter.minArea.items"
              :key="`item-${i}`"
              :value="item"
              >{{ item }}</v-chip
            >
          </v-chip-group>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card-actions class="pa-4" style="border-top: 1px solid rgba(0, 0, 0, 0.12);">
      <v-btn
        class="bg-primary bt-primary-hover white--text font-nunito"
        width="100%"
        @click="filterSubmit()"
        :loading="isCreate"
        >Áp dụng</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<style>
.noPadding {
  padding: 0 !important;
}
.v-expansion-panel-content__wrap {
  padding: 0 10px 0 !important;
}
.noWrap {
  white-space: normal;
}
</style>
<style scoped>
.v-expansion-panel::before {
  box-shadow: none !important;
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'HostelFilter',
  data: () => ({
    panel: [2],
    facilityIds: [],
    serviceIds: [],
    min: 0,
    max: 15,
    range: [0, 2.5],
    disabled: false,
    slider: 3,
    minSuperficiality: 0,
    // new
    filterSelected: {
      categoriesIds: [],
      range: [0, 2.5],
      minSuperficiality: '',
      disabledPrice: false,
    },
  }),
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/filterResult/getAllFacilities',
      getAllCategories: 'renter/filterResult/getAllCategories',
    }),
    ...mapActions({
      setFilterValue: 'renter/filterResult/setFilterValue',
    }),
    submit() {
      this.setFilterValue(this.filter);
      this.$emit('submitFilter');
    },
    changeMaxPrice() {
      if (this.max < 50) this.max += 5;
    },
    filterSubmit() {
      console.log(this.filter);
      if (this.filter.coordinator.address) {
        this.filter.price.disable = this.filterSelected.disabledPrice;
        this.filterSearchByCoordinatorResult({
          filterProperties: this.filter,
        });
        this.$router.push('/filter');
      }
    },
    ...mapActions({
      filterSearchByCoordinatorResult: 'renter/filterResult/filterSearchByCoordinatorResult',
    }),
  },
  computed: {
    filter() {
      return this.$store.state.renter.filterResult.filter;
    },
    facilities: {
      get() {
        return this.$store.state.renter.filterResult.filter.facility.data;
      },
    },
    coordinates: {
      get() {
        return this.$store.state.renter.filterResult.search.value;
      },
    },
    isCreate() {
      return this.$store.state.renter.filterResult.results.isLoading;
    },
  },
  created() {
    if (this.facilities.length === 0) {
      this.getAllFacilities();
    }
    if (this.filter.categories.data.length === 0) {
      this.getAllCategories();
    }
  },
};
</script>
