<template>
  <v-container>
    <v-overlay :value="pickDate">
      <v-date-picker v-model="date"></v-date-picker>
      <v-btn @click="pick('date')"><v-icon>mdi-close</v-icon></v-btn>
    </v-overlay>
    <v-overlay :value="pickTime">
      <v-time-picker v-model="time" format="24hr"></v-time-picker>
      <v-btn @click="pick('time')"><v-icon>mdi-close</v-icon></v-btn>
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
              v-model="info.rating"
              color="yellow"
              half-increments
              hover></v-rating>
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
          <div class="below d-flex justify-center align-center">
            <v-btn class="ma-6">
              <v-icon left>fas fa-paper-plane</v-icon>
              Book now!
            </v-btn>
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
  },
  async created() {
    this.info = json;
  },
};
</script>
<style>
.info-card {
  width: 100%;
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
