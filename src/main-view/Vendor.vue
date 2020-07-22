<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
      width="15%"
    >
    <side-menu-bar/>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>TD Hostel</v-toolbar-title>
    </v-app-bar>

      <v-main>
        <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="11">
              <router-view />
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
      type: 'temporary',
    },
  }),
};
</script>
