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
            <v-icon>mdi-account-arrow-left</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="logout" style="color: #3645f1">
              <span class="font-nunito size-h4">Đăng xuất</span>
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
      class="white vendor pa-0 hidden-xs-only"
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
        _style="color: #727cf5 !important"
        class="nav-icon"
      >
      </v-app-bar-nav-icon>
      <router-link to="/">
        <v-img
          alt="Hostel Renting"
          class="shrink ml-1"
          contain
          src="@/assets/logo-sac.png"
          transition="scale-transition"
          max-width="60"
          max-height="40"
        />
      </router-link>
      <v-spacer></v-spacer>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
            class="d-flex justify-center align-center font-nunito size9rem mr-10 text-muted"
          >
            Hướng dẫn sử dụng
            <v-icon class="ml-1" color="#98a6ad" size="15">mdi-chevron-down</v-icon>
          </span>
        </template>
        <v-list>
          <v-list-item
            style="min-height: 20px !important"
            class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
          >
            <v-icon color="#6c757d" class="mr-2 item-hover" size="15">mdi-account-circle</v-icon>
            <v-list-item-title class="item-hover font-nunito text-gray size9rem"
              >Tài khoản của tôi</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            style="min-height: 20px !important"
            class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
          >
            <v-icon color="#6c757d" class="mr-2 item-hover" size="15"
              >mdi-account-arrow-left</v-icon
            >
            <v-list-item-title class="item-hover font-nunito text-gray size9rem"
              >Đăng xuất</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-btn
        @click="doGetMessagingToken"
        v-if="!hasMessagingToken"
        class="bg-warning-lighten elevation-0 text-warning font-nunito size9rem d-flex justify-start"
        style="letter-spacing: 0.01rem !important"
      >
        <v-icon small class="mr-1">notifications_none</v-icon>Bật thông báo
      </v-btn>
      <notify />
      <profile-menu v-if="!isLoadingUser" />
    </v-app-bar>
    <!-- Mobile app bar -->
    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      dense
      height="70"
      class="vendor pa-0 hidden-sm-and-up"
      style="background: linear-gradient(135deg, #8f75da 0, #727cf5 60%)"
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
        style="color: #fff !important"
      >
      </v-app-bar-nav-icon>
      <router-link to="/">
        <div
          style="height: 55px; width: 55px; border-radius: 50%"
          class="white d-flex flex-column justify-center align-center ml-5"
        >
          <v-img
            alt="Hostel Renting"
            class="shrink ml-1"
            contain
            src="@/assets/logo-sac.png"
            transition="scale-transition"
            max-width="50"
            max-height="35"
          />
        </div>
      </router-link>
      <v-spacer></v-spacer>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
            class="d-flex justify-center align-center font-nunito size9rem mr-10 text-muted"
          >
            Hướng dẫn sử dụng
            <v-icon class="ml-1" color="#98a6ad" size="15">mdi-chevron-down</v-icon>
          </span>
        </template>
        <v-list>
          <v-list-item
            style="min-height: 20px !important"
            class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
          >
            <v-icon color="#6c757d" class="mr-2 item-hover" size="15">mdi-account-circle</v-icon>
            <v-list-item-title class="item-hover font-nunito text-gray size9rem"
              >Tài khoản của tôi</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            style="min-height: 20px !important"
            class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
          >
            <v-icon color="#6c757d" class="mr-2 item-hover" size="15"
              >mdi-account-arrow-left</v-icon
            >
            <v-list-item-title class="item-hover font-nunito text-gray size9rem"
              >Đăng xuất</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu> -->
      <notify />
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
    <bottomNavigation class="hidden-sm-and-up" />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import sideMenuBar from '../components/core_layout/sideMenuBar.vue';
import bottomNavigation from '../components/core_layout/bottomNavigation.vue';
import notify from '../components/vendor/overview/Notify.vue';
import profileMenu from '../components/vendor/overview/ProfileMenu.vue';
import authenticationMixins from '../components/mixins/authentication';
import pushNotificationMixins from '../components/mixins/pushNotification';

export default {
  name: 'VendorView',
  mixins: [authenticationMixins, pushNotificationMixins],
  components: {
    sideMenuBar,
    notify,
    profileMenu,
    bottomNavigation,
  },
  computed: {
    routeName() {
      return this.$route.meta.vi || 'Yoho';
    },
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
    hasMessagingToken() {
      return localStorage.getItem('messagingToken') != null;
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
      getUser: 'user/getUser',
    }),
  },
  created() {
    if (!this.user) {
      this.getUser().then(() => {
        console.log('get fcm token at sideMenuBar.vue');
        this.doGetMessagingToken();
      });
    } else {
      this.doGetMessagingToken();
    }
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
.main-bg {
  background: linear-gradient(135deg, #8f75da 0, #727cf5 60%) !important;
}
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
.page-title {
  font-weight: 700 !important;
  font-family: 'Nunito', sans-serif !important;
  color: #6c757d !important;
  font-size: 1.075rem !important;
}
.page-mobile-title {
  font-weight: 700 !important;
  font-family: 'Nunito', sans-serif !important;
  color: #6c757d !important;
  font-size: 1rem !important;
}
.nav-icon {
  color: #313a46 !important;
}
.nav-icon:hover {
  color: #727cf5 !important;
}
.badge-primary {
  color: #fff;
  background-color: #727cf5;
}
.badge-warning-lighten {
  color: #ffbc00;
  font-weight: 700;
  background-color: rgba(255, 188, 0, 0.18);
}
.badge-info-lighten {
  color: #727cf5;
  font-weight: 700;
  background-color: rgba(57, 175, 209, 0.18);
}
.badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  font-size: 80%;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
</style>
