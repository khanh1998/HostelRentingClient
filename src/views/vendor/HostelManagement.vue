<template>
  <v-row no-gutters v-if="!isLoading && groupId" class="fill-height d-flex flex-row flex-nowrap">
    <v-card width="100%" height="100%" class="overflow-hidden">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        absolute
        width="350"
        permanent
        mini-variant-width="70"
      >
        <v-list-item>
          <v-list-item-action>
            <v-btn icon depressed color="primary" @click="miniVariant = !miniVariant">
              <v-icon v-if="miniVariant">mdi-chevron-right</v-icon>
              <v-icon v-if="!miniVariant">mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title style="fontsize: 22px; color: #6c98c6;">Khu trọ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <HostelGroup
          :groups="groups"
          @getIdSelected="groupId = $event"
          v-on:close-menu="mini = !mini"
        />
      </v-navigation-drawer>
      <HostelGroupActions :groupData="getSelectedGroup()" />
      <HostelType :typesData="getSelectedTypes()" @getTypeIdSelected="typeId = $event" />
    </v-card>
  </v-row>
</template>
<script>
import HostelGroup from '@/components/vendor/hostel_management/HostelGroup.vue';
import HostelType from '@/components/vendor/hostel_management/HostelType.vue';
import HostelGroupActions from '@/components/vendor/hostel_management/HostelGroupActions.vue';
import { mapActions } from 'vuex';

export default {
  name: 'HostelManagement',
  components: {
    HostelGroup,
    HostelType,
    HostelGroupActions,
  },
  data: () => ({
    groupId: null,
    typeId: null,
    drawer: true,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
    mini: false,
    miniVariant: true,
    expandOnHover: true,
  }),
  computed: {
    groups() {
      return this.$store.state.vendor.group.groups.data;
    },
    isLoading() {
      return (
        this.$store.state.vendor.group.groups.isLoading ||
        this.$store.state.vendor.group.types.isLoading ||
        this.$store.state.vendor.group.rooms.isLoading
      );
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        case 'sm':
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    ...mapActions({
      getGroups: 'vendor/group/getGroups',
      getTypes: 'vendor/group/getTypes',
      getRooms: 'vendor/group/getRooms',
    }),
    getSelectedGroup() {
      const res = this.groups.find((groupItem) => groupItem.groupId === this.groupId);
      return res;
    },
    getSelectedTypes() {
      return this.getSelectedGroup().types;
    },
  },

  async created() {
    this.getGroups().then(() => {
      this.getTypes().then(() => {
        this.getRooms().then(() => {
          if (this.groups.length > 0) {
            this.groupId = this.groups[0].groupId;
          }
        });
      });
    });
  },
};
</script>
<style></style>
