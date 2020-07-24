<template>
  <div>
    <v-overlay :value="overlay.show" light opacity="0.6">
      <v-text-field
        color="#E5E5E5"
        background-color="#E5E5E5"
        flat
        solo-inverted
        light
        hide-details
        autofocus
        placeholder="Tìm theo địa chỉ, địa điểm..."
        v-model="searchValue"
        clearable
        class="flex-fill"
        height="30px"
      >
        <template v-slot:append>
          <v-btn @click="overlay.show = false; search();">Search</v-btn>
        </template>
      </v-text-field>
    </v-overlay>
    <v-app-bar app color="#fff" light height="70" id="top-bar">
      <router-link to="/">
        <v-img
          alt="Hostel Renting"
          class="shrink mr-2"
          contain
          src="@/assets/logo1.png"
          transition="scale-transition"
          max-width="100"
          max-height="80"
        />
      </router-link>
      <!-- <v-toolbar-title ml-0 pl-4><span>TD Hostel</span></v-toolbar-title> -->
      <!-- <v-spacer class="hidden-sm-and-down"/> -->
      <!-- <div id="search-bar" class="d-flex">
        <v-text-field
          background-color="white"
          outlined
          flat
          solo-inverted
          hide-details
          label="Tìm theo địa chỉ, địa điểm..."
          id="search_input"
          class="hidden-sm-and-down"
          v-model="searchValue"
          clearable
          style="color: #444444!important"
          dense
          height="30px"
          loader-height="1"
        >
          <template v-slot:append>
            <v-btn depressed @click="search" color="primary" height="100%">
              <v-icon light>search</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </div>-->
      <v-text-field
        outlined
        dense
        hide-details
        placeholder="Tìm theo địa chỉ, địa điểm..."
        class="hidden-sm-and-down"
        clearable
      >
        <template v-slot:append>
          <v-btn depressed @click="search" color="primary" height="40">
            <v-icon>search</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-btn
        color="primary"
        height="48"
        depressed
        icon
        fab
        class="ma-2 hidden-md-and-up"
        @click="overlay.show = true"
      >
        <v-icon light>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="#2C92D5"
        light
        depressed
        outlined
        rounded
        class="ma-1 hidden-xs-only font-weight-regular"
      >
        <v-icon left>fas fa-paper-plane</v-icon>Đăng ký tìm phòng
      </v-btn>

      <v-btn color="#6C98C6" to="/cart" depressed dark class="ma-1 hidden-xs-only">
        Lịch hẹn của bạn
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon large class="ma-1" v-bind="attrs" v-on="on">
            <v-avatar size="32px" item v-if="isLoggedIn && !isLoadingUser">
              <v-img :src="user.avatar" :alt="user.username"></v-img>
            </v-avatar>
            <v-avatar size="32px" item v-if="!isLoggedIn">
              <v-icon>face</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list v-if="!isLoggedIn">
          <v-list-item to="/login">
            <v-list-item-icon>
              <v-icon>login</v-icon>
              <v-list-item-title>Đăng nhập</v-list-item-title>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item to="/register">
            <v-list-item-icon>
              <v-icon>person_add</v-icon>
              <v-list-item-title>Đăng ký</v-list-item-title>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <v-list v-if="isLoggedIn">
          <v-list-item to="/cart">
            <v-list-item-icon>
              <v-icon>far fa-user-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Hồ sơ</v-list-item-title>
          </v-list-item>
          <v-list-item to="/qr">
            <v-list-item-icon>
              <v-icon>fas fa-qrcode</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Quét mã QR</v-list-item-title>
          </v-list-item>
          <v-list-item to="#" class="hidden-sm-and-up">
            <v-list-item-icon>
              <v-icon>fas fa-paper-plane</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Đăng ký tìm phòng</v-list-item-title>
          </v-list-item>
          <v-list-item to="#" class="hidden-sm-and-up">
            <v-list-item-icon>
              <v-icon>far fa-bookmark</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Lịch hẹn của bạn</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<style>
.v-btn {
  text-transform: none !important;
}
/* #search-bar #search_input:focus{
  color: #444;
}
#search-bar .v-input__control .v-input__slot {
  padding-right: 0 !important;
}
#search-bar .v-input__control .v-input__slot .v-input__append-inner{
  height: 100% !important;
} */
#top-bar .v-input__control > .v-input__slot {
  padding-right: 0;
}
#top-bar .v-input__control > .v-input__slot div:nth-child(4) {
  margin-top: 0;
  height: 100%;
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'MyAppBar',
  data: () => ({
    overlay: {
      show: false,
    },
  }),
  methods: {
    search() {
      this.setSearchValue(this.searchValue);
      this.searchByAddress();
      this.$router.push('/filter');
    },
    ...mapActions({
      setSearchValue: 'renter/filterResult/setSearchValue',
      searchByAddress: 'renter/filterResult/searchByAddress',
      getUser: 'user/getUser',
      clearUserData: 'user/clearUserData',
    }),
    logout() {
      this.$cookies.remove('role');
      this.$cookies.remove('userId');
      this.$cookies.remove('jwt');
      this.clearUserData();
      this.$router.push('/');
    },
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.renter.filterResult.search.value;
      },
      set(value) {
        this.setSearchValue(value);
      },
    },
    isLoggedIn() {
      return this.$cookies.get('jwt') != null;
    },
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
  },
  created() {
    this.getUser();
  },
};
</script>
