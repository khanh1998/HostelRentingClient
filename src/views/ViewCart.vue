<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="8">
        <v-btn-toggle
          mandatory
          tile
        >
          <v-btn outlined color="grey">
            SẮP TỚI <span class="amber--text">({{2}})</span>
          </v-btn>
          <v-btn outlined color="grey">
            ĐÃ XEM PHÒNG <span class="amber--text">({{4}})</span>
          </v-btn>
          <v-btn outlined color="grey">
            BỎ LỠ <span class="amber--text">({{1}})</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-date-picker
          v-model="date"
          :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
          :events="arrayEvents"
        ></v-date-picker>
      </v-col>
      <v-col cols="8">
        <bookingItem/>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import bookingItem from '../components/view_cart/bookingItem.vue';

export default {
  name: 'ViewCard',
  components: { bookingItem },
  data: () => ({
    arrayEvents: null,
    date: new Date().toISOString().substr(0, 10),
  }),
  methods: {},
  mounted() {
    this.arrayEvents = [...Array(10)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },
};
</script>
