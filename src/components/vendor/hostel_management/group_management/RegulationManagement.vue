<template>
  <v-row class="mx-0 mt-3 pr-5 d-flex flex-column">
    <div class="dropzone d-flex flex-column">
      <v-icon>mdi-file-image-outline</v-icon>
      <span
        >Tải ảnh đại diện của nhà trọ bạn lên để mọi người có thể dễ dàng nhận biết thương hiệu nhà
        trọ của bạn.</span
      >
    </div>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegulationManagement',
  data: () => ({}),
  computed: {
    allRules() {
      console.log(this.$store.state.renter.common.rules.data);
      return this.$store.state.renter.common.rules.data;
    },
  },
  methods: {
    ...mapActions({
      getAllRules: 'renter/common/getAllRules',
    }),
  },
  created() {},
};
</script>

<style>
.dropzone {
  border: 2px dashed #dee2e6;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  min-height: 150px;
  padding: 20px;
}
</style>
