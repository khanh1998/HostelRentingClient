<template>
  <v-container>
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Đang tạo
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-title>
          <span v-if="requests.success"> </span>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}
    </v-snackbar>
    <v-row>
      <v-col cols="12">Đặt thông báo cho phòng trọ mong muốn</v-col>
      <v-col cols="4">
        <div class="searchBar d-flex align-center">
          <gmap-autocomplete
            placeholder="Địa điểm, khu vực... bạn muốn ở gần"
            class="col-11 gmap-input text-body-2 blue-grey--text"
            @place_changed="setPlace"
            :selectFirstOnEnter="true"
          ></gmap-autocomplete>
          <v-btn icon @click="clearField()">
            <v-icon>clear</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="3">
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              readonly
              v-bind="attrs"
              v-on="on"
              label="Chọn ngày nhận phòng"
              :value="startTimeString"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startTime"
            no-title
            @input="menu1 = false"
            locale="vi"
            :allowed-dates="allowedDates"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="request.price"
          type="number"
          suffix="Triệu"
          :rules="isPositiveNum"
          :step="0.1"
        />
      </v-col>
      <v-col cols="2">
        <v-btn icon @click="doCreateRoomRequest">
          <v-icon>add_circle_outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row></v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import validateMixin from '../../components/mixins/validate';
import snackbarMixin from '../../components/mixins/snackBar';

export default {
  name: 'RoomAlert',
  mixins: [validateMixin, snackbarMixin],
  data: () => ({
    menu1: null,
    price: 0,
    startTime: new Date().toISOString().substr(0, 10),
    date: '',
    overlay: {
      show: false,
    },
    address: '',
    currentPlace: null,
    visibleProperty: 'hidden',
    searchValue: '',
    request: {
      dueDate: new Date(new Date().toISOString().substr(0, 10)).getTime(),
      latitude: 10.7542893,
      longitude: 106.1346955,
      maxRadius: 5,
      price: 0,
      superficiality: 0,
    },
  }),
  methods: {
    ...mapActions({
      createRoomRequest: 'user/createRoomRequest',
      getUser: 'user/getUser',
    }),
    doCreateRoomRequest() {
      this.request.price = Number(this.request.price);
      this.createRoomRequest(this.request).then(() => {
        if (this.requests.success) {
          this.showSnackBar('Tạo request thành công', { color: 'green' });
        } else {
          this.showSnackBar('Tạo request thất bại', { color: 'red' });
        }
      });
    },
    setPlace(place) {
      this.currentPlace = place;
      this.address = `${place.name}-${place.formatted_address}`;
      this.searchValue = place.formatted_address;
      this.request.latitude = place.geometry.location.lat();
      this.request.longitude = place.geometry.location.lng();
    },
    clearField() {},
    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          this.request.latitude = position.coords.latitude;
          this.request.longitude = position.coords.longitude;
        });
      }
    },
  },
  computed: {
    ...mapState({
      requests: (state) => state.user.requests,
      user: (state) => state.user.user,
    }),
    startTimeString() {
      return new Date(this.startTime).toLocaleDateString('vi');
    },
    isLoading() {
      return this.request.isLoading || this.request.isCreating || this.user.isLoading;
    },
  },
  created() {
    this.geolocate();
    if (!this.user.data) {
      this.getUser();
    }
  },
  watch: {
    startTime() {
      this.request.dueDate = new Date(this.startTime).getTime();
    },
  },
};
</script>
