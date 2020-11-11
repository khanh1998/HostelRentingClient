<template>
  <v-col cols="4">
    <v-card class="py-4 pl-2 pr-0">
      <v-row class="d-flex align-start ma-0">
        <v-icon class="mr-2 mt-2">{{
          newValue.available ? 'mdi-door-closed' : 'mdi-door-closed-lock'
        }}</v-icon>
        <div class="d-flex flex-column ml-2">
          <v-text-field
            class="size-sub-2 font-nunito form"
            solo
            label="Tên phòng"
            dense
            light
            hide-details
            v-model="newValue.roomName"
            @input="setCreatRooms(createRooms)"
          />
          <v-radio-group v-model="newValue.available" row class="filter mt-1" hide-details>
            <v-radio
              label="Trống"
              :value="radioEmpty"
              class="radioGroup font-nunito"
              color="#727cf5"
            ></v-radio>
            <v-radio
              label="Đang thuê"
              :value="radioRenting"
              class="radioGroup font-nunito"
              color="#727cf5"
            ></v-radio>
          </v-radio-group>
        </div>
        <v-badge
          color="rgba(250, 92, 124, 0.8)"
          icon="mdi-close"
          overlap
          class="d-flex justify-center align-center cursor"
          offset-x="-20"
          offset-y="-5"
          @click.native="removeItem()"
        >
          <div class="ml-auto"></div>
        </v-badge>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RoomItem',
  data: () => ({
    radioEmpty: true,
    radioRenting: false,
  }),
  props: { room: Object },
  computed: {
    newRoomValue() {
      return this.$store.state.vendor.group.newRoom.data;
    },
    createRooms() {
      return this.$store.state.vendor.group.creatRooms.rooms;
    },
    newValue() {
      return this.room;
    },
  },
  methods: {
    ...mapActions({
      getAllRules: 'renter/common/getAllRules',
      setNewRoom: 'vendor/group/setNewRoom',
      setCreatRooms: 'vendor/group/setCreatRooms',
    }),
    removeItem() {
      const result = this.createRooms.filter((item) => item.index !== this.newValue.index);
      this.setCreatRooms(result);
      console.log(this.createRooms);
    },
    changeName() {
      console.log(this.createRooms);
    },
  },
  created() {},
};
</script>

<style>
</style>
