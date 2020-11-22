<template>
  <v-row class="mx-0">
    <v-col cols="12" class="pt-3">
      <div class="d-flex align-start">
        <v-col cols="6" class="pa-0 d-flex flex-column justify-start">
          <v-text-field
            label="Tìm nhanh theo tên nội quy"
            v-model="searchRegulationQuery"
            solo
            hide-details
            class="text-muted size-sub-2 light-text-field font-nunito"
            clearable
            rounded
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3" class="pa-0 d-flex flex-column">
          <v-text-field
            label="Nội quy khác"
            v-model="newRule"
            solo
            hide-details
            class="text-muted size-sub-2 light-text-field font-nunito"
            style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
          ></v-text-field>
          <span class="size-caption red--text font-nunito" v-show="isDuplicate"
            >Nội quy đã tồn tại</span
          >
        </v-col>
        <v-btn
          class="btn-success btn-sm font-nunito white--text"
          @click="addNewRules()"
          style="border-top-left-radius: 0px !important; border-bottom-left-radius: 0px !important"
          >Bổ sung</v-btn
        >
      </div>
      <v-card
        class="overflow-y-auto mt-4 d-flex flex-wrap px-4"
        max-height="230"
        min-height="110"
        outlined
      >
        <v-col
          cols="4"
          v-for="item in newRulesDisplay"
          :key="item"
          class="pa-0 ma-0 d-flex align-center"
        >
          <v-checkbox
            v-model="newRulesSelectes"
            :label="item"
            :value="item"
            class="filter font-nunito size9rem checkbox ma-0"
            color="#727cf5"
            hide-details
            @click="selectCheckBox()"
          ></v-checkbox>
        </v-col>
        <v-col
          cols="4"
          v-for="item in allRules"
          :key="item.regulationId"
          class="pa-0 ma-0 d-flex align-center"
        >
          <v-checkbox
            v-model="selected"
            :label="item.regulationName"
            :value="item.regulationId"
            class="filter font-nunito size9rem checkbox ma-0"
            color="#727cf5"
            hide-details
            @click="selectCheckBox()"
          ></v-checkbox>
        </v-col>

        <span
          v-if="allRules.length === 0 && newRulesDisplay.length === 0"
          class="d-flex flex-column align-center ma-auto font-nunito text-primary"
        >
          <span>Nếu phòng trọ của bạn có nội quy không có sẵn trong danh sách gợi ý.</span>
          <span
            >Hãy điền nội quy khác và ấn nút
            <span style="color: #0acf97 !important">"Bổ sung"</span> để thêm nội quy mới.</span
          >
        </span>
      </v-card>
    </v-col>
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
    searchRegulationQuery: '',
    newRule: '',
    newRules: [],
    newRulesSelectes: [],
  }),
  components: {},
  computed: {
    allRules() {
      let regulations = this.$store.state.renter.common.rules.data;
      if (this.searchRegulationQuery && this.searchRegulationQuery.trim() !== '') {
        regulations = regulations.filter((item2) => {
          const res =
            item2.regulationName
              .toLowerCase()
              .indexOf(this.searchRegulationQuery.trim().toLowerCase()) !== -1;
          return res;
        });
      }
      return [...regulations];
    },
    newRulesDisplay() {
      let regulations = this.newRules;
      if (this.searchRegulationQuery && this.searchRegulationQuery.trim() !== '') {
        regulations = regulations.filter((item2) => {
          const res =
            item2.toLowerCase().indexOf(this.searchRegulationQuery.trim().toLowerCase()) !== -1;
          return res;
        });
      }
      return [...regulations];
    },
    newGroup() {
      return this.$store.state.vendor.group.newGroup;
    },
    isDuplicate() {
      let dupplicateExistRules = false;
      let dupplicateNewRules = false;
      if (this.allRules.length > 0) {
        dupplicateExistRules =
          this.allRules.filter(
            (rule) =>
              rule.regulationName.trim().toLowerCase() === this.newRule.trim().toLowerCase(), // eslint-disable-line
          ).length > 0;
      }
      if (this.newRules.length > 0) {
        dupplicateNewRules =
          this.newRules.filter(
            (rule) => rule.trim().toLowerCase() === this.newRule.trim().toLowerCase(),
          ).length > 0;
      }
      return dupplicateExistRules || dupplicateNewRules;
    },
  },
  methods: {
    ...mapActions({
      getAllRules: 'renter/common/getAllRules',
      setNewGroupValue: 'vendor/group/setNewGroupValue',
    }),
    selectCheckBox() {
      this.newGroup.regulation = this.selected;
      this.newGroup.newRegulations = this.newRulesSelectes;
      this.setNewGroupValue(this.newGroup);
    },
    addNewRules() {
      if (this.newRules && !this.isDuplicate) {
        this.newRules.unshift(this.newRule);
        this.newRulesSelectes.push(this.newRule);
        this.newRule = '';
      }
    },
  },
  created() {
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
