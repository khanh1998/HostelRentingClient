<template>
  <div>
    <!-- <v-container v-if="!isLoading" class="pa-0 hidden-sm-and-up">
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" class="d-flex align-center">
          <span class="page-title">Có {{ groups.length }} khu trọ cần xét duyệt</span>
          <v-btn
            class="ml-auto btn-success btn-sm font-nunito white--text"
            @click="openCreateGroupMobileDialog = true"
            ><v-icon small class="mr-1">mdi mdi-plus</v-icon>Thêm khu trọ mới</v-btn
          >
        </v-col>
        <v-col cols="12" class="d-flex align-center">
          <v-text-field
            v-show="showSearchGroup"
            label="Tìm theo tên khu trọ"
            v-model="searchGroupQuery"
            solo
            hide-details
            class="text-muted py-1 size-sub-2 light-text-field font-nunito"
            clearable
            @input="changeSearchQuery"
            style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
          ></v-text-field>
          <v-text-field
            v-show="!showSearchGroup"
            label="Tìm theo tên quản lý"
            v-model="searchManagerQuery"
            solo
            hide-details
            class="text-muted py-1 size-sub-2 light-text-field text-field-medium font-nunito"
            clearable
            @input="changeSearchQuery"
            style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
          ></v-text-field>
          <v-menu open-on-hover offset-y left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                elevation="0"
                height="38"
                class="font-nunito size9rem btn-dropdown d-flex align-center justify-center px-0"
                style="
                  background-color: #727cf5 !important;
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: 0.15rem !important;
                  border-bottom-right-radius: 0.15rem !important;
                "
                ><v-icon small color="#fff">search</v-icon>
                <v-icon small color="#fff">arrow_drop_down</v-icon></v-btn
              >
            </template>
            <v-list>
              <v-list-item
                style="min-height: 20px !important"
                class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
                @click="showSearchGroup = true"
              >
                <v-list-item-title class="item-hover font-nunito text-gray size9rem"
                  >Khu trọ</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                style="min-height: 20px !important"
                class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
                @click="showSearchGroup = false"
              >
                <v-list-item-title class="item-hover font-nunito size9rem text-gray"
                  >Quản lý</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="12" v-for="group in display" :key="group.groupId">
          <v-card class="white d-flex flex-column pa-4">
            <div class="d-flex align-center">
              <v-img
                :src="group.imgUrl"
                v-if="group.imgUrl"
                min-height="4rem"
                min-width="4rem"
                max-height="4rem"
                max-width="4rem"
                :lazy-src="group.imgUrl"
                style="border-radius: 0.25rem"
              ></v-img>
              <v-img
                src="@/assets/error-no-image.png"
                v-else
                min-height="4rem"
                min-width="4rem"
                max-height="4rem"
                max-width="4rem"
                style="
                  border-radius: 0.25rem;
                  box-shadow: 0 0 35px 0 rgba(255, 22, 22, 0.15) !important;
                "
              ></v-img>
              <span class="d-flex flex-column ml-3">
                <span class="font-nunito text-primary-dark size9rem">{{ group.groupName }}</span>
                <span class="font-nunito text-gray size-sub-3"
                  >{{ group.address.streetName }}, {{ group.address.wardName }},
                  {{ group.address.districtName }}, {{ group.address.provinceName }}</span
                >
              </span>
              <v-icon color="#727cf5" class="ml-3">mdi-chevron-right</v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="d-flex align-center">
          <v-pagination
            class="mt-5"
            v-model="page"
            :length="getTotalPage"
            :total-visible="7"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            color="#727cf5"
          ></v-pagination>
        </v-col>
      </v-row>
      <CreateGroupMobileDialog
        :show="openCreateGroupMobileDialog"
        @close="openCreateGroupMobileDialog = false"
      />
    </v-container> -->
    <div
      class="d-flex mx-4 align-center mb-0"
      v-bind:style="index % 2 !== 0 ? 'background-color: #f1f3fa;' : 'background-color: #fff;'"
    >
      <v-col cols="3" class="d-flex align-center">
        <div style="height: 50px" class="d-flex align-center">
          <span
            style="
              display: block;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            "
            class="font-nunito text-gray size-sub-2"
          >
            {{ type.title }}
          </span>
        </div>
      </v-col>
      <v-col cols="2" class="d-flex align-center pt-2 pb-1">
        <span class="font-nunito text-gray size-sub-2">
             {{ type.group.vendor.username }}
             </span>
      </v-col>
      <v-col cols="2" class="d-flex align-center pt-2 pb-1">
        <span class="font-nunito text-gray size-sub-2">
             {{ type.group.vendor.phone }}
             </span>
      </v-col>
      <v-col cols="3" class="d-flex align-center pt-2 pb-1">
        <span class="font-nunito text-gray size-sub-2">
          {{ type.group.buildingNo }} {{ type.group.address.streetName}}
          , {{ type.group.address.wardName}}, {{ type.group.address.districtName}}, {{ type.group.address.provinceName}}
        </span>
      </v-col>
      <v-col cols="1" class="d-flex align-center justify-center pt-2 pb-1">
        <span class="font-nunito text-gray size-sub-2">
          <v-chip class="ma-2" color="yellow darken-1" text-color="white" v-if="!type.active">
            Chưa kích hoạt
          </v-chip>
          <v-chip class="ma-2" color="green" text-color="white" v-if="type.active">
            Kích hoạt
          </v-chip>
        </span>
      </v-col>
      <v-col cols="1" class="d-flex align-center justify-center pt-2 pb-1">
        <v-btn icon @click="showDetailDiaglog = true"
          ><v-icon small color="#98a6ad">visibility</v-icon></v-btn
        >
      </v-col>
    </div>
    <!-- <v-dialog
      v-model="showDetailDiaglog"
      max-width="880px"
      scrollable
      transition="dialog-bottom-transition"
      persistent
    >
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card
        class="d-flex flex-column white font-nunito"
        max-width="880px"
        min-width="880px"
        v-if="!isLoading"
        style="border-radius: 0px !important"
      >
        <v-card
          class="d-flex px-4 py-3 align-center ma-0 justify-space-between main-bg"
          style="
            border-color: rgb(255, 255, 255);
            box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
            border-radius: 0px !important;
          "
        >
          <v-icon class="ml-4" color="rgb(255, 255, 255, 0.8)">person</v-icon>

          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Thông tin nhà trọ
          </span>
          <v-btn icon @click="closeDetailDialog()" class="mr-4"
            ><v-icon color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
          >
        </v-card>
        <v-card class="font-nunito">
          aaa
        </v-card>
      </v-card>
    </v-dialog> -->
    <!-- <v-dialog v-model="showConfirmCensored" persistent max-width="290">
      <v-card>
        <v-card
          class="d-flex px-4 py-3 align-center ma-0 justify-center main-bg"
          style="
            border-color: rgb(255, 255, 255);
            box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
            border-radius: 0px !important;
          "
        >
          <v-icon left color="rgb(255, 255, 255, 0.8)">beenhere</v-icon>
          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Xác nhận kiểm duyệt
          </span>
        </v-card>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="grey darken-1" text @click="closeConfirmCensoredDialog()"> Hủy </v-btn>
          <v-btn color="#727CF5" text @click="censoredVendor()"> Đồng ý </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showUnconfirmCensored" persistent max-width="290">
      <v-card>
        <v-card
          class="d-flex px-4 py-3 align-center ma-0 justify-center main-bg"
          style="
            border-color: rgb(255, 255, 255);
            box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
            border-radius: 0px !important;
          "
        >
          <v-icon left color="rgb(255, 255, 255, 0.8)">beenhere</v-icon>
          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Xác nhận hủy kiểm duyệt
          </span>
        </v-card>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="grey darken-1" text @click="closeUnconfirmCensoredDialog()"> Hủy </v-btn>
          <v-btn color="#727CF5" text @click="unCensoredVendor()"> Đồng ý </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showBlockDiaglog" persistent max-width="290">
      <v-card>
        <v-card
          class="d-flex px-4 py-3 align-center ma-0 justify-center main-bg"
          style="
            border-color: rgb(255, 255, 255);
            box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
            border-radius: 0px !important;
          "
        >
          <v-icon left color="rgb(255, 255, 255, 0.8)">block</v-icon>
          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Xác nhận khóa tài khoản
          </span>
        </v-card>
        <v-card-text class="font-nunito d-flex justify-center font-weight-bold mt-4" style="font-size: 1.125rem !important">{{vendor.username}}</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="grey lighten-1" dark @click="closeConfirmBlockedDialog()"> Hủy </v-btn>
          <v-btn color="#727CF5" dark @click="blockedVendor()"> Đồng ý </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCancelBlockDiaglog" persistent max-width="300">
      <v-card>
        <v-card
          class="d-flex px-4 py-3 align-center ma-0 justify-center main-bg"
          style="
            border-color: rgb(255, 255, 255);
            box-shadow: rgba(154, 161, 171, 0.15) 0px 0px 35px 0px !important;
            border-radius: 0px !important;
          "
        >
          <v-icon left color="rgb(255, 255, 255, 0.8)">block</v-icon>
          <span
            class="font-nunito white--text font-weight-bold"
            style="font-size: 1.125rem !important"
            >Xác nhận mở khóa tài khoản
          </span>
        </v-card>
        <v-card-text class="font-nunito d-flex justify-center font-weight-bold mt-4" style="font-size: 1.125rem !important">{{vendor.username}}</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="grey lighten-1" dark @click="closeConfirmUnblockedDialog()"> Hủy </v-btn>
          <v-btn color="#727CF5" dark @click="unBlockedVendor()"> Đồng ý </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import snackBarMixin from '@/components/mixins/snackBar';

export default {
  name: 'HostelItem',
  props: { type: Object, index: Number },
  mixins: [snackBarMixin],
  data: () => ({
    page: 1,
    pageRange: 5,
    value: 1,
    searchQuery: '',
    showDetailDiaglog: false,
    showConfirmCensored: false,
    showUnconfirmCensored: false,
    showBlockDiaglog: false,
    showCancelBlockDiaglog: false,
    newUser: {
      userId: null,
      data: {
        blocked: false,
        censored: false,
      },
    },
  }),
  computed: {
    isLoading() {
      const types = this.$store.state.user.types.isLoading;
      return types;
    },
    ...mapState({
      types: (state) => state.user.types,
    }),
  },
  methods: {
    ...mapActions({
      getAllTypes: 'user/getAllTypes',
      updateUser: 'user/updateVendorV2',
    }),
    closeDetailDialog() {
      this.showDetailDiaglog = false;
    },
    // censoredVendor() {
    //   this.newUser.data.blocked = this.vendor.blocked;
    //   this.newUser.data.censored = true;
    //   this.newUser.userId = this.vendor.userId;
    //   this.updateUser(this.newUser).then(() => {
    //     this.showConfirmCensored = false;
    //     this.showDetailDiaglog = false;
    //   });
    // },
    // confirmedCensoredVendor() {
    //   this.showConfirmCensored = true;
    // },
    // closeConfirmCensoredDialog() {
    //   this.showConfirmCensored = false;
    // },
    // unCensoredVendor() {
    //   this.newUser.data.blocked = this.vendor.blocked;
    //   this.newUser.data.censored = false;
    //   this.newUser.userId = this.vendor.userId;
    //   this.updateUser(this.newUser).then(() => {
    //     this.showUnconfirmCensored = false;
    //     this.showDetailDiaglog = false;
    //   });
    // },
    // unConfirmedCensoredVendor() {
    //   this.showUnconfirmCensored = true;
    // },
    // closeUnconfirmCensoredDialog() {
    //   this.showUnconfirmCensored = false;
    // },
    // blockedVendor() {
    //   this.newUser.data.blocked = true;
    //   this.newUser.data.censored = this.vendor.censored;
    //   this.newUser.userId = this.vendor.userId;
    //   this.updateUser(this.newUser).then(() => {
    //     this.showBlockDiaglog = false;
    //   });
    // },
    // closeConfirmBlockedDialog() {
    //   this.showBlockDiaglog = false;
    // },
    // unBlockedVendor() {
    //   this.newUser.data.blocked = false;
    //   this.newUser.data.censored = this.vendor.censored;
    //   this.newUser.userId = this.vendor.userId;
    //   this.updateUser(this.newUser).then(() => {
    //     this.showCancelBlockDiaglog = false;
    //   });
    // },
    // closeConfirmUnblockedDialog() {
    //   this.showCancelBlockDiaglog = false;
    // },
  },

//   async created() {
//     this.getAllTypes();
//   },
};
</script>
<style>
.container {
  height: 100%;
}
.btn-hover:hover {
  color: #727cf5 !important;
}
.light-text-field .v-input__slot {
  border: 0px solid #dee2e6 !important;
  background-color: #f1f3fa !important;
}
.light-text-field .theme--light.v-icon {
  color: #6c757d !important;
}
.light-text-field.v-text-field.v-text-field--solo .v-input__control {
  min-height: 38px;
}
.light-text-field .v-icon.v-icon {
  font-size: 20px !important;
}
.light-text-field .theme--light.v-label {
  color: #98a6ad !important;
  font-family: 'Nunito', sans-serif !important;
}
.bnt-dropdown .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #727cf5 !important;
}
.item-menu:hover {
  background-color: #f8f9fa;
}
.item-hover:hover {
  color: #272e37 !important;
}
.v-menu__content {
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15);
  background-color: #fff !important;
  background-clip: padding-box !important;
  border: 1px solid #e4eaf2 !important;
  border-radius: 0.25rem !important;
  color: #6c757d !important;
}
</style>
<style scoped>
.v-application a:hover {
  color: #fff !important;
}
</style>
