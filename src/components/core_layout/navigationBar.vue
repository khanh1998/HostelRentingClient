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
        placeholder="Tìm kiếm theo địa điểm, khu vực, địa chỉ bạn muốn ở gần"
        v-model="searchValue"
        clearable
        class="flex-fill"
        height="30px"
      >
        <template v-slot:append>
          <v-btn
            @click="
              overlay.show = false;
              search();
            "
          >Search</v-btn>
        </template>
      </v-text-field>
    </v-overlay>
    <v-app-bar app color="#fff" light height="70" id="top-bar">
      <v-row height="70 m-0" class="d-flex">
        <v-col cols="11" md="7">
          <v-row>
            <v-col class="col-2 hidden-sm-and-down">
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
            </v-col>
            <!-- </v-col>
            <v-col class="col-5">-->
            <v-col class="col-10 pl-10" v-show="isSearchOptional">
              <v-row class="px-0 d-flex align-center">
                <v-col class="col-9 pl-2 searchBar d-flex align-center">
                  <gmap-autocomplete
                    placeholder="Tìm kiếm theo địa điểm, khu vực bạn muốn ở gần"
                    class="col-11 gmap-input text-body-2 blue-grey--text"
                    @place_changed="setPlace"
                    @change="changeSearchValue"
                    :value="searchValue"
                  ></gmap-autocomplete>
                  <v-btn
                    icon
                    @click="clearField()"
                    v-bind:style="{ visibility: computedClearable }"
                  >
                    <!-- eslint-disable max-len -->
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="col-3 px-0">
                  <v-btn
                    class="rounded-l-0"
                    depressed
                    @click="searchByCoordinates"
                    color="#98B7D7"
                    height="40"
                    width="50%"
                  >
                    <v-icon color="white">search</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="1" md="5" class="ml-auto d-flex justify-end items-center align-center pr-5">
          <v-btn
            color="#2C92D5"
            light
            depressed
            outlined
            rounded
            class="mr-5 hidden-xs-only font-weight-regular"
            v-if="!user || (user && user.role.roleName === 'Người thuê')"
          >
            <v-icon left>fas fa-paper-plane</v-icon>Đăng ký tìm phòng
          </v-btn>

          <!-- eslint-disable -->
          <v-btn
            color="#6C98C6"
            to="/cart"
            depressed
            dark
            class="hidden-xs-only"
            v-if="!user || (user && user.role.roleName === 'Người thuê')"
          >Lịch hẹn của bạn</v-btn>
          <v-btn
            to="/vendor"
            depressed
            dark
            color="blue"
            class="hidden-xs-only"
            v-if="user && user.role.roleName === 'Chủ trọ'"
          >
            <v-icon left>settings</v-icon>Quản lý phòng trọ
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
                </v-list-item-icon>
                <v-list-item-title>Đăng nhập</v-list-item-title>
              </v-list-item>
              <v-list-item to="/register">
                <v-list-item-icon>
                  <v-icon>person_add</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Đăng ký</v-list-item-title>
              </v-list-item>
              <v-list-item to="#" class="hidden-sm-and-up">
                <v-list-item-icon>
                  <v-icon>fas fa-paper-plane</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Đăng ký tìm phòng</v-list-item-title>
              </v-list-item>
              <v-list-item to="/cart" class="hidden-sm-and-up">
                <v-list-item-icon>
                  <v-icon>far fa-bookmark</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Lịch hẹn của bạn</v-list-item-title>
              </v-list-item>
              <v-list-item to="/discovery">
                <v-list-item-icon>
                  <v-icon>explore</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Khám phá</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list v-if="isLoggedIn">
              <v-list-item to="#">
                <v-list-item-icon>
                  <v-icon>far fa-user-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Hồ sơ</v-list-item-title>
              </v-list-item>
              <v-list-item
                to="#"
                class="hidden-sm-and-up"
                v-if="user.role.roleName === 'Người thuê'"
              >
                <v-list-item-icon>
                  <v-icon>fas fa-paper-plane</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Đăng ký tìm phòng</v-list-item-title>
              </v-list-item>
              <v-list-item
                to="/cart"
                class="hidden-sm-and-up"
                v-if="user.role.roleName === 'Người thuê'"
              >
                <v-list-item-icon>
                  <v-icon>far fa-bookmark</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Lịch hẹn của bạn</v-list-item-title>
              </v-list-item>
              <v-list-item
                to="/vendor"
                class="hidden-sm-and-up"
                v-if="user.role.roleName === 'Chủ trọ'"
              >
                <v-list-item-icon>
                  <v-icon>settings</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Quản lý phòng trọ</v-list-item-title>
              </v-list-item>
              <v-list-item to="/qr">
                <v-list-item-icon>
                  <v-icon>fas fa-qrcode</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Quét mã QR</v-list-item-title>
              </v-list-item>
              <v-list-item to="/discovery">
                <v-list-item-icon>
                  <v-icon>explore</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Khám phá</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>fas fa-sign-out-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Đăng xuất</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>
<style>
.v-btn {
  text-transform: none !important;
}
#top-bar .v-input__control > .v-input__slot {
  padding-right: 0;
}
#top-bar .v-input__control > .v-input__slot div:nth-child(4) {
  margin-top: 0;
  height: 100%;
}
.searchBar {
  height: 40px;
  border: 1px solid #e4e7ea;
  width: 100%;
}
.gmap-input:focus {
  outline: none;
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
    address: '',
    center: { lat: 10.7542893, lng: 106.1346955 },
    places: [],
    currentPlace: null,
    visibleProperty: 'hidden',
  }),
  methods: {
    setPlace(place) {
      this.currentPlace = place;
      this.address = `${place.name}-${place.formatted_address}`;
      this.searchValue = place.formatted_address;
    },
    changeSearchValue() {
      this.visibleProperty = 'visible';
    },
    clearField() {
      this.searchValue = '';
      this.address = '';
      this.visibleProperty = 'hidden';
      this.currentPlace = null;
    },
    searchByCoordinates() {
      if (this.currentPlace) {
        const coordinates = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.searchByCoordinator({
          lat: coordinates.lat,
          long: coordinates.lng,
          coordinator: coordinates,
        });
        this.setSearchValue(this.coordinates);
        this.$router.push('/filter');
      }
    },
    search() {
      this.setSearchValue(this.searchValue);
      this.setSearchValue(this.coordinates);
      this.searchByCoordinator({
        lat: '',
        long: '',
      });
      this.$router.push('/filter');
    },
    ...mapActions({
      setSearchValue: 'renter/filterResult/setSearchValue',
      setIsSearchOptional: 'renter/home/setSearchTypeValue',
      searchByAddress: 'renter/filterResult/searchByAddress',
      getUser: 'user/getUser',
      clearUserData: 'user/clearUserData',
      searchByCoordinator: 'renter/filterResult/searchByCoordinator',
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
    isSearchOptional: {
      get() {
        return this.$store.state.renter.home.searchType.isOptional;
      },
      set(value) {
        this.setIsSearchOptional(value);
      },
    },
    searchValue: {
      get() {
        return this.address;
      },
      set(value) {
        this.setSearchValue(value);
      },
    },
    isLoggedIn() {
      return this.$store.state.user.user.data;
    },
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
    computedClearable() {
      return this.visibleProperty;
    },
  },
  created() {
    this.getUser();
  },
};
</script>
