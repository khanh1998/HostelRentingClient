<template>
  <div style="overflow-y: hidden; height: calc(100vh - 72px);" class="d-flex flex-column">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog width="400" v-model="overlay.show" overlay-opacity="0.9">
      <v-card>
        <Chatbox
          v-if="overlay.doc"
          :doc="overlay.doc"
          :index="1"
          v-on:closeChat="closeMobileChatBox"
        />
      </v-card>
    </v-dialog>
    <div
      v-if="!isLoading"
      class="d-flex flex-row flex-nowrap"
      style="overflow-y: hidden; height: 100%;"
    >
      <div style="min-width: 70vw; height: 100%; overflow-y: hidden;" class="d-flex flex-column">
        <div class="pa-2">
          <SlideBooking />
        </div>
        <div class="d-flex flex-column pa-2" style="height: 100%; overflow-y: hidden;">
          <HostelGroupsOverview />
        </div>
      </div>
      <div style="width: 30vw; height: 100%;" class="hidden-sm-and-down pa-2">
        <ChatList :vendorId="user.userId" v-on:clickChat="showChatBox($event)" />
      </div>
    </div>
    <v-card style="position: absolute; right: 20px; bottom: 10px; height: auto; width: 350px;">
      <Chatbox
        v-if="this.docs.doc1"
        :doc="this.docs.doc1"
        :index="1"
        v-on:closeChat="closeChatBox($event)"
      />
    </v-card>
    <v-card style="position: absolute; right: 370px; bottom: 10px; height: auto; width: 350px;">
      <Chatbox
        v-if="this.docs.doc2"
        :doc="this.docs.doc2"
        :index="2"
        v-on:closeChat="closeChatBox($event)"
      />
    </v-card>
    <v-card style="position: absolute; right: 720px; bottom: 10px; height: auto; width: 350px;">
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
import ChatList from '@/components/vendor/overview/ChatList.vue';
import SlideBooking from '@/components/vendor/overview/SlideBooking.vue';
import Chatbox from '@/components/vendor/overview/Chatbox.vue';
import HostelGroupsOverview from '../../components/vendor/overview/HostelGroupsOverview.vue';

export default {
  name: 'Overview',
  components: {
    ChatList,
    SlideBooking,
    Chatbox,
    HostelGroupsOverview,
  },
  data: () => ({
    docList: [],
    docs: {
      doc1: null,
      doc2: null,
      doc3: null,
    },
    overlay: {
      show: false,
      doc: null,
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
    isOnMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        case 'sm':
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    ...mapActions({
      getGroups: 'vendor/group/getGroups',
      getTypes: 'vendor/group/getTypes',
      getRooms: 'vendor/group/getRooms',
      getUser: 'user/getUser',
    }),
    showMobileChatBox(event) {
      this.overlay.doc = event;
      this.overlay.show = true;
    },
    closeMobileChatBox() {
      this.overlay.doc = null;
      this.overlay.show = false;
    },
    showChatBox(event) {
      if (this.isOnMobile) {
        this.showMobileChatBox(event);
        return;
      }
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
<style scoped>
/* body {
  max-height: calc(100vh);
  overflow: hidden;
} */
</style>
