<template>
  <v-card class="ml-16 d-flex flex-md-row flex-column">
    <v-card-title>{{ groupData.groupName }}</v-card-title>
    <v-card-actions class="d-flex flex-row flex-wrap">
      <v-dialog v-model="nameDialog.show" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed outlined rounded color="green" v-bind="attrs" v-on="on" class="ma-1">
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
          <v-btn depressed outlined rounded color="blue" v-bind="attrs" v-on="on" class="ma-1">
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
        <ServiceEditor :groupService="groupData.services" />
      </v-dialog>
      <v-btn depressed outlined rounded class="ma-1" color="red">
        <v-icon>rule</v-icon>
        Nội quy
      </v-btn>
      <v-btn depressed outlined rounded class="ma-1" color="amber">
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
  }),
};
</script>
