<template>
  <v-container>
    <v-overlay :value="pickDate">
      <v-date-picker v-model="date"></v-date-picker>
      <v-btn color="success" @click="pick('date')">
        <v-icon>fas fa-calendar-check</v-icon>
          Done
      </v-btn>
    </v-overlay>
    <v-overlay :value="pickTime">
      <v-time-picker v-model="time" format="24hr"></v-time-picker>
      <v-btn color="success" @click="pick('time')">
        <v-icon>fas fa-calendar-check</v-icon>
          Done
      </v-btn>
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
              <p class="text-h5 text-center ma-2">{{info.name}} Hostel</p>
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
              <v-icon left>fas fa-calendar-plus</v-icon> Pick date
            </v-btn>

            <v-btn
              class="ma-2"
              tile outlined color="success"
              @click="pick('time')"
              >
              <v-icon left>fas fa-clock</v-icon> Pick time
            </v-btn>
          </div>
          <v-spacer/>
          <div class="below d-flex justify-center align-center">
            <v-dialog v-model="dialog.booking" persistent max-width="290">
              <template v-slot:activator>
                <v-btn color="red" outlined width="80%" class="ma-6" @click="book">
                  <v-icon left>fas fa-paper-plane</v-icon>
                  Book now!
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Booking comfirmation</v-card-title>
                <v-card-text>
                  Do you want to make a booking at {{time}} {{date}} with {{info.name}}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog.booking = false">No</v-btn>
                  <v-btn color="green darken-1" text @click="sendBooking">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-snackbar
              v-model="snackbar.display"
              :bottom="snackbar.bottom"
              :color="snackbar.color"
              >
              {{snackbar.message}}
            </v-snackbar>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <p class="text-h5 blue--text">{{info.price}} vnd</p>
        <p class="text-h6 blue--text">{{info.unit}}</p>
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
            <v-icon class="mr-6">fas fa-comment-dots</v-icon> Chat now
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
          Details
        </v-chip>
      </v-col>
      <v-col cols="6">
        <v-divider class="mb-6"/>
        <div class="d-flex flex-column">
          <div class="above d-flex justify-space-around">
            <div>
              <p class="font-weight-medium grey--text">Area</p>
              <p class="font-weight-bold">{{info.details.area}} m2</p>
            </div>
            <div>
              <p class="font-weight-medium grey--text">Capacity</p>
              <p class="font-weight-bold">{{info.details.capacity}} person</p>
            </div>
            <div>
              <p class="font-weight-medium grey--text">Toilet</p>
              <p class="font-weight-bold">{{info.details.toilet}}</p>
            </div>
            <div>
              <p class="font-weight-medium grey--text" >Cooking</p>
              <p class="font-weight-bold" v-if="info.details.cooking">Yes</p>
              <p class="font-weight-bold" v-if="!info.details.cooking">No</p>
            </div>
          </div>
          <div class="above d-flex justify-space-around">
            <div>
              <p class="font-weight-medium grey--text">Electricity</p>
              <p class="font-weight-bold">
                {{info.details.electricity.price}}
                {{info.details.electricity.unit}}
              </p>
            </div>
            <div>
              <p class="font-weight-medium grey--text">Water</p>
              <p class="font-weight-bold">
                {{info.details.water.price}}
                {{info.details.water.unit}}
              </p>
            </div>
            <div>
              <p class="font-weight-medium grey--text">Wifi</p>
              <p class="font-weight-bold">
                {{info.details.wifi.price}}
                {{info.details.wifi.unit}}
              </p>
            </div>
            <div>
              <p class="font-weight-medium grey--text">Garbage</p>
              <p class="font-weight-bold">
                {{info.details.garbage.price}}
                {{info.details.garbage.unit}}
              </p>
            </div>
          </div>
          <div class="above d-flex flex-column">
            <div class="d-flex">
              <p class="font-weight-bold blue--text mx-8">Facility</p>
              <p class="font-weight-thin">
                {{info.details.facility.join(', ')}}
              </p>
            </div>
            <div class="d-flex">
              <p class="font-weight-bold blue--text mx-8">Service</p>
              <p class="font-weight-thin">
                {{info.details.service.join(', ')}}
              </p>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import json from '../assets/hostel-detail.json';

export default {
  name: 'HostelDetail',
  components: {},
  data: () => ({
    info: null,
    pickDate: false,
    pickTime: false,
    date: null,
    time: null,
    dialog: {
      booking: false,
    },
    snackbar: {
      display: false,
      message: '',
      color: 'red',
      bottom: true,
    },
  }),
  methods: {
    pick(name) {
      if (name === 'date') {
        this.pickDate = !this.pickDate;
      }
      if (name === 'time') {
        this.pickTime = !this.pickTime;
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
      this.showSnackbar('success', 'Booking is created successfully!!!');
    },
  },
  async created() {
    this.info = json;
  },
  computed: {
    detailsKey: {
      get() { return Object.keys(this.info.details); },
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
