<template>
  <div height="836px" v-if="!isLoadingGroup">
    <v-card height="836px" class="overflow-hidden">
      <v-navigation-drawer
        v-model="drawer"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        absolute
        width="350"
      >
        <HostelGroup
          :groups="groups"
          :groupId="groupId"
          @getIdSelected="groupId = $event"
        />
      </v-navigation-drawer>
      <v-card style="min-height: 836px; max-height: 836px;" class="ml-15">
        <HostelType
          :groups="groups"
          :groupId="groupId"
          :typeId="typeId"
          @getTypeIdSelected="typeId = $event"
        />
      </v-card>
    </v-card>
  </div>
</template>
<script>
import HostelGroup from '@/components/vendor/hostel_management/HostelGroup.vue';
import HostelType from '@/components/vendor/hostel_management/HostelType.vue';
// import HostelRoom from '@/components/vendor/hostel_management/HostelRoom.vue';
import { mapActions } from 'vuex';

export default {
  name: 'HostelManagement',
  components: {
    HostelGroup,
    HostelType,
    // HostelRoom,
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

    miniVariant: true,
    expandOnHover: true,
  }),
  computed: {
    groups() {
      return this.$store.state.vendor.group.groups.data;
    },
    isLoadingGroup() {
<<<<<<< HEAD
      return (this.$store.state.vendor.group.groups.isLoading ||
=======
      return (
        this.$store.state.vendor.group.groups.isLoading ||
>>>>>>> discovery
        this.$store.state.vendor.group.types.isLoading ||
        this.$store.state.vendor.group.rooms.isLoading
      );
    },
  },
  methods: {
    ...mapActions({
      getGroups: 'vendor/group/getGroups',
      getTypes: 'vendor/group/getTypes',
      getRooms: 'vendor/group/getRooms',
    }),
  },
  async created() {
    this.getGroups().then(() => {
      this.getTypes().then(() => this.getRooms());
    });
  },
};
</script>
<style></style>
