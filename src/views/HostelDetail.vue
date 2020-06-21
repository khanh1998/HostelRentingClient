<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-carousel
          cycle
          progress
          progress-color="red"
          height="400"
          delimiter-icon="mdi-circle-medium"
          next-icon="mdi-arrow-right-bold"
          prev-icon="mdi-arrow-left-bold">
          <v-carousel-item v-for="(image, i) in info.images" :key="i">
            <v-img max-height="400" v-bind:src="info.images[i]"/>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="4">

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import json from '../assets/hostel-detail.json';

export default {
  name: 'HostelDetail',
  components: {},
  data: () => ({
    info: null,
  }),
  async created() {
    this.info = json;
  },
};
</script>
