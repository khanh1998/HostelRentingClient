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
        />
      </v-overlay>
      <v-overlay :value="bargainOverlay.show" absolute opacity="0.8">
        <v-card color="white" class="d-flex flex-column justify-center align-center pa-1">
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
              label="Nhập giá"
            />
            <p>phòng/tháng</p>
            <div class="d-flex align-center justify-space-around pb-1">
              <v-btn color="green" class="mr-1" depressed @click="sendMessage('bargain')">
                Trả giá</v-btn>
              <v-btn color="red" class="ml-1" depressed @click="bargainOverlay.show = false">
                Hủy</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-overlay>
      <v-list v-scroll.self="myOnScroll" align="center" justify="center">
        <v-list-item v-for="item in items" v-bind:key="item.createdAt">
          <v-list-item-content>
            <div v-if="item.renter" class="d-flex justify-end">
              <v-icon v-if="item.book || item.bargain">info</v-icon>

              <span
                v-if="item.bargain"
                v-ripple
                style="width: 75%"
                class="blue lighten-5 pa-2 rounded"
              >Bạn đã trả giá : {{item.message}} {{info.priceUnit}}</span>

              <span
                v-else-if="item.book"
                v-ripple
                style="width: 75%"
                class="blue lighten-5 pa-2 rounded max-w-3/4"
              >Bạn đã đặt lịch vào: {{item.message}}</span>

              <span
                v-else
                v-ripple
                style="width: 75%"
                class="blue lighten-5 pa-2 rounded max-w-3/4"
              >{{item.message}}</span>
            </div>
            <div v-if="!item.renter" class="d-flex justify-start">
              <span
                style="width: 75%"
                v-ripple
                class="green lighten-5 pa-2 rounded max-w-3/4"
              >{{item.message}}</span>
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
          <v-chip color="amber" @click="bargainOverlay.show = true">
            <v-icon color="white" class="mr-1">monetization_on</v-icon>Trả giá
          </v-chip>
          <v-chip color="green" @click="dateTimeOverlay.show = true">
            <v-icon color="white" class="mr-1">schedule</v-icon>Đặt lịch
          </v-chip>
        </v-chip-group>
      </div>
    </div>
  </v-card>
</template>
<script>
import dateTimePickerStepper from './dateTimePickerStepper.vue';

import firebase from '../../config/firebase';

export default {
  name: 'ChatBox',
  components: { dateTimePickerStepper },
  props: ['info', 'group'],
  methods: {
    myOnScroll() {},
    bargain(content) {
      this.bargainOverlay.show = false;
      const newContent = content;
      newContent.bargain = true;
      newContent.message = this.bargainOverlay.price;
      // this.items.push(newContent);
      firebase
        .firestore()
        .collection('chat')
        .add(newContent);
    },
    book(content) {
      this.bargainOverlay.show = false;
      const newContent = content;
      newContent.book = true;
      const { date } = this.dateTimeOverlay;
      newContent.message = `${this.getSimpleFormatDate(date)} từ
        ${this.dateTimeOverlay.time}`;
      // newContent.message = date;
      // this.items.push(newContent);
      firebase
        .firestore()
        .collection('chat')
        .add(newContent);
      // const dateInfo = this.getSimpleFormatDate(date);
      // const timeInfo = this.dateTimeOverlay.time;
    },
    sendMessage(type = null) {
      const content = {
        renter: true,
        bargain: false,
        book: false,
        message: this.inputChat.text,
        createdAt: new Date(),
      };
      if (type === null) {
        // this.items.push(content);
        firebase
          .firestore()
          .collection('chat')
          .add(content);
      } else if (type === 'book') {
        this.book(content);
      } else if (type === 'bargain') {
        this.bargain(content);
      }
      this.$nextTick(() => this.scrollToBottom());
      this.inputChat.text = '';
    },
    fetchMessages() {
      firebase
        .firestore()
        .collection('chat')
        .orderBy('createdAt')
        .onSnapshot((querySnapshot) => {
          const allMessages = [];
          querySnapshot.forEach((doc) => {
            allMessages.push(doc.data());
          });
          this.items = allMessages;
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
  },
  mounted() {
    this.$nextTick(() => this.scrollToBottom());
  },
  data: () => ({
    dateTimeOverlay: {
      show: false,
      width: 350,
      date: '',
      time: '',
    },
    bargainOverlay: {
      show: false,
      price: 0,
    },
    inputChat: {
      text: '',
    },
    items: [],
  }),
  created() {
    this.fetchMessages();
    this.bargainOverlay.price = this.info.price;
  },
};
</script>
