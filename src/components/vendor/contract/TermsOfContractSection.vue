<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-row no-gutters>
            <v-col cols="6">
              <v-card-text>
                <v-container>
                  <h1>Điều 1</h1>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="addressString" rows="2" readonly>
                        <template v-slot:label>
                          <div>
                            Địa chỉ phòng trọ
                          </div>
                        </template>
                      </v-textarea>
                      <v-select
                        :loading="rooms.isLoading"
                        label="Chọn phòng"
                        v-model="contract.roomId"
                        :items="availableRooms"
                        item-text="roomName"
                        item-value="roomId"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Thời hạn hợp đồng"
                        v-model="contract.duration"
                        type="number"
                        suffix="tháng"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            label="Ngày bắt đầu hợp đồng"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            :value="startTimeString"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startTime"
                          no-title
                          @input="menu1 = false"
                          locale="vi"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex flex-row flex-nowrap">
                        <v-text-field
                          v-model="type.price"
                          suffix="Triệu đồng/Tháng"
                          label="Giá thuê phòng"
                          type="number"
                        ></v-text-field>
                        <v-text-field
                          class="ml-2"
                          v-model="type.deposit"
                          label="Đặt cọc"
                          suffix="tháng tiền phòng"
                          type="number"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  <h1>Điều 2</h1>
                  <div class="d-flex justify-center">
                    Các dịch vụ, nội thất, quy định khi thuê phòng trọ
                  </div>
                  <v-row>
                    <v-col class="12">
                      <HostelGroupServiceEditor
                        :groupService="group.services"
                        :select="true"
                        @newSelects="receiveSelectServiceIds"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="12">
                      <FacilityTable :facilities="type.facilities" />
                    </v-col>
                    <v-col class="12">
                      <RegulationTable :rules="group.regulations" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="12" style="font-size: 18px;">
                      Tiền đặt cọc trong <b>Điều 2 Khoản 1</b> sẽ được trả lại đầy đủ cho bên B khi
                      hết hợp đồng thuê phòng trọ với điều kiện thanh toán đầy đủ tiền điện, nước,
                      phí dịch vụ và các khoản khác liên quan.
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="12" style="font-size: 18px;">
                      Bên B ngưng hợp đồng trước thời hạn thì phải chịu mất tiền thế chân.
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="12" style="font-size: 18px;">
                      Bên A ngưng hợp đồng (lấy lại nhà) trước thời hạn thì bồi thường gấp đôi số
                      tiền bên B đã đặt cọc.
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <ImageEditor />
                    </v-col>
                    <v-col class="12" style="font-size: 18px;">
                      <v-btn
                        color="primary"
                        class="white--text"
                        @click="$emit('clickCreateContract')"
                      >
                        Tạo hợp đồng
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import HostelGroupServiceEditor from '../hostel_management/HostelGroupServiceEditor.vue';
import RegulationTable from './RegulationTable.vue';
import FacilityTable from './FacilityTable.vue';
import ImageEditor from '../hostel_management/ImageEditor.vue';

export default {
  name: 'TermsOfContractSection',
  props: ['type', 'group'],
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
      startTime: new Date(),
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
  },
};
</script>
