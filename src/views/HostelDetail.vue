<template>
  <v-container>
    <v-overlay :value="dateTimePicker.isOpenPicker">
      <dateTimePicker
        v-on:cancel="dateTimePicker.isOpenPicker = false"
        v-on:ok="receivedDateTime"
      />
    </v-overlay>
    <v-row>
      <v-col cols="8">
        <v-carousel
          cycle
          progress
          progress-color="red"
          height="400"
          delimiter-icon="mdi-circle-medium"
          next-icon="mdi-arrow-right-bold"
          prev-icon="mdi-arrow-left-bold">
          <v-carousel-item v-for="(image, i) in info.images" :key="i">
            <v-img max-height="400" v-bind:src="info.images[i]"/>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="4">
        <div class="info-card d-flex flex-column ">
          <div class="above d-flex flex-column justify-center align-center">
            <v-chip
              class="ma-6"
              color="#F6F7F9"
              text-color="black"
              large
            >
              <v-avatar height="64" width="64" left>
                <v-img max-height="64" max-width="64" src="../assets/logo.png"/>
              </v-avatar>
              <p class="text-h5 text-center ma-2">Nhà trọ {{info.name}}</p>
            </v-chip>
            <v-rating
              v-model="info.rating.average"
              color="yellow"
              half-increments
              hover></v-rating> ({{info.rating.total}})
            <v-btn
              class="ma-2"
              tile outlined color="success"
              @click="pick('date')">
              <v-icon left>fas fa-calendar-plus</v-icon> Chọn ngày giờ
            </v-btn>
          </div>
          <div
            v-if="dateTimePicker.date != null && dateTimePicker.time != null"
            class="d-flex flex-column align-center justify-center"
          >
            <p>{{dateTimePicker.date.getDate()}}/
              {{dateTimePicker.date.getMonth()}}/
              {{dateTimePicker.date.getFullYear()}}
            </p>
            <p>{{dateTimePicker.time}}</p>
          </div>
          <v-spacer/>
          <div class="below d-flex justify-center align-center">
            <v-dialog v-model="dialog.booking" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="red"
                  outlined width="80%"
                  class="ma-6" @click="book"
                >
                  <v-icon left>fas fa-paper-plane</v-icon>
                  Đặt ngay!
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Xác nhận đặt lịch</v-card-title>
                <v-card-text
                  v-if="dateTimePicker.date != null && dateTimePicker.time != null"
                >
                  Bạn muốn đặt lịch vào ngày
                  <span> {{dateTimePicker.date.getDate()}}/
                  {{dateTimePicker.date.getMonth()}}/
                  {{dateTimePicker.date.getFullYear()}},
                  </span>
                   vào lúc {{dateTimePicker.time}}
                   tại nhà trọ {{info.name}}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog.booking = false">Không</v-btn>
                  <v-btn color="green darken-1" text @click="sendBooking">Có</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-snackbar
              v-model="snackbar.display"
              :bottom="snackbar.bottom"
              :color="snackbar.color"
              >
              {{snackbar.message}}

              <template v-slot:action="{ attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  @click="snackbar.display = false"
                >
                  Đóng
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <p class="text-h5 blue--text">{{info.price}} đ</p>
        <p class="text-caption">114 lượt xem</p>
      </v-col>
      <v-col cols="4">
        <p class="font-weight-bold">{{info.address}}</p>
        <p class="font-weight-medium grey--text">{{info.description}}</p>
      </v-col>
      <v-col cols="2">
        <div class="d-flex justify-end align-start" style="width: 100%; height: 100%">
          <v-btn
            color="orange"
            outlined
            >
            <v-icon class="mr-6">fas fa-comment-dots</v-icon> Nhắn tin ngay!
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-chip
          color="primary"
          outlined
          label
        >
          <v-icon left>fas fa-info-circle</v-icon>
          Thông tin phòng
        </v-chip>
      </v-col>
      <v-col cols="6">
        <v-divider class="mb-6"/>
        <div class="d-flex flex-column">
          <div class="above d-flex justify-space-around">
            <div style="width: 140px">
              <p class="font-weight-medium grey--text">Diện tích</p>
              <p class="font-weight-bold">{{info.details.area}} m2</p>
            </div>
            <div style="width: 140px">
              <p class="font-weight-medium grey--text">Sức chứa</p>
              <p class="font-weight-bold">{{info.details.capacity}} người</p>
            </div>
            <div style="width: 140px">
              <p class="font-weight-medium grey--text">Toilet</p>
              <p class="font-weight-bold">{{info.details.toilet}}</p>
            </div>
            <div style="width: 140px">
              <p class="font-weight-medium grey--text" >Nấu ăn</p>
              <p class="font-weight-bold" v-if="info.details.cooking">Có</p>
              <p class="font-weight-bold" v-if="!info.details.cooking">Không</p>
            </div>
          </div>
          <div class="above d-flex justify-space-around">
            <div style="width: 140px">
              <p class="font-weight-medium grey--text">Điện</p>
              <p class="font-weight-bold">
                {{info.details.electricity.price}}
                {{info.details.electricity.unit}}
              </p>
            </div>
            <div style="width: 140px">
              <p class="font-weight-medium grey--text">Nước</p>
              <p class="font-weight-bold">
                {{info.details.water.price}}
                {{info.details.water.unit}}
              </p>
            </div>
            <div style="width: 140px">
              <p class="font-weight-medium grey--text">Wifi</p>
              <p class="font-weight-bold">
                {{info.details.wifi.price}}
                {{info.details.wifi.unit}}
              </p>
            </div>
            <div style="width: 140px">
              <p class="font-weight-medium grey--text">Rác</p>
              <p class="font-weight-bold">
                {{info.details.garbage.price}}
                {{info.details.garbage.unit}}
              </p>
            </div>
          </div>
          <div class="above d-flex flex-column">
            <div class="d-flex">
              <p class="font-weight-bold blue--text mr-8">Tiện nghi</p>
              <p class="font-weight-thin">
                {{info.details.facility.join(', ')}}
              </p>
            </div>
            <div class="d-flex">
              <p class="font-weight-bold blue--text mr-8">Dịch vụ</p>
              <p class="font-weight-thin">
                {{info.details.service.join(', ')}}
              </p>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <div>
            <div class="primary d-flex justify-space-between">
              <v-card-title class="white--text text-h6">
                Tiện nghi xung quanh
              </v-card-title>
              <v-card-actions>
                <v-btn color="success" class="ma-1">
                  <v-icon>fas fa-map-signs</v-icon> Bản đồ
                </v-btn>
              </v-card-actions>
            </div>
            <v-treeview
              v-model="treeview.tree"
              :open="treeview.open"
              :items="treeview.items"
              activatable
              item-key="name"
              dense
              hoverable
              rounded
            >
              <template v-slot:prepend="{ item, open }">
                <v-icon v-if="!item.icon">
                  {{ open ? 'mdi-folder-open' : 'fas fa-map-marker-alt' }}
                </v-icon>
                <v-icon v-else>
                  {{ treeview.icons[item.icon] }}
                </v-icon>
              </template>
              <template v-slot:append="{item, leaf}">
                <div class="blue--text font-weight-bold" v-if="leaf">
                  {{item.distance}}
                </div>
                <div v-else class="green--text font-weight-bold">
                  ({{item.children.length}})
                </div>
              </template>
            </v-treeview>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import json from '../assets/hostel-detail.json';
import dateTimePicker from '../components/hostel_type/dateTimePicker.vue';

export default {
  name: 'HostelDetail',
  components: { dateTimePicker },
  data: () => ({
    info: null, // infomation of the hostel that being display
    dateTimePicker: {
      isOpenPicker: false,
      date: null,
      time: null,
    },
    dialog: {
      booking: false,
    },
    snackbar: {
      display: false,
      message: '',
      color: 'red',
      bottom: true,
    },
    treeview: {
      open: [],
      icons: {
        market: 'fas fa-shopping-cart',
        school: 'fas fa-graduation-cap',
        bus: 'fas fa-bus',
        hospital: 'fas fa-hospital',
        bank: 'fas fa-hand-holding-usd',
      },
      tree: [],
      items: [
        {
          name: 'School',
          icon: 'school',
          children: [
            {
              name: 'Fpt University',
              distance: '5km',
            },
            {
              name: 'University of Finance and Marketing',
              distance: '3km',
            },
          ],
        },
        {
          name: 'Market',
          icon: 'market',
          children: [
            {
              name: 'Bach Hoa Xanh',
              distance: '0.5km',
            },
            {
              name: 'Cicle K',
              distance: '1km',
            },
          ],
        },
        {
          name: 'Bus station',
          icon: 'bus',
          children: [
            {
              name: '123 Tran Thanh Tong',
              distance: '0.1km',
            },
            {
              name: '424 Tran Dai Nghia',
              distance: '0.5km',
            },
          ],
        },
        {
          name: 'Hospital',
          icon: 'hospital',
          children: [
            {
              name: 'Benh vien Quan 9',
              distance: '2km',
            },
          ],
        },
        {
          name: 'Bank',
          icon: 'bank',
          children: [
            {
              name: 'TP bank',
              distance: '1km',
            },
            {
              name: 'VP bank',
              distance: '4km',
            },
          ],
        },
      ],
    },
  }),
  methods: {
    pick(name) {
      if (name === 'date') {
        this.dateTimePicker.isOpenPicker = !this.dateTimePicker.isOpenPicker;
      }
      if (name === 'time') {
        this.timePicker.isOpenPicker = !this.timePicker.isOpenPicker;
      }
    },
    showSnackbar(color, message) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.display = true;
    },
    isPickDateAndTime() {
      if (this.date === null) {
        this.showSnackbar('red', 'Please pick a date');
        return false;
      }
      if (this.time === null) {
        this.showSnackbar('red', 'Please pick a time');
        return false;
      }
      return true;
    },
    book() {
      if (this.isPickDateAndTime()) {
        this.dialog.booking = true;
      }
    },
    sendBooking() {
      this.dialog.booking = false;
      this.showSnackbar('success', 'Bạn đã đặt lịch hẹn xem phòng thành công!!!');
    },
    allowedDates: () => true,
    receivedDateTime(event) {
      this.dateTimePicker.isOpenPicker = false;
      console.log(event);
      this.dateTimePicker.date = event.date;
      this.dateTimePicker.time = event.time;
    },
  },
  async created() {
    this.info = json;
  },
  computed: {
    detailsKey: {
      get() { return Object.keys(this.info.details); },
    },
    today: {
      get() {
        const d = new Date();
        const str = `${d.getFullYear()}-${d.getMonth() < 9 ? '0' : ''}${d.getMonth() + 1}-${d.getDate()}`;
        return str;
      },
    },
  },
};
</script>
<style>
.info-card {
  width: 100%;
  height: 100%;
  border: 2.5px solid #EDEFEE;
  box-sizing: border-box;
  border-radius: 10px;
}
.above {
  width: 100%;
}
.below {
  width: 100%;
  background: #F3F5F5;
}
</style>
