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

    <v-app-bar :clipped-left="primaryDrawer.clipped" app dense _height="70">
      <v-app-bar-nav-icon @click.stop="primaryDrawer.model = !primaryDrawer.model">
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ routeName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <notify-and-profile />
    </v-app-bar>

    <v-main style="max-height: calc(100vh); overflow-y: hidden">
      <v-container
        id="container"
        ref="container"
        fluid
        style="max-height: 100%"
        class="d-flex flex-column"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import sideMenuBar from '../components/core_layout/sideMenuBar.vue';
import notifyAndProfile from '../components/vendor/overview/NotifyAndProfile.vue';

export default {
  name: 'VendorView',
  components: {
    sideMenuBar,
    notifyAndProfile,
  },
  computed: {
    routeName() {
      return this.$route.meta.vi || 'Yoho';
    },
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
      this.$cookies.remove('firebaseIdToken');
      this.$cookies.remove('messagingToken');
      this.clearUserData();
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
.full-height {
  min-height: 100%;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
