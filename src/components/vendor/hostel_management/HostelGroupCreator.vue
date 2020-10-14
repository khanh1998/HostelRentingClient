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
            <HostelGroupRules @newValue="receiveNewRulesData" />
          </v-col>
          <v-col cols="12" md="4">
            <PlacePicker @newValue="receiveNewAddress" />
          </v-col>
          <v-col cols="12" md="5">
            <HostelGroupServiceEditor
              :groupService="[]"
              :create="true"
              :update="false"
              @newValue="receiveNewServiceData"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex';
import PlacePicker from './PlacePicker.vue';
import HostelGroupRules from './HostelGroupRules.vue';
import HostelGroupServiceEditor from './HostelGroupServiceEditor.vue';

export default {
  name: 'HostelGroupCreator',
  props: ['show', 'create', 'update'],
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
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    receiveNewServiceData(serviceList) {
      if (this.create) {
        this.newGroup.services = serviceList;
      }
    },
    receiveNewRulesData(obj) {
      if (this.create) {
        this.newGroup.regulations = obj.rule;
        if (!obj.time.openAllDay && obj.time.startTime && obj.time.endTime) {
          this.newGroup.curfewTime = `${obj.time.startTime} - ${obj.time.endTime}`;
        } else {
          this.newGroup.curfewTime = null;
        }
      }
    },
    receiveNewAddress(addressObj) {
      const { coords, address } = addressObj;
      this.newGroup.longitude = coords.longitude;
      this.newGroup.latitude = coords.latitude;
      this.newGroup.address = address;
      this.newGroup.buildingNo = address.buildingNo;
    },
  },
  computed: {
    user() {
      return this.$store.state.user.user.data;
    },
  },
  created() {
    if (!this.user) {
      this.getUser().then(() => {
        this.newGroup.vendorId = this.user.userId;
      });
    }
  },
};
</script>
