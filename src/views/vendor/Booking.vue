<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="cancelDialog.show" max-width="290">
      <v-card>
        <v-card-title class="headline">Bạn mốn hủy hẹn?</v-card-title>
        <v-card-text>
          <p>Hãy cho chúng tôi biết lý do bạn muốn hủy cuộc hẹn này.</p>
          <v-textarea outlined name="input-7-4" label="Lý do hủy hẹn"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" dark @click="unshowCancelDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn color="red darken-1" dark @click="doCancelBooking">
            <v-icon>done</v-icon>
            Hủy hẹn ngay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row v-if="!isLoading">
      <v-col>
        <v-row no-gutters class="hidden-sm-and-up mb-2">
          <v-col cols="4" />
          <v-col cols="4" class="d-flex justify-center">
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ statusToLabel[status] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="changeStatus('ALL')">
                  <v-list-item-title>Tất cả</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeStatus('INCOMING')">
                  <v-list-item-title>Sắp tới</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeStatus('DONE')">
                  <v-list-item-title>Hoàn tất</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeStatus('CANCELLED')">
                  <v-list-item-title>Đã hủy</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="4" class="d-flex justify-center">
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Ngày</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Tuần</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Tháng</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 Ngày</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"> Hôm nay </v-btn>
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
            <div class="hidden-sm-and-down">
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                    <span>{{ statusToLabel[status] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="changeStatus('ALL')">
                    <v-list-item-title>Tất cả</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="changeStatus('INCOMING')">
                    <v-list-item-title>Sắp tới</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="changeStatus('DONE')">
                    <v-list-item-title>Hoàn tất</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="changeStatus('CANCELLED')">
                    <v-list-item-title>Đã hủy</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Ngày</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Tuần</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Tháng</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 Ngày</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="500">
          <v-calendar
            locale="vi-vn"
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            :status="status"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="getEvents"
          ></v-calendar>
          <v-dialog
            v-model="selectedOpen"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card color="grey lighten-4" flat class="hidden-sm-and-up">
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <button class="d-flex justify-end" @click="onClickOutSide">X</button>
              </v-toolbar>
              <v-card-text v-if="selectedEvent && selectedEvent.data" class="pt-9">
                <p class="text-center">
                  <v-avatar>
                    <v-img
                      :src="selectedEvent.data.renter.avatar || require('@/assets/user.png')"
                    />
                  </v-avatar>
                  <span class="text-h6 blue--text"> {{ selectedEvent.data.renter.username }} </span>
                </p>
                <v-row>
                  <v-col cols="6">
                    <p><v-icon>call</v-icon> {{ selectedEvent.data.renter.phone }}</p>
                    <p v-if="selectedEvent.data.deal != null">
                      <span>
                        <v-icon>money</v-icon> {{ selectedEvent.data.deal.offeredPrice }}
                        {{ selectedEvent.data.type.priceUnit }}
                      </span>
                    </p>
                    <p v-if="selectedEvent.data.deal == null">
                      <span>
                        <v-icon>money</v-icon> {{ selectedEvent.data.type.price }}
                        {{ selectedEvent.data.type.priceUnit }}
                      </span>
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <div
                      v-if="selectedEvent.data.status === 'INCOMING'"
                      v-on="changeToString(selectedEvent.data.bookingId)"
                    >
                      <p>Mã xác nhận xem phòng</p>
                      <qrcode-vue :value="qrvalue" :size="100" level="H"></qrcode-vue>
                    </div>
                  </v-col>
                </v-row>
                <p>
                  <span class="font-weight-bold">
                    <v-icon>today</v-icon>
                    {{ new Date(selectedEvent.start).toLocaleDateString('vi-vn') }}
                  </span>

                  <span class="font-weight-bold">
                    <v-icon>schedule</v-icon>
                    {{ new Date(selectedEvent.start).toLocaleTimeString('vi-vn') }} -
                    {{ new Date(selectedEvent.end).toLocaleTimeString('vi-vn') }}
                  </span>
                </p>
                <p><v-icon>category</v-icon> {{ selectedEvent.data.type.title }}</p>
                <p>
                  <v-icon>room</v-icon>
                  <span class="font-weight-bold">{{ selectedEvent.data.group.groupName }}</span>
                  , đường
                  <span class="font-weight-bold">{{
                    selectedEvent.data.group.address.streetName
                  }}</span>
                </p>
              </v-card-text>
              <v-card-actions
                v-if="selectedEvent && selectedEvent.data"
                class="d-flex justify-center"
              >
                <v-btn
                  v-if="selectedEvent.data.status === 'INCOMING'"
                  dark
                  color="red"
                  @click="showCancelDialog(selectedEvent.data.bookingId)"
                >
                  Hủy hẹn
                </v-btn>
                <v-btn
                  v-if="selectedEvent.data.status === 'DONE'"
                  @click="changeToSContractString(se)"
                  :to="`/vendor/contract?bookingId=${selectedEvent.data.bookingId}&mode=create`"
                  title="Tạo hợp đồng"
                >
                  <v-icon left>far fa-handshake</v-icon>
                  Xem hợp đồng
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card color="grey lighten-4" flat class="hidden-sm-and-down">
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <button class="d-flex justify-end" @click="onClickOutSide">X</button>
              </v-toolbar>
              <v-card-text v-if="selectedEvent && selectedEvent.data" class="pt-9">
                <p class="text-center">
                  <v-avatar>
                    <v-img
                      :src="selectedEvent.data.renter.avatar || require('@/assets/user.png')"
                    />
                  </v-avatar>
                  <span class="text-h6 blue--text ml-3">
                    {{ selectedEvent.data.renter.username }}
                  </span>
                </p>
                <v-row style="font-size: 20px" v-if="selectedEvent.data.status === 'INCOMING'">
                  <v-col cols="1"></v-col>
                  <v-col cols="5">
                    <p class="font-weight-bold">
                      <v-icon left>call</v-icon> {{ selectedEvent.data.renter.phone }}
                    </p>
                    <p v-if="selectedEvent.data.deal != null">
                      <span class="font-weight-bold">
                        <v-icon left>money</v-icon> {{ selectedEvent.data.deal.offeredPrice }}
                        {{ selectedEvent.data.type.priceUnit }}
                      </span>
                    </p>
                    <p v-if="selectedEvent.data.deal == null">
                      <span class="font-weight-bold">
                        <v-icon left>money</v-icon> {{ selectedEvent.data.type.price }}
                        {{ selectedEvent.data.type.priceUnit }}
                      </span>
                    </p>
                    <p>
                      <span class="font-weight-bold">
                        <v-icon left>today</v-icon>
                        {{ new Date(selectedEvent.start).toLocaleDateString('vi-vn') }}
                      </span>

                      <span class="font-weight-bold ml-6">
                        <v-icon left>schedule</v-icon>
                        {{ new Date(selectedEvent.start).toLocaleTimeString('vi-vn') }} -
                        {{ new Date(selectedEvent.end).toLocaleTimeString('vi-vn') }}
                      </span>
                    </p>
                    <p class="font-weight-bold">
                      <v-icon left>category</v-icon> {{ selectedEvent.data.type.title }}
                    </p>
                    <p class="font-weight-bold">
                      <v-icon left>room</v-icon>
                      <span class="font-weight-bold">{{ selectedEvent.data.group.groupName }}</span>
                      , đường
                      <span class="font-weight-bold">{{
                        selectedEvent.data.group.address.streetName
                      }}</span>
                    </p>
                  </v-col>
                  <v-col cols="1" />
                  <v-col cols="5">
                    <div
                      v-if="selectedEvent.data.status === 'INCOMING'"
                      v-on="changeToString(selectedEvent.data.bookingId)"
                    >
                      <p class="mb-3">Mã xác nhận xem phòng</p>
                      <qrcode-vue :value="qrvalue" :size="230" level="H"></qrcode-vue>
                    </div>
                  </v-col>
                </v-row>
                <v-row
                  style="font-size: 20px"
                  v-if="
                    selectedEvent.data.status === 'CANCELLED' ||
                    selectedEvent.data.status === 'DONE'
                  "
                >
                  <v-col cols="4"></v-col>
                  <v-col cols="4">
                    <p class="font-weight-bold">
                      <v-icon left>call</v-icon> {{ selectedEvent.data.renter.phone }}
                    </p>
                    <p v-if="selectedEvent.data.deal != null">
                      <span class="font-weight-bold">
                        <v-icon left>money</v-icon> {{ selectedEvent.data.deal.offeredPrice }}
                        {{ selectedEvent.data.type.priceUnit }}
                      </span>
                    </p>
                    <p v-if="selectedEvent.data.deal == null">
                      <span class="font-weight-bold">
                        <v-icon left>money</v-icon> {{ selectedEvent.data.type.price }}
                        {{ selectedEvent.data.type.priceUnit }}
                      </span>
                    </p>
                    <p>
                      <span class="font-weight-bold">
                        <v-icon left>today</v-icon>
                        {{ new Date(selectedEvent.start).toLocaleDateString('vi-vn') }}
                      </span>

                      <span class="font-weight-bold ml-6">
                        <v-icon left>schedule</v-icon>
                        {{ new Date(selectedEvent.start).toLocaleTimeString('vi-vn') }} -
                        {{ new Date(selectedEvent.end).toLocaleTimeString('vi-vn') }}
                      </span>
                    </p>
                    <p class="font-weight-bold">
                      <v-icon left>category</v-icon> {{ selectedEvent.data.type.title }}
                    </p>
                    <p class="font-weight-bold">
                      <v-icon left>room</v-icon>
                      <span class="font-weight-bold">{{ selectedEvent.data.group.groupName }}</span>
                      , đường
                      <span class="font-weight-bold">{{
                        selectedEvent.data.group.address.streetName
                      }}</span>
                    </p>
                  </v-col>
                  <v-col cols="4" />
                </v-row>
              </v-card-text>
              <v-card-actions
                v-if="selectedEvent && selectedEvent.data"
                class="d-flex justify-center"
              >
                <v-btn
                  v-if="selectedEvent.data.status === 'INCOMING'"
                  dark
                  color="red"
                  @click="showCancelDialog(selectedEvent.data.bookingId)"
                >
                  Hủy hẹn
                </v-btn>
                <v-btn
                  v-if="selectedEvent.data.status === 'DONE'"
                  @click="changeToSContractString(se)"
                  :to="`/vendor/contract?bookingId=${selectedEvent.data.bookingId}&mode=create`"
                  title="Tạo hợp đồng"
                >
                  <v-icon left>far fa-handshake</v-icon>
                  Xem hợp đồng
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'VendorBooking',
  components: {
    QrcodeVue,
  },
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Tháng',
      week: 'Tuần',
      day: 'Ngày',
      '4day': '4 ngày',
    },
    status: 'ALL',
    statusToLabel: {
      ALL: 'Tất cả',
      INCOMING: 'Sắp tới',
      DONE: 'Hoàn tất',
      CANCELLED: 'Đã hủy',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['green', 'amber', 'red'],
    names: ['Sắp tới', 'Hoàn tất', 'Đã hủy'],
    cancelDialog: {
      show: false,
      bookingId: undefined,
    },
    time: {
      start: {},
      end: {},
    },
    dialog: false,
    dialogContract: false,
    qrvalue: null,
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
    incommingBookings() {
      return this.bookings.data.filter((booking) => booking.status === 'INCOMING');
    },
    doneBookings() {
      return this.bookings.data.filter((booking) => booking.status === 'DONE');
    },
    cancelledBookings() {
      return this.bookings.data.filter((booking) => booking.status === 'CANCELLED');
    },
  },
  methods: {
    ...mapActions({
      getBookings: 'user/getBookings',
      getUser: 'user/getUser',
      cancelBooking: 'user/cancelBooking',
    }),
    changeToString(bookingId) {
      this.dialog = true;
      this.cancelDialog.show = false;
      this.qrvalue = `booking:${bookingId}`;
    },
    changeToSContractString() {
      this.dialogContract = true;
      this.cancelDialog.show = false;
    },
    getEvents({ start, end }) {
      const events = [];
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const { length } = this.bookings.data;
      for (let i = 0; i < length; i += 1) {
        const booking = this.bookings.data[i];
        const meetTime = new Date(booking.meetTime);
        if (meetTime >= min && meetTime <= max) {
          if (this.status === 'ALL') {
            events.push({
              name: this.getEventName(booking),
              start: meetTime.getTime(),
              end: meetTime.setMinutes(meetTime.getMinutes() + 30),
              color: this.getEventColor(booking),
              timed: true,
              data: booking,
            });
          } else if (this.status.toUpperCase() === booking.status) {
            events.push({
              name: this.getEventName(booking),
              start: meetTime.getTime(),
              end: meetTime.setMinutes(meetTime.getMinutes() + 30),
              color: this.getEventColor(booking),
              timed: true,
              data: booking,
            });
          }
        }
      }
      this.time.start = start;
      this.time.end = end;
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
        console.log(`showevent${this.selectedEvent.data.bookingId}`);
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
    showCancelDialog(bookingId) {
      this.cancelDialog.show = true;
      this.cancelDialog.bookingId = bookingId;
    },
    unshowCancelDialog() {
      this.cancelDialog.show = false;
      this.cancelDialog.bookingId = undefined;
    },
    doCancelBooking() {
      this.cancelBooking(this.cancelDialog.bookingId).then(this.unshowCancelDialog());
    },
    changeStatus(status) {
      this.status = status;
      let filterData = this.bookings.data.filter((item) => item.status === status);
      if (status === 'ALL') {
        filterData = this.bookings.data;
      }

      const events = [];
      for (let i = 0; i < filterData.length; i += 1) {
        const booking = filterData[i];
        events.push({
          name: this.getEventName(booking),
          start: new Date(booking.meetTime).getTime(),
          end: new Date(booking.meetTime).setMinutes(new Date(booking.meetTime).getMinutes() + 30),
          color: this.getEventColor(booking),
          timed: true,
          data: booking,
        });
      }
      this.events = events;
    },
    onClickOutSide() {
      console.log(`truoc${this.selectedEvent.data.bookingId}`);
      this.selectedOpen = false;
      // this.selectedEvent = null;
      console.log(`sau${this.selectedEvent.data.bookingId}`);
    },
  },
  created() {
    this.getUser()
      .then(() => this.getBookings())
      .then(() => this.$refs.calendar.checkChange());
  },
};
</script>
