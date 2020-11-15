<template>
  <v-row justify="center"> {{ groupId }} {{ newRoomValue }} {{ types }}</v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RoomManagement',
  data: () => ({}),
  computed: {
    newRoomValue() {
      return this.$store.state.vendor.group.groups;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    types() {
      return this.$store.state.vendor.group.types.data;
    },
  },
  methods: {
    ...mapActions({
      getAllRules: 'renter/common/getAllRules',
      setNewRoom: 'vendor/group/setNewRoom',
      getTypes: 'vendor/group/getTypes',
    }),
    closeDialog() {
      this.$emit('close');
    },
  },
  created() {
    if (this.types.length === 0) {
      console.log('vao');
      this.getTypes(this.groupId);
    }
  },
};
</script>

<style>
.light-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: #e9ecef !important;
}
.light-select .v-application .primary--text {
  color: #727cf5 !important;
  caret-color: #727cf5 !important;
}
</style>
