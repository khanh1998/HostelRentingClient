<template>
  <div>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-home-city-outline</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title style="fontsize: 22px; color: #6c98c6;">Khu trọ</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav class="py-0" two-line>
      <v-container id="scroll-target" style="max-height: 745px:" class="overflow-y-auto">
        <v-row v-scroll:#scroll-target="onScroll" style="height: 100%;">
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in groups"
              :key="i"
              class="pt-2"
              :class="miniVariant && 'px-0'"
              style="width: 100%;"
              v-on:click="getGroupItem(item.groupId)"
            >
              <v-list-item-icon class="pa-2">
                <v-icon>mdi-home-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="py-1">
                <v-list-item-subtitle style="fontsize: 16px; fontweight: bold; height: 30px;">
                  {{ item.groupName }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action class="d-flex flex-row pb-2">
                <v-btn fab dark small text color="#EF7239">
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab dark small text color="#EF7239">
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-row>
      </v-container>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'HostelGroup',
  props: ['groups', 'groupItem'],
  components: {},
  methods: {
    getGroupItem(item) {
      this.groupItem = item;
      this.$emit('getIdSelected', this.groupItem);
    },
  },
  data: () => ({
    miniVariant: true,
  }),
};
</script>
