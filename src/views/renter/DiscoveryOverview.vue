<template>
  <div>
    <v-overlay
      :value="provinces.isLoading"
      absolute
    >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!provinces.isLoading">
      <v-row>
        <v-col>
          <TopBanner />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="province in showableProvinces" :key="province.provinceId">
          <ProvinceView :province="province"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import TopBanner from '../../components/discovery/TopBanner.vue';
import ProvinceView from '../../components/discovery/ProvinceView.vue';

export default {
  name: 'DiscoveryOverview',
  components: {
    TopBanner,
    ProvinceView,
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
    }),
  },
  computed: {
    ...mapState({
      provinces: (state) => state.renter.common.provinces,
    }),
    showableProvinces() {
      return [this.provinces.data[0]]; // only show HCMC
    },
  },
  created() {
    this.getProvinces();
  },
};
</script>
<style scoped>
</style>
