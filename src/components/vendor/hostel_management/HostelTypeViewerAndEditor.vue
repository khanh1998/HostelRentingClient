<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    class="hidden-md-and-up"
  >
    <v-card v-if="type">
      <v-toolbar dark color="#727CF5">
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
      <v-container fluid>
          <v-row class="hidden-sm-and-down">
            <v-col cols="1"/>
            <v-col cols="10" class="mt-5">
              <v-card>
                <v-row class="ma-1">
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="12">
                        <HostelTypeInfoEditor :type="type" />
                      </v-col>
                      <v-col cols="12">
                        <HostelTypeFacilityEditor :type="type" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <ImageEditor :images="type.typeImages" />
                   </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="1"/>
          </v-row>
          <div class="hidden-sm-and-up">
            <v-col cols="12" sm="4">
              <HostelTypeInfoEditor :type="type" />
            </v-col>
            <v-col cols="12" sm="4">
              <HostelTypeFacilityEditor :type="type" />
            </v-col>
            <v-col cols="12" sm="4">
              <ImageEditor :images="type.typeImages" />
            </v-col>
          </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import ImageEditor from './ImageEditor.vue';
import HostelTypeInfoEditor from './HostelTypeInfoEditor.vue';
import HostelTypeFacilityEditor from './HostelTypeFacilityEditor.vue';

export default {
  name: 'HotelTypeViewerAndEditor',
  props: ['show', 'type'],
  components: { ImageEditor, HostelTypeInfoEditor, HostelTypeFacilityEditor },
};
</script>
