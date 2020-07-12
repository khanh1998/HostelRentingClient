<template>
    <v-card>
      <v-card-title class="blue--text py-0 px-2">
          <v-icon color="blue">message</v-icon> Nhà trọ Lalahome
          <v-spacer/>
          <v-btn icon color="success">
            <v-icon>remove</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="$emit('close')">
            <v-icon>clear</v-icon>
          </v-btn>
      </v-card-title>
      <v-divider/>
      <div
        style="max-height: 200px"
        class="overflow-y-auto"
        id="chatbox"
      >
        <v-overlay :value="dateTimeOverlay.show" absolute dark>
          <date-time-picker
            :width="dateTimeOverlay.width"
            v-on:ok="receiveDateTime"
            v-on:cancel="dateTimeOverlay.show = false"
          />
        </v-overlay>
        <v-overlay :value="bargainOverlay.show" absolute color="white">
          <v-card class="d-flex flex-column justify-center align-center pa-1">
            <v-card-text>
              <div class="d-flex justify-space-between">
              <p class="font-weight-medium">Giá gốc: <span>3.500.000 đ/tháng</span></p>
            </div>
              <v-text-field
                type="number"
                outlined
                dense
                hide-details
                v-model="bargainOverlay.price"
                label="Nhập giá"
              />
            <p>phòng/tháng</p>
            <div class="d-flex align-center justify-space-around pb-1">
              <v-btn color="green" class="mr-1" depressed outlined
                @click="sendMessage('bargain')"
              >
                Trả giá
              </v-btn>
              <v-btn color="red" class="ml-1" depressed outlined
                @click="bargainOverlay.show = false"
              >
                Hủy
              </v-btn>
            </div>
            </v-card-text>
          </v-card>
        </v-overlay>
        <v-list
          v-scroll.self="myOnScroll"
          align="center"
          justify="center"
        >
            <v-list-item v-for="item in items" v-bind:key="item.id">
              <v-list-item-content>
                <div
                  v-if="item.renter"
                  class="d-flex justify-end"
                >
                  <v-icon v-if="item.book || item.bargain">info</v-icon>
                  <span
                    v-ripple
                    style="width: 75%"
                    class="blue lighten-5 pa-2 rounded"
                  >
                    {{item.message}}
                  </span>
                </div>
                <div
                  v-if="!item.renter"
                  class="d-flex justify-start"
                >
                  <span
                    style="width: 75%"
                    v-ripple
                    class="green lighten-5 pa-2 rounded"
                  >
                    {{item.message}}
                  </span>
                </div>
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </div>
      <v-divider/>
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
          >
          </v-text-field>
          <v-btn color="blue" class="ma-1" depressed
            @click="sendMessage()"
          >
            <v-icon color="white">
              far fa-paper-plane
            </v-icon>
          </v-btn>
        </div>
        <div class="d-flex flex-no-wrap pl-1">
          <v-chip-group>
            <v-chip color="amber" @click="bargainOverlay.show = true">
              <v-icon color="white" class="mr-1">monetization_on</v-icon>
              Trả giá
            </v-chip>
            <v-chip color="green"
              @click="dateTimeOverlay.show = true"
            >
              <v-icon color="white" class="mr-1">schedule</v-icon>
              Đặt lịch
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </v-card>
</template>
<script>
import dateTimePicker from './dateTimePicker.vue';

export default {
  name: 'ChatBox',
  components: { dateTimePicker },
  methods: {
    myOnScroll() {},
    bargain(content) {
      this.bargainOverlay.show = false;
      const newContent = content;
      newContent.bargain = true;
      newContent.message = `Bạn đã trả giá ${this.bargainOverlay.price}`;
      this.items.push(newContent);
    },
    book(content) {
      this.bargainOverlay.show = false;
      const newContent = content;
      newContent.book = true;
      const prefix = 'Bạn đặt lịch vào';
      const { date } = this.dateTimeOverlay;
      newContent.message = `${prefix}
        ${this.getSimpleFormatDate(date)}
        ${this.dateTimeOverlay.time}`;
      this.items.push(newContent);
    },
    sendMessage(type = null) {
      this.index += 1;
      const content = {
        id: this.index,
        renter: true,
        bargain: false,
        book: false,
        message: this.inputChat.text,
      };
      if (type === null) {
        this.items.push(content);
      } else if (type === 'book') {
        this.book(content);
      } else if (type === 'bargain') {
        this.bargain(content);
      }
      this.$nextTick(() => this.scrollToBottom());
      this.inputChat.text = '';
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
    index: 7,
    dateTimeOverlay: {
      show: false,
      width: 350,
      date: '',
      time: '',
    },
    bargainOverlay: {
      show: false,
      price: 3500000,
    },
    inputChat: {
      text: '',
    },
    items: [
      {
        id: 0,
        renter: true,
        message: 'cái idea quay video lần trc chứ gì :)))',
        bargain: false,
        booking: false,
      },
      {
        id: 1,
        renter: false,
        message: 'Cám ơn bạn Minh Hà đã ghé thăm fanpage và chia sẻ thông tin nhé.',
        bargain: false,
        booking: false,
      },
      {
        id: 2,
        renter: true,
        message: 'chất như xôi gấc haha',
        bargain: false,
        booking: false,
      },
      {
        id: 3,
        renter: false,
        message: 'Chất như YoMost chứ sao ',
        bargain: false,
        booking: false,
      },
      {
        id: 4,
        renter: true,
        message: 'Khá mặn đến từ yomost',
        bargain: false,
        booking: false,
      },
      {
        id: 5,
        renter: false,
        message: 'Nếu thích đừng ngại share post của YoMost nha bạn Bình Dương ơi <3',
        bargain: false,
        booking: false,
      },
      {
        id: 6,
        renter: true,
        message: 'Cảm ơn bạn Trần Duy Khang đã tin dùng sản phẩm của YoMost nha <3',
        bargain: false,
        booking: false,
      },
      {
        id: 7,
        renter: false,
        message: 'Bạn Phua Sung ơi, nhanh chân đi đến cửa hàng gần nhất để "tậu" cho mình 1 hộp YoMost ngay nào. Đừng quên rủ thêm hội bạn để cùng nhau bùng nổ "Năng lượng YO!" nha bạn Phua Sung ơi <3',
        bargain: false,
        booking: false,
      },
    ],
  }),
};
</script>
