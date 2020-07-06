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
    <v-select
      v-model="filter.price.selects"
      :items="filter.price.items"
      light
      outlined
      label="Chọn khoảng giá tiền"
      clearable
      dense
    ></v-select>
    <!-- area -->
    <v-range-slider
      v-model="filter.sliderArea.range"
      class="mt-3"
      :min="filter.sliderArea.min"
      :max="filter.sliderArea.max"
      label
      light
      messages="Chọn khoảng diện tích"
      thumb-label="always"
      thumb-size="32"
      step="0.1"
      :rules="filter.sliderArea.rules"
    >
      <template v-slot:prepend>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="minusArea">
              <v-icon>fas fa-minus-circle</v-icon>
            </v-btn>
          </template>
          Giảm
        </v-tooltip>
      </template>
      <template v-slot:append>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="plusArea">
              <v-icon>fas fa-plus-circle</v-icon>
            </v-btn>
          </template>
          Tăng
        </v-tooltip>
      </template>
    </v-range-slider>
    <div class="d-flex flex-row mt-1">
      <v-text-field
        v-model="filter.sliderArea.range[0]"
        class="mr-1"
        hide-details
        single-line
        type="number"
        suffix="m2"
        prefix="Từ"
        outlined
        readonly
        dense
      ></v-text-field>
      <v-icon small>mdi-arrow-left-right</v-icon>
      <v-text-field
        outlined
        readonly
        dense
        v-model="filter.sliderArea.range[1]"
        prefix="Đến"
        class="ml-1"
        hide-details
        single-line
        type="number"
        suffix="m2"
      ></v-text-field>
    </div>
    <div class="d-flex justify-center align-center">
      <v-btn tile min-width="100%" dark depressed class="mt-6" color="amber">TÌM KIẾM</v-btn>
    </div>
  </v-sheet>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'HostelFilter',
  data: () => ({
    filter: {
      around: {
        selects: [],
        items: [
          'Chợ, siêu thị, cửa hàng tiện lợi',
          'Trạm xe buýt',
          'Bệnh viện, trạm y tế',
          'Ngân hàng',
        ],
      },
      facility: {
        selects: [],
        items: [
          'Máy lạnh',
          'Máy giặt',
          'Tủ lạnh',
          'Bình nóng lạnh',
          'Chỗ đậu xe',
        ],
      },
      price: {
        selects: [],
        items: [
          '500k - 1000k',
          '1000k - 2000k',
          '2000k - 3000k',
        ],
      },
      slider: {
        range: [1, 3],
        min: 0,
        max: 10,
        rules: [
        ],
      },
      sliderArea: {
        range: [15, 30],
        min: 0,
        max: 100,
      },
    },
  }),
  methods: {
    plusMoney() {
      const [min, max] = this.filter.slider.range;
      this.filter.slider.range = [min, max + 0.1];
    },
    minusMoney() {
      const [min, max] = this.filter.slider.range;
      this.filter.slider.range = [min - 0.1, max];
    },
    plusArea() {
      const [min, max] = this.filter.sliderArea.range;
      this.filter.sliderArea.range = [min, max + 0.1];
    },
    minusArea() {
      const [min, max] = this.filter.sliderArea.range;
      this.filter.sliderArea.range = [min - 0.1, max];
    },
  },
};
</script>
