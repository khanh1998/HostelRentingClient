<template>
  <div>
    <div>
      <h2>Chọn vị trí trên bản đồ</h2>
      <label>
        <gmap-autocomplete @place_changed="setPlace" :options="autocompleteOptions">
        </gmap-autocomplete>
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
        :title="currentAddressString"
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
      addressString: 'Thành phố Hồ Chí Minh',
      autocompleteOptions: {
        components: 'country:vi',
      },
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.place = place;
      this.addMarker();
      this.addressString = `${this.place.formatted_address}`;
    },
    addMarker() {
      const marker = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      };
      this.marker = { position: marker };
      this.center = marker;
    },
    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          const coord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.center = coord;
          this.place = { position: coord };
        });
      }
    },
  },
  computed: {},
};
</script>
