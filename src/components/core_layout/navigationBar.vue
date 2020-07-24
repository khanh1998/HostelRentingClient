<template>
  <div>
    <!-- <google-map/> -->
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
      <gmap-autocomplete
        placeholder="Tìm theo địa chỉ, địa điểm..."
        class="searchBar"
        @place_changed="setPlace">
      </gmap-autocomplete>
      <v-btn depressed @click="addMarker" color="primary" height="40">
        <v-icon>search</v-icon>
      </v-btn>
      <!-- <v-text-field
        outlined
        dense
        hide-details
        placeholder="Tìm theo địa chỉ, địa điểm..."
        class="hidden-sm-and-down"
        clearable
      >
        <template v-slot:append>
          <v-btn depressed @click="addMarker" color="primary" height="40">
            <v-icon>search</v-icon>
          </v-btn>
        </template>
      </v-text-field> -->
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
      Lịch hẹn của bạn</v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon large class="ma-1" v-bind="attrs" v-on="on">
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
  border: 1px solid #E4E7EA;
  width: 300px;
}
</style>
<script>
import { mapActions } from 'vuex';
// import googleMap from './googleMap.vue';

export default {
  name: 'MyAppBar',
  components: {
    // googleMap,
  },
  data: () => ({
    overlay: {
      show: false,
    },
    center: { lat: 45.508, lng: -73.587 },
    markers: [],
    places: [],
    currentPlace: null,
  }),
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        alert('lat:' + this.currentPlace.geometry.location.lat() + ',lng:' + this.currentPlace.geometry.location.lng());
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    search() {
      this.setSearchValue(this.searchValue);
      this.searchByAddress();
      this.$router.push('/filter');
    },
    ...mapActions({
      setSearchValue: 'renter/filterResult/setSearchValue',
      searchByAddress: 'renter/filterResult/searchByAddress',
    }),
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
  },
};
</script>
