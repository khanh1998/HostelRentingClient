<template>
  <v-sheet
    class="pl-2 pr-2 pb-2 pt-2 pl-md-6 pr-md-6 pb-md-6 pt-md-6"
  >
    <v-select
      v-model="filter.around.selects"
      :items="filter.around.items"
      light
      outlined
      multiple
      single-line
      label="Tiện nghi xung quanh"
      clearable
      dense
    ></v-select>
    <v-select
      v-model="filter.facility.selects"
      :items="filter.facility.items"
      light
      outlined
      multiple
      label="Tiện ích "
      clearable
      dense
    ></v-select>
    <!-- area -->
    <v-select
      v-model="filter.area.selects"
      :items="filter.area.items"
      light
      outlined
      multiple
      single-line
      label="Diện tích tối thiểu"
      clearable
      dense
    ></v-select>
    <v-select
      v-model="filter.price.selects"
      :items="filter.price.items"
      light
      outlined
      multiple
      single-line
      label="Giá thuê tối đa"
      clearable
      dense
    ></v-select>
    <div class="d-flex justify-center align-center">
      <v-btn tile min-width="100%" dark depressed class="mt-6" color="amber"
        @click="submit()"
      >
        TÌM KIẾM
      </v-btn>
    </div>
  </v-sheet>
</template>
<style scoped>
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'HostelFilter',
  data: () => ({}),
  methods: {
    ...mapActions({
      setFilterValue: 'renter/filterResult/setFilterValue',
    }),
    submit() {
      this.setFilterValue(this.filter);
      this.$emit('submitFilter');
    },
  },
  computed: {
    filter() {
      return this.$store.state.renter.filterResult.filter;
    },
  },
};
</script>
