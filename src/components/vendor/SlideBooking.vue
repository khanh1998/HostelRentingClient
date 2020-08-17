<template>
  <div>
    <v-sheet
      class="mx-auto rounded"
      elevation="1"
      max-width="100%"
    >
      <div class="d-flex justify-space-between text-center">
        <div
          style="font-size:20px; fontWeight:bold"
          class="pt-3 pl-2"
        >Lịch hẹn xem phòng</div>
        <div>
          <v-chip-group
            mandatory
            active-class="primary--text"
          >
            <v-chip
              v-for="tag in chipItems"
              :key="tag"
            >{{ tag }}</v-chip>
          </v-chip-group>
        </div>
      </div>
      <v-divider/>
      <v-slide-group v-if="bookings.length > 0">
        <v-slide-item
          v-for="booking in bookings"
          :key="booking.bookingId"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            class="ma-3 rounded-xl"
            height="180"
            width="319"
            :color="active ? 'grey lighten-1' : 'white'"
            @click="toggle"
          >
            <v-col
              cols="12"
              style="background-color: #98B7D7; height: 28%; width: 100%"
              class="d-flex justify-end"
            >
              <p style="fontWeight:bold; color:white">
                {{getDateString(Number(booking.meetTime))}}
              </p>
              <v-divider
                vertical
                class="mx-3"
              ></v-divider>
              <p style="fontWeight:bold; color:white">
                {{getTimeString(Number(booking.meetTime))}}
              </p>
            </v-col>
            <v-list-item class="mb-2 pt-2">
              <v-list-item-avatar>
                <v-img :src="booking.renter.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="pl-4">
                <v-list-item-title
                  style="fontSize:16px; fontWeight:bold; color:#1F17FF"
                  class="py-1"
                >{{booking.renter.username}}</v-list-item-title>
                <v-list-item-subtitle style="color: coral; fontSize:18px">
                  {{booking.renter.phone}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <!-- <v-btn icon>
                  <v-icon @click="deleteItem(item)">
                    mdi-qrcode
                  </v-icon>
                </v-btn> -->
                <v-dialog
                  v-model="dialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="changeToString(booking.bookingId)"
                    >
                      <v-icon>
                        mdi-qrcode
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title
                      class="headline"
                      style="background-color: #98B7D7; color: white"
                    >
                      Mã quét
                    </v-card-title>

                    <v-card-text class="d-flex justify-center mt-5">
                      <div>
                        <qrcode-vue
                          :value=qrvalue
                          :size="200"
                          level="H"
                        ></qrcode-vue>
                      </div>
                      <!-- <div>
                        <p>test value in qrcode</p>
                        <h1>{{booking.bookingId}}</h1>
                      </div> -->
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                      >
                        Đóng
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item-action>
            </v-list-item>
            <div>
              <v-icon class="px-3 pl-7">home</v-icon>
              <span style="fontWeight:bold">{{booking.group.groupName}}</span>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <v-card v-if="bookings.length === 0">
        <v-card-title>
          Bạn không có lịch hẹn nào
        </v-card-title>
      </v-card>
      <div class="d-flex justify-end" v-if="bookings.length > 0">
        <v-card-text style="color:#818286">Xem thêm >></v-card-text>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
import { mapActions } from 'vuex';

export default {
  name: 'SlideBooking',
  components: {
    QrcodeVue,
  },
  methods: {
    ...mapActions({
      getBookings: 'user/getBookings',
    }),
    getDateString(milisecond) {
      const d = new Date(milisecond);
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    },
    getTimeString(milisecond) {
      const d = new Date(milisecond);
      return `${d.getHours()}:${
        d.getMinutes() < 10 ? '0' : ''
      }${d.getMinutes()}`;
    },
    changeToString(bookingId) {
      this.qrvalue = bookingId.toString();
      return this.qrvalue;
    },
  },
  computed: {
    bookings() {
      return this.$store.state.user.bookings.data;
    },
    isLoadingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
    filteredBookings() {
      if (!this.timeDiff) {
        return this.bookings;
      }
      // this.bookings.
      return null;
    },
  },
  created() {
    this.getBookings();
  },
  data: () => ({
    chipItems: ['Hôm nay', 'Tuần này', 'Tháng này'],
    timeDiff: null,
    dialog: false,
    qrvalue: null,
  }),
};
</script>
