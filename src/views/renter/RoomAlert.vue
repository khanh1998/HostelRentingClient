<template>
  <v-row class="bg-main py-8" justify="center">
    <v-col cols="11" md="11" lg="11" xl="10" class="pa-0">
      <v-col cols="7">
        <v-card>
          <v-card-title
            class="size-1rem font-nunito text-primary font-weight-bold text-uppercase d-flex justify-center"
            >Thông tin phòng trọ theo yêu cầu</v-card-title
          >
          <v-divider></v-divider>
          <v-card-text>
            <v-row class="ma-0">
              <v-col cols="4" class="d-flex flex-column px-6">
                <span class="field-name font-weight-medium">Ngày nhận phòng: </span>
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
                      hide-details
                      v-bind="attrs"
                      v-on="on"
                      :value="startTimeString"
                      height="30"
                      class="size-sub-2 font-nunito form"
                      solo
                      dense
                      light
                      append-icon="mdi-calendar-blank"
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
              <v-col cols="8" class="d-flex flex-column px-6">
                <span class="field-name font-weight-medium">Khu vực tìm kiếm:</span>
                <div class="d-flex">
                  <v-col cols="11" class="d-flex flex-column pa-0">
                    <gmap-autocomplete
                      placeholder="Địa điểm, khu vực... bạn muốn ở gần"
                      _class="form-control"
                      :selectFirstOnEnter="true"
                      hide-details
                      style="
                        border: 1px solid #dee2e6 !important;
                        border-right: 0px;
                        border-radius: 4px;
                        border-top-right-radius: 0px;
                        border-bottom-right-radius: 0px;
                      "
                      class="pa-2 address-autocomplete"
                    ></gmap-autocomplete>
                  </v-col>
                  <v-col cols="1" class="pa-0">
                    <v-btn
                      icon
                      @click="clearField()"
                      height="100%"
                      min-width="100%"
                      style="
                        border: 1px solid #dee2e6 !important;
                        border-left: 0px;
                        border-radius: 4px;
                        border-top-left-radius: 0px;
                        border-bottom-left-radius: 0px;
                      "
                    >
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </div>
              </v-col>
              <v-col cols="4" class="d-flex flex-column px-6">
                <span class="field-name font-weight-medium">Bán kính tìm kiếm:</span>
                <v-select
                  :items="distances"
                  v-model="chip"
                  dense
                  hide-details
                  solo
                  class="size-sub-2 font-nunito form"
                ></v-select>
                <!-- <v-chip-group v-model="chip" color="#4250f2">
                  <v-chip filter class="font-nunito">3 km</v-chip>
                  <v-chip filter class="font-nunito">5 km</v-chip>
                  <v-chip filter class="font-nunito">7 km</v-chip>
                  <v-chip filter class="font-nunito">10 km</v-chip>
                </v-chip-group> -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-col>

    <v-container>
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
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
      <v-row class="rounded-lg elevation-5">
        <v-col cols="12">
          <div class="d-flex justify-center align-center">
            <span>Đặt thông báo cho phòng trọ mong muốn</span>
          </div>
        </v-col>
        <v-col cols="4">
          <v-card-text>Địa điểm, khu vực... bạn muốn ở gần</v-card-text>
          <div class="d-flex align-center"></div>
        </v-col>
        <v-col cols="3">
          <v-card-text>Chọn ngày nhận phòng</v-card-text>
          <!-- <v-menu
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
                hide-details
                v-bind="attrs"
                v-on="on"
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
          </v-menu> -->
        </v-col>
        <v-col cols="3">
          <v-card-text>Giá tối đa mà bạn muốn trả</v-card-text>
          <v-text-field
            hide-details
            v-model="request.maxPrice"
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
        <v-col cols="4">
          <v-card-text>Bán kính tìm kiếm tính từ vị trí mà bạn đã chọn</v-card-text>
          <v-select :items="distances" v-model="chip"></v-select>
          <!-- <v-chip-group v-model="chip" mandatory>
            <v-chip filter>3 km</v-chip>
            <v-chip filter>5 km</v-chip>
            <v-chip filter>7 km</v-chip>
            <v-chip filter>10 km</v-chip>
          </v-chip-group> -->
        </v-col>
        <v-col cols="4">
          <v-card-text>Diện tích tối thiểu</v-card-text>

          <v-chip-group v-model="chip1" mandatory>
            <v-chip filter>10 m2</v-chip>
            <v-chip filter>15 m2</v-chip>
            <v-chip filter>20 m2</v-chip>
            <v-chip filter>25 m2</v-chip>
            <v-chip filter>30 m2</v-chip>
            <v-chip filter>40 m2</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row class="rounded-lg elevation-5 mt-5">
        <v-col>
          <v-slide-group v-model="slide.requestIndex" show-arrows>
            <v-slide-item
              v-for="request in requests.data"
              :key="request.requestId"
              v-slot="{ active, toggle }"
            >
              <v-card
                :color="active ? 'blue lighten-1' : 'grey lighten-1'"
                @click="toggle"
                class="ma-2 elevation-5"
                width="250"
              >
                <v-card-title>
                  {{ request.address }}
                  <v-spacer />
                  <v-btn icon @click="slide.short = !slide.short">
                    <v-icon v-if="slide.short">arrow_drop_down</v-icon>
                    <v-icon v-if="!slide.short">arrow_drop_up</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text v-if="!slide.short">
                  <p>Ngày nhận phòng: {{ new Date(request.dueTime).toLocaleDateString('vi') }}</p>
                  <p>Giá tối đa: {{ request.maxPrice }} Triệu</p>
                  <p>Diện tích tối thiểu: {{ request.minSuperficiality }} m2</p>
                  <p>Bán kính tìm kiếm: {{ request.maxDistance }} km</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="getResult(request.requestId)" text>Xem danh sách phòng</v-btn>
                </v-card-actions>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
      <v-row class="rounded-lg elevation-5 mt-5" v-if="result">
        <v-col v-for="type in result.types" :key="type.typeId" cols="3">
          <CarouselItem :type="type" :typeGroup="getGroupOfType(type.groupId)" />
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import validateMixin from '../../components/mixins/validate';
import snackbarMixin from '../../components/mixins/snackBar';
import CarouselItem from '../../components/home/TopCarouselItem.vue';

export default {
  name: 'RoomAlert',
  components: { CarouselItem },
  mixins: [validateMixin, snackbarMixin],
  data: () => ({
    result: null,
    slide: {
      short: true,
      requestIndex: 0,
    },
    menu1: null,
    chip: '3km',
    chip1: 1,
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
      address: null,
      dueTime: new Date(new Date().toISOString().substr(0, 10)).getTime(),
      latitude: 10.7542893,
      longitude: 106.1346955,
      maxDistance: 5,
      maxPrice: 2,
      minSuperficiality: 15,
    },
    isLoadingResult: false,
    distances: ['3 km', '5 km', '7km', '10 km'],
  }),
  methods: {
    ...mapActions({
      createRoomRequest: 'user/createRoomRequest',
      getRoomRequests: 'user/getRoomRequests',
      getUser: 'user/getUser',
    }),
    getGroupOfType(groupId) {
      return this.result.groups.find((group) => group.groupId === groupId);
    },
    doCreateRoomRequest() {
      this.request.maxPrice = Number(this.request.maxPrice);
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
      this.request.address = `${place.name}-${place.formatted_address}`;
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
    getResult(requestId) {
      this.isLoadingResult = true;
      try {
        axios.get(`/api/v1/types?requestId=${requestId}`).then((res) => {
          this.result = res.data.data;
          this.isLoadingResult = false;
        });
      } catch (error) {
        console.log(error);
        this.isLoadingResult = false;
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
      return (
        this.requests.isLoading ||
        this.requests.isCreating ||
        this.user.isLoading ||
        this.isLoadingResult
      );
    },
  },
  created() {
    this.geolocate();
    if (!this.user.data) {
      this.getUser().then(() => this.getRoomRequests());
    }
  },
  watch: {
    startTime() {
      this.request.dueTime = new Date(this.startTime).getTime();
    },
    chip(index) {
      switch (index) {
        case 0:
          this.request.maxDistance = 3;
          break;
        case 1:
          this.request.maxDistance = 5;
          break;
        case 2:
          this.request.maxDistance = 7;
          break;
        case 3:
          this.request.maxDistance = 10;
          break;
        default:
          break;
      }
    },
    chip1(index) {
      switch (index) {
        case 0:
          this.request.minSuperficiality = 10;
          break;
        case 1:
          this.request.minSuperficiality = 15;
          break;
        case 2:
          this.request.minSuperficiality = 20;
          break;
        case 3:
          this.request.minSuperficiality = 25;
          break;
        case 4:
          this.request.minSuperficiality = 30;
          break;
        case 5:
          this.request.minSuperficiality = 40;
          break;
        default:
          break;
      }
    },
  },
};
</script>
