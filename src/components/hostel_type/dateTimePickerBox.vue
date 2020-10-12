<template>
  <div
    class="d-flex flex-column align-center justify-center pa-4"
    v-if="!isLoading"
    style="background-color: #f7f7f7; border-bottom: 1px solid #eee; height: 100%;"
  >
    <v-dialog v-model="dateTimePicker.isOpenPicker" width="350">
      <v-card v-if="!userState.data" color="white" light>
        <v-card-title>Đăng nhập để đặt lịch xem phòng</v-card-title>
        <v-card-actions>
          <v-btn :to="registerRouteObject" dark class="green lighten-3">
            <v-icon>create</v-icon>Tạo tài khoản mới
          </v-btn>
          <v-spacer />
          <v-btn :to="loginRouteObject" dark class="blue lighten-3">
            <v-icon>login</v-icon>Đăng nhập
          </v-btn>
        </v-card-actions>
      </v-card>
      <dateTimePickerStepper
        v-if="userState.data"
        v-on:cancel="dateTimePicker.isOpenPicker = false"
        v-on:ok="receivedDateTime"
        :groupId="groupId"
      />
    </v-dialog>
    <v-avatar height="70" width="70" color="#727cf5" @click="getGroup()" class="cursor">
      <v-img v-if="avatar" max-height="70" max-width="70" :src="avatar" />
      <span v-else class="text-h4 white--text">{{ getAvatarTitle() }}</span>
    </v-avatar>
    <span class="text-body-1 font-weight-bold text-center font-nunito mt-2" style="color: #222;">
      {{ name }}
    </span>
    <div class="d-flex align-center font-nunito my-3">
      <v-icon color="#ffbc00" class="mr-2" x-small>fas fa-star</v-icon>
      <p class="grey--text mb-0">{{ ` ${rating.average} / 5` }}</p>
      <p class="mb-0 ml-1">( {{ rating.total }} )</p>
    </div>
    <div class="d-flex mb-4">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#ffbc00"
            outlined
            @click="$emit('openMessage')"
            rounded
            :disabled="userState.data && isVendor"
            class="font-nunito font-weight-bold"
            style="letter-spacing: 0.05rem !important; background-color: #fff;"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-3">fas fa-comment-dots</v-icon>Nhắn tin ngay!
          </v-btn>
        </template>
        <span>Hãy nhắn tin để thỏa thuận giá!</span>
      </v-tooltip>
    </div>
    <div class="d-flex justify-center align-center">
      <v-dialog v-model="dialog.booking" persistent max-width="290">
        <template v-slot:activator="{ attrs }">
          <v-btn
            v-bind="attrs"
            _color="#4F60C9"
            width="80%"
            class="mx-7 text-subtitle-2 white--text py-5 bg-primary"
            depressed
            tile
            @click="dateTimePicker.isOpenPicker = true"
            :disabled="hasPendingBooking || isVendor"
          >
            <v-icon left>event_available</v-icon>ĐẶT LỊCH XEM PHÒNG
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Xác nhận đặt lịch</v-card-title>
          <v-card-text v-if="dateTimePicker.date != null && dateTimePicker.time != null">
            Bạn muốn đặt lịch vào ngày
            <span>{{ dateTimePicker.date }}</span>
            vào lúc {{ dateTimePicker.time }} tại nhà trọ {{ name }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog.booking = false">Không</v-btn>
            <v-btn color="green darken-1" text @click="sendBooking">Có</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.display" :bottom="snackbar.bottom" :color="snackbar.color">
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.display = false">Đóng</v-btn>
        </template>
      </v-snackbar>
    </div>
    <span class="font-nunito text-caption mt-4" style="text-align: end !important;"
      >TRẠNG THÁI:
      <span class="text-subtitle-2" style="color: #1edb4c !important;"
        >3 lịch hẹn / 2 phòng trống</span
      ></span
    >
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import dateTimePickerStepper from './dateTimePickerStepper.vue';
import utils from '../../utils/firebaseNotification';

const { sendBookingNotification } = utils;

export default {
  name: 'DateTimePickerBox',
  components: { dateTimePickerStepper },
  props: {
    name: String,
    avatar: String,
    rating: Object,
    groupId: Number,
    typeId: Number,
    vendorId: Number,
  },
  data: () => ({
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
  }),
  methods: {
    ...mapActions({
      createBooking: 'user/createBooking',
      clearNewlyCreatedBooking: 'user/clearNewlyCreatedBooking',
    }),
    showSnackbar(color, message) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.display = true;
    },
    async sendBooking() {
      this.dialog.booking = false;
      this.showSnackbar('yellow', 'Booking của bạn đang được tạo');
      console.log(this.dateTimePicker);
      const dateTime = this.dateTimePicker.date.split('/');
      const timeTime = this.dateTimePicker.time.split(':');
      console.log(dateTime);
      console.log(timeTime);
      const bookingObj = {
        renterId: this.userState.data.userId,
        vendorId: this.vendorId,
        typeId: this.typeId,
        status: 'INCOMING',
        dealId: null,
        meetTime: new Date(
          dateTime[2],
          dateTime[1] - 1,
          dateTime[0],
          timeTime[0],
          timeTime[1],
        ).getTime(),
      };
      console.log(bookingObj);
      await this.createBooking(bookingObj);
      const success = this.newlyCreated;
      if (success) {
        this.showSnackbar('success', 'Bạn đã đặt lịch hẹn xem phòng thành công!!!');
        await sendBookingNotification(this.newlyCreated);
        this.clearNewlyCreatedBooking();
      } else {
        this.showSnackbar('red', 'Đặt lịch xem phòng thất bại');
      }
    },
    async receivedDateTime(event) {
      this.dateTimePicker.isOpenPicker = false;
      this.dateTimePicker.date = event.date;
      this.dateTimePicker.time = event.time;
      await this.sendBooking();
    },
    getAvatarTitle() {
      return this.name.substring(this.name.lastIndexOf(' ') + 1).substring(0, 1);
    },
    getGroup() {
      this.$router.push(`/group/${this.groupId}`);
    },
  },
  computed: {
    isLoading() {
      const loadingUser = this.userState.isLoading;
      const loadingBooking = this.$store.state.user.bookings.isLoading;
      return loadingUser || loadingBooking;
    },
    ...mapGetters({
      findPendingBooking: 'user/findPendingBooking',
    }),
    newlyCreated() {
      return this.$store.state.user.bookings.newlyCreated;
    },
    hasPendingBooking() {
      if (this.userState.data) {
        const renterId = this.userState.data.userId;
        const res = this.findPendingBooking(renterId, this.vendorId, this.typeId);
        return res != null;
      }
      return false;
    },
    userState() {
      return this.$store.state.user.user;
    },
    isVendor() {
      return this.userState.data && this.userState.data.role.roleName === 'Chủ trọ';
    },
    loginRouteObject() {
      return {
        name: 'Login',
        params: {
          preUrl: this.$route.path,
        },
      };
    },
    registerRouteObject() {
      return {
        name: 'Register',
        params: {
          preUrl: this.$route,
        },
      };
    },
  },
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
