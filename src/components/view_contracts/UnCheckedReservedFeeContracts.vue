<template>
  <v-card class="white pa-1">
    <v-card-title> Danh sách người thuê đóng tiền cọc giữ chỗ </v-card-title>
    <v-dialog v-model="evidences.lighbox" max-width="600">
      <div
        class="d-flex justify-center align-center"
        style="overflow: scroll; background-color: white"
      >
        <v-img :src="evidences.currentImgUrl" contain max-height="400" max-width="300"></v-img>
      </div>
    </v-dialog>
    <v-dialog v-model="evidences.show" max-width="350">
      <div class="d-flex justify-center align-center">
        <v-card
          width="350"
          v-if="evidences.show && !evidences.showResult"
          :loading="contractsStore.isLoading"
        >
          <v-card-title> Hình ảnh của biên lai chuyển tiền </v-card-title>
          <v-card-text>
            Người thuê: {{ evidences.contract.renter.username }}<br />
            Khu trọ: {{ evidences.contract.group.groupName }}<br />
            Loại phòng: {{ evidences.contract.type.title }}<br />
            Phòng số: {{ evidences.contract.room.roomName }}<br />
            Mức tiền cọc giữ chỗ: {{ evidences.contract.downPayment }}<br />
            triệu đồng
            <div class="d-flex flex-row">
              <v-img
                contain
                v-for="url in evidences.imageUrls"
                @click="showImageLightBox(url)"
                :key="url"
                :src="url"
                width="64"
                height="64"
              />
            </div>
          </v-card-text>
          <v-card-text v-if="evidences.imageUrls.length === 0"> Không có hình ảnh </v-card-text>
          <v-card-actions>
            <v-btn @click="confirmValidReserved">Hợp lệ</v-btn>
            <v-btn @click="confirmInvalidReserved">Không hợp lệ</v-btn>
          </v-card-actions>
        </v-card>
        <v-card width="350" v-if="evidences.show && evidences.showResult">
          <v-card-title v-if="evidences.success">Xác nhận thành công</v-card-title>
          <v-card-title v-if="!evidences.success">Xác nhận thất bại</v-card-title>
        </v-card>
      </div>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="tableItems"
      :loading="contracts.isLoading"
      item-key="contractId"
      class="elevation-1 mt-3"
      hide-default-footer
    >
      <template v-slot:item.actions="{ item }">
        <v-btn text color="amber" @click="showEvidences(item.contractId)">Kiểm tra</v-btn>
      </template>
    </v-data-table>
    <v-card-subtitle>
      <v-icon color="yellow">warning</v-icon>
      <span
        >Kiểm tra hết tất cả các yêu cầu xác nhận đóng tiền cọc giữ chỗ để có thể tiếp tục sử dụng
        ứng dụng.</span
      >
    </v-card-subtitle>
  </v-card>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'UncheckedReservedFeeContracts',
  props: ['contracts'],
  data: () => ({
    headers: [
      {
        text: 'Người thuê',
        align: 'start',
        value: 'renterName',
      },
      { text: 'Khu trọ', value: 'groupName', sortable: false },
      { text: 'Phòng', value: 'roomName', sortable: false },
      { text: 'Kiểm tra', value: 'actions', sortable: false },
    ],
    search: '',
    evidences: {
      show: false,
      imageUrls: [],
      currentImgUrl: null,
      contract: {},
      lighbox: false,
      showResult: false,
      success: false,
    },
  }),
  computed: {
    ...mapState({
      contractsStore: (state) => state.user.contracts,
    }),
    tableItems() {
      return this.contracts.map((c) => ({
        renterName: c.renter.username,
        roomName: c.room.roomName,
        groupName: c.group.groupName,
        status: c.status,
        contractId: c.contractId,
        images: c.images,
        downPayment: c.downPayment,
        address: `${c.group.streetName}, ${c.group.wardName}, ${c.group.districtName}`,
      }));
    },
  },
  methods: {
    ...mapActions({
      updateContract: 'user/updateContract',
    }),
    confirmInvalidReserved() {
      const contract = this.evidences;
      contract.roomId = contract.room.roomId;
      contract.status = '';
      this.evidences.show = false;
    },
    confirmValidReserved() {
      this.evidences.showResult = false;
      this.evidences.success = false;
      const { contract } = this.evidences;
      contract.roomId = contract.room.roomId;
      contract.status = 'RESERVED';
      this.updateContract(contract).then(() => {
        this.evidences.success = this.contractsStore.success;
        this.evidences.show = false;
      });
    },
    showImageLightBox(url) {
      this.evidences.currentImgUrl = url;
      this.evidences.lighbox = true;
    },
    showEvidences(contractId) {
      const contract = this.contracts.find((c) => c.contractId === contractId);
      this.evidences.imageUrls = contract.images.map((img) => img.resourceUrl);
      this.evidences.show = true;
      this.evidences.contract = contract;
      this.evidences.imageUrls.push(
        'https://i.pinimg.com/564x/cc/01/31/cc01317d0242d2a1cb54386b719e42d0.jpg',
        'https://i.pinimg.com/originals/95/f8/f0/95f8f07eaf103282dbd9518ab8175931.png',
      );
    },
  },
};
</script>
