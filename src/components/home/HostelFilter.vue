<template>
  <v-sheet class="pl-2 pr-2 pb-2 pl-md-6 pr-md-6 pb-md-6">
    <v-expansion-panels focusable multiple>
      <v-expansion-panel class="mb-3">
        <v-expansion-panel-header>Tiện nghi xung quanh</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          <v-list shaped>
            <v-list-item-group v-model="serviceIds" multiple>
              <template v-for="(item, i) in filter.around.items">
                <v-list-item
                  :key="`item-${i}`"
                  :value="item"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item" class="text-body-2 noWrap" />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="deep-purple accent-4" />
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mb-3">
        <v-expansion-panel-header>Tiện ích</v-expansion-panel-header>
        <v-expansion-panel-content class="noPadding">
          <v-list shaped>
            <v-list-item-group v-model="facilityIds" multiple>
              <template v-for="(item, i) in facilities">
                <v-list-item
                  :key="`item-${i}`"
                  :value="item.facilityId"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.facilityName" class="text-body-2 noWrap" />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="deep-purple accent-4" />
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="mb-3">
        <v-expansion-panel-header>Giá tiền</v-expansion-panel-header>
        <!-- eslint-enable -->
        <v-expansion-panel-content class="noPadding">
          <!-- <v-card-text> -->
          <v-row>
            <v-col class="px-5 pt-0">
              <v-switch class="ml-auto mb-4" height="10" v-model="disabled" label="Lọc" />
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                hide-details
                _class="align-center"
                :thumb-size="23"
                thumb-label="always"
                step="0.1"
                :disabled="!disabled"
              />
              <v-row class="justify-center align-center">
                <v-subheader>{{ min }} tr</v-subheader>
                <v-subheader class="ml-auto">{{ max }} tr</v-subheader>
                <v-btn
                  icon
                  color="indigo"
                  height="30"
                  width="30"
                  :disabled="!disabled"
                  @click="changeMaxPrice()"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <!-- </v-card-text> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-select
      v-model="minSuperficiality"
      :items="filter.minArea.items"
      light
      outlined
      label="Diện tích tối thiểu"
      clearable
      dense
    ></v-select>
    <div class="d-flex justify-center align-center">
      <v-btn tile min-width="100%" dark depressed class="mt-6" color="amber" @click="filterSubmit()"
        >ÁP DỤNG</v-btn
      >
    </div>
  </v-sheet>
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
<script>
import { mapActions } from 'vuex';

export default {
  name: 'HostelFilter',
  data: () => ({
    facilityIds: [],
    serviceIds: [],
    min: 0,
    max: 15,
    range: [0, 2.5],
    disabled: false,
    slider: 3,
    minSuperficiality: 0,
  }),
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/filterResult/getAllFacilities',
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
      this.filterSearchByCoordinatorResult({
        coordinator: this.coordinates,
        facilitiesIds: this.facilityIds,
        disabledPrice: this.disabled,
        rangePirce: this.range,
        minSuperficiality: this.minSuperficiality,
      });
      this.$router.push('/filter');
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
  },
  created() {
    if (this.facilities.length === 0) {
      this.getAllFacilities();
    }
  },
};
</script>
