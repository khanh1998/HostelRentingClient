<template>
  <div style="width: 100%; max-height:836px">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row v-if="!isLoading">
      <v-col cols="8">
        <v-row no-gutters>
          <v-col cols="12">
            <div style="height: auto; width: 100%" class="px-2">
              <SlideBooking />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <div style="height: 500px; width: 100%" class="ml-2">
              <SuggestContract />
            </div>
          </v-col>
          <v-col cols="8">
            <div style="height: 500px; width: 100%" class="pr-2">
              <ChartOverview />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <div style="width: 95%">
          <ChatList
            :vendorId="user.userId"
            v-on:clickChat="showChatBox($event)"
          />
        </div>
      </v-col>
    </v-row>
    <v-card style="position: absolute; right: 20px; bottom: 10px;
    height:auto; width:350px">
    0
      <Chatbox
        v-if="docList[0]"
        :doc="docList[0]"
        :index="0"
        v-on:closeChat="closeChatBox($event)"/>
    </v-card>
    <v-card style="position: absolute; right: 370px; bottom: 10px;
    height:auto; width:350px">
    1
      <Chatbox
        v-if="docList[1]"
        :doc="docList[1]"
        :index="1"
        v-on:closeChat="closeChatBox($event)"/>
    </v-card>
    <v-card style="position: absolute; right: 720px; bottom: 10px;
    height:auto; width:350px">
    2
      <Chatbox
        v-if="docList[2]"
        :doc="docList[2]"
        :index="2"
        v-on:closeChat="closeChatBox($event)"/>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import ChatList from '@/components/vendor/ChatList.vue';
import SlideBooking from '@/components/vendor/SlideBooking.vue';
import SuggestContract from '@/components/vendor/SuggestContract.vue';
import ChartOverview from '@/components/vendor/ChartOverview.vue';
import Chatbox from '@/components/vendor/Chatbox.vue';
// import ChatboxBottom from '@/components/vendor/ChatboxBottom.vue';

export default {
  name: 'Overview',
  components: {
    ChatList,
    SlideBooking,
    SuggestContract,
    ChartOverview,
    Chatbox,
    // ChatboxBottom,
  },
  data: () => ({
    docList: [],
  }),
  computed: {
    isLoading() {
      return (
        this.$store.state.vendor.group.groups.isLoading
        || this.$store.state.vendor.group.types.isLoading
        || this.$store.state.vendor.group.rooms.isLoading
        || this.$store.state.user.user.isLoading
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
      if (!this.docList.includes(event)) {
        if (this.docList.length <= 2) {
          this.docList.push(event);
        } else {
          console.log(this.docList.length);
          this.docList.pop();
          console.log(this.docList.length);
          this.docList.push(event);
          console.log(this.docList.length);
        }
      }
    },
    closeChatBox(event) {
      this.docList.splice(event, 1); // because index
    },
  },
  async created() {
    this.getGroups()
      .then(() => {
        this.getTypes()
          .then(() => this.getRooms());
      });
    this.getUser();
  },
};
</script>
<style>
</style>
