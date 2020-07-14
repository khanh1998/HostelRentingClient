<template>
  <div class="mt-2">
    <v-card
      width="100%"
      class="d-flex flex-row justify-start align-center pa-2"
    >
      <div class="d-flex flex-nowrap align-center">
        <v-avatar>
          <v-img src="@/assets/suzy-avatar.jpg"></v-img>
        </v-avatar>
        <p class="font-weight-medium mb-0 ml-2">HyunA</p>
      </div>
    </v-card>
    <div
      class="mt-3 rounded-l overflow-y-auto"
      style="max-height: 670px;"
      id="chatbox"
    >
      <v-list
        v-scroll.self="myOnScroll"
        align="center"
        justify="center"
        max-height="auto"
        min-height="670px"
      >
        <v-list-item
          v-for="item in items"
          v-bind:key="item.createdAt"
        >
          <v-list-item-content>
            <div
              v-if="item.renter"
              class="d-flex justify-start"
            >
              <div v-if="item.bargain">
                <div class="border-deal">
                  <v-row>
                    <v-col cols="6">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        height="100"
                        width="150"
                        class="mx-2"
                      ></v-img>
                    </v-col>
                    <v-col
                      cols="6"
                      class="d-flex justify-left align-center"
                    >
                      <div style="fontSize:18px">
                        <span style="color:#98B7D7">Giá gốc:</span> <br />
                        <span><s>3500000 Đ</s></span><br />
                        <span style="color:#98B7D7">Trả giá:</span> <br />
                        <span>{{ item.message}} Đ</span><br />
                      </div>
                    </v-col>
                  </v-row>
                  <v-col cols="12">
                    <span
                      class="mx-2"
                      style="color: #6C98C6; fontSize:20px"
                    >
                      Nhà trọ Lalahome</span>
                  </v-col>
                  <v-col
                    cols="12"
                    class="d-flex justify-center"
                  >
                    <v-chip-group>
                      <v-chip
                        color="red"
                        @click="denyMessage"
                        style="width: 90px"
                        class="d-flex justify-center mr-5"
                      >
                        Từ chối
                      </v-chip>
                      <v-chip
                        color="green"
                        @click="acceptMessage"
                      >
                        Chấp nhận
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </div>
              </div>
              <div v-if="item.book">
                <div class="border-deal">
                  <v-row>
                    <v-col cols="6">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        height="100"
                        width="150"
                        class="mx-2"
                      ></v-img>
                    </v-col>
                    <v-col
                      cols="6"
                      class="d-flex justify-left align-center"
                    >
                      <div style="fontSize:18px">
                        <span style="color:#98B7D7">Ngày hẹn:</span> <br />
                        <span>{{item.message.split("từ")[0]}}</span><br />
                        <span style="color:#98B7D7">Giờ hẹn:</span> <br />
                        <span>{{ item.message.split("từ")[1]}}</span><br />
                      </div>
                    </v-col>
                  </v-row>
                  <v-col cols="12">
                    <span
                      class="mx-2"
                      style="color: #6C98C6; fontSize:20px"
                    >
                      Nhà trọ Lalahome</span>
                  </v-col>
                  <v-col
                    cols="12"
                    class="d-flex justify-center"
                  >
                    <v-chip-group>
                      <v-chip
                        color="red"
                        @click="denyBookMessage"
                        style="width: 90px"
                        class="d-flex justify-center mr-5"
                      >
                        Từ chối
                      </v-chip>
                      <v-chip
                        color="green"
                        @click="acceptBookMessage"
                      >
                        Chấp nhận
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </div>
              </div>
              <div v-if="!item.book && !item.bargain">
                <span
                  v-ripple
                  style="width: auto; max-width: 75%; "
                  class="blue lighten-5 pa-2 rounded"
                >
                  {{item.message}}
                </span>
              </div>
              <v-icon v-if="item.book || item.bargain">info</v-icon>
            </div>
            <div
              v-if="!item.renter"
              class="d-flex justify-end"
            >
              <span
                style="width: auto; max-width: 75%; "
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
    <div class="mt-3 d-flex">
      <v-textarea
        v-model="inputChat.model"
        :auto-grow="inputChat.autoGrow"
        :clearable="inputChat.clearable"
        :filled="inputChat.filled"
        :loading="inputChat.loading"
        :no-resize="inputChat.noResize"
        :outlined="inputChat.outlined"
        :row-height="inputChat.rowHeight"
        :rows="inputChat.rows"
        :single-line="inputChat.singleLine"
        :solo="inputChat.solo"
        class="mr-3"
        v-on:keyup.enter="sendMessage"
      ></v-textarea>
      <!-- <div class="mt-12 text-center">
          Value: {{ inputChat.model }}
        </div> -->
      <v-btn
        color="#7794F8"
        x-large
        @click="sendMessage"
      >
        <v-icon color="#FFFFFF">fa fa-paper-plane</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import firebase from '../../config/firebase';

export default {
  name: 'ChatBox',
  data: () => ({
    items: [],
    inputChat: {
      autoGrow: true,
      autofocus: true,
      clearable: true,
      filled: true,
      loading: false,
      model: '',
      noResize: true,
      outlined: true,
      rowHeight: 24,
      rows: 1,
      singleLine: true,
      solo: true,
    },
  }),
  methods: {
    myOnScroll() { },
    sendMessage() {
      if (this.inputChat.model.length > 0) {
        firebase.firestore().collection('chat').add({
          renter: false,
          message: this.inputChat.model,
          bargain: false,
          booking: false,
          createdAt: new Date(),
        });
        this.$nextTick(() => this.scrollToBottom());
        this.inputChat.model = '';
      }
    },

    acceptMessage() {
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Chấp nhận trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
    },

    denyMessage() {
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Từ chối trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
    },

    acceptBookMessage() {
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Chấp nhận lịch hẹn của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
    },

    denyBookMessage() {
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Từ chối lịch hẹn của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
    },

    fetchMessages() {
      firebase.firestore().collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
        const allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        });
        this.items = allMessages;
      });
    },
    scrollToBottom() {
      const chatbox = this.$el.querySelector('#chatbox');
      chatbox.scrollTop = chatbox.scrollHeight;
    },
  },
  created() {
    this.fetchMessages();
  },
  mounted() {
    this.$nextTick(() => this.scrollToBottom());
  },

};
</script>
<style>
.text-color-deal {
  color: #9c0621;
}
.border-deal{
  border: 1px solid black;
  border-radius: 5px;
}
</style>
