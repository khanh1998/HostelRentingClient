<template>
  <v-card class="ml-16 d-flex flex-md-row flex-column">
    <v-card-title
      >{{ groupData.groupName }}
      <v-menu offset-y v-if="isMobile">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-on:click="showChangeGroupName">
            <v-list-item-title>Đổi tên</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="showManageService">
            <v-list-item-title>Quản lí dịch vụ</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="showManagePolicy">
            <v-list-item-title>Quản lí nội quy</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="showCreateNewType">
            <v-list-item-title>Tạo loại phòng mới</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-actions class="d-flex flex-row flex-wrap" v-if="!isMobile">
      <v-dialog v-model="nameDialog.show" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            outlined
            rounded
            color="green"
            v-bind="attrs"
            v-on="on"
            class="ma-1"
            small
          >
            <v-icon>edit</v-icon>
            Đổi tên
          </v-btn>
        </template>
        <v-card class="pa-2">
          <v-card-title>Đổi tên</v-card-title>
          <v-text-field placeholder="Tên mới"></v-text-field>
          <v-card-actions>
            <v-btn color="green darken-1" text @click="nameDialog.show = false">
              Hủy
            </v-btn>
            <v-btn color="green darken-1" text @click="nameDialog.show = false">
              Đồng ý
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="serviceDialog.show"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            outlined
            rounded
            color="blue"
            v-bind="attrs"
            v-on="on"
            class="ma-1"
            small
          >
            <v-icon>local_laundry_service</v-icon>
            Quản lí dịch vụ
          </v-btn>
        </template>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="serviceDialog.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >Dịch vụ của
            <span class="font-weight-bold">{{ groupData.groupName }}</span></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text>
              <v-icon>add_circle_outline</v-icon>
            </v-btn>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn dark text @click="serviceDialog.show = false">
              <v-icon>sync</v-icon>
              Lưu thay đổi</v-btn
            >
          </v-toolbar-items>
        </v-toolbar>
        <ServiceEditor :groupService="groupData.services" :create="false" :update="true" />
      </v-dialog>
      <v-btn depressed outlined rounded class="ma-1" color="red" small>
        <v-icon>rule</v-icon>
        Nội quy
      </v-btn>
      <v-btn depressed outlined rounded class="ma-1" color="amber" small>
        <v-icon>add</v-icon>
        Tạo nhà trọ mới
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import ServiceEditor from './HostelGroupServiceEditor.vue';

export default {
  name: 'HostelGroupAction',
  props: ['groupData'],
  components: { ServiceEditor },
  data: () => ({
    nameDialog: {
      show: false,
      name: '',
    },
    serviceDialog: {
      show: false,
    },
    optionsForGroup: [
      { title: 'Đổi tên', action: 'showChangeGroupName' },
      { title: 'Quản lí dịch vụ', action: 'showManageService' },
      { title: 'Nội quy', action: 'showManagePolicy' },
      { title: 'Tạo nhà trọ mới', action: 'showCreateNewType' },
    ],
  }),
  methods: {
    showChangeGroupName() {
      alert('ye ye');
    },
    showManageService() {},
    showManagePolicy() {},
    showCreateNewType() {},
  },
  computed: {
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
};
</script>
