<template>
  <div>
    <div>
      <h2>Chọn vị trí trên bản đồ</h2>
      <label>
        <gmap-autocomplete @place_changed="setPlace"> </gmap-autocomplete>
        <button @click="addMarker"><v-icon>push_pin</v-icon></button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map :center="center" :zoom="12" style="width: 100%; height: 400px;">
      <gmap-marker
        :position="marker.position"
        @click="center = marker.position"
        :clickable="true"
        :draggable="true"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>
<script>
export default {
  name: 'PlacePicker',
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 10.8230989, lng: 106.6296638 },
      marker: { position: { lat: 10.8230989, lng: 106.6296638 } },
      place: { position: { lat: 10.8230989, lng: 106.6296638 } },
      currentPlace: null,
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.marker = { position: marker };
        this.place = this.currentPlace;
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>
