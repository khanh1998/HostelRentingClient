<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
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
          <v-col cols="12">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import sideMenuBar from '../components/core_layout/sideMenuBar.vue';

export default {
  name: 'VendorView',
  components: {
    sideMenuBar,
  },
  data: () => ({
    primaryDrawer: {
      model: null,
      type: 'permanent',
      clipped: true,
    },
  }),
};
</script>
