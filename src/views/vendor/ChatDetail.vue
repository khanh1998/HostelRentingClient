<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :permanent="primaryDrawer.type === 'permanent'"
      app
      overflow
      v-bind:width="300"
    >
      <sideMenuBar />
    </v-navigation-drawer>

    <v-main class="mt-10">
        <v-row no-gutters style="flex-wrap: nowrap;">
          <v-col cols="3" class="scroll-container mx-3">
              <chatInfoList/>
          </v-col>
          <v-col cols="5">
            <v-card class="pa-2" outlined tile>
                I'm 1 column wide and I grow to take all the space</v-card>
          </v-col>
          <v-col cols="3" class="mx-3 mt-2">
            <hostel-info/>
          </v-col>
        </v-row>
    </v-main>

  </v-app>
</template>

<script>
import sideMenuBar from '@/components/core_layout/sideMenuBar.vue';
import chatInfoList from '@/components/vendor/ChatInfoList.vue';
import hostelInfo from '@/components/vendor/HostelInfo.vue';

export default {
  name: 'ChatDetail',
  data: () => ({
    primaryDrawer: {
      model: null,
      type: 'permanent',
      clipped: true,
    },
  }),
  components: {
    sideMenuBar,
    chatInfoList,
    hostelInfo,
  },
};
</script>
<style>
.item-image {
  height: 200px;
}
.item-text-display {
  color: #031d5f;
}
.text-display {
  color: #b4b7c8;
}
.bottom-item {
  margin-top: 120px;
}
.container{
    overflow: initial;
}
.scroll-fixed {
  height: 100%;
  /* overflow: hidden;
  position: fixed; */
}
.scroll-container {
  height: 100%;
}
</style>
