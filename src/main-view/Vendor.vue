<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
      width="15%"
    >
      <side-menu-bar />
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
    >
      <v-app-bar-nav-icon @click.stop="primaryDrawer.model = !primaryDrawer.model">
      </v-app-bar-nav-icon>
      <v-toolbar-title>TD Hostel</v-toolbar-title>
      <v-spacer></v-spacer>
      <notify-and-profile/>
    </v-app-bar>

    <v-main>
      <v-container fluid class="fill-height">
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
import notifyAndProfile from '../components/vendor/NotifyAndProfile.vue';

export default {
  name: 'VendorView',
  components: {
    sideMenuBar,
    notifyAndProfile,
  },
  data: () => ({
    primaryDrawer: {
      model: null,
      type: 'temporary',
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    },
  }),
};
</script>
