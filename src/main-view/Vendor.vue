<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <side-menu-bar />

      <template v-slot:append>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="logout" class="item-text-display text-h6">
              Đăng xuất
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon @click.stop="primaryDrawer.model = !primaryDrawer.model">
      </v-app-bar-nav-icon>
      <v-toolbar-title>TD Hostel</v-toolbar-title>
      <v-spacer></v-spacer>
      <notify-and-profile />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
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
      clipped: true,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    },
  }),
  methods: {
    ...mapActions({
      clearUserData: 'user/clearUserData',
      updateUser: 'user/updateUser',
    }),
    logout() {
      this.$cookies.remove('role');
      this.$cookies.remove('userId');
      this.$cookies.remove('jwt');
      this.clearUserData();
      this.$router.push('/');
    },
  },
};
</script>
