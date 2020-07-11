<template>
  <v-card class="mx-auto mb-4" light :width="responsive.article.width">
    <div class="d-flex flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column">
        <v-img
          :max-height="responsive.image.height"
          :max-width="responsive.image.width"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <div class="d-flex align-start justify-end">
            <v-chip class="ma-6" color="red lighten-1" light text-color="white">
              Top
              <v-icon right>{{numberIcons[index-1]}}</v-icon>
            </v-chip>
          </div>
        </v-img>
      <div class="right d-flex flex-column">
        <v-card-title>{{group.groupName}} - {{type.typeName}}</v-card-title>
        <v-card-subtitle class="amber--text font-weight-medium">
          <v-icon>mdi-currency-usd-circle-outline</v-icon>{{type.price}} vnd
        </v-card-subtitle>
        <div class="ml-4" style="border: 1px solid #6C98C6; width: 200px"></div>
        <div class="d-flex align-center justify-space-between">
          <span class="mx-2 mt-4">
            <p>
              <v-icon class="mx-2" x-small>fas fa-map-marker-alt</v-icon>{{group.detailedAddress}}
            </p>
          </span>
        </div>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <span class="mx-2">
            <p class="success--text">
              <v-icon class="mx-2" x-small>fas fa-store</v-icon>Chợ Hoàng Hoa Thám
            </p>
          </span>
          <span class="mx-2">
            <p>
              <v-icon class="mx-2" x-small>fas fa-ruler</v-icon>0.2 Km
            </p>
          </span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-ruler-combined</v-icon>20m2
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-users</v-icon>{{type.capacity}} người
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>mdi-toilet</v-icon>Dùng riêng
          </span>
        </div>
        <div class="d-flex align-center justify-space-between mt-4">
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-bolt</v-icon>3.5k/Kwh
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>fas fa-tint</v-icon>50k/người
          </span>
          <span class="mx-2">
            <v-icon class="mx-2" x-small>mdi-wifi</v-icon>Miễn phí
          </span>
        </div>
        <div class="d-flex align-center justify-space-between mt-2 ml-2">
          <v-chip-group
            class=""
            center-active
            light
            show-arrows
            mandatory
          >
            <v-chip outlined>
              <v-icon class="mr-2" x-small>mdi-weather-windy</v-icon>May Lanh
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-2" x-small>mdi-fridge</v-icon>Tu Lanh
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-2" x-small>fas fa-motorcycle</v-icon>Cho dau xe
            </v-chip>
            <v-chip outlined>
              <v-icon class="mr-2" x-small>mdi-washing-machine</v-icon>May giat
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </div>
  </v-card>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'Article',
  props: {
    index: Number,
    type: Object,
  },
  data: () => ({
    numberIcons: [
      'mdi-numeric-1-circle-outline',
      'mdi-numeric-2-circle-outline',
      'mdi-numeric-3-circle-outline',
      'mdi-numeric-4-circle-outline',
      'mdi-numeric-5-circle-outline',
    ],
  }),
  created() {},
  computed: {
    res() {
      return this.$vuetify.breakpoint.name;
    },
    responsive: {
      get() {
        console.log(this.$vuetify.breakpoint.name);
        const breakpoint = this.$vuetify.breakpoint.name;
        switch (breakpoint) {
          case 'xs':
          case 'sm':
          case 'md': return {
            image: {
              height: 300,
              width: '100%',
            },
            article: {
              width: 390,
            },
          };
          // case 'lg': return {};
          // case 'xl': return {};
          default: return {
            image: {
              height: 300,
              width: 300,
            },
            article: {
              width: '100%',
            },
          };
        }
      },
    },
    group: {
      get() {
        const id = this.type.groupId;
        console.log(this.$store.getters);
        return this.$store.getters['renter/home/getHostelGroupById'](id);
      },
    },
  },
};
</script>
