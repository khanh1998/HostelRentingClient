<template>
  <div style="width: 100%; max-height:836px">
    <v-row>
      <v-col cols="8">
        <v-row no-gutters>
          <v-col cols="12">
            <div
              style="height: auto; width: 100%"
              class="px-2"
            >
                <SlideBooking/>
            </div>
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="4">
            <div
              style="height: 500px; width: 100%"
              class="ml-2"
            >
            <SuggestContract/>
            </div>
          </v-col>
          <v-col cols="8">
            <div style="background-color: coral; height: 500px; width: 100%">
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <div style="width: 95%">
            <ChatList/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ChatList from '@/components/vendor/ChatList.vue';
import SlideBooking from '@/components/vendor/SlideBooking.vue';
import SuggestContract from '@/components/vendor/SuggestContract.vue';

export default {
  name: 'Overview',
  components: {
    ChatList,
    SlideBooking,
    SuggestContract,
  },
  data: () => ({

  }),
};
</script>
<style>
</style>
