<template>
  <div>
    <div class="d-flex justify-space-between pa-3">
      <div style="fontSize:20px">Loại phòng</div>
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
          v-for="(item, i) in listChange"
          :key="i"
        >
          <v-list-item-group
            v-model="type"
            color="primary"
          >
            <v-list-item
              v-for="(type, i) in item.types"
              :key="i"
              class="mb-2 pt-2"
              v-on:click="getTypeItem(type.typeId)"
            >
              <v-list-item-content class="py-1">
                <v-list-item-subtitle style="fontSize:16px; fontWeight:bold; height: 30px">
                  {{type.title}}</v-list-item-subtitle>
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
  name: 'HostelType',
  props: ['groups', 'groupId', 'typeItem'],
  components: {
  },
  data: () => ({
    typesList: [],
    list: [],
  }),
  computed: {
    listChange() {
      return this.groups.filter((groups) => {
        if (groups.groupId === this.groupId) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    getTypeItem(item) {
      this.typeItem = item;
      this.$emit('getTypeIdSelected', this.typeItem);
    //   alert(this.typeItem);
    },
  },
};
</script>
