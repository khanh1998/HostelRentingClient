<template>
  <div class="d-flex flex-row flex-wrap align-center justify-center">
    <v-dialog v-model="dialog.show" width="350">
      <v-card height="350" :loading="isFileUploading">
        <div class="d-flex flex-column align-center justify-center">
          <input
            type="file"
            @change="onFileChange"
            ref="fileSelect"
            multiple
            lang="vi"
            accept="image/*"
            class="ma-2"
          />
          <div class="d-flex flex-wrap" style="height: 250px; overflow-y: auto;">
            <v-img
              v-for="url in upload.imageUrls"
              :key="url"
              :src="url"
              height="100"
              width="100"
              class="ma-1 elevation-2"
            ></v-img>
          </div>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" v-if="this.upload.imageUrls.length > 0" @click="uploadImages">
            <v-icon>cloud_upload</v-icon> Tải lên
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <span class="text-h6" v-if="images && images.length > 0"
      ><v-icon left>insert_photo</v-icon>Hình ảnh</span
    >
    <v-row>
      <v-col cols="12">
        <v-btn class="ml-2" @click="openImageUploadDialog" depressed>
        <v-icon>add_photo_alternate</v-icon>Tải lên ảnh mới</v-btn>
      </v-col>
      <v-col cols="12">
        <div
          style="height: 300px; overflow-y: auto;"
          class="d-flex flex-row flex-wrap align-start justify-start"
        >
          <!-- display input images -->
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
          <!-- display uploaded images -->
          <div v-for="image in upload.imageUrls" :key="image">
            <v-img
              :src="image"
              :lazy-src="image"
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
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import fileMixins from '../../mixins/file';
import snackBarMixins from '../../mixins/snackBar';

export default {
  name: 'ImageEditor',
  props: ['images'],
  mixins: [fileMixins, snackBarMixins],
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
        fd.append('files', file, file.data);
      });
      this.uploadFile(fd)
        .then(() => {
          this.upload.imageUrls = this.listUploadedFiles;
          this.dialog.show = false;
          this.showSnackBar('Tải ảnh lên thành công', { color: 'green' });
        })
        .catch((error) => {
          console.log(error);
          this.showSnackBar('Tải ảnh lên thất bại', { color: 'red' });
        });
    },
  },
  watch: {
    upload: {
      handler() {
        this.$emit('newValues', this.upload.imageUrls);
      },
      deep: true,
    },
  },
};
</script>
