<template>
  <v-app-bar app color="#fff" dark class>
    <router-link to="/">
      <v-img
        alt="Hostel Renting"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="64"
      />
    </router-link>
    <v-text-field
      color="#E5E5E5"
      flat
      solo-inverted
      light
      hide-details
      label="Search by address..."
      class="hidden-sm-and-down"
    ></v-text-field>

    <v-btn color="#98B7D7" height="48" depressed class="ma-2">
      <v-icon dark>mdi-magnify</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn color="#2C92D5" dark depressed outlined rounded class="ma-2">
      <i class="fas fa-paper-plane"></i> Room alert
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
</template>
<style>
.v-btn {
  text-transform: none !important;
}
</style>
<script>
export default {
  name: 'MyAppBar',
};
</script>
