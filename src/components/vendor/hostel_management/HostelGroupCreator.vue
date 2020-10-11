<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    class="hidden-md-and-up"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Tạo khu phòng trọ mới</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">
            <v-icon>add</v-icon>
            Tạo ngay
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3">
            <span class="text-h6"> <v-icon>info</v-icon> Thông tin </span>
            <v-text-field
              v-model="newGroup.groupName"
              placeholder="Tên của khu phòng trọ"
              prepend-icon="closed_caption"
              hide-details
            ></v-text-field>
            <v-divider class="mt-6 mb-3" />
            <HostelGroupRules />
          </v-col>
          <v-col cols="12" md="4">
            <PlacePicker />
          </v-col>
          <v-col cols="12" md="5">
            <HostelGroupServiceEditor :groupService="[]" :create="true" :update="false" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import PlacePicker from './PlacePicker.vue';
import HostelGroupRules from './HostelGroupRules.vue';
import HostelGroupServiceEditor from './HostelGroupServiceEditor.vue';

export default {
  name: 'HostelGroupCreator',
  props: ['show'],
  components: { PlacePicker, HostelGroupRules, HostelGroupServiceEditor },
  data: () => ({
    newGroup: {
      vendorId: null,
      groupName: '',
      buildingNo: '',
      longitude: '',
      latitude: '',
      ownerJoin: false,
      imgUrl: null,
      address: {
        provinceId: 1,
        provinceName: 'Thành phố Hồ Chí Minh',
        districtId: null,
        districtName: '',
        wardId: null,
        wardName: '',
        streetId: null,
        streetName: '',
      },
      services: [],
    },
  }),
};
</script>
