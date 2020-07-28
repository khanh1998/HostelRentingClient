<template>
  <!-- <v-card
    style="background-color: coral;"
    height="836px"
    v-if="!isLoadingGroup"
  > -->
  <div

    height="836px"
    v-if="!isLoadingGroup"
  >
    <v-row>
      <v-col cols="2">
        <v-card style="min-height: 825px">
          <HostelGroup :groups="groups" :groupId="groupId" @getIdSelected="groupId = $event"/>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card style="min-height: 825px">
          <HostelType :groups="groups" :groupId="groupId"
          :typeId="typeId" @getTypeIdSelected="typeId = $event"/>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card style="min-height: 825px">
          <HostelRoom :groups="groups" :groupId="groupId" :typeId="typeId"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import HostelGroup from '@/components/vendor/hostel_management/HostelGroup.vue';
import HostelType from '@/components/vendor/hostel_management/HostelType.vue';
import HostelRoom from '@/components/vendor/hostel_management/HostelRoom.vue';
import { mapActions } from 'vuex';

export default {
  name: 'HostelManagement',
  components: {
    HostelGroup,
    HostelType,
    HostelRoom,
  },
  data: () => ({
    groupId: null,
    typeId: null,
  }),
  computed: {
    groups() {
      return this.$store.state.vendor.group.groups.data;
    },
    isLoadingGroup() {
      return (this.$store.state.vendor.group.groups.isLoading
        || this.$store.state.vendor.group.types.isLoading
        || this.$store.state.vendor.group.rooms.isLoading
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
    this.getGroups()
      .then(() => {
        this.getTypes()
          .then(() => this.getRooms());
      });
  },
};
</script>
<style>
</style>
