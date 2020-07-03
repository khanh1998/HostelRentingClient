<template>
  <div>
    <v-overlay
      :value="overlay.show"
      light
      opacity="0.6"
    >
      <v-text-field
        color="#E5E5E5"
        background-color="#E5E5E5"
        flat
        solo-inverted
        light
        hide-details
        autofocus
        placeholder="Search by address..."
        full-width
      >
        <template v-slot:append>
          <v-btn @click="overlay.show = false">Search</v-btn>
        </template>
      </v-text-field>
    </v-overlay>
    <v-app-bar app color="#fff" dark class height="64">
      <router-link to="/">
        <v-img
          alt="Hostel Renting"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          max-width="64"
          max-height="64"
        />
      </router-link>
      <v-text-field
        color="#E5E5E5"
        background-color="#E5E5E5"
        flat
        solo-inverted
        light
        hide-details
        label="Search by address..."
        class="hidden-xs-only"
      >
        <template v-slot:append>
          <v-btn icon @click="search">
            <v-icon light>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-btn
        color="primary"
        height="48"
        depressed
        icon
        fab
        class="ma-2 hidden-sm-and-up"
        @click="overlay.show = true"
      >
        <v-icon light>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="#2C92D5" light depressed outlined rounded class="ma-2">
        <v-icon light>fas fa-paper-plane</v-icon> Room alert
      </v-btn>

      <v-btn color="#6C98C6" depressed class="ma-2">Your Booking</v-btn>
      <v-btn icon large class="ma-2">
        <router-link to="/user">
          <v-avatar size="32px" item>
            <v-img src="@/assets/suzy-avatar.jpg" alt="My Suzy"></v-img>
          </v-avatar>
        </router-link>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<style>
.v-btn {
  text-transform: none !important;
}
</style>
<script>
export default {
  name: 'MyAppBar',
  data: () => ({
    overlay: {
      show: false,
    },
  }),
  methods: {
    search() {
      alert('search');
    },
  },
};
</script>
