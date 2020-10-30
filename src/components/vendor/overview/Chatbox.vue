<template>
  <!-- eslint-disable max-len -->
  <div v-if="chatShow" style="height: 100%; overflow-y: hidden;" class="d-flex flex-column">
    <v-overlay v-model="dialogAccept" width="350" absolute>
      <v-card>
        <v-card-title style="backgroundcolor: #98b7d7; color: white;">Xác nhận</v-card-title>
        <v-card-text class="text-center mt-3" style="fontsize: 20px;"
          >Bạn sẽ chấp nhận trả giá này ?</v-card-text
        >
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
        <v-card-title style="backgroundcolor: #98b7d7; color: white;">Xác nhận</v-card-title>
        <v-card-text class="text-center mt-3" style="fontsize: 20px;"
          >Bạn sẽ từ chối trả giá này ?</v-card-text
        >
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
      class="d-flex flex-column pa-2"
      style="z-index: 9999;"
    >
      <div class="d-flex align-center">
        <v-avatar color="#727cf5" height="30" width="30" min-width="30">
          <v-img max-height="30" max-width="30" v-if="renter.avatar" :src="renter.avatar" />
          <span class="text-overline white--text" v-else>{{
            getAvatarTitle(renter.username)
          }}</span>
        </v-avatar>
        <span class="text-subtitle-2 ml-3 text-primary">{{ renter.username }}</span>
        <v-btn class="ml-auto" small icon color="#727cf5" @click="closeChat()">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <span class="size-sub-3 font-nunito mt-1 text-gray font-weight-bold">{{ type.title }}</span>
        <v-btn class="ml-auto" small icon color="#6c757d" @click="showType = !showType">
          <v-icon small>
            {{ showType ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </div>
      <div v-show="showType">
        <div class="d-flex flex-column justify-center">
          <span class="size-sub-3 d-flex align-center font-nunito" style="color: #4250f2;"
            ><v-icon small color="#727cf5" class="mr-1">mdi-home-currency-usd</v-icon
            >{{ type.price }} {{ type.priceUnit }}</span
          >
          <span class="size-sub-3 d-flex align-center font-nunito" style="color: #4250f2;"
            ><v-icon small color="#727cf5" class="mr-1">mdi-home-group</v-icon
            >{{ group.groupName }}</span
          >
        </div>
      </div>
    </v-card>
    <v-divider />
    <div class="chatbox rounded-l overflow-y-auto chatbox" :style="{ height: height }" id="chatbox">
      <v-list
        v-scroll.self="myOnScroll"
        align="center"
        justify="center"
        max-height="auto"
        min-height="300px"
        class="pa-1"
      >
        <!-- <v-list-item color="success" two-line>
          <v-list-item-content>
            <v-list-item-title>{{ type.title }}</v-list-item-title>
            <v-list-item-content>
              <p>
                <v-icon>attach_money</v-icon>
                {{ type.price }}
                {{ type.priceUnit }}
              </p>
              <p>
                <v-icon>room</v-icon>
                {{ group.address.streetName }}
              </p>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-divider /> -->
        <v-list-item v-for="(item, i) in filteredMessage" v-bind:key="i">
          <v-list-item-content>
            <div v-if="item.sender === 'renter'" class="d-flex justify-start">
              <div
                v-if="item.bargain"
                class="event d-flex flex-column justify-center align-center pa-2"
                _class="blue lighten-5 border-deal pa-1"
                style="width: 100%;"
              >
                <span
                  class="font-weight-bold text-primary font-nunito"
                  style="font-size: 0.9375rem;"
                  >TRẢ GIÁ MỚI</span
                >
                <div class="d-flex justify-space-between align-center my-4" style="width: 100%;">
                  <span
                    class="font-nunito font-weight-regular text-gray text-subtitle-2 d-flex align-center"
                    ><v-icon class="mr-1">mdi-home-currency-usd</v-icon>
                    {{ item.bargain.originalPrice }} {{ type.priceUnit }}</span
                  >
                  <span class="font-nunito font-weight-regular text-warning text-subtitle-2">
                    <v-icon color="#ffbc00">mdi mdi-arrow-down-bold</v-icon>
                    {{ item.bargain.newPrice }} {{ type.priceUnit }}
                  </span>
                </div>
                <v-row class="d-flex justify-center">
                  <v-col cols="12" class="d-flex justify-center">
                    <div v-if="item.bargain.status === 'wait'" class="d-flex justify-space-around">
                      <v-btn
                        small
                        color="#F3F3F3"
                        class="mx-1"
                        @click="showBargainReplyOverlay(item.id, 'deny')"
                        >Từ chối</v-btn
                      >
                      <v-btn
                        small
                        color="#EF7239"
                        dark
                        class="mx-1"
                        @click="showBargainReplyOverlay(item.id, 'accept')"
                        >Chấp nhận</v-btn
                      >
                    </div>
                    <span v-if="item.bargain.status === 'accept'">
                      <v-icon color="green">thumb_up</v-icon>Bạn đã đồng ý
                    </span>
                    <span v-if="item.bargain.status === 'deny'">
                      <v-icon color="red">thumb_down</v-icon>Bạn đã không đồng ý
                    </span>
                    <span v-if="item.bargain.status === 'cancel'">
                      <v-icon color="red">clear</v-icon>
                      {{ renter.username }} đã hủy trả giá này
                    </span>
                  </v-col>
                </v-row>
              </div>
              <p
                v-if="item.book"
                v-ripple
                style="width: 75%;"
                class="blue lighten-5 pa-2 rounded border-deal cursor"
                @click="viewListBookings()"
              >
                <v-icon color="pink">event</v-icon>
                <span class="font-weight-bold">Lịch hẹn mới</span>
                <v-divider class="my-1"></v-divider>Ngày:
                <span class="font-weight-bold">{{ item.book.date }}</span>
                <br />Giờ:
                <span class="font-weight-bold">{{ item.book.time }}</span>
                <br />Địa chỉ:
                <span class="font-weight-bold">{{ group.address.streetName }}</span>
                <span v-if="item.book.cancel">
                  <v-divider class="my-1"></v-divider>
                  <v-icon color="red">clear</v-icon>Lịch hẹn đã hủy
                </span>
              </p>
              <span
                v-if="!item.book && !item.bargain"
                v-ripple
                style="width: 75%;"
                class="blue lighten-5 pa-2 rounded"
                >{{ item.message }}</span
              >
            </div>
            <div v-if="item.sender === 'vendor'" class="d-flex justify-end">
              <span
                style="width: auto; max-width: 75%;"
                v-ripple
                class="green lighten-5 pa-2 rounded"
                v-if="!item.book && !item.bargain"
                >{{ item.message }}</span
              >
              <span
                style="width: auto; max-width: 75%;"
                v-ripple
                class="red lighten-5 pa-2 rounded"
                v-if="item.bargain && !item.bargain.dealId"
                >Bạn đã không đồng ý với mức giá trên</span
              >
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
    height: {
      default: '350px',
    },
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
    showType: false,
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
        const content = {
          sender: 'vendor',
          message: this.inputChat.model,
          bargain: null,
          booking: null,
          createdAt: Date.now(),
        };
        this.doc.ref.collection('messages').add(content);
        this.doc.ref.update({
          lastedMessage: content,
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
    getAvatarTitle(name) {
      return name.substring(name.lastIndexOf(' ') + 1).substring(0, 1);
    },
    viewListBookings() {
      this.$router.push('/vendor/booking');
    },
  },
  created() {
    if (!this.userState) {
      Promise.all([this.getUser]).then(() => this.fetchMessages());
    } else {
      this.fetchMessages();
    }
  },
  watch: {
    doc() {
      console.log('call fetch message again');
      this.fetchMessages();
    },
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
      console.log(this.findTypesById(this.doc.data().typeId));
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
  mounted() {},
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
.event {
  background-color: #fef5e4;
}
</style>
