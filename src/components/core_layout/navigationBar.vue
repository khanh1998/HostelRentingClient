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
    <v-app-bar app color="#fff" light class height="64">
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
      <v-toolbar-title ml-0 pl-4><span>TD Hostel</span></v-toolbar-title>
      <v-spacer class="hidden-sm-and-down"/>
      <v-text-field
        color="#E5E5E5"
        background-color="#E5E5E5"
        flat
        solo-inverted
        light
        hide-details
        label="Search by address..."
        class="hidden-sm-and-down"
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
        class="ma-2 hidden-md-and-up"
        @click="overlay.show = true"
      >
        <v-icon light>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="#2C92D5" light depressed outlined rounded class="ma-1 hidden-xs-only">
        <v-icon light>fas fa-paper-plane</v-icon> Room alert
      </v-btn>

      <v-btn color="#6C98C6" depressed dark class="ma-1 hidden-xs-only">Your Booking</v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon large class="ma-1" v-bind="attrs" v-on="on">
              <v-avatar size="32px" item>
                <v-img src="@/assets/suzy-avatar.jpg" alt="My Suzy"></v-img>
              </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/user">
            <v-list-item-icon><v-icon>far fa-user-circle</v-icon></v-list-item-icon>
            <v-list-item-title>Your profile</v-list-item-title>
          </v-list-item>
          <v-list-item to="#" class="hidden-sm-and-up">
            <v-list-item-icon><v-icon>fas fa-paper-plane</v-icon></v-list-item-icon>
            <v-list-item-title>Room alert</v-list-item-title>
          </v-list-item>
          <v-list-item to="#" class="hidden-sm-and-up">
            <v-list-item-icon><v-icon>far fa-bookmark</v-icon></v-list-item-icon>
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
