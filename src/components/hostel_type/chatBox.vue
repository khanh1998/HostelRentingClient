<template>
  <!-- eslint-disable max-len -->
  <v-card v-if="!isLoading">
    <v-card-title class="px-3 py-3">
      <v-avatar color="#727cf5" height="30" width="30" min-width="30">
        <span class="text-overline white--text">{{ getAvatarTitle() }}</span>
        <!-- toDo -->
        <!-- <v-img max-height="80" max-width="80" src="../../assets/home/thumnail.png" /> -->
      </v-avatar>
      <span class="text-subtitle-2 ml-3 text-primary">{{ group.groupName }}</span>
      <v-spacer />
      <v-btn small icon color="#727cf5" @click="$emit('close')">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider />
    <div
      style="max-height: 350px; min-height: 300px"
      class="overflow-y-auto"
      id="chatbox"
      ref="chatbox"
    >
      <v-overlay :value="dateTimeOverlay.show" absolute opacity="0.8">
        <dateTimePickerStepper
          :width="dateTimeOverlay.width"
          v-on:ok="receiveDateTime"
          v-on:cancel="dateTimeOverlay.show = false"
          :groupId="group.groupId"
        />
      </v-overlay>
      <v-overlay :value="bookingCancel.show" absolute opacity="0.8">
        <v-card class="white d-flex flex-column justify-center align-center py-3" width="400">
          <v-card-title
            class="font-weight-bold text-body-1"
            style="color: #171e8d"
          >Bạn có muốn hủy lịch hẹn?</v-card-title>
          <v-card-actions>
            <!-- toDo: tai sao huy lich hen -->
            <v-btn
              small
              color="#eb3518"
              class="text-caption px-4 py-2 mx-2 white--text"
              depressed
              @click="doCancelBooking"
            >Có</v-btn>
            <v-btn
              small
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2 white--text"
              depressed
              @click="bookingCancel.show = false"
            >Không</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
      <v-overlay :value="bargainCancel.show" absolute opacity="0.8">
        <v-card class="white d-flex flex-column justify-center align-center py-3" width="400">
          <v-card-title
            class="font-weight-bold text-body-1"
            style="color: #171e8d"
          >Bạn có muốn hủy trả giả này?</v-card-title>
          <v-card-actions>
            <v-btn
              small
              color="#eb3518"
              class="text-caption px-4 py-2 mx-2 white--text"
              depressed
              @click="doCancelBargain"
            >Có</v-btn>
            <v-btn
              small
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2 white--text"
              depressed
              @click="resetBargainCancel"
            >Không</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
      <v-overlay
        :value="bargainOverlay.show"
        absolute
        opacity="0.8"
        class="justify-center align-center"
      >
        <v-card
          color="white"
          class="d-flex flex-column justify-center align-center pa-2"
          v-if="bargainOverlay.step === 1"
          min-width="400"
        >
          <v-card-text>
            <span class="text-h6" :style="{ color: '#5a669f', textAlign: 'center' }">
              {{
              info.title
              }}
            </span>
          </v-card-text>
          <v-list-item>
            <v-list-item-content class="pa-0">
              <span class="text-caption" style="color: #b4b6d1">Giá gốc</span>
              <p class="d-flex align-center mt-1">
                <v-img max-height="30" max-width="30" src="@/assets/typeDetail/price.png" />
                <!-- toDo unit -->
                <span
                  class="text-body-1 ml-2"
                  style="color: #101526"
                >{{ info.price }} {{ info.priceUnit }} phòng/tháng</span>
              </p>
              <span class="text-caption mt-3" style="color: #b4b6d1">Giá bạn muốn đề xuất</span>
              <v-text-field
                class="mt-1 text-body-2"
                type="number"
                outlined
                dense
                light
                hide-details
                v-model="bargainOverlay.price"
                suffix="Triệu"
                step="0.1"
                min="0"
                :max="`${info.price}`"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="mt-6">
            <v-btn
              small
              color="#4F60C9"
              class="text-caption px-4 py-2 mx-2 white--text"
              depressed
              @click="bargainOverlay.step += 1"
            >Tiếp tục</v-btn>
            <v-btn
              small
              outlined
              color="#9e9fa7"
              class="text-caption px-4 py-2 mx-2"
              depressed
              @click="
                bargainOverlay.show = false;
                bargainOverlay.step = 1;
              "
            >Hủy</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-if="bargainOverlay.step === 2"
          color="white"
          class="d-flex flex-column justify-center align-center pa-1"
        >
          <v-card-text>
            <span class="text-subtitle-1" style="color: #101526">
              Bạn đồng ý trả giá
              <span class="font-weight-bold" style="color: #171c8b">
                {{
                bargainOverlay.price
                }}
              </span>
              triệu đồng?
            </span>
          </v-card-text>
          <v-card-actions>
            <div class="d-flex align-center justify-space-around pb-1">
              <v-btn
                small
                color="#4F60C9"
                class="text-caption px-4 py-2 mx-2"
                depressed
                @click="sendMessage('bargain')"
              >Có</v-btn>
              <v-btn
                small
                outlined
                color="#9e9fa7"
                class="text-caption px-4 py-2 mx-2"
                @click="
                  bargainOverlay.show = false;
                  bargainOverlay.step = 1;
                "
              >Hủy</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-overlay>
      <v-list v-scroll.self="myOnScroll" justify="center">
        <!-- type information -->
        <div class="d-flex justify-start ml-4 vendorChatMessage" :style="{ width: '70%' }">
          <v-col cols="4">
            <v-img
              :src="info.typeImages[0].resourceUrl"
              v-if="info.typeImages.length !== 0"
              max-height="50"
            />
          </v-col>
          <v-col cols="8" class="flex pl-0 pr-1">
            <span
              class="text-caption"
              style="
                display: block;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #32465a;
              "
            >{{ info.title }}</span>
            <span
              class="text-body-1 font-weight-medium text-primary"
            >₫ {{ info.price }} {{ info.priceUnit }}</span>
          </v-col>
        </div>
        <!-- all message -->
        <v-list-item v-for="item in filteredMessage" v-bind:key="item.createdAt">
          <v-list-item-content>
            <div v-if="item.sender === 'renter'" class="d-flex justify-end">
              <div class="d-flex justify-center" v-if="item.bargain" style="width: 100%">
                <div
                  v-ripple
                  style="width: 85%"
                  class="d-flex flex-column justify-center align-center renterEvent lighten-5 py-4 px-4 max-w-3/4"
                >
                  <span
                    class="font-weight-bold text-primary font-nunito"
                    style="font-size: .9375rem;"
                  >TRẢ GIÁ</span>
                  <div class="d-flex justify-space-between align-center my-4" style="width: 100%">
                    <span
                      class="font-nunito font-weight-regular text-gray text-subtitle-2"
                    >$ {{ info.price }} {{ info.priceUnit }}</span>
                    <span class="font-nunito font-weight-regular text-warning text-subtitle-2">
                      <v-icon color="#ffbc00">mdi mdi-arrow-down-bold</v-icon>
                      {{ item.bargain.newPrice }} {{ info.priceUnit }}
                    </span>
                  </div>
                  <span
                    v-if="item.bargain.status === 'wait'"
                    class="mb-3 text-caption font-weight-regular font-nunito text-primary mr-auto"
                  >
                    <v-icon small color="#727cf5" class="mr-2">fas fa-spinner fa-spin</v-icon>Đang
                    chờ phản hồi của chủ trọ
                  </span>
                  <span
                    v-if="item.bargain.status === 'deny'"
                    class="mb-3 text-caption font-weight-regular font-nunito mr-auto text-primary"
                  >
                    <v-icon small color="#727cf5" class="mr-2">thumb_down</v-icon>Chủ trọ không đồng
                    ý với mức giá của bạn
                  </span>
                  <span
                    v-if="item.bargain.status === 'accept'"
                    class="mb-3 text-caption font-weight-regular font-nunito mr-auto text-primary"
                  >
                    <v-icon small color="#727cf5" class="mr-2">thumb_up</v-icon>Chủ trọ đã đồng ý
                    với mức giá của bạn
                  </span>
                  <v-btn
                    min-width="100%"
                    class="mb-3 py-5 text-subtitle-2"
                    depressed
                    color="#e4e6eb"
                    small
                    v-if="item.bargain.status === 'cancel'"
                  >Bạn đã hủy trả giá này</v-btn>
                  <v-btn
                    min-width="100%"
                    class="mb-3 py-5 text-subtitle-2"
                    depressed
                    color="#e4e6eb"
                    small
                    v-if="item.bargain.status === 'wait'"
                    @click="showBargainCancel(item.id)"
                  >Hủy trả giá này</v-btn>
                </div>
              </div>

              <div class="d-flex justify-center" v-else-if="item.book" style="width: 100%">
                <div
                  v-ripple
                  style="width: 85%"
                  class="d-flex flex-column justify-center align-center renterEvent lighten-5 py-4 px-4 max-w-3/4"
                >
                  <span
                    class="font-weight-bold text-primary font-nunito"
                    style="font-size: .9375rem;"
                  >LỊCH HẸN</span>
                  <div class="d-flex justify-space-between align-center my-4" style="width: 100%">
                    <span class="font-nunito font-weight-regular text-gray text-subtitle-2">
                      <v-icon class="mr-1" color="#0acf97">event_available</v-icon>
                      {{ item.book.date }}
                    </span>
                    <span class="font-nunito font-weight-regular text-gray text-subtitle-2">
                      <v-icon class="mr-1" color="#0acf97">schedule</v-icon>
                      {{ item.book.time }}
                    </span>
                  </div>
                  <v-btn
                    min-width="100%"
                    class="mb-3 py-5 text-subtitle-2"
                    depressed
                    color="#e4e6eb"
                    small
                    v-if="!item.book.cancel"
                    @click="showBookingCancel(item.book.bookingId, item.id)"
                  >Hủy lịch hẹn này</v-btn>
                  <v-btn
                    min-width="90%"
                    class="mb-3 py-5 text-subtitle-2"
                    depressed
                    color="#e4e6eb"
                    small
                    v-if="item.book.cancel"
                  >Lịch hẹn đã bị bạn hủy</v-btn>
                </div>
              </div>
              <!-- inbox chat normal -->
              <span
                v-else
                v-ripple
                class="lighten-5 py-2 px-5 max-w-3/4 text-subtitle-2 renterChatMessage"
              >{{ item.message }}</span>
            </div>
            <div v-if="item.sender === 'vendor'" class="d-flex justify-start">
              <span
                _style="width: 75%"
                v-ripple
                class="lighten-5 py-2 px-5 max-w-3/4 text-subtitle-2 vendorChatMessage"
                v-if="!item.book && !item.bargain"
              >{{ item.message }}</span>
              <span
                style="width: 75%"
                v-ripple
                class="lighten-5 pa-2 rounded max-w-3/4"
                v-if="item.bargain && item.bargain.dealId"
              >
                Chủ trọ đồng ý với mức giá bạn đề xuất.
                <!-- <v-btn small color="amber" class="mt-2">Hủy thỏa thuận</v-btn> -->
              </span>
              <span
                style="width: 75%"
                v-ripple
                class="red lighten-5 pa-2 rounded max-w-3/4"
                v-if="item.bargain && !item.bargain.dealId"
              >Chủ trọ không đồng ý với mức giá bạn đề xuất.</span>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div class="input">
      <div class="d-flex flex-no-wrap mt-1 mx-2">
        <v-text-field
          autofocus
          clearable
          dense
          outlined
          flat
          placeholder="Aa"
          v-model="inputChat.text"
          class="ma-1 text-body-2"
          hide-details
          v-on:keyup.enter="sendMessage()"
        ></v-text-field>
        <v-btn icon class="ma-1" depressed @click="sendMessage()">
          <v-icon color="#727cf5">send</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-no-wrap justify-center align-center" style="height: 65px">
        <v-btn
          _small
          rounded
          depressed
          _color="success"
          class="ma-2 font-nunito btn-success"
          v-if="!hasPendingBooking && !hasUnreplyBargain"
          @click="dateTimeOverlay.show = true"
        >
          <v-icon left>event_available</v-icon>Đặt lịch
        </v-btn>
        <v-btn
          rounded
          depressed
          class="font-nunito btn-warning"
          @click="bargainOverlay.show = true"
          v-if="!hasPendingDeal && !hasPendingBooking && !hasUnreplyBargain"
        >
          <v-icon left>monetization_on</v-icon>Trả giá
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import dateTimePickerStepper from './dateTimePickerStepper.vue';
import firebase from '../../config/firebase';
// import utils from '../../utils/firebaseNotification';

// const { sendBookingNotification } = utils;
const { store } = firebase;
const chatCollectionRef = store.collection('chat');

export default {
  name: 'ChatBox',
  components: { dateTimePickerStepper },
  props: ['info', 'group'],
  methods: {
    ...mapActions({
      createBooking: 'user/createBooking',
      getDeals: 'user/getDeals',
      getBookings: 'user/getBookings',
      getDeal: 'user/getDeal',
      cancelDeal: 'user/cancelDeal',
      cancelBooking: 'user/cancelBooking',
    }),
    myOnScroll() {},
    bargain(content) {
      this.bargainOverlay.show = false;
      const newContent = content;
      newContent.bargain = {
        originalPrice: this.info.price,
        newPrice: this.bargainOverlay.price,
        status: 'wait',
        typeName: this.info.title,
        groups: this.group,
      };
      this.messCollectionRef.add(newContent);
      this.messCollectionRef.parent.update({
        lastedMessage: newContent,
      });
    },
    book(content) {
      this.bargainOverlay.show = false;
      const newContent = content;
      const [hours, minutes] = this.dateTimeOverlay.time.split(':');
      this.dateTimeOverlay.date.setHours(hours);
      this.dateTimeOverlay.date.setMinutes(minutes);
      this.dateTimeOverlay.date.setSeconds(0);
      const { date } = this.dateTimeOverlay;
      newContent.book = {
        date: this.getSimpleFormatDate(date),
        time: this.dateTimeOverlay.time,
        cancel: false,
      };
      const renterId = this.userState.data.userId;
      const { vendorId, typeId } = this.id;
      const lastedDeal = this.findLastedDeal(renterId, vendorId, typeId);
      const bookingToApi = {
        renterId,
        vendorId,
        typeId,
        meetTime: `${date.getTime()}`,
        dealId: lastedDeal ? lastedDeal.dealId : null,
        status: 'INCOMING',
      };
      console.log(bookingToApi);
      this.createBooking(bookingToApi).then(() => {
        // sendBookingNotification(this.newlyCreatedBooking);
        newContent.book.bookingId = this.newlyCreatedBooking.bookingId;
        this.messCollectionRef.add(newContent);
        this.messCollectionRef.parent.update({
          lastedMessage: newContent,
        });
      });
    },
    sendMessage(type = null) {
      const content = {
        bargain: null,
        book: null,
        message: this.inputChat.text,
        createdAt: Date.now(),
        sender: 'renter',
      };
      this.createDoc().then(() => {
        if (type === null) {
          console.log('content', content);
          this.messCollectionRef.add(content);
          this.docRef.update({
            lastedMessage: content,
          });
        } else if (type === 'book') {
          this.book(content);
        } else if (type === 'bargain') {
          console.log('bargain');
          console.log(content);
          this.bargain(content);
          this.bargainOverlay.step = 1;
        }
      });
      this.$nextTick(() => {
        this.scrollToBottom();
        this.inputChat.text = '';
      });
    },
    async createDoc() {
      const { userId } = this.userState.data;
      const { vendorId, typeId, groupId } = this.id;
      const docRef = chatCollectionRef.doc(`renter-${userId}:vendor-${vendorId}:type-${typeId}`);
      await docRef.get().then((doc) => {
        if (!doc.exists) {
          doc.ref.set({
            vendorId,
            renterId: userId,
            typeId,
            groupId,
            updated: Date.now(),
            lastedMessage: null,
          });
        }
      });
      this.messCollectionRef = docRef.collection('messages');
      this.docRef = docRef;
    },
    setMessage(messages) {
      this.items = messages;
    },
    fetchMessages() {
      // this.createDoc();
      const { userId } = this.userState.data;
      const { vendorId, typeId } = this.id;
      const docRef = chatCollectionRef.doc(`renter-${userId}:vendor-${vendorId}:type-${typeId}`);
      this.messCollectionRef = docRef.collection('messages');
      this.messCollectionRef.orderBy('createdAt', 'asc').onSnapshot((querySnapshot) => {
        const items = [];
        this.dealIds = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({ ...data, id: doc.id });
          if (data.bargain && data.bargain.dealId) {
            this.dealIds.push(data.bargain.dealId);
          }
        });
        this.items = items;
        this.$nextTick(() => this.scrollToBottom());
        if (this.dealIds.length > 0) {
          this.getDeals();
        }
      });
    },
    scrollToBottom() {
      // eslint-disable-next-line
      const chatbox = this.$refs.chatbox;
      console.log(chatbox);
      chatbox.scrollTop = chatbox.scrollHeight;
    },
    receiveDateTime(e) {
      this.dateTimeOverlay.show = false;
      this.dateTimeOverlay.date = e.date;
      this.dateTimeOverlay.time = e.time;
      this.sendMessage('book');
    },
    getSimpleFormatDate(date) {
      return `${date.getDate()}/
            ${date.getMonth() + 1}/
            ${date.getFullYear()}`;
    },
    doCancelDeal(dealId) {
      this.cancelDeal(dealId);
    },
    doCancelBooking() {
      const { bookingId, docId } = this.bookingCancel.id;
      this.cancelBooking(bookingId).then(() => {
        this.messCollectionRef.doc(docId).update({
          'book.cancel': true,
        });
        this.bookingCancel.id.bookingId = null;
        this.bookingCancel.id.docId = null;
        this.bookingCancel.show = false;
        this.getBookings();
      });
    },
    showBookingCancel(bookingId, docId) {
      this.bookingCancel.show = true;
      this.bookingCancel.id = { bookingId, docId };
    },
    doCancelBargain() {
      const { docId } = this.bargainCancel.id;
      this.messCollectionRef.doc(docId).update({
        'bargain.status': 'cancel',
      });
      this.resetBargainCancel();
    },
    showBargainCancel(docId) {
      this.bargainCancel.show = true;
      this.bargainCancel.id.docId = docId;
    },
    resetBargainCancel() {
      this.bargainCancel.show = false;
      this.bargainCancel.id.docId = null;
    },
    getAvatarTitle() {
      return this.group.groupName
        .substring(this.group.groupName.lastIndexOf(' ') + 1)
        .substring(0, 1);
    },
  },
  data: () => ({
    bookingCancel: {
      show: false,
      id: {
        bookingId: null,
        docId: null,
      },
    },
    bargainCancel: {
      show: false,
      id: {
        docId: null,
      },
    },
    dateTimeOverlay: {
      show: false,
      width: 350,
      date: '',
      time: '',
    },
    bargainOverlay: {
      show: false,
      price: 0,
      step: 1,
    },
    inputChat: {
      text: '',
    },
    items: [],
    messCollectionRef: null,
    docRef: null,
    dealIds: [],
  }),
  created() {
    Promise.all([this.getDeals, this.getBookings]).then(() => {
      this.fetchMessages();
    });
    this.bargainOverlay.price = this.info.price;
  },
  mounted() {},
  computed: {
    isLoading() {
      const loadingUser = this.userState.isLoading;
      const loadingBookings = this.$store.state.user.bookings.isLoading;
      const loadingDeals = this.$store.state.user.bookings.isLoading;
      return loadingUser || loadingBookings || loadingDeals;
    },
    ...mapGetters({
      findLastedDeal: 'user/findLastedDeal',
      findPendingBooking: 'user/findPendingBooking',
    }),
    hasPendingDeal() {
      const renterId = this.userState.data.userId;
      const { vendorId, typeId } = this.id;
      const res = this.findLastedDeal(renterId, vendorId, typeId);
      if (res) {
        return true;
      }
      return false;
    },
    hasPendingBooking() {
      const renterId = this.userState.data.userId;
      const { vendorId, typeId } = this.id;
      const res = this.findPendingBooking(renterId, vendorId, typeId);
      if (!res) {
        return false;
      }
      return true;
    },
    userState() {
      return this.$store.state.user.user;
    },
    id() {
      return {
        typeId: this.info.typeId,
        groupId: this.group.groupId,
        renterId: this.userState.renterId,
        vendorId: this.group.vendorId,
      };
    },
    isCreatingBooking() {
      return this.$store.state.user.bookings.isLoading;
    },
    newlyCreatedBooking() {
      return this.$store.state.user.bookings.newlyCreated;
    },
    filteredMessage() {
      return this.items.filter((item) => {
        if (item.sender === 'vendor' && item.bargain) {
          return false;
        }
        return true;
      });
    },
    hasUnreplyBargain() {
      return this.items.some(
        (item) => item.sender === 'renter' && item.bargain && item.bargain.status === 'wait',
      );
    },
  },
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.renterChatMessage {
  background-color: #f0f2f5;
  border-radius: 20px;
  font-family: 'Nunito', sans-serif !important;
}
.renterEvent {
  /* border: 1px solid #dee2e6 !important; */
  border-radius: 0.25rem !important;
  background-color: #f9f9fd !important;
}
/* .renterEvent {
  border-radius: 15px;
  color: #6c757d !important;
  background-color: #f0f2f5;
} */
.vendorChatMessage {
  background-color: #fef5e4;
  border-radius: 20px;
  font-family: 'Nunito', sans-serif !important;
}
.v-text-field--outlined >>> fieldset {
  border-color: #727cf5;
}
</style>
