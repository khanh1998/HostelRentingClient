<template>
  <div class="d-flex flex-row flex-wrap align-center justify-center">
    <v-dialog v-model="dialog.show" width="350">
      <v-card height="350">
        <input
          type="file"
          @change="onFileChange"
          ref="fileSelect"
          multiple
          lang="vi"
          accept="image/*"
          class="d-none"
        />
        <div class="d-flex flex-wrap">
          <v-img
            v-for="url in upload.imageUrls"
            :key="url"
            :src="url"
            height="100"
            width="100"
            class="ma-1"
          ></v-img>
        </div>
        <v-btn v-if="this.upload.imageUrls.length > 0" @click="uploadImages">
          <v-icon>cloud_upload</v-icon> Tải lên
        </v-btn>
      </v-card>
    </v-dialog>
    <span class="text-h6"><v-icon>insert_photo</v-icon>Hình ảnh</span>
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
          height="120"
          width="120"
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
    <v-btn depressed to="/camera"> <v-icon>add_a_photo</v-icon>Chụp ảnh</v-btn>
    <v-btn class="ml-2" @click="openImageUploadDialog" depressed>
      <v-icon>add_photo_alternate</v-icon>Tải lên ảnh mới</v-btn
    >
  </div>
</template>
<script>
export default {
  name: 'ImageEditor',
  props: ['images'],
  data: () => ({
    dialog: {
      show: false,
      files: null,
    },
    upload: {
      imageUrls: [],
    },
  }),
  methods: {
    openImageUploadDialog() {
      this.dialog.show = true;
      this.$nextTick(() => this.$refs.fileSelect.click());
    },
    onFileChange(e) {
      console.log(e.target.files);
      const { files } = e.target;
      this.files = files;
      this.upload.imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    },
    uploadImages() {
      const fd = new FormData();
      Array.from(this.files).forEach((file) => {
        fd.append('image', file, file.data);
      });
    },
  },
};
</script>
