<template>
  <div class="d-flex flex-row flex-wrap align-center justify-center">
    <p class="text-h6"><v-icon>insert_photo</v-icon>Hình ảnh</p>
    <div
      style="height: 300px; overflow-y: auto;"
      class="d-flex flex-row flex-wrap align-center justify-center"
    >
      <div v-for="image in images" :key="image.imageId">
        <v-img
          :src="image.resourceUrl"
          :lazy-src="image.resourceUrl"
          aspect-ratio="1"
          class="grey lighten-2 ma-2"
          height="125"
          width="125"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-btn icon depressed color="blue-grey">
              <v-icon color="red">delete_forever</v-icon>
            </v-btn>
          </v-row>
        </v-img>
      </div>
    </div>
    <v-btn depressed> <v-icon>add_a_photo</v-icon>Chụp ảnh</v-btn>
    <v-btn class="ml-2" depressed> <v-icon>add_photo_alternate</v-icon>Tải lên ảnh mới</v-btn>
  </div>
</template>
<script>
export default {
  name: 'ImageEditor',
  props: ['images'],
};
</script>
