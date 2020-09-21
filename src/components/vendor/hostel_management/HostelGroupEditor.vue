<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon small color="grey" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ group.groupName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Thông tin cơ bản</v-card-title>
            <v-form v-model="basisInfo.valid">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="group.groupName"
                    :counter="10"
                    label="Tên khu trọ"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Dịch vụ</v-card-title>
            <v-data-table
              :headers="servicesBox.headers"
              :items="groupServiceDesserts"
              class="elevation-1"
            >
              <template v-slot:item.price="{ item }">
                <v-text-field v-model="item.price" hide-details></v-text-field>
              </template>
              <template v-slot:item.unit="{ item }">
                <v-text-field v-model="item.unit" hide-details></v-text-field>
                <v-select
                  menu-props="auto"
                  label="Select"
                  hide-details
                  prepend-icon="map"
                  single-line
                ></v-select>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <p>Tiện ích</p>
          <p>Nội quy</p>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'HostelGroupEditor',
  props: ['groupData'],
  data() {
    return {
      group: this.groupData,
      dialog: false,
      basisInfo: {
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
      },
      servicesBox: {
        headers: [
          {
            text: 'Service name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Price', value: 'price' },
          { text: 'Unit', value: 'unit' },
        ],
      },
      facilitiesBox: {},
      rules: {},
    };
  },
  computed: {
    groupServiceDesserts() {
      return this.group.services.map((service) => ({
        name: service.serviceName,
        price: service.price,
        unit: `${service.priceUnit}/${service.timeUnit}/${service.userUnit}`,
      }));
    },
    facilities() {
      return this.$store.state.renter.common.facilities.data;
    },
    services() {
      return this.$store.state.renter.common.services.data;
    },
  },
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/common/getAllFacilities1',
      getAllServices: 'renter/common/getAllServices1',
    }),
  },
  created() {
    console.log('hostel group editor is created');
    this.getAllFacilities();
    this.getAllServices();
  },
};
</script>
