<template>
  <div>
    <div class="d-flex justify-space-between pa-3">
      <div style="fontSize:20px">Khu trọ</div>
      <v-btn
        fab
        dark
        small
        color="#EF7239"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-list
      dense
      two-line
    >
      <v-container
        id="scroll-target"
        style="max-height: 745px:"
        class="overflow-y-auto"
      >
        <v-row
          v-scroll:#scroll-target="onScroll"
          style="height: 100%"
        >
          <v-list-item-group
            v-model="item"
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in groups"
              :key="i"
              class="mb-2 pt-2"
              style="width:100%"
              v-on:click="getGroupItem(item.groupId)"
            >
              <v-list-item-content class="py-1">
                <v-list-item-subtitle style="fontSize:16px; fontWeight:bold; height: 30px">
                  {{item.groupName}}</v-list-item-subtitle>
              </v-list-item-content>
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
  components: {
  },
  methods: {
    getGroupItem(item) {
      this.groupItem = item;
      this.$emit('getIdSelected', this.groupItem);
    },
  },
  data: () => ({
  }),
};
</script>
