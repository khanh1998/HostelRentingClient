<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    class="hidden-md-and-up"
  >
    <v-card v-if="type">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ type.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">
            Lưu thay đổi
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row>
        <v-col cols="12" md="4">
          <ImageEditor :images="type.typeImages" />
        </v-col>
        <v-col cols="12" md="4"></v-col>
        <v-col cols="12" md="4"></v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import ImageEditor from './ImageEditor.vue';

export default {
  name: 'HotelTypeViewerAndEditor',
  props: ['show', 'type'],
  components: { ImageEditor },
};
</script>
