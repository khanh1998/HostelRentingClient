<template>
  <div>
    <v-overlay :value="provinces.isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="!provinces.isLoading">
      <span class="text-h6"><v-icon>directions</v-icon> Xác định vị trí trên bản đồ</span>
      <div class="gmap-view">
        <div class="gmap-search-bar">
          <gmap-autocomplete
            @place_changed="setPlace"
            :options="gmap"
            :selectFirstOnEnter="true"
          ></gmap-autocomplete>
        </div>
        <div class="gmap-view-map">
          <gmap-map :center="center" :zoom="12" style="width: 100%; height: 400px;">
            <gmap-marker
              :position="marker.position"
              @click="center = marker.position"
              :clickable="true"
              :draggable="true"
              @dragend="updateMarker"
            ></gmap-marker>
            <div slot="visible">
              <div
                style="
                  bottom: 0;
                  left: 0;
                  background-color: #0000ff;
                  color: white;
                  position: absolute;
                  z-index: 100;
                "
              >
                Toạ độ: {{ marker.position.lat }}, {{ marker.position.lng }}
              </div>
            </div>
          </gmap-map>
        </div>
      </div>
      <div>
        <v-select
          prepend-icon="confirmation_number"
          :items="coordsToString.selectableAddresses"
          label="Chọn địa chỉ"
          v-model="coordsToString.selectedAddress"
          messages="Thay đổi danh sách địa chỉ bằng cách xác định vị trí trên bản đồ"
        ></v-select>
        <v-text-field v-model="buildingNo" placeholder="Số nhà"></v-text-field>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

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
      gmap: {
        bounds: {
          north: 11.1602136,
          south: 10.3493704,
          east: 107.0265769,
          west: 106.3638784,
        },
        strictBounds: true,
      },
      buildingNo: '',
      coordsToString: {
        addressComponents: [],
        selectableAddresses: [],
        selectedAddress: '',
      },
    };
  },

  mounted() {
    this.geolocate();
    this.updateSelectableAddress();
  },
  methods: {
    ...mapActions({
      getProvinces: 'renter/common/getProvinces',
    }),
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
          this.marker = { position: coord };
        });
      }
    },
    updateMarker(mouseEvent) {
      // https://developers.google.com/maps/documentation/javascript/reference/map#MouseEvent
      const { latLng } = mouseEvent;
      const coord = { lat: latLng.lat(), lng: latLng.lng() };
      this.place = { position: coord };
      this.marker = { position: coord };
      this.center = coord;
    },
    async searchByCoord(coords) {
      const key = 'AIzaSyDNBmxVGbZ4Je5XHPRqqaZPmDFKjKPPhXk';
      const { lat, lng } = coords;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
      let res = await fetch(url);
      if (res.status === 200) {
        res = await res.json();
        console.log(res);
        const includeRoutes = res.results.filter((item) => {
          const indexR = item.address_components.findIndex((compo) => {
            const includeRoute = compo.types.includes('route');
            return includeRoute;
          });
          return indexR > -1;
        });
        let formattedAddresses = includeRoutes.map((item) => {
          const addressComponents = item.address_components;
          const streetNumber = addressComponents.find((compo) => {
            const isInclude = compo.types.includes('street_number');
            return isInclude;
          });
          if (streetNumber) {
            const shortName = streetNumber.short_name;
            return item.formatted_address.substring(shortName.length + 1);
          }
          return item.formatted_address;
        });
        formattedAddresses = new Set(formattedAddresses);
        return Array.from(formattedAddresses);
      }
      return null;
    },
    updateSelectableAddress() {
      const { position } = this.marker;
      this.searchByCoord(position).then((formattedAddresses) => {
        this.coordsToString.selectableAddresses = formattedAddresses;
      });
    },
    findDistrictByName(districtName) {
      const district = this.districts.data.find((d) => {
        const include = d.districtName.trim() === districtName.trim();
        return include;
      });
      return district;
    },
    findWardByName(wardName, wards) {
      const ward = wards.find((w) => {
        const include = w.wardName.trim().toLowerCase().includes(wardName.trim().toLowerCase());
        return include;
      });
      return ward;
    },
    findStreetByName(streetName) {
      const street = this.streets.data.find((s) => {
        const include = s.streetName.trim().toLowerCase().includes(streetName.trim().toLowerCase());
        return include;
      });
      return street;
    },
    emitNewAddress() {
      this.$emit('newValue', {
        coords: {
          longitude: this.marker.position.lng,
          latitude: this.marker.position.lat,
        },
        address: this.addressObjForApi,
      });
    },
  },
  watch: {
    marker: {
      handler() {
        this.updateSelectableAddress();
      },
      deep: true,
    },
    'coordsToString.selectedAddress': {
      handler() {
        this.emitNewAddress();
      },
      deep: true,
    },
    buildingNo: {
      handler() {
        this.emitNewAddress();
      },
    },
  },
  computed: {
    ...mapState('renter/common', ['provinces', 'wards', 'districts', 'streets']),
    addressObjForApi() {
      // eslint-disable-next-line
      let [streetName, wardName, districtName] = this.coordsToString.selectedAddress.split(',');
      console.log(streetName, wardName, districtName);
      if (streetName.startsWith('Đ. ')) {
        streetName = streetName.substring(3);
      }
      const district = this.findDistrictByName(districtName);
      const ward = this.findWardByName(wardName, district.wards);
      const street = this.findStreetByName(streetName);
      const obj = {
        provinceId: 1,
        districtId: district.districtId,
        wardId: ward.wardId,
        streetName,
        buildingNo: this.buildingNo,
      };
      if (street) {
        obj.streetId = street.streetId;
      } else {
        obj.streetId = null;
      }
      return obj;
    },
  },
  created() {
    if (this.provinces.data.length === 0) {
      this.getProvinces();
    }
  },
};
</script>
<style scoped>
.gmap-view {
  position: relative;
  height: 400px;
  border: 1px slateblue solid;
}
.gmap-search-bar {
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 9999;
}
.gmap-view-map {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9998;
}
.pac-target-input {
  border: 1px black solid;
}
</style>
