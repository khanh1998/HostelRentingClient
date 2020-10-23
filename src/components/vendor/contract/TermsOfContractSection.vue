<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-card-text class="d-flex flex-column">
                <span class="text-h6 mt-5">THÔNG TIN PHÒNG TRỌ</span>
                <span class="text-muted font-italic"
                  >Vui lòng nhập đầy đủ các thông tin bắt buộc</span
                >
                <v-row>
                  <v-col cols="12" class="d-flex flex-column">
                    <span class="font-weight-bold text-gray-black">Chọn nhà </span>
                    <span class="text size-sub-2 px-3 py-2 mt-2">{{ group.groupName }}</span>
                  </v-col>
                  <v-col cols="12" class="d-flex flex-column">
                    <!-- <v-textarea v-model="addressString" rows="2" readonly disabled>
                      <template v-slot:label>
                        <div>
                          Địa chỉ phòng trọ
                        </div>
                      </template>
                    </v-textarea> -->
                    <span class="font-weight-bold text-gray-black"
                      >Chọn phòng <span class="text-danger">(*)</span>
                    </span>
                    <v-select
                      :loading="rooms.isLoading"
                      v-model="contract.roomId"
                      :items="availableRooms"
                      item-text="roomName"
                      item-value="roomId"
                      hide-details
                      dense
                      solo
                      class="size-sub-2 mt-2"
                    >
                    </v-select>
                  </v-col>

                  <v-col cols="12" sm="6" class="d-flex flex-column">
                    <span class="font-weight-bold text-gray-black"
                      >Ngày bắt đầu hợp đồng<span class="text-danger">(*)</span>
                    </span>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <span class="text size-sub-2 px-3 py-2 mt-2" v-bind="attrs" v-on="on">{{
                          startTimeString
                        }}</span>
                      </template>
                      <v-date-picker
                        v-model="startTime"
                        no-title
                        @input="menu1 = false"
                        locale="vi"
                        :allowed-dates="allowedDates"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" class="d-flex flex-column">
                    <span class="font-weight-bold text-gray-black"
                      >Thời hạn hợp đồng<span class="text-danger">(*)</span></span
                    >
                    <v-text-field
                      class="size-sub-2 mt-2"
                      type="number"
                      color="#727cf5"
                      solo
                      dense
                      light
                      hide-details
                      v-model="contract.duration"
                      suffix="Tháng"
                      step="1"
                      min="1"
                      :rules="isPositiveInt"
                    />
                  </v-col>
                  <v-col cols="6" sm="6" class="d-flex flex-column">
                    <span class="font-weight-bold text-gray-black">Tiền thuê </span>
                    <span class="text size-sub-2 px-3 py-2 mt-2 d-flex"
                      ><span>{{ type.price }}</span>
                      <span class="ml-auto">triệu/tháng</span>
                    </span>
                  </v-col>
                  <v-col cols="6" sm="6" class="d-flex flex-column">
                    <span class="font-weight-bold text-gray-black">Tiền cọc</span>
                    <span class="text size-sub-2 px-3 py-2 mt-2 d-flex"
                      ><span>{{ type.deposit }}</span>
                      <span class="ml-auto">tháng tiền phòng</span>
                    </span>
                  </v-col>
                </v-row>
                <span class="text-h6 mt-5">THÔNG TIN DỊCH VỤ</span>
                <span class="text-muted font-italic">Chọn dịch vụ mà bạn sẽ tính tiền</span>
                <v-row>
                  <v-col class="12">
                    <HostelGroupServiceEditor
                      :groupService="group.services"
                      :select="true"
                      @newSelects="receiveSelectServiceIds"
                    />
                  </v-col>
                </v-row>
                <!-- </v-container> -->
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <FacilityTable :facilities="type.facilities" />
                    </v-col>
                    <v-col cols="12">
                      <RegulationTable :rules="group.regulations" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="d-flex flex-column">
                      <span
                        >Tiền đặt cọc sẽ được trả lại đầy đủ cho bên B khi hết hợp đồng thuê phòng
                        trọ với điều kiện thanh toán đầy đủ tiền điện, nước, phí dịch vụ và các
                        khoản khác liên quan.</span
                      >
                      <span class="mt-2"
                        >Bên A ngưng hợp đồng (lấy lại nhà) trước thời hạn thì bồi thường gấp đôi số
                        tiền bên B đã đặt cọc.</span
                      >
                      <span class="mt-2"
                        >Bên B ngưng hợp đồng trước thời hạn thì phải chịu mất tiền thế chân.</span
                      >
                    </v-col>
                    <v-col cols="12">
                      <!-- <ImageEditor @newValues="receiveNewImages" /> -->
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
            <!-- <v-col cols="12"> -->
            <v-row>
              <v-col cols="12" md="6">
                <ImageEditor @newValues="receiveNewImages" class="pa-0" />
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-center py-0">
                <v-btn class="ma-4 btn-primary" @click="$emit('clickCreateContract')">
                  Tạo hợp đồng
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
          <!-- </v-col> -->
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import HostelGroupServiceEditor from '../hostel_management/HostelGroupServiceEditor.vue';
import RegulationTable from './RegulationTable.vue';
import FacilityTable from './FacilityTable.vue';
import ImageEditor from '../hostel_management/ImageEditor.vue';
import validateMixins from '../../mixins/validate';
import SnackBarMixins from '../../mixins/snackBar';

export default {
  name: 'TermsOfContractSection',
  props: ['type', 'group'],
  mixins: [validateMixins, SnackBarMixins],
  components: {
    HostelGroupServiceEditor,
    RegulationTable,
    FacilityTable,
    ImageEditor,
  },
  data: () => ({
    menu1: null,
    startTime: new Date().toISOString().substr(0, 10),
    contract: {
      roomId: null,
      duration: null,
      groupServiceIds: [],
      startTime: new Date().getTime(),
      evidenceImgUrl: null,
    },
    rooms: {
      data: [],
      isLoading: false,
      error: null,
      success: null,
    },
  }),
  methods: {
    receiveSelectServiceIds(selectServiceIds) {
      console.log(selectServiceIds);
      this.contract.groupServiceIds = selectServiceIds;
    },
    receiveNewImages(imageUrls) {
      [this.contract.evidenceImgUrl] = imageUrls;
    },
    async getRoomsOfType() {
      try {
        this.rooms.isLoading = true;
        const url = `/api/v1/types/${this.type.typeId}/rooms`;
        const res = await window.axios.get(url);
        this.rooms.data = res.data.data;
        this.rooms.isLoading = false;
        this.rooms.success = true;
      } catch (error) {
        this.rooms.isLoading = false;
        this.rooms.error = error;
        this.rooms.success = false;
      }
    },
    checkEmptyField() {
      if (!this.contract.roomId) {
        this.showSnackBar('Chọn phòng trước khi tạo hợp đồng', { color: 'red' });
      } else if (!this.contract.duration) {
        this.showSnackBar('Nhập Thời hạn hợp đồng', { color: 'red' });
      } else {
        this.$emit('clickCreateContract');
      }
    },
  },
  computed: {
    addressString() {
      const { address } = this.group;
      return `${this.group.buildingNo} ${address.streetName}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`;
    },
    startTimeString() {
      return new Date(this.startTime).toLocaleDateString('vi');
    },
    availableRooms() {
      return this.rooms.data.filter((r) => r.available);
    },
  },
  created() {
    this.getRoomsOfType();
  },
  watch: {
    contract: {
      handler() {
        this.$emit('newValue', this.contract);
      },
      deep: true,
    },
    startTime() {
      this.contract.startTime = new Date(this.startTime).getTime();
    },
  },
};
</script>
<style>
.text {
  border: 1px solid #e1e1e1 !important;
  border-radius: 0.25rem;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #e1e1e1;
}
</style>
