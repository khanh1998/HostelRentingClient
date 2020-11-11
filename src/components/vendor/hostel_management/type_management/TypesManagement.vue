<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      scrollable
      max-width="950"
      transition="dialog-bottom-transition"
      persistent
      hide-overlay
    >
      <v-card class="d-flex flex-column" color="#F7F9FC">
        <v-row class="d-flex px-4 py-3 align-center ma-0 justify-space-between bg-primary">
          <v-icon class="mr-1" color="rgb(255, 255, 255, 0.8)">mdi-door-closed</v-icon>
          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Tạo danh sách phòng
          </span>
          <v-btn icon @click="closeDialog()" class="mr-4"
            ><v-icon size="20" color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
          >
        </v-row>
        <v-divider></v-divider>
        <v-card-text class="py-5" style="height: 450px">
          <v-row class="ma-0 d-flex flex-column">
            <v-row class="d-flex ma-0">
              <v-col cols="6" class="d-flex">
                <v-select
                  v-model="newRoomValue.typeId"
                  :items="group.types"
                  item-text="title"
                  item-value="typeId"
                  label="Loại phòng"
                  dense
                  hide-details
                  solo
                  class="size-sub-2 font-nunito form"
                  @change="setNewRoom(newRoomValue)"
                ></v-select>
              </v-col>
              <v-col cols="6" class="d-flex">
                <v-btn
                  class="mx-5 btn-success btn-sm font-nunito white--text"
                  @click="openCreateTypeDialog()"
                  >Thêm loại phòng mới</v-btn
                >
                <v-btn class="mx-5 btn-danger btn-sm font-nunito white--text" @click="addRoom()"
                  >Thêm phòng mới</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col cols="12" class="py-0">
                <span
                  class="font-nunito text-danger size9rem"
                  v-show="typeIdNull && !newRoomValue.typeId"
                  >Vui lòng chọn loại phòng!</span
                >
                <span
                  class="font-nunito text-danger size9rem ml-2"
                  v-show="roomNameNull && !isRoomNameNull"
                  >Vui lòng điền đầy đủ các thông tin!</span
                >
              </v-col>
            </v-row>
            <v-row class="d-flex flex-wrap ma-0">
              <RoomItem v-for="room in createRooms" v-bind:key="room.index" :room="room" />
            </v-row>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end pa-4">
          <v-btn class="btn btn-light elevation-0 font-nunito" @click="closeDialog()"> Đóng </v-btn>
          <v-btn class="btn btn-primary font-nunito" @click="insertRooms()"> Lưu </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showCreateTypeDialog"
      scrollable
      max-width="950"
      transition="dialog-bottom-transition"
      persistent
      hide-overlay
    >
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="d-flex flex-column" v-if="!isLoading">
        <v-row class="d-flex px-4 py-3 align-center ma-0 justify-space-between bg-primary">
          <v-icon class="mr-1" color="rgb(255, 255, 255, 0.8)">room_preferences</v-icon>
          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Thêm loại phòng mới
          </span>
          <v-btn icon @click="showCreateTypeDialog = false" class="mr-4"
            ><v-icon size="20" color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
          >
        </v-row>
        <v-divider></v-divider>
        <v-card-text class="py-5 d-flex" style="height: 500px">
          <v-row>
            <v-col cols="8">
              <v-row class="ma-0">
                <v-col cols="7" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Tên loại phòng<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-text-field
                    class="size-sub-2 font-nunito form"
                    solo
                    dense
                    light
                    hide-details
                    v-model="newTypeValue.title"
                    @input="setCreateTypeValue(newTypeValue)"
                  />
                </v-col>
                <v-col cols="5" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Giá thuê<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-text-field
                    class="size-sub form font-nunito"
                    type="number"
                    color="#727cf5"
                    solo
                    dense
                    light
                    v-model="newTypeValue.price"
                    suffix="VNĐ"
                    step="100000"
                    min="0"
                    :rules="[rules.minPrice(newTypeValue.price)]"
                    @input="setNewGroupValue(newGroupValue)"
                  />
                </v-col>
                <v-col cols="4" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Diện tích<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-text-field
                    class="size-sub form font-nunito"
                    type="number"
                    color="#727cf5"
                    solo
                    dense
                    light
                    v-model="newTypeValue.superficiality"
                    suffix="m2"
                    step="5"
                    min="0"
                    :rules="[rules.min(newTypeValue.superficiality)]"
                    @input="setNewGroupValue(newGroupValue)"
                  />
                </v-col>
                <v-col cols="4" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Sức chứa<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-text-field
                    class="size-sub form font-nunito"
                    type="number"
                    color="#727cf5"
                    solo
                    dense
                    light
                    v-model="newTypeValue.capacity"
                    suffix="người"
                    step="5"
                    min="0"
                    :rules="[rules.min(newTypeValue.capacity)]"
                    @input="setNewGroupValue(newGroupValue)"
                  />
                </v-col>
                <v-col cols="4" class="d-flex flex-column">
                  <span class="field-name font-weight-medium"
                    >Cọc thế chân<span class="text-danger ml-1">(*)</span></span
                  >
                  <v-text-field
                    class="size-sub form font-nunito"
                    type="number"
                    color="#727cf5"
                    solo
                    dense
                    light
                    v-model="newTypeValue.deposit"
                    suffix="tháng"
                    step="1"
                    min="0"
                    :rules="[rules.min(newTypeValue.deposit)]"
                    @input="setNewGroupValue(newGroupValue)"
                  />
                </v-col>
                <v-col cols="12"></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end pa-4">
          <v-btn
            class="btn btn-light elevation-0 font-nunito"
            @click="showCreateTypeDialog = false"
          >
            Quay lại
          </v-btn>
          <v-btn class="btn btn-primary font-nunito">Tạo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import RoomItem from './RoomItem.vue';

export default {
  name: 'TypesManagement',
  data: () => ({
    typeIdNull: false,
    roomNameNull: false,
    showCreateTypeDialog: false,
    rules: {
      minPrice(value) {
        return (value || 'Giá không hợp lệ') > 0 || 'Không hợp lệ';
      },
      min(value) {
        return (value || 'Giá không hợp lệ') >= 0 || 'Không hợp lệ';
      },
    },
  }),
  props: { show: Boolean, group: Object },
  components: { RoomItem },
  computed: {
    isLoading() {
      const allFacilities = this.$store.state.renter.common.facilities.isLoading;
      return allFacilities;
    },
    allFacilities() {
      return this.$store.state.renter.common.facilities.data;
    },
    newRoomValue() {
      return this.$store.state.vendor.group.newRoom.data;
    },
    createRooms() {
      const rooms = this.$store.state.vendor.group.creatRooms.rooms; // eslint-disable-line
      if (rooms.length === 0) {
        rooms.push({
          index: rooms.length,
          typeId: this.newRoomValue.typeId,
          roomName: '',
          available: true,
        });
      }
      return rooms;
    },
    isRoomNameNull() {
      // eslint-disable-next-line
      let result = true;
      this.createRooms.forEach((element) => {
        if (element.roomName.trim() === '') {
          result = false;
        }
      });
      return result;
    },
    newTypeValue() {
      return this.$store.state.vendor.group.createType.data;
    },
  },
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/common/getAllFacilities1',
      setNewRoom: 'vendor/group/setNewRoom',
      setCreatRooms: 'vendor/group/setCreatRooms',
      setCreateTypeValue: 'vendor/group/setCreateTypeValue',
      insertListRooms: 'vendor/group/createRooms',
    }),
    closeDialog() {
      const rooms = [];
      this.setCreatRooms(rooms);
      this.$emit('close');
    },
    addRoom() {
      this.createRooms.push({
        index: this.createRooms[this.createRooms.length - 1].index + 1,
        typeId: this.newRoomValue.typeId,
        roomName: '',
        available: true,
      });
      this.setCreatRooms(this.createRooms);
    },
    insertRooms() {
      if (!this.newRoomValue.typeId) {
        this.typeIdNull = true;
      }
      if (!this.isRoomNameNull) {
        this.roomNameNull = true;
      }
      if (this.newRoomValue.typeId && this.isRoomNameNull) {
        const roomsObj = this.createRooms.map((newRoom) => ({
          roomName: newRoom.roomName,
          available: newRoom.available,
        }));
        const reqObj = {
          rooms: roomsObj,
          typeId: this.newRoomValue.typeId,
          groupId: this.group.groupId,
        };
        this.insertListRooms(reqObj);
      }
    },
    openCreateTypeDialog() {
      if (this.allFacilities.length === 0) {
        this.getAllFacilities();
      }
      this.showCreateTypeDialog = true;
    },
  },
  created() {},
};
</script>

<style>
/* .light-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: #e9ecef !important;
} */
.light-select .v-application .primary--text {
  color: #727cf5 !important;
  caret-color: #727cf5 !important;
}
</style>
