<template>
  <v-sheet class="pa-6">
    <p class="text-h6">BỘ LỌC CỦA BẠN</p>
    <v-combobox
      v-model="filter.around.selects"
      :items="filter.around.items"
      light
      outlined
      multiple
      chips
      label="Tiện nghi xung quanh "
      deletable-chips
      clearable
      class
    ></v-combobox>
    <v-combobox
      v-model="filter.facility.selects"
      :items="filter.facility.items"
      light
      outlined
      multiple
      chips
      label="Tiện ích "
      deletable-chips
      clearable
      class
    ></v-combobox>
    <v-subheader>Chọn khoảng giá tiền</v-subheader>
    <v-range-slider
      v-model="filter.slider.range"
      class="mt-6"
      :min="filter.slider.min"
      :max="filter.slider.max"
      append-icon="fas fa-plus-circle"
      prepend-icon="fas fa-minus-circle"
      label
      light
      hint="Chọn khoảng giá tiền bạn mong muốn"
      thumb-label="always"
      thumb-size="32"
      step="0.1"
      :rules="filter.slider.rules"
      @click:append="plusMoney"
      @click:prepend="minusMoney"
    >
      <template v-slot:prepend>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="minusMoney">
              <v-icon>fas fa-minus-circle</v-icon>
            </v-btn>
          </template>
          Giảm
        </v-tooltip>
      </template>
      <template v-slot:append>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="plusMoney">
              <v-icon>fas fa-plus-circle</v-icon>
            </v-btn>
          </template>
          Tăng
        </v-tooltip>
      </template>
    </v-range-slider>
    <div class="d-flex">
      <v-text-field
        v-model="filter.slider.range[0]"
        class="mr-1"
        hide-details
        single-line
        type="number"
        suffix="triệu vnđ"
        prefix="Từ"
        outlined
        readonly
        dense
        @change="$set(range, 0, $event)"
      ></v-text-field>
      <v-icon>mdi-arrow-left-right</v-icon>
      <v-text-field
        outlined
        readonly
        dense
        v-model="filter.slider.range[1]"
        prefix="Đến"
        class="ml-1"
        hide-details
        single-line
        type="number"
        suffix="triệu vnđ"
        @change="$set(range, 0.1, $event)"
      ></v-text-field>
    </div>
    <!-- area -->
    <v-subheader>Chọn khoảng diện tích</v-subheader>
    <v-range-slider
      v-model="filter.sliderArea.range"
      class="mt-6"
      :min="filter.sliderArea.min"
      :max="filter.sliderArea.max"
      label
      light
      hint="Chọn khoảng giá tiền bạn mong muốn"
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
    <div class="d-flex">
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
      <v-icon>mdi-arrow-left-right</v-icon>
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
  name: 'Filter',
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
