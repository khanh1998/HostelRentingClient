<template>
  <!-- eslint-disable max-len -->
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog
      v-model="contractOverlay.show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card v-if="contractOverlay.contract">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="contractOverlay.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Hợp đồng</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="contractOverlay.action === 'activate'">
            <v-btn dark text @click="doActivateContract"> Kích hoạt hợp đồng </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <contractDetailView :mode="'view'" :contractId="contractOverlay.contract.contractId" />
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-container v-if="!isLoading">
      <v-row justify="center" class="py-10">
        <v-col cols="11" sm="11" md="11" lg="11" xl="10">
          <v-row class="hidden-xs-only">
            <div class="d-flex px-4" style="width: 100%">
              <v-col cols="3" class="d-flex align-center pl-0">
                <span class="font-nunito text-gray size-sub-2">Chủ trọ</span>
              </v-col>
              <v-col cols="3" class="d-flex align-center pl-0">
                <span class="font-nunito text-gray size-sub-2">Nhà trọ</span>
              </v-col>
              <v-col cols="1" class="d-flex justify-center align-center">
                <span class="font-nunito text-gray size-sub-2">Phòng</span>
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-center">
                <span class="font-nunito text-gray size-sub-2">Ngày bắt đầu</span>
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-center">
                <span class="font-nunito text-gray size-sub-2">Ngày hết hạn</span>
              </v-col>
              <v-col cols="1" class="d-flex justify-center align-center">
                <span class="font-nunito text-gray size-sub-2">Trạng thái</span>
              </v-col>
            </div>
          </v-row>
          <v-row class="mt-2">
            <div
              v-for="contract in contracts.data"
              v-bind:key="contract.contractId"
              style="width: 100%"
            >
              <contractItem
                :contract="contract"
                @viewDetail="viewContractDetail"
                @activate="openActivateContract"
              />
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped></style>
<script>
import { mapActions } from 'vuex';
import contractItem from '@/components/view_contracts/contractItem.vue';
import contractDetailView from '../../components/vendor/contract/contract.vue';
import snackBarMixin from '../../components/mixins/snackBar';

export default {
  name: 'ViewContracts',
  components: { contractItem, contractDetailView },
  mixins: [snackBarMixin],
  data: () => ({
    contractOverlay: {
      show: false,
      action: null, // view or activate
      contract: null,
    },
  }),
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
      getUser: 'user/getUser',
      activateContract: 'user/activateContract',
    }),
    doActivateContract() {
      console.log('doactivatecontract');
      const payload = {
        contractId: this.contractOverlay.contract.contractId,
        qrCode: this.contractOverlay.contract.qrCode,
      };
      this.activateContract(payload).then(() => {
        this.contractOverlay.show = false;
        const { success, error } = this.contracts;
        if (success) {
          console.log(success);
          this.showSnackBar('Kích hoạt hợp đồng thành công', { color: 'green' });
        } else {
          console.log(error);
          this.showSnackBar(`Kích hoạt hợp đồng thất bại ${error.message}`, { color: 'red' });
        }
      });
    },
    viewContractDetail(contractId) {
      console.log(contractId);
      this.contractOverlay.show = true;
      this.contractOverlay.action = 'view';
      this.contractOverlay.contract = this.contracts.data.find((c) => c.contractId === contractId);
    },
    openActivateContract(contractId) {
      console.log(contractId);
      this.contractOverlay.show = true;
      this.contractOverlay.action = 'activate';
      this.contractOverlay.contract = this.contracts.data.find((c) => c.contractId === contractId);
    },
  },
  created() {
    this.getUser().then(() => {
      this.getContracts();
    });
  },
  computed: {
    isLoading() {
      const loadingUser = this.$store.state.user.user.isLoading;
      const loadingContracts = this.$store.state.user.contracts.isLoading;
      return loadingUser || loadingContracts;
    },
    contracts() {
      return this.$store.state.user.contracts;
    },
  },
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.btn-primary {
  color: #6c757d !important;
  background-color: #eef2f7 !important;
  border-color: #727cf5 !important;
  /* box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important; */
  border-radius: 0.15rem !important;
  height: 2.5rem !important;
  opacity: 1 !important;
}
.v-btn-toggle > .v-btn.v-btn {
  opacity: 1 !important;
  border-style: none !important;
}
.v-btn-toggle > .v-btn.v-btn--active {
  color: #fff !important;
  background-color: #727cf5 !important;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
  opacity: 1 !important;
}
</style>
