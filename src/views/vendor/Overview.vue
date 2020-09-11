<template>
  <div style="width: 100%">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row v-if="!isLoading">
      <v-col cols="8">
        <v-row no-gutters>
          <v-col cols="12">
            <div style="width: 100%" class="px-2">
              <SlideBooking />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <div style="width: 100%" class="ml-2">
              <SuggestContract />
            </div>
          </v-col>
          <v-col cols="8">
            <div style="width: 100%" class="pr-2">
              <ShowEmptyRoom />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <div style="width: 95%">
          <ChatList :vendorId="user.userId" v-on:clickChat="showChatBox($event)" />
        </div>
      </v-col>
    </v-row>
    <v-card style="position: absolute; right: 20px; bottom: 10px; height: auto; width: 350px">
      <Chatbox
        v-if="this.docs.doc1"
        :doc="this.docs.doc1"
        :index="1"
        v-on:closeChat="closeChatBox($event)"
      />
    </v-card>
    <v-card style="position: absolute; right: 370px; bottom: 10px; height: auto; width: 350px">
      <Chatbox
        v-if="this.docs.doc2"
        :doc="this.docs.doc2"
        :index="2"
        v-on:closeChat="closeChatBox($event)"
      />
    </v-card>
    <v-card style="position: absolute; right: 720px; bottom: 10px; height: auto; width: 350px">
      <Chatbox
        v-if="this.docs.doc3"
        :doc="this.docs.doc3"
        :index="3"
        v-on:closeChat="closeChatBox($event)"
      />
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import ChatList from '@/components/vendor/ChatList.vue';
import SlideBooking from '@/components/vendor/SlideBooking.vue';
import SuggestContract from '@/components/vendor/SuggestContract.vue';
import Chatbox from '@/components/vendor/Chatbox.vue';
import ShowEmptyRoom from '../../components/vendor/ShowEmptyRoom.vue';

export default {
  name: 'Overview',
  components: {
    ChatList,
    SlideBooking,
    SuggestContract,
    Chatbox,
    ShowEmptyRoom,
  },
  data: () => ({
    docList: [],
    docs: {
      doc1: null,
      doc2: null,
      doc3: null,
    },
  }),
  computed: {
    isLoading() {
      return (
        this.$store.state.vendor.group.groups.isLoading ||
        this.$store.state.vendor.group.types.isLoading ||
        this.$store.state.vendor.group.rooms.isLoading ||
        this.$store.state.user.user.isLoading
      );
    },
    user() {
      return this.$store.state.user.user.data;
    },
  },
  methods: {
    ...mapActions({
      getGroups: 'vendor/group/getGroups',
      getTypes: 'vendor/group/getTypes',
      getRooms: 'vendor/group/getRooms',
      getUser: 'user/getUser',
    }),
    showChatBox(event) {
      // event is index of chatbox
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(this.docs)) {
        console.log(key);
        if (value === event) {
          return;
        }
        if (!value) {
          this.docs[key] = event;
          return;
        }
      }
      this.docs.doc3 = null;
      this.$nextTick(() => {
        this.docs.doc3 = event;
      });
    },
    closeChatBox(event) {
      console.log(typeof event);
      console.log(event);
      const { doc1, doc2, doc3 } = this.docs; // eslint-disable-line
      switch (event) {
        case 1:
          this.docs.doc1 = null;
          this.docs.doc2 = null;
          this.docs.doc3 = null;
          this.$nextTick(() => {
            this.docs.doc1 = doc2;
            this.docs.doc2 = doc3;
          });
          break;
        case 2:
          this.docs.doc2 = null;
          this.docs.doc3 = null;
          this.$nextTick(() => {
            this.docs.doc2 = doc3;
          });
          break;
        case 3:
          this.docs.doc3 = null;
          break;
        default:
          console.log('why it go in default slot?');
          break;
      }
    },
  },
  async created() {
    this.getGroups().then(() => {
      this.getTypes().then(() => this.getRooms());
    });
    this.getUser();
  },
};
</script>
<style></style>
