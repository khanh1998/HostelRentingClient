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
        v-model="searchQuery"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
          <!-- <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>aaa</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="changeStatus('ALL')">
                  <v-list-item-title>Tất cả</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeStatus('INCOMING')">
                  <v-list-item-title>Trả giá</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeStatus('DONE')">
                  <v-list-item-title>Đặt lịch</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
    </v-toolbar>
    <div style="height: 100%; overflow-y: auto;min-width: 310px">
      <vue-scroll>
        <v-list two-line nav avatar class="rounded-l">
          <v-list-item-group color="primary">
            <v-list-item
              dense
              v-for="item in resultQuery"
              :key="item.id"
              @click="$emit('clickChat', getDocRef(item.id))"
            >
            <v-list-item-avatar>
                <v-img :src="getUserById(item.renterId).avatar"></v-img>
                <v-icon>face</v-icon>
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
      searchQuery: '',
      idList: [],
      tab: null,
      tabItems: [
        { id: 1, name: 'Tất cả' },
        { id: 2, name: 'Trả giá' },
        { id: 3, name: 'Đặt lịch' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getUserById: 'vendor/overview/getUserById',
    }),
    docsHasMessage() {
      return this.docs;
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
    // filterRenterIs() { // tra ve danh sach id
    //   return this.renterList.filter;
    // },
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
    resultQuery() {
      if (this.searchQuery) {
        const idList = this.renterList.filter((item1) => item1.username.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1).map((item2) => item2.userId);
        return this.docs.filter((item) => idList.includes(item.renterId)).filter((item2) => item2.lastedMessage);
      }
      return this.docs.filter((item) => item.lastedMessage);
      // if (this.searchQuery) {
      //   return this.renterList.filter((item) => this.searchQuery.toLowerCase().split(' ').every((v) => item.username.toLowerCase().includes(v)));
      // }
      // return this.docs.filter((item) => item.lastedMessage);
      // return this.docs.filter((item) => item.lastedMessage.getUserById(item.renterId).username.toLowerCase().includes(this.searchQuery));
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
      // console.log(res);
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
      // console.log(message);
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
