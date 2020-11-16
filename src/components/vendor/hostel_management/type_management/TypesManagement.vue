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
      <v-overlay :value="isRoomsCreating" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
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
        <v-card-text class="py-0" style="height: 450px">
          <v-row class="ma-0 d-flex flex-column">
            <v-row class="d-flex ma-0 align-center">
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
                  v-if="group.types.length > 0"
                ></v-select>
                <span
                  class="d-flex align-center font-nunito text-warning white px-5"
                  style="
                    border: 1px solid transparent;
                    border-radius: 0.25rem;
                    border: 1px solid #ffecb8 !important;
                    border-top-right-radius: 0px !important;
                    border-bottom-right-radius: 0px !important;
                    box-shadow: 0 0 20px 0 rgba(154, 161, 171, 0.15) !important;
                    height: 50px;
                  "
                  v-if="group.types.length === 0"
                  >Bạn chưa tạo loại phòng nào để quản lý</span
                >
                <v-btn
                  class="btn-warning btn-sm font-nunito size9rem"
                  @click="openCreateTypeDialog()"
                  style="
                    border-top-left-radius: 0px !important;
                    border-bottom-left-radius: 0px !important;
                  "
                  height="50"
                  v-if="group.types.length === 0"
                  >TẠO NGAY</v-btn
                >
              </v-col>
              <v-col cols="6" class="d-flex">
                <v-btn
                  class="mx-5 btn-warning btn-sm font-nunito"
                  v-if="group.types.length > 0"
                  @click="openCreateTypeDialog()"
                  >Thêm loại phòng mới</v-btn
                >
                <v-btn class="mx-5 btn-success btn-sm font-nunito white--text" @click="addRoom()"
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
          <alert
            :type="alert.type"
            :showAlert="alert.showAlert"
            :action="alert.action"
            style="z-index: 10"
          />
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
      max-width="1000"
      transition="dialog-bottom-transition"
      persistent
      hide-overlay
    >
      <v-overlay :value="isLoading || isTypeCreating || isRoomsCreating" absolute>
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
          <v-btn icon @click="closeCreateTypeDialog()" class="mr-4"
            ><v-icon size="20" color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
          >
        </v-row>
        <v-divider></v-divider>
        <v-card-text class="py-0 d-flex" style="height: 500px">
          <v-row>
            <v-col cols="8">
              <v-row class="ma-0">
                <v-col cols="7" class="d-flex flex-column pb-0">
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
                  <span class="font-nunito red--text size-caption" v-show="showMessage.typeName"
                    >Vui lòng điền tên loại phòng!</span
                  >
                </v-col>
                <v-col cols="5" class="d-flex flex-column pb-0">
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
                    @input="setCreateTypeValue(newTypeValue)"
                  />
                </v-col>
                <v-col cols="4" class="d-flex flex-column pb-0">
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
                    @input="setCreateTypeValue(newTypeValue)"
                  />
                  <span
                    class="font-nunito red--text size-caption"
                    v-show="showMessage.superficiality"
                    >Diện tích phải lớn hơn 0!</span
                  >
                </v-col>
                <v-col cols="4" class="d-flex flex-column pb-0">
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
                    step="1"
                    min="0"
                    :rules="[rules.min(newTypeValue.capacity)]"
                    @input="setCreateTypeValue(newTypeValue)"
                  />
                  <span class="font-nunito red--text size-caption" v-show="showMessage.capacity"
                    >Sức chứa phải lớn hơn 0!</span
                  >
                </v-col>
                <v-col cols="4" class="d-flex flex-column pb-0">
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
                    @input="setCreateTypeValue(newTypeValue)"
                  />
                </v-col>
                <v-col cols="12" class="pt-1">
                  <div class="d-flex align-center">
                    <span class="field-name font-weight-medium">Tiện ích</span>
                    <v-col cols="6" class="ml-3 pa-0">
                      <v-text-field
                        label="Tìm nhanh theo tên tiện ích"
                        v-model="searchFacilitiesQuery"
                        solo
                        hide-details
                        class="text-muted py-1 size-sub-2 light-text-field-small font-nunito"
                        clearable
                        rounded
                      ></v-text-field>
                    </v-col>
                    <v-btn
                      class="ml-auto btn-success btn-sm font-nunito white--text"
                      @click="addNewFacility()"
                      >Bổ sung</v-btn
                    >
                  </div>
                  <div class="d-flex flex-wrap mt-3" v-if="newTypeValue.newFacilities.length > 0">
                    <FacilityItem
                      v-for="facility in newTypeValue.newFacilities"
                      v-bind:key="facility.index"
                      :facility="facility"
                    />
                  </div>
                  <v-card
                    class="overflow-y-auto mt-4 d-flex flex-wrap py-1"
                    max-height="150"
                    min-height="120"
                    outlined
                  >
                    <v-checkbox
                      v-model="newTypeValue.facilityIds"
                      v-for="item in facilities"
                      v-bind:key="item.facilityId"
                      :label="item.facilityName"
                      :value="item.facilityId"
                      hide-details
                      class="filter mt-2 ml-3 checkbox"
                      color="#727cf5"
                      @click="setCreateTypeValue(newTypeValue)"
                    ></v-checkbox>
                    <span
                      v-if="facilities.length === 0"
                      class="d-flex flex-column align-center ma-auto font-nunito text-primary"
                    >
                      <span
                        >Nếu phòng trọ của bạn có tiện ích không có sẵn trong danh sách gợi ý.</span
                      >
                      <span
                        >Hãy ấn nút <span style="color: #0acf97 !important">"Bổ sung"</span> để thêm
                        tiện ích mới</span
                      >
                    </span>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" class="d-flex flex-column pl-10">
              <v-card outlined min-height="390" max-height="400">
                <v-col cols="12" class="d-flex flex-column px-5">
                  <span class="field-name font-weight-medium">Hình ảnh</span>
                  <span class="font-nunito red--text size-caption" v-show="showMessage.image"
                    >Tải ít nhất một hình ảnh về phòng trọ của bạn!</span
                  >
                  <v-row
                    class="cursor ma-0 pa-5"
                    style="border: 2px dashed #dee2e6; border-radius: 6px"
                    @click="openImageUploadDialog"
                  >
                    <v-icon color="#98a6ad" large class="ma-auto">mdi-file-image-outline</v-icon>
                  </v-row>
                  <v-row>
                    <div class="d-flex flex-wrap align-center pa-2">
                      <div v-for="image in images" :key="image.resourceUrl">
                        <v-img
                          :src="image.resourceUrl"
                          :lazy-src="image.resourceUrl"
                          aspect-ratio="1"
                          class="ma-2 white type-image d-flex justify-center align-center"
                          min-width="6rem"
                          max-width="6rem"
                          max-height="4rem"
                          min-height="4rem"
                        >
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                          <div class="d-flex justify-center align-center">
                            <v-icon color="rbg(0,0,0,0.8)" class="cursor"
                              >mdi-delete-forever</v-icon
                            >
                          </div>
                        </v-img>
                      </div>
                    </div>
                  </v-row>
                  <v-dialog v-model="dialog.show" width="350">
                    <v-card height="350" :loading="isFileUploading">
                      <div class="d-flex flex-column align-center justify-center">
                        <input
                          type="file"
                          multiple
                          @change="onFileChange"
                          ref="fileSelect"
                          lang="vi"
                          accept="image/*"
                          class="ma-2"
                        />
                        <div class="d-flex flex-wrap" style="height: 250px; overflow-y: auto">
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
                        <v-btn
                          color="primary"
                          v-if="this.upload.imageUrls.length > 0"
                          @click="uploadImages"
                        >
                          <v-icon>cloud_upload</v-icon> Tải lên
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end pa-4">
          <v-btn class="btn btn-light elevation-0 font-nunito" @click="closeCreateTypeDialog()">
            Quay lại
          </v-btn>
          <v-btn class="btn btn-primary font-nunito" @click="insertNewType()">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import RoomItem from './RoomItem.vue';
import FacilityItem from './FacilityItem.vue';
import alert from '../../../core_layout/alert.vue';
import snackBarMixin from '../../../mixins/snackBar';
import fileMixins from '../../../mixins/file';

export default {
  name: 'TypesManagement',
  mixins: [fileMixins, snackBarMixin],
  data: () => ({
    typeIdNull: false,
    roomNameNull: false,
    showCreateTypeDialog: false,
    searchFacilitiesQuery: '',
    rules: {
      minPrice(value) {
        return (value || 'Giá không hợp lệ') > 0 || 'Không hợp lệ';
      },
      min(value) {
        return (value || 'Giá không hợp lệ') >= 0 || 'Không hợp lệ';
      },
    },
    dialog: {
      show: false,
      files: null,
    },
    upload: {
      imageUrls: [],
    },
    images: [],
    alert: {
      type: '',
      showAlert: false,
      action: '',
    },
    showMessage: {
      typeName: false,
      superficiality: false,
      capacity: false,
      image: false,
    },
    isNotValidate: false,
  }),
  props: { show: Boolean, group: Object },
  components: { RoomItem, FacilityItem, alert },
  computed: {
    isLoading() {
      const allFacilities = this.$store.state.renter.common.facilities.isLoading;
      return allFacilities;
    },
    allFacilities() {
      return this.$store.state.renter.common.facilities.data;
    },
    facilities() {
      if (this.searchFacilitiesQuery && this.searchFacilitiesQuery.trim() !== '') {
        return this.allFacilities.filter((item2) => {
          const res =
            item2.facilityName
              .toLowerCase()
              .indexOf(this.searchFacilitiesQuery.trim().toLowerCase()) !== -1;
          return res;
        });
      }
      return this.allFacilities;
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
    isTypeCreating() {
      return this.$store.state.vendor.group.types.isCreating;
    },
    isRoomsCreating() {
      console.log(this.$store.state.vendor.group.creatRooms.isCreating);
      return this.$store.state.vendor.group.creatRooms.isCreating;
    },
    isCreateSuccess() {
      return this.$store.state.vendor.group.types.success;
    },
    isCreatedRoomsSuccess() {
      return this.$store.state.vendor.group.creatRooms.success;
    },
  },
  methods: {
    ...mapActions({
      getAllFacilities: 'renter/common/getAllFacilities1',
      setNewRoom: 'vendor/group/setNewRoom',
      setCreatRooms: 'vendor/group/setCreatRooms',
      setCreateTypeValue: 'vendor/group/setCreateTypeValue',
      insertListRooms: 'vendor/group/createRooms',
      createHostelType: 'vendor/group/createHostelType',
    }),
    getTypes() {
      return this.group.types;
    },
    closeDialog() {
      const rooms = [];
      this.setCreatRooms(rooms);
      this.$emit('close');
    },
    closeCreateTypeDialog() {
      this.showCreateTypeDialog = false;
      this.resetType();
    },
    resetType() {
      this.setCreateTypeValue({
        title: '',
        price: 0,
        priceUnit: null,
        superficiality: 0,
        deposit: 1,
        capacity: 0,
        rooms: [],
        image: [],
        facilityIds: [],
        newFacilities: [],
      });
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
        this.insertListRooms(reqObj).then(() => {
          console.log(this.isCreatedRoomsSuccess);
          if (this.isCreatedRoomsSuccess) {
            this.closeDialog();
          } else {
            this.alert.types = 'failed';
            this.alert.action = 'Thêm mới danh sách phòng trọ thất bại!';
            this.alert.showAlert = true;
          }
        });
      }
    },
    isEmptyNewFacilities() {
      let flag = 0;
      this.newTypeValue.newFacilities.forEach((item) => {
        if (item.facilityName.trim() === '') {
          flag += 1;
        }
      });
      console.log(flag);
      return flag > 0;
    },
    isDuplicateNewFacilities() {
      let flag = 0;
      this.newTypeValue.newFacilities.forEach((item) => {
        if (
          this.allFacilities.filter(
            (facility) =>
              facility.facilityName.toLowerCase().trim() === item.facilityName.toLowerCase().trim(), // eslint-disable-line
          ).length > 0
        ) {
          flag += 1;
        }
        if (
          this.newTypeValue.newFacilities.filter(
            (facility) =>
              facility.facilityName.toLowerCase().trim() === item.facilityName.toLowerCase().trim(), // eslint-disable-line
          ).length > 0
        ) {
          flag += 1;
        }
      });
      return flag > this.newTypeValue.newFacilities.length;
    },
    validate() {
      this.showMessage.typeName = this.newTypeValue.title.trim() === '';
      this.showMessage.superficiality = this.newTypeValue.superficiality <= 0;
      this.showMessage.capacity = this.newTypeValue.capacity <= 0;
      this.showMessage.image = this.newTypeValue.image.length === 0;
    },
    insertNewType() {
      this.validate();
      if (
        !this.showMessage.typeName &&
        !this.showMessage.superficiality &&
        !this.showMessage.capacity &&
        !this.showMessage.image &&
        !this.isEmptyNewFacilities() &&
        !this.isDuplicateNewFacilities()
      ) {
        const { typePrice, typePriceUnit } = this.getPriceUnit(this.newTypeValue.price);
        const newType = {
          groupId: this.group.groupId,
          title: this.newTypeValue.title,
          price: typePrice,
          priceUnit: typePriceUnit,
          superficiality: this.newTypeValue.superficiality,
          capacity: this.newTypeValue.capacity,
          deposit: this.newTypeValue.deposit,
          rooms: [],
          imageUrls: this.newTypeValue.image,
          facilities: this.newTypeValue.facilityIds.map((facility) => ({
            facilityId: facility,
          })),
          newFacilities: this.newTypeValue.newFacilities.map((newFacility) => ({
            facilityName: newFacility.facilityName.trim(),
          })),
        };
        console.log(this.newTypeValue, newType);
        this.createHostelType(newType).then(() => {
          if (this.isCreateSuccess) {
            this.group.types = this.$store.state.vendor.group.groups.data.find(
              (item) => item.groupId === this.group.groupId,
            ).types;
            this.closeCreateTypeDialog();
          }
        });
      }
    },
    getPriceUnit(price) {
      let typePriceUnit = null;
      let typePrice = 0;
      if (String(price).length <= 6) {
        typePrice = price / 1000;
        typePriceUnit = 'nghìn';
      } else if (String(price).length < 10) {
        typePrice = price / 1000000;
        typePriceUnit = 'triệu';
      } else {
        typePriceUnit = 'tỉ';
        typePrice = price / 1000000000;
      }
      return { typePrice, typePriceUnit };
    },
    openCreateTypeDialog() {
      if (this.allFacilities.length === 0) {
        this.getAllFacilities();
      }
      this.showCreateTypeDialog = true;
    },
    addNewFacility() {
      if (this.newTypeValue.newFacilities.length === 0) {
        this.newTypeValue.newFacilities.push({
          index: 0,
          facilityName: '',
        });
      } else {
        this.newTypeValue.newFacilities.push({
          index:
            this.newTypeValue.newFacilities[this.newTypeValue.newFacilities.length - 1].index + 1,
          facilityName: '',
        });
      }
      this.setCreateTypeValue(this.newTypeValue);
    },
    // upload
    openImageUploadDialog() {
      this.dialog.show = true;
      this.$nextTick(() => this.$refs.fileSelect.click());
    },
    onFileChange(e) {
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
          this.images = this.upload.imageUrls.map((image) => ({ resourceUrl: image }));
          this.newTypeValue.image = this.images;
          this.setCreateTypeValue(this.newTypeValue);
        })
        .catch((error) => {
          console.log(error);
          this.showSnackBar('Tải ảnh lên thất bại', { color: 'red' });
        });
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
.light-text-field-small .v-input__slot {
  border: 0px solid #dee2e6 !important;
  background-color: #f1f3fa !important;
}
.light-text-field-small .theme--light.v-icon {
  color: #6c757d !important;
}
.light-text-field-small.v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px;
}
.light-text-field-small .v-icon.v-icon {
  font-size: 20px !important;
}
.light-text-field-small .theme--light.v-label {
  color: #98a6ad !important;
  font-family: 'Nunito', sans-serif !important;
}
.type-image {
  height: 4rem !important;
  width: 6rem !important;
  border-radius: 0.25rem !important;
  border: 1px thin #727cf5 !important;
}
</style>
