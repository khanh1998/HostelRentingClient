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
      <v-row height="70 m-0" class="d-flex">
        <v-col class="col-7">
          <v-row>
            <v-col class="col-2">
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
            <v-col class="col-10 pl-10">
              <v-row class="px-0 d-flex align-center">
                <v-col class="col-9 pl-5 searchBar d-flex align-center">
                  <gmap-autocomplete
                    placeholder="Tìm theo địa chỉ, địa điểm ..."
                    class="col-11 gmap-input"
                    @place_changed="setPlace"
                    @change="changeSearchValue"
                    :value="searchValue"
                    ref="address"
                  ></gmap-autocomplete>
                  <v-btn
                    icon
                    @click="clearField()"
                    v-bind:style="{ visibility: computedClearable }"
                  >
                    <!-- eslint-disable max-len -->
                    <v-icon>clear</v-icon>
                    <!-- <v-icon v-bind:style="{ visibility: computedClearable }">clear</v-icon> -->
                  </v-btn>
                </v-col>
                <v-col class="col-3 px-0">
                  <v-btn
                    class="rounded-l-0"
                    depressed
                    @click="searchByCoordinates"
                    color="primary"
                    height="40"
                  >
                    <v-icon>search</v-icon>
                  </v-btn>
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
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="col-5 ml-auto d-flex justify-end items-center align-center pr-5">
          <v-btn
            color="#2C92D5"
            light
            depressed
            outlined
            rounded
            class="mr-5 hidden-xs-only font-weight-regular"
          >
            <v-icon left>fas fa-paper-plane</v-icon>Đăng ký tìm phòng
          </v-btn>

          <!-- eslint-disable -->
          <v-btn color="#6C98C6" to="/cart" depressed dark class="hidden-xs-only">Lịch hẹn của bạn</v-btn>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon large class="ma-1 ml-5" v-bind="attrs" v-on="on">
                <v-avatar size="32px" item>
                  <v-img src="@/assets/suzy-avatar.jpg" alt="My Suzy"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/cart">
                <v-list-item-icon>
                  <v-icon>far fa-user-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Your profile</v-list-item-title>
              </v-list-item>
              <v-list-item to="/qr">
                <v-list-item-icon>
                  <v-icon>fas fa-qrcode</v-icon>
                </v-list-item-icon>
                <v-list-item-title>QR Scanner</v-list-item-title>
              </v-list-item>
              <v-list-item to="#" class="hidden-sm-and-up">
                <v-list-item-icon>
                  <v-icon>fas fa-paper-plane</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Room alert</v-list-item-title>
              </v-list-item>
              <v-list-item to="#" class="hidden-sm-and-up">
                <v-list-item-icon>
                  <v-icon>far fa-bookmark</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Your Booking</v-list-item-title>
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
    center: { lat: 10.7542893, lng: 106.1346955 },
    places: [],
    currentPlace: null,
    searchValue: '',
    visibleProperty: 'hidden',
  }),
  methods: {
    setPlace(place) {
      // this.isActive = !this.isActive;
      // this.coordinates = null;
      this.currentPlace = place;
      this.searchValue = place.formatted_address;
    },
    changeSearchValue() {
      this.visibleProperty = 'visible';
    },
    clearField() {
      this.searchValue = '';
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
        });
        this.$router.push('/filter');
      }
    },
    search() {
      this.setSearchValue(this.searchValue);
      this.searchByCoordinator({
        lat: '',
        long: '',
      });
      this.$router.push('/filter');
    },
    ...mapActions({
      setSearchValue: 'renter/filterResult/setSearchValue',
      searchByAddress: 'renter/filterResult/searchByAddress',
      searchByCoordinator: 'renter/filterResult/searchByCoordinator',
    }),
  },
  computed: {
    searchValue: {
      // get() {
      //   return this.$store.state.renter.filterResult.search.value;
      // },
      set(value) {
        this.setSearchValue(value);
      },
    },
    computedClearable() {
      return this.visibleProperty;
    },
  },
};
</script>
