<template>
  <v-row class="mx-0 mt-3 d-flex flex-column">
    <v-row class="mx-0 d-flex flex-wrap pb-5" style="border-bottom: 2px dashed #dee2e6">
      <div v-for="(item, index) in allRules" :key="item.regulationId">
        <v-checkbox
          v-model="selected"
          :label="item.regulationName"
          :value="item.regulationId"
          class="filter font-nunito size9rem size-sub-2 mr-3 checkbox"
          color="#727cf5"
          hide-details
          @click="selectCheckBox()"
          v-if="index <= 10"
        />
      </div>
    </v-row>
    <v-row class="mx-0 pt-3 d-flex flex-column">
      <span style="text-align: center" class="text-primary-dark font-nunito size9rem mb-2"
        >Nếu nhà trọ của bạn có nội quy không xuất hiện trong danh sách. Hãy ấn nút "Bổ sung nội
        quy" để thêm</span
      >
      <v-btn
        class="bg-danger-lighten elevation-0 text-danger font-nunito size9rem d-flex justify-start ma-auto"
        style="letter-spacing: 0.01rem !important"
        @click="addNewRegulation()"
        ><v-icon small class="mr-1">report</v-icon>Bổ sung nội quy mới</v-btn
      >
      <div class="d-flex flex-wrap mt-3" v-if="newGroup.newRegulations.length > 0">
        <newRegulation
          v-for="regulation in newGroup.newRegulations"
          v-bind:key="regulation.index"
          :regulation="regulation"
        />
      </div>
    </v-row>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import newRegulation from './newRegulation.vue';

export default {
  name: 'RegulationManagement',
  data: () => ({
    selected: [],
    recommendList: [],
    values: '',
  }),
  components: { newRegulation },
  computed: {
    allRules() {
      return this.$store.state.renter.common.rules.data;
    },
    newGroup() {
      return this.$store.state.vendor.group.newGroup;
    },
  },
  methods: {
    ...mapActions({
      getAllRules: 'renter/common/getAllRules',
      setNewGroupValue: 'vendor/group/setNewGroupValue',
    }),
    selectCheckBox() {
      this.newGroup.regulation = this.selected;
      this.setNewGroupValue(this.newGroup);
    },
    addNewRegulation() {
      console.log(this.newGroup);
      if (this.newGroup.newRegulations.length === 0) {
        this.newGroup.newRegulations.push({
          index: 0,
          regulationName: '',
        });
      } else {
        this.newGroup.newRegulations.push({
          index: this.newGroup.newRegulations[this.newGroup.newRegulations.length - 1].index + 1,
          regulationName: '',
        });
      }
      this.setNewGroupValue(this.newGroup);
    },
  },
  created() {
    if (this.allRules.length > 2) {
      this.recommendList = this.allRules.slice(2, this.allRules.length);
    }
    this.selected = this.newGroup.regulation;
  },
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
