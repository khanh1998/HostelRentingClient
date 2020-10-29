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

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      dense
      height="70"
      class="white vendor pa-0"
    >
      <!-- <router-link to="/">
        <v-img
          alt="Hostel Renting"
          class="shrink mr-2"
          contain
          src="@/assets/logo-sac.png"
          transition="scale-transition"
          max-width="50"
          max-height="50"
        />
      </router-link> -->
      <v-app-bar-nav-icon @click.stop="primaryDrawer.model = !primaryDrawer.model">
      </v-app-bar-nav-icon>
      <v-toolbar-title
        class="font-nunito text-gray font-weight-bold"
        style="font-size: 1.125rem;"
        >{{ routeName }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <!-- <v-btn icon large @click.stop="chatDrawer.model = !chatDrawer.model">
        <v-icon color="#727cf5">mdi-chat-processing</v-icon>
      </v-btn> -->
      <notify-and-profile />
    </v-app-bar>

    <v-main _style="max-height: calc(100vh); overflow-y: hidden;">
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
.vendor.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15) !important;
}
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
<style>
.primary-box-shadown {
  box-shadow: 0 0 40px 0 rgba(154, 161, 171, 0.15) !important;
}
.badge-danger-lighten {
  color: #fa5c7c;
  background-color: rgba(250, 92, 124, 0.18);
  padding: 0.25em 0.4em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
.badge-success-lighten {
  color: #0acf97;
  background-color: rgba(10, 207, 151, 0.18);
  padding: 0.25em 0.4em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
.text-right {
  text-align: right !important;
}
.float-right {
  float: right !important;
}
</style>
