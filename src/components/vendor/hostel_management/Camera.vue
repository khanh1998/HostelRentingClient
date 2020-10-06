<template>
  <div class="">
    <!-- Intro -->
    <!-- ---------- -->
    <!-- Inform the user of the camera's purpose and prepare them for camera permissions. -->
    <div id="intro" v-if="!stream">
      <div>
        <v-btn @click="startCamera">
          Allow Access
        </v-btn>
      </div>
    </div>

    <!-- Camera -->
    <!-- ---------- -->
    <!-- Allow the user to capture photos and take other camera actions. -->
    <div id="camera" v-if="stream" class="">
      <footer>
        <v-btn class="capture" @click="capturePhoto" :disabled="!ready">
          <v-icon>camera</v-icon>
        </v-btn>
      </footer>
    </div>

    <!-- Download -->
    <!-- ---------- -->
    <!-- Allow the user to preview and download the captured photo or return to camera. -->
    <div id="download" v-if="photo" class="">
      <div>
        <v-btn @click="photo = null">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            class=""
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12
              13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </v-btn>
      </div>

      <article>
        <img :src="photo.toDataURL('image/jpeg')" alt="Photo" class="" />
      </article>

      <footer>
        <v-btn @click="downloadPhoto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            class=""
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
          </svg>
        </v-btn>
      </footer>
    </div>

    <!-- Video -->
    <!-- ---------- -->
    <video ref="video" class="" autoplay muted playsinline></video>
  </div>
</template>
<script>
import loadImage from 'blueimp-load-image';

export default {
  name: 'Camera',
  data() {
    return {
      stream: null,
      ready: false,
      photo: null,
    };
  },
  methods: {
    async startCamera() {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
        },
      });

      this.$refs.video.srcObject = this.stream;

      this.$refs.video.onloadedmetadata = () => {
        this.ready = true;
      };

      this.$refs.video.onended = () => {
        this.ready = false;
        this.stream = null;
      };
    },
    capturePhoto() {
      const { video } = this.$refs;

      const videoCanvas = document.createElement('canvas');
      videoCanvas.height = video.videoHeight;
      videoCanvas.width = video.videoWidth;
      const videoContext = videoCanvas.getContext('2d');

      videoContext.drawImage(video, 0, 0);

      this.photo = loadImage.scale(videoCanvas, {
        maxHeight: 1080,
        maxWidth: 1080,
        cover: true,
        crop: true,
        canvas: true,
      });
    },
    downloadPhoto() {
      this.photo.toBlob((blob) => {
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = data;
        link.download = 'photo.jpg';
        link.click();
      }, 'image/jpeg');
    },
  },
};
</script>
<style scoped>
html,
body,
main,
section {
  height: 100%;
  width: 100%;
}

html {
  position: fixed;
}

body {
  font-family: 'Lato', sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}

button.capture:disabled {
  opacity: 0.25;
}

button.capture:active {
  opacity: 0.9;
}
</style>
