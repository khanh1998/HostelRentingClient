<template>
  <v-card>
    <v-card-title class="blue--text py-0 px-2">
      <v-icon color="blue">message</v-icon>
      {{group.groupName}}
      <v-spacer />
      <v-btn icon color="success">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn icon color="red" @click="$emit('close')">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider />
    <div style="max-height: 300px; min-height:300px" class="overflow-y-auto" id="chatbox">
      <v-overlay :value="dateTimeOverlay.show" absolute opacity="0.8">
        <dateTimePickerStepper
          :width="dateTimeOverlay.width"
          v-on:ok="receiveDateTime"
          v-on:cancel="dateTimeOverlay.show = false"
          :groupId="group.groupId"
        />
      </v-overlay>
      <v-overlay :value="bookingCancel.show" absolute opacity="0.8">
        <v-card>
          <v-card-title>Bạn có muốn hủy lịch hẹn?</v-card-title>
          <v-card-actions>
            <v-btn color="green" @click="doCancelBooking">Có</v-btn>
            <v-btn color="red" @click="bookingCancel.show = false">Không</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
      <v-overlay :value="bargainCancel.show" absolute opacity="0.8">
        <v-card>
          <v-card-title>Bạn có muốn hủy trả giả này?</v-card-title>
          <v-card-actions>
            <v-btn color="green" @click="doCancelBargain">Có</v-btn>
            <v-btn color="red" @click="resetBargainCancel">Không</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
      <v-overlay :value="bargainOverlay.show" absolute opacity="0.8">
        <v-card
          color="white"
          class="d-flex flex-column justify-center align-center pa-1"
          v-if="bargainOverlay.step === 1"
        >
          <v-card-text class="black--text">
            <div class="d-flex flex-column justify-space-between">
              <p>{{info.title}}</p>
              <p class="font-weight-medium">
                Giá gốc:
                <span>{{info.price}} {{info.priceUnit}}/tháng</span>
              </p>
            </div>
            <v-text-field
              type="number"
              outlined
              dense
              light
              hide-details
              v-model="bargainOverlay.price"
              label="Nhập giá bạn đưa ra"
              suffix="Triệu"
            />
            <p>phòng/tháng</p>
            <div class="d-flex align-center justify-space-around pb-1">
              <v-btn color="green" class="mr-1" depressed @click="bargainOverlay.step += 1">
                Tiếp tục</v-btn>
              <v-btn
                color="red"
                class="ml-1"
                depressed
                @click="bargainOverlay.show = false; bargainOverlay.step = 1"
              >Hủy</v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-card
          v-if="bargainOverlay.step === 2"
          color="white"
          class="d-flex flex-column justify-center align-center pa-1"
        >
          <v-card-text class="black--text">
            Bạn đồng ý trả giá
            <span class="font-weight-bold">{{bargainOverlay.price}}</span>
            triệu đồng?
          </v-card-text>
          <v-card-actions>
            <div class="d-flex align-center justify-space-around pb-1">
              <v-btn color="green" class="mr-1" depressed @click="sendMessage('bargain')">Có</v-btn>
              <v-btn
                color="red"
                class="ml-1"
                depressed
                @click="bargainOverlay.show = false; bargainOverlay.step = 1"
              >Hủy</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-overlay>
      <v-list v-scroll.self="myOnScroll" align="center" justify="center">
        <v-list-item v-for="item in filteredMessage" v-bind:key="item.createdAt">
          <v-list-item-content>
            <div v-if="item.sender === 'renter'" class="d-flex justify-end">
              <p
                v-if="item.bargain"
                v-ripple
                style="width: 75%"
                class="blue lighten-5 pa-2 rounded"
              ><v-icon color="amber">attach_money</v-icon>
              <span class="font-weight-bold">
                Bạn trả giá : {{item.bargain.newPrice}} {{info.priceUnit}}
              </span>
              <span v-if="item.bargain.status === 'wait'">
                <v-divider class="my-1"></v-divider>
                <v-icon>fas fa-spinner fa-spin</v-icon>
                Đang chờ phản hồi của chủ trọ
              </span>
              <span v-if="item.bargain.status === 'deny'">
                <v-divider class="my-1"></v-divider>
                <v-icon color="red">thumb_down</v-icon>
                Chủ trọ không đồng ý với mức giá của bạn
              </span>
              <span v-if="item.bargain.status === 'accept'">
                <v-divider class="my-1"></v-divider>
                <v-icon color="green">thumb_up</v-icon>
                Chủ trọ đã đồng ý với mức giá của bạn
              </span>
              <span v-if="item.bargain.status === 'cancel'">
                <v-divider class="my-1"></v-divider>
                <v-icon color="red">clear</v-icon>
                Bạn đã hủy trả giá này
              </span>
              <span v-if="item.bargain.status === 'wait'">
                <v-divider class="my-2"/>
                <v-btn class="red lighten-3" dark depressed
                  @click="showBargainCancel(item.id)"
                >
                  Hủy trả giá này
                </v-btn>
              </span>
              </p>

              <p
                v-else-if="item.book"
                v-ripple
                style="width: 75%"
                class="blue lighten-5 pa-2 rounded max-w-3/4"
              >
                <v-icon color="pink">event</v-icon>
                <span class="font-weight-bold">Bạn đã tạo một lịch hẹn mới</span>
                <v-divider class="my-2"/>
                Ngày: <span class="font-weight-bold">{{item.book.date}}</span><br/>
                Giờ: <span class="font-weight-bold">{{item.book.time}}</span><br/>
                <v-divider class="my-2"/>
                <v-btn
                  v-if="!item.book.cancel"
                  depressed
                  color="amber"
                  small
                  @click="showBookingCancel(item.book.bookingId, item.id)"
                >Hủy hẹn</v-btn>
                <span v-if="item.book.cancel">
                  <v-icon color="red">clear</v-icon>
                  Lịch hẹn đã bị hủy
                </span>
              </p>
              <span
                v-else
                v-ripple
                style="width: 75%"
                class="blue lighten-5 pa-2 rounded max-w-3/4"
              >{{item.message}}</span>
            </div>
            <div v-if="item.sender === 'vendor'" class="d-flex justify-start">
              <span
                style="width: 75%"
                v-ripple
                class="green lighten-5 pa-2 rounded max-w-3/4"
                v-if="!item.book && !item.bargain"
              >{{item.message}}</span>
              <span
                style="width: 75%"
                v-ripple
                class="green lighten-5 pa-2 rounded max-w-3/4"
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
    <v-divider />
    <div class="input">
      <div class="d-flex flex-no-wrap mt-1">
        <v-text-field
          autofocus
          clearable
          dense
          flat
          outlined
          placeholder="Nội dung tin nhắn..."
          v-model="inputChat.text"
          class="ma-1"
          hide-details
          v-on:keyup.enter="sendMessage()"
        ></v-text-field>
        <v-btn color="blue" class="ma-1" depressed @click="sendMessage()">
          <v-icon color="white">far fa-paper-plane</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-no-wrap pl-1">
        <v-chip-group>
          <v-chip
            color="amber"
            @click="bargainOverlay.show = true"
            v-if="!hasPendingDeal && !hasPendingBooking && !hasUnreplyBargain"
          >
            <v-icon color="white" class="mr-1">monetization_on</v-icon>Trả giá
          </v-chip>
          <v-chip
            v-if="!isLoadingDeals && !hasPendingBooking && !hasUnreplyBargain"
            color="green"
            @click="dateTimeOverlay.show = true"
          >
            <v-icon color="white" class="mr-1">schedule</v-icon>Đặt lịch
          </v-chip>
        </v-chip-group>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import dateTimePickerStepper from './dateTimePickerStepper.vue';
import firebase from '../../config/firebase';

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
        groupAdd: this.group.street,
      };
      this.messCollectionRef.add(newContent);
      this.messCollectionRef.parent.update({
        lastedMessage: content,
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
        newContent.book.bookingId = this.newlyCreatedBooking.bookingId;
        this.messCollectionRef.add(newContent);
        this.messCollectionRef.parent.update({
          lastedMessage: content,
        });
      });
    },
    sendMessage(type = null) {
      this.createDoc().then(() => {
        const content = {
          bargain: null,
          book: null,
          message: this.inputChat.text,
          createdAt: Date.now(),
          sender: 'renter',
        };
        if (type === null) {
          this.messCollectionRef.add(content);
        } else if (type === 'book') {
          this.book(content);
        } else if (type === 'bargain') {
          this.bargain(content);
          this.bargainOverlay.step = 1;
        }
        this.messCollectionRef.parent.update({
          updated: Date.now(),
          lastedMessage: {
            ...content,
            seen: false,
          },
        });
      });
      this.$nextTick(() => {
        this.scrollToBottom();
        this.inputChat.text = '';
      });
    },
    async createDoc() {
      const { userId } = this.userState.data;
      const { vendorId, typeId, groupId } = this.id;
      const docRef = chatCollectionRef.doc(
        `renter-${userId}:vendor-${vendorId}:type-${typeId}`,
      );
      docRef.get().then((doc) => {
        if (!doc.exists) {
          doc.ref.set({
            vendorId,
            renterId: userId,
            typeId,
            groupId,
            updated: Date.now(),
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
      const docRef = chatCollectionRef.doc(
        `renter-${userId}:vendor-${vendorId}:type-${typeId}`,
      );
      this.messCollectionRef = docRef.collection('messages');
      this.messCollectionRef
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {
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
          if (this.dealIds.length > 0) {
            this.getDeals();
          }
          this.$nextTick(() => this.scrollToBottom());
        });
    },
    scrollToBottom() {
      const chatbox = this.$el.querySelector('#chatbox');
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
            ${date.getMonth()}/
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
  },
  mounted() {
    this.$nextTick(() => this.scrollToBottom());
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
    this.getDeals();
    this.getBookings();
    this.fetchMessages();
    this.bargainOverlay.price = this.info.price;
  },
  computed: {
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
    isLoadingDeals() {
      return this.$store.state.user.deals.isLoading;
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
