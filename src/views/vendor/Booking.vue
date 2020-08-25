<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row v-if="!isLoading">
      <v-col cols="6">
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="getEvents"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>
              <v-card-text v-if="selectedEvent && selectedEvent.data">
                <v-avatar size="30">
                  <v-img :src="selectedEvent.data.renter.avatar" />
                </v-avatar>
                <span class="text-h6"> {{ selectedEvent.data.renter.username }} </span>
                <p>{{ selectedEvent.data.renter.phone }}</p>
                <p>{{ new Date(selectedEvent.start).toLocaleDateString('vn') }}</p>
                <p>{{ new Date(selectedEvent.start).toLocaleTimeString('vn') }}</p>
                <p>{{ selectedEvent.data.group.street.streetName }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'VendorBooking',
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['green', 'amber', 'red'],
    names: ['Sắp tới', 'Hoàn tất', 'Đã hủy'],
  }),
  computed: {
    ...mapState({
      bookings: (state) => state.user.bookings,
      user: (state) => state.user.user,
    }),
    isLoading() {
      const isLoadingBookings = this.bookings.isLoading;
      const isLoadingUser = this.user.isLoading;
      return isLoadingBookings || isLoadingUser;
    },
  },
  methods: {
    ...mapActions({
      getBookings: 'user/getBookings',
      getUser: 'user/getUser',
    }),
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const { length } = this.bookings.data;
      for (let i = 0; i < length; i += 1) {
        const booking = this.bookings.data[i];
        const meetTime = new Date(booking.meetTime);
        if (meetTime >= min && meetTime <= max) {
          const endTime = meetTime.setMinutes(meetTime.getMinutes() + 30);
          events.push({
            name: this.getEventName(booking),
            start: meetTime.getTime(),
            end: endTime,
            color: this.getEventColor(booking),
            timed: true,
            data: booking,
          });
        }
      }

      this.events = events;
    },
    getEventName(event) {
      switch (event.status) {
        case 'INCOMING':
          return this.names[0];
        case 'DONE':
          return this.names[1];
        case 'CANCELLED':
          return this.names[2];
        default:
          return null;
      }
    },
    getEventColor(event) {
      switch (event.name) {
        case 'Sắp tới':
          return this.colors[0];
        case 'Hoàn tất':
          return this.colors[1];
        case 'Đã hủy':
          return this.colors[2];
        default:
          return null;
      }
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
  created() {
    this.getUser()
      .then(() => this.getBookings())
      .then(() => this.$refs.calendar.checkChange());
  },
};
</script>
