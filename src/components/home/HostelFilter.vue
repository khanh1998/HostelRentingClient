<template>
  <v-sheet class="pl-2 pr-2 pb-2 pt-2 pl-md-6 pr-md-6 pb-md-6 pt-md-6">
    <v-expansion-panels focusable multiple>
      <v-expansion-panel class="mb-2">
        <v-expansion-panel-header>Tiện nghi xung quanh</v-expansion-panel-header>
        <!-- eslint-enable -->
        <v-expansion-panel-content>
          <v-container fluid>
            <!-- <p>{{ item }} thuy</p>
            <div v-for="item in filter.around.items" :key="item" :index="i">
              <v-checkbox v-model="selected" label="filter.around.items[i-1]" value="Jacob" />
            </div>-->
            <!-- <v-checkbox
              v-model="selected"
              label="item"
              value="filter.around.items[i-1]"
              v-for="item in filter.around.items"
              :key="item"
              :index="i"
            />-->
            <v-card class="mx-auto" max-width="500">
              <v-list shaped>
                <p>{{ selected }} thuy</p>
                <v-list-item-group v-model="selected" multiple>
                  <template v-for="(item, i) in filter.around.items">
                    <v-list-item
                      :key="`item-${i}`"
                      :value="item"
                      active-class="deep-purple--text text--accent-4"
                    >
                      <template v-slot:default="{ active, toggle }">
                        <v-list-item-content>
                          <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-checkbox
                            :v-model="selected"
                            :_input-value="active"
                            :true-value="item"
                            color="deep-purple accent-4"
                            @click="toggle"
                          ></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Tiện ích</v-expansion-panel-header>
        <!-- eslint-enable -->
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, s
          ed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- <v-select
      v-model="filter.around.selects"
      :items="filter.around.items"
      light
      outlined
      multiple
      label="Tiện nghi xung quanh"
      clearable
      dense
    ></v-select>-->
    <!--<v-select
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
      v-model="filter.area.select"
      :items="filter.area.items"
      light
      outlined
      label="Diện tích tối thiểu"
      clearable
      dense
    ></v-select>
    <v-select
      v-model="filter.price.select"
      :items="filter.price.items"
      light
      outlined
      label="Giá thuê tối đa"
      clearable
      dense
    ></v-select>-->
    <div class="d-flex justify-center align-center">
      <v-btn
        tile
        min-width="100%"
        dark
        depressed
        class="mt-6"
        color="amber"
        @click="submit()"
      >TÌM KIẾM</v-btn>
    </div>
  </v-sheet>
</template>
<style scoped>
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'HostelFilter',
  data: () => ({
    selected: ['John'],
  }),
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/filterresult/getAllFacilities',
    }),
    ...mapActions({
      setFilterValue: 'renter/filterResult/setFilterValue',
    }),
    submit() {
      this.setFilterValue(this.filter);
      console.log(this.selected);
      this.$emit('submitFilter');
    },
  },
  computed: {
    filter() {
      return this.$store.state.renter.filterResult.filter;
    },
    facilities: {
      get() {
        return this.$store.state.renter.filterResult.facility.data;
      },
    },
  },
  created() {
    if (this.facilities.length === 0) {
      console.log('facilities');
      this.getAllFacilities();
    }
  },
};
</script>
