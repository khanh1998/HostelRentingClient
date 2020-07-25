<template>
  <div style="width: 100%; max-height:836px">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row v-if="isLoading">
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
          <ChatList />
        </div>
      </v-col>
    </v-row>
    <v-card style="position: absolute; right: 20px; bottom: 10px;
    height:auto; width:350px">
      <Chatbox />
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
  data: () => ({}),
  computed: {
    isLoading() {
      return (
        this.$store.state.vendor.group.groups.isLoading
        || this.$store.state.vendor.group.types.isLoading
        || this.$store.state.vendor.group.rooms.isLoading
      );
    },
  },
  methods: {
    ...mapActions({
      getGroups: 'vendor/group/getGroups',
      getTypes: 'vendor/group/getTypes',
      getRooms: 'vendor/group/getRooms',
    }),
  },
  async created() {
    this.getGroups()
      .then(() => {
        this.getTypes()
          .then(() => this.getRooms());
      });
  },
};
</script>
<style>
</style>
