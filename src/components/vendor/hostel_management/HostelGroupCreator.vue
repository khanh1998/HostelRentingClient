<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    class="hidden-md-and-up"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title>Create hostel group</v-card-title>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'HostelGroupCreator',
  props: ['show'],
};
</script>
