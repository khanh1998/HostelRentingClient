<template>
  <div v-if="chatShow">
    <v-card
      v-if="!userState.isLoading && userState.success"
      width="100%"
      class="d-flex flex-row justify-space-between align-center pa-2"
    >
      <div class="d-flex flex-nowrap align-center">
        <v-avatar>
          <v-img src="@/assets/suzy-avatar.jpg"></v-img>
        </v-avatar>
        <p class="font-weight-medium mb-0 ml-2">HyunA</p>
      </div>
      <v-btn icon color="red" @click="closeChat()">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-card>
    <div class="chatbox rounded-l overflow-y-auto" style="max-height: 350px;" id="chatbox">
      <v-list
        v-scroll.self="myOnScroll"
        align="center"
        justify="center"
        max-height="auto"
        min-height="350px"
      >
        <v-list-item v-for="(item, i) in items" v-bind:key="i">
          <v-list-item-content>
            <div v-if="item.sender === 'renter'" class="d-flex justify-start">
              <div v-if="item.bargain" class="border-deal">
                <v-row>
                  <v-col cols="12">
                    <span
                      class="mx-2"
                      style="color: #6C98C6; fontSize:20px"
                    >{{item.bargain.typeName}}</span>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-left align-center">
                    <div style="fontSize:18px">
                      <p>
                        <span style="color:#98B7D7">Giá gốc:</span>
                        <span style="color:red">{{item.bargain.originalPrice}} Triệu</span>
                      </p>
                      <p>
                        <span style="color:#98B7D7">Trả giá:</span>
                        <span>{{ item.bargain.newPrice}} Triệu</span>
                      </p>
                    </div>
                  </v-col>
                </v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-row class="d-flex justify-center">
                    <v-dialog v-model="dialogAccept" width="350">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#EF7239"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          style="width:80px; height:20px"
                          class="mx-1"
                        >Chấp nhận</v-btn>
                      </template>

                      <v-card>
                        <v-card-title style="backgroundColor: #98B7D7; color: white">
                          Xác nhận</v-card-title>
                        <v-card-text
                          class="text-center mt-3"
                          style="fontSize:20px;"
                        >Bạn sẽ chấp nhận trả giá này ?</v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="acceptMessage">Đồng ý</v-btn>
                          <v-btn color="primary" text @click="dialogAccept = false">Hủy</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDeny" width="350">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#F3F3F3"
                          v-bind="attrs"
                          v-on="on"
                          style="width:80px; height:20px"
                          class="mx-1"
                        >Từ chối</v-btn>
                      </template>

                      <v-card>
                        <v-card-title style="backgroundColor: #98B7D7; color: white">
                          Xác nhận</v-card-title>
                        <v-card-text
                          class="text-center mt-3"
                          style="fontSize:20px;"
                        >Bạn sẽ từ chối trả giá này ?</v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="denyMessage">Đồng ý</v-btn>
                          <v-btn color="primary" text @click="dialogDeny = false">Hủy</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </v-col>
              </div>
              <span
                v-if="item.book"
                v-ripple
                style="width: 75%; "
                class="blue lighten-5 pa-2 rounded"
              >{{item.book.date}} {{item.book.time}}</span>
              <span
                v-if="!item.book && !item.bargain"
                v-ripple
                style="width: 75%; "
                class="blue lighten-5 pa-2 rounded"
              >{{item.message}}</span>
              <v-icon v-if="item.book || item.bargain">info</v-icon>
            </div>
            <div v-if="item.sender === 'vendor'" class="d-flex justify-end">
              <span
                style="width: auto; max-width: 75%; "
                v-ripple
                class="green lighten-5 pa-2 rounded"
                v-if="item.book"
              >{{item.book.date}} {{item.book.time}}</span>
              <span
                style="width: auto; max-width: 75%; "
                v-ripple
                class="green lighten-5 pa-2 rounded"
                v-if="item.bargain"
              >{{'reply to bargain'}}</span>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div class="d-flex flex-no-wrap">
      <v-text-field
        clearable
        dense
        flat
        outlined
        placeholder="Nội dung tin nhắn..."
        v-model="inputChat.model"
        class="ma-1"
        hide-details
        v-on:keyup.enter="sendMessage"
      ></v-text-field>
      <v-btn color="#7794F8" class="ma-1" depressed @click="sendMessage">
        <v-icon color="white">far fa-paper-plane</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import firebase from '../../config/firebase';

// const { store } = firebase;
// const chatCollectionRef = store.collection('chat');

export default {
  name: 'ChatBox',
  props: {
    index: Number,
    doc: Object,
  },
  data: () => ({
    items: [],
    inputChat: {
      model: '',
    },
    chatShow: true,
    dialogAccept: false,
    dialogDeny: false,
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    myOnScroll() {},
    sendMessage() {
      if (this.inputChat.model.length > 0) {
        this.doc.ref.collection('messages').add({
          renter: false,
          message: this.inputChat.model,
          bargain: false,
          booking: false,
          createdAt: Date.now(),
        });
        this.$nextTick(() => this.scrollToBottom());
        this.inputChat.model = '';
      }
    },

    acceptMessage() {
      // this.visible = true;
      this.doc.ref.collection('messages').add({
        renter: false,
        message: 'Chấp nhận trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: Date.now(),
      });
      this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },

    denyMessage() {
      // this.visible = true;
      this.doc.ref.collection('messages').add({
        renter: false,
        message: 'Từ chối trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: Date.now(),
      });
      this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },

    fetchMessages() {
      this.doc.ref
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {
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
    closeChat() {
      // this.chatShow = false;
      this.$emit('closeChat', this.index);
    },
  },
  created() {
    this.fetchMessages();
    this.getUser();
  },
  computed: {
    userState() {
      return this.$store.state.user.user;
    },
    renterId() {
      return this.doc.data().renterId;
    },
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
.border-deal {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
