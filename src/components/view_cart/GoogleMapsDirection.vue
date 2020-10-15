<template>
  <div id="app">
    <gmap-map ref="map" :center="coords" :zoom="15" style="width: 100%; height: 300px;">
      <gmap-marker :position="this.coords" title="Vị trí của bạn"> </gmap-marker>
      <gmap-marker :position="this.destination" title="Nhà trọ"> </gmap-marker>
    </gmap-map>
  </div>
</template>
<script>
export default {
  name: 'GoogleMapsDirection',
  props: ['dest'],
  data: () => ({
    showMap: true,
    coords: {
      lat: null,
      lng: null,
    },
    destination: {
      lat: null,
      lng: null,
    },
  }),
  methods: {
    calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
      directionsService.route(
        {
          origin: start,
          destination,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert(`Directions request failed due to ${status}`);
          }
        },
      );
    },
    getDirection() {
      // eslint-disable-next-line
      const directionsService = new google.maps.DirectionsService();
      // eslint-disable-next-line
      const directionsDisplay = new google.maps.DirectionsRenderer();
      console.log(this.$refs.map);
      directionsDisplay.setMap(this.$refs.map.$mapObject);

      // google maps API's direction service
      this.calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        this.coords,
        this.destination,
      );

      console.log(this.coords);
      console.log(this.destination);
      console.log('hmmm yha');
    },
  },
  created() {
    this.destination.lat = this.dest.lat;
    this.destination.lng = this.dest.lng;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.coords = coords;
      });
    }
    this.$nextTick(() => this.getDirection());
  },
};
</script>
