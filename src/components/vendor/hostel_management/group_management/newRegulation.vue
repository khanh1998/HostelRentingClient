<template>
  <v-col cols="6" class="d-flex py-0">
    <v-text-field
      class="size-sub form font-nunito"
      color="#727cf5"
      solo
      dense
      light
      v-model="newValue.facilityName"
      style="
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        border-right: 0px !important;
      "
    />
    <div
      class="d-flex align-center justify-center pa-2"
      style="height: 38px; background-color: #e9ecef; border: 1px solid #dee2e6"
    >
      <v-btn icon class="btn-hover" color="#6c757d" @click="removeItem()">
        <v-icon>mdi-delete-forever</v-icon>
      </v-btn>
    </div>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'newRegulation',
  data: () => ({}),
  props: { regulation: Object },
  computed: {
    newRoomValue() {
      return this.$store.state.vendor.group.newRoom.data;
    },
    createRooms() {
      return this.$store.state.vendor.group.creatRooms.rooms;
    },
    newValue() {
      return this.regulation;
    },
    newTypeValue() {
      return this.$store.state.vendor.group.createType.data;
    },
  },
  methods: {
    ...mapActions({
      setCreateTypeValue: 'vendor/group/setCreateTypeValue',
    }),
    removeItem() {
      const result = this.newTypeValue.newFacilities.filter(
        (item) => item.index !== this.newValue.index,
      );
      this.setCreateTypeValue(result);
      console.log(this.createRooms);
    },
    changeName() {
      console.log(this.createRooms);
    },
  },
  created() {},
};
</script>

<style>
</style>
