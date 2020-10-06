<template>
  <div
    v-if="!isLoadingRenterList || !isLoadingUser"
    class="d-flex flex-column"
    style="height: 100%; background: #fff;"
  >
    <v-toolbar color="#6C98C6" dark flat>
      <v-text-field
        class="ma-3"
        flat
        hide-details
        label="Tìm kiếm tin nhắn"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
    </v-toolbar>

    <div style="height: 100%; overflow-y: auto;">
      <vue-scroll>
        <v-list two-line nav avatar class="rounded-l">
          <v-list-item-group color="primary">
            <v-list-item
              dense
              v-for="item in docsHasMessage"
              :key="item.id"
              @click="$emit('clickChat', getDocRef(item.id))"
            >
              <v-list-item-avatar>
                <v-img :src="getUserById(item.renterId).avatar || '#'"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ getUserById(item.renterId).username }}</v-list-item-title>
                <v-list-item-subtitle v-if="item.lastedMessage.message">
                  <span
                    v-bind:class="{
                      'font-weight-bold': !item.lastedMessage.seen,
                    }"
                  >
                    {{ item.lastedMessage.message }}
                  </span>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.lastedMessage.book">
                  Đặt lịch vào
                  {{ item.lastedMessage.book.time }}
                  {{ item.lastedMessage.book.date }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.lastedMessage.bargain"
                  >Trả giá {{ item.lastedMessage.bargain.newPrice }} triệu
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-if="item.lastedMessage.book" color="pink"> event</v-icon>
                <v-icon v-if="item.lastedMessage.bargain" color="amber"> attach_money</v-icon>
                <v-icon v-if="item.lastedMessage.message" color="green"> chat</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import firebase from '../../../config/firebase';

const { store } = firebase;
const chatCollectionRef = store.collection('chat');

export default {
  name: 'ChatList',
  props: {
    chatShow: Boolean,
    itemSelected: Object,
    vendorId: Number,
  },
  data() {
    return {
      tabs: [{ tabName: 'Tin nhắn' }],
      filter: [{ filterName: 'Giá' }, { filterName: 'Thời gian' }],
      items: [],
      dialogAccept: false,
      dialogDeny: false,
      docRefs: [],
      docs: [],
      renterIds: [],
    };
  },
  computed: {
    ...mapGetters({
      getUserById: 'vendor/overview/getUserById',
    }),
    docsHasMessage() {
      return this.docs.filter((item) => item.lastedMessage);
    },
    listDealChange() {
      return this.items.filter((items) => {
        if (items.bargain) {
          return true;
        }
        return false;
      });
    },
    listMessageChange() {
      return this.items.filter((items) => {
        if (!items.bargain && !items.book) {
          return true;
        }
        return false;
      });
    },
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
    renterList() {
      return this.$store.state.vendor.overview.usersChatList.data;
    },
    isLoadingRenterList() {
      return this.$store.state.vendor.overview.usersChatList.isLoadings;
    },
    chatListHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '400px';
        case 'sm':
          return '400px';
        case 'md':
          return '400px';
        case 'lg':
          return '400px';
        case 'xl':
          return '700px';
        default:
          return null;
      }
    },
  },
  methods: {
    myOnScroll() {},
    ...mapActions({
      getUserByIds: 'vendor/overview/getUserByIds',
      addUserToListById: 'vendor/overview/addUserToListById',
      getOneBooking: 'user/getOneBooking',
    }),
    acceptMessage() {
      // this.visible = true;
      this.dialogAccept = false;
      store.collection('chat').add({
        renter: false,
        message: 'Chấp nhận trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });

      // this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },
    getDocRef(id) {
      const res = this.docRefs[id];
      console.log(res);
      return res;
    },
    denyMessage() {
      // this.visible = true;
      this.dialogDeny = false;
      store.collection('chat').add({
        renter: false,
        message: 'Từ chối trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },
    getItemSelected() {
      // this.itemSelected = selectedItem;
      // this.chatShow = true;
    },
    async getLastedMessage(docRef) {
      // const docId = `renter-${renterId}:vendor-${vendorId}:type-${typeId}`;
      let message = null;
      await docRef.ref
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot((querySnapshot) => {
          let result = null;
          querySnapshot.forEach((doc) => {
            result = { id: doc.id, ...doc.data() };
          });
          message = result;
        });
      console.log(message);
      return message;
    },
    async fetchNewBooking(doc) {
      if (doc.data.book) {
        this.getOneBooking(doc.data.book.bookingId);
      }
    },
    async fetchConversations() {
      await chatCollectionRef
        .where('vendorId', '==', Number(this.vendorId))
        .orderBy('updated', 'desc')
        .onSnapshot((querySnapshot) => {
          this.docRefs = {};
          this.docs = [];
          this.renterIds = [];
          querySnapshot.docs.map(async (doc) => {
            this.fetchNewBooking(doc);
            this.docRefs[doc.id] = doc;
            this.docs.push({ ...doc.data(), id: doc.id });
            this.renterIds.push(doc.data().renterId);
          });
          this.getUserByIds(this.renterIds);
        });
      await this.docRefs.forEach((docRef, index) => {
        docRef.ref
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .limit(1)
          .onSnapshot((querySnapshot) => {
            let result = null;
            querySnapshot.forEach((doc) => {
              result = { id: doc.id, ...doc.data() };
            });
            this.lastedMessages[index] = result;
          });
      });
    },
  },
  created() {
    this.fetchConversations();
  },
};
</script>
<style>
.text-color {
  color: #0022d5;
  font-size: 18px;
}
</style>
