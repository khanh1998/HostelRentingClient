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
    <v-row class="mx-0 pt-3">
      <span style="text-align: center" class="text-primary-dark font-nunito size9rem mb-2"
        >Nếu nhà trọ của bạn có nội quy không xuất hiện trong danh sách. Hãy ấn nút "Bổ sung nội
        quy" để thêm</span
      >
      <v-btn
        class="bg-danger-lighten elevation-0 text-danger font-nunito size9rem d-flex justify-start ma-auto"
        style="letter-spacing: 0.01rem !important"
        ><v-icon small class="mr-1">report</v-icon>Bổ sung nội quy mới</v-btn
      >
      <!-- {{ values }}
      <v-col cols="4">
        <v-autocomplete
          v-model="values"
          :items="recommendList"
          item-text="regulationName"
          item-value="regulationId"
          dense
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Nếu như không có gợi ý phù hợp, vui lòng nhấn vào
                <strong>Cryptocurrency</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template slot="selection" slot-scope="{ item }">
            <span class="font-nunito font-weight-medium text-body-2">{{
              item.regulationName
            }}</span>
          </template>
          <template slot="item" slot-scope="{ item }">
            <span class="font-nunito font-weight-medium text-body-2">{{
              item.regulationName
            }}</span>
          </template>
        </v-autocomplete>
      </v-col> -->
    </v-row>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegulationManagement',
  data: () => ({
    selected: [],
    recommendList: [],
    values: '',
  }),
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
