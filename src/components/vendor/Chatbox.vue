<template>
  <div v-if="chatShow">
    <v-overlay v-model="dialogAccept" width="350" absolute>
      <v-card>
        <v-card-title style="backgroundColor: #98B7D7; color: white">Xác nhận</v-card-title>
        <v-card-text class="text-center mt-3" style="fontSize:20px;">
          Bạn sẽ chấp nhận trả giá này ?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="acceptMessage">Đồng ý</v-btn>
          <v-btn color="primary" text @click="dialogAccept = false">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-overlay v-model="dialogDeny" width="350" absolute>
      <v-card>
        <v-card-title style="backgroundColor: #98B7D7; color: white">Xác nhận</v-card-title>
        <v-card-text class="text-center mt-3" style="fontSize:20px;">
          Bạn sẽ từ chối trả giá này ?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="denyMessage">Đồng ý</v-btn>
          <v-btn color="primary" text @click="dialogDeny = false">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-card
      v-if="!userState.isLoading && userState.success"
      width="100%"
      class="d-flex flex-row justify-space-between align-center pa-2"
    >
      <div class="d-flex flex-nowrap align-center">
        <v-avatar>
          <v-img :src="renter.avatar"></v-img>
        </v-avatar>
        <p class="font-weight-medium mb-0 ml-2">{{renter.username}}</p>
      </div>
      <v-btn icon color="red" @click="closeChat()">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-card>
    <div class="chatbox rounded-l overflow-y-auto chatbox" style="max-height: 350px;" id="chatbox">
      <v-list
        v-scroll.self="myOnScroll"
        align="center"
        justify="center"
        max-height="auto"
        min-height="350px"
      >
        <v-list-item color="success" two-line>
          <v-list-item-content>
            <v-list-item-title>{{type.title}}</v-list-item-title>
            <v-list-item-content>
              <p><v-icon>attach_money</v-icon>{{type.price}} {{type.priceUnit}}</p>
              <p><v-icon>room</v-icon>{{group.street}}</p>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="(item, i) in filteredMessage" v-bind:key="i">
          <v-list-item-content>
            <div v-if="item.sender === 'renter'" class="d-flex justify-start">
              <div v-if="item.bargain" class="blue lighten-5 border-deal pa-1" style="width: 75%">
                <v-row>
                  <v-col cols="12">
                    <v-icon color="amber">attach_money</v-icon>
                    <span class="font-weight-bold">
                      Trả giá mới
                    </span>
                  </v-col>
                </v-row>
                <v-divider/>
                <v-row>
                  <v-col cols="12">
                    Loại phòng: <span
                      class="mx-2 blue--text font-weight-bold"
                    >{{item.bargain.typeName}}</span>
                    <br/>
                    <span style="color:#98B7D7">Giá gốc: </span>
                    <span style="color:red" class="font-weight-bold">
                      {{item.bargain.originalPrice}} Triệu</span>
                    <br/>
                    <span style="color:#98B7D7">Trả giá: </span>
                    <span class="font-weight-bold">
                      {{ item.bargain.newPrice}} Triệu</span>
                  </v-col>
                </v-row>
                <v-divider/>
                <v-row class="d-flex justify-center">
                  <v-col cols="12" class="d-flex justify-center">
                    <div v-if="item.bargain.status === 'wait'"
                      class="d-flex justify-space-around"
                    >
                      <v-btn
                        small
                        color="#F3F3F3"
                        class="mx-1"
                        @click="showBargainReplyOverlay(item.id, 'deny')"
                      >Từ chối</v-btn>
                      <v-btn
                        small
                        color="#EF7239"
                        dark
                        class="mx-1"
                        @click="showBargainReplyOverlay(item.id, 'accept')"
                      >Chấp nhận</v-btn>
                    </div>
                    <span v-if="item.bargain.status === 'accept'">
                      <v-icon color="green">thumb_up</v-icon>
                      Bạn đã đồng ý</span>
                    <span v-if="item.bargain.status === 'deny'">
                      <v-icon color="red">thumb_down</v-icon>
                      Bạn đã không đồng ý</span>
                    <span v-if="item.bargain.status === 'cancel'">
                      <v-icon color="red">clear</v-icon>
                      {{renter.username}} đã hủy trả giá này</span>
                  </v-col>
                </v-row>
              </div>
              <p
                v-if="item.book"
                v-ripple
                style="width: 75%; "
                class="blue lighten-5 pa-2 rounded border-deal"
              >
                <v-icon color="pink">event</v-icon>
                <span class="font-weight-bold">Lịch hẹn mới</span>
                <v-divider class="my-1"></v-divider>
                Ngày: <span class="font-weight-bold">
                  {{ item.book.date }}
                </span>
                <br/>
                Giờ: <span class="font-weight-bold">
                  {{ item.book.time }}
                </span>
                <br/>
                Địa chỉ: <span class="font-weight-bold">
                  {{ group.street }}
                </span>
                <span v-if="item.book.cancel">
                  <v-divider class="my-1"></v-divider>
                  <v-icon color="red">clear</v-icon>
                  Lịch hẹn đã hủy
                </span>
              </p>
              <span
                v-if="!item.book && !item.bargain"
                v-ripple
                style="width: 75%; "
                class="blue lighten-5 pa-2 rounded"
              >{{item.message}}</span>
            </div>
            <div v-if="item.sender === 'vendor'" class="d-flex justify-end">
              <span
                style="width: auto; max-width: 75%; "
                v-ripple
                class="green lighten-5 pa-2 rounded"
                v-if="!item.book && !item.bargain"
              >{{item.message}}</span>
              <span
                style="width: auto; max-width: 75%; "
                v-ripple
                class="red lighten-5 pa-2 rounded"
                v-if="item.bargain && !item.bargain.dealId"
              >Bạn đã không đồng ý với mức giá trên</span>
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
        :disabled="hasAPendingBargain"
        v-on:keyup.enter="sendMessage"
      ></v-text-field>
      <v-btn
        color="#7794F8"
        class="ma-1"
        depressed
        @click="sendMessage"
        :disabled="hasAPendingBargain"
      >
        <v-icon color="white">far fa-paper-plane</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
    bargainDocId: null,
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      createDeal: 'user/createDeal',
    }),
    showBargainReplyOverlay(docId, type) {
      this.bargainDocId = docId;
      if (type === 'accept') {
        this.dialogAccept = true;
      }
      if (type === 'deny') {
        this.dialogDeny = true;
      }
    },
    myOnScroll() {},
    sendMessage() {
      if (this.inputChat.model.length > 0) {
        this.doc.ref.collection('messages').add({
          sender: 'vendor',
          message: this.inputChat.model,
          bargain: null,
          booking: null,
          createdAt: Date.now(),
        });
        this.$nextTick(() => this.scrollToBottom());
        this.inputChat.model = '';
      }
    },

    async acceptMessage() {
      const { renterId, vendorId, typeId } = this.doc.data();
      const lastedBargain = this.items.filter(
        (item) => item.sender === 'renter' && item.bargain && item.bargain.status === 'wait',
      )[0];
      console.log('lasted bargain', lastedBargain);
      console.log('lasted bargain price', lastedBargain.bargain.newPrice);
      const deal = {
        offeredPrice: lastedBargain.bargain.newPrice,
        renterId,
        typeId,
        vendorId,
      };
      await this.createDeal(deal);
      this.doc.ref.collection('messages').doc(this.bargainDocId).update({
        'bargain.status': 'accept',
      });
      this.doc.ref.collection('messages').add({
        sender: 'vendor',
        message: 'Chấp nhận trả giá của bạn',
        bargain: {
          reply: 'accept',
          dealId: this.newlyCreatedDeal.dealId,
        },
        booking: false,
        createdAt: Date.now(),
      });
      this.dialogAccept = false;
      this.$nextTick(() => this.scrollToBottom());
    },

    denyMessage() {
      console.log(this.bargainDocId);
      this.doc.ref.collection('messages').doc(this.bargainDocId).update({
        'bargain.status': 'deny',
      });
      this.doc.ref.collection('messages').add({
        sender: 'vendor',
        message: 'Từ chối trả giá của bạn',
        bargain: {
          reply: 'deny',
        },
        booking: false,
        createdAt: Date.now(),
      });
      this.dialogDeny = false;
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
            allMessages.push({ ...doc.data(), id: doc.id });
          });
          this.items = allMessages;
          this.$nextTick(() => this.scrollToBottom());
        });
    },
    scrollToBottom() {
      const chatboxes = this.$el.querySelectorAll('.chatbox');
      for (let i = 0; i < chatboxes.length; i += 1) {
        chatboxes[i].scrollTop = chatboxes[i].scrollHeight;
        console.log(chatboxes[i]);
      }
    },
    closeChat() {
      // this.chatShow = false;
      this.$emit('closeChat', this.index);
    },
  },
  created() {
    this.fetchMessages();
  },
  computed: {
    ...mapGetters({
      getUserById: 'vendor/overview/getUserById',
      findTypesById: 'vendor/group/findTypesById',
      findGroupById: 'vendor/group/findGroupById',
    }),
    hasAPendingBargain() {
      const mess = this.items[this.items.length - 1];
      if (mess && mess.bargain && mess.bargain.status === 'wait') {
        return true;
      }
      return false;
    },
    type() {
      return this.findTypesById(this.doc.data().typeId);
    },
    group() {
      const { groupId } = this.type;
      return this.findGroupById(groupId);
    },
    userState() {
      return this.$store.state.user.user;
    },
    renterId() {
      return this.doc.data().renterId;
    },
    renter() {
      return this.getUserById(this.renterId);
    },
    newlyCreatedDeal() {
      return this.$store.state.user.deals.newlyCreated;
    },
    filteredMessage() {
      return this.items.filter((item) => {
        if (item.sender === 'vendor' && item.bargain) {
          return false;
        }
        return true;
      });
    },
  },
  mounted() {
    if (!this.userState) {
      this.getUser();
    }
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
