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
    <v-sheet class="message mt-3 rounded-l">
      <v-virtual-scroll
        :items="items"
        :item-height="100"
        height="670"
      >
        <template v-slot="{ item }">
          <div class="pa-3">
            <div
              v-if="item.renter"
              class="d-flex justify-start"
            >
              <div v-if="item.message !=null">
                <v-card
                  width="55%"
                  class="blue lighten-5"
                >
                  <p class="ma-2">{{ item.message }}</p>
                </v-card>
              </div>
              <div
                class="h-3 max-w-sm"
                v-else
              >
                <v-card width="55%">
                  <v-row>
                    <v-col cols="6">
                      <v-img
                        :src="item.deal.hostelImage"
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
                        <span v-html="item.deal.deadlingPrice"></span><br />
                        <span style="color:#98B7D7">Trả giá:</span> <br />
                        <span v-html="item.deal.prePrice"></span>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <v-list-item-title
                        class="mx-2"
                        style="color: #6C98C6; fontSize:20px"
                      >
                        {{item.deal.hostelName}}</v-list-item-title>
                    </v-col>
                    <v-col
                      cols="12"
                      class="d-flex justify-center"
                    >
                      <v-chip-group>
                        <v-chip
                          color="red"
                          @click="sendMessage"
                          style="width: 90px"
                          class="d-flex justify-center mr-5"
                        >
                          Từ chối
                        </v-chip>
                        <v-chip
                          color="green"
                          @click="dateTimeOverlay.show = true"
                        >
                          Chấp nhận
                        </v-chip>
                      </v-chip-group>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>
            <div
              v-if="!item.renter"
              class="d-flex justify-end"
            >
              <v-card
                width="55%"
                class="green lighten-5"
              >
                <p class="ma-2">{{ item.message }}</p>
              </v-card>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </v-sheet>
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
import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCWNT4MhALulebmekYoHKbwyAx-htB76tA',
  authDomain: 'td-vue-firestore-chat.firebaseapp.com',
  databaseURL: 'https://td-vue-firestore-chat.firebaseio.com',
  projectId: 'td-vue-firestore-chat',
  storageBucket: 'td-vue-firestore-chat.appspot.com',
  messagingSenderId: '223687361307',
  appId: '1:223687361307:web:ed8fd5232accfb095f09be',
  measurementId: 'G-0K8CSPWJ17',
};
firebase.initializeApp(firebaseConfig);

// initialize cloud firestore through firebase
const db = firebase.firestore();
window.db = db;
// disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});
export default {
  name: 'ChatBox',
  data: () => ({
    index: 0,
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
    sendMessage() {
      // if (this.inputChat.model.length > 0) {
      //   this.items.push({
      //     renter: false,
      //     message: this.inputChat.model,
      //   });
      //   this.inputChat.model = '';
      // }
      this.index += 1;
      if (this.inputChat.model.length > 0) {
        db.collection('chat').add({
          id: this.index,
          renter: false,
          message: this.inputChat.model,
          bargain: false,
          booking: false,
          createdAt: new Date(),
        });
        this.inputChat.model = '';
      }
    },

    fetchMessages() {
      db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
        const allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        });
        this.items = allMessages;
      });
    },
  },
  created() {
    this.fetchMessages();
  },
};
</script>
<style>
.text-color-deal {
  color: #9c0621;
}
</style>
