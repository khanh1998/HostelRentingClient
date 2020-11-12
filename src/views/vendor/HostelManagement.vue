<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <GroupManagement
        :show="openGroupManagementDialog"
        @close="openGroupManagementDialog = false"
        :create="true"
        :update="false"
        @check-created="checkCreated"
      />
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12" xl="11">
          <v-row class="d-flex align-center ma-0">
            <span class="page-title">Danh sách nhà trọ</span>
            <v-btn
              class="mx-5 btn-success btn-sm font-nunito white--text"
              @click="openGroupManagementDialog = true"
              >Tạo mới</v-btn
            >
            <v-spacer></v-spacer>
            <v-col cols="4" class="d-flex align-center">
              <v-text-field
                v-show="showSearchGroup"
                label="Tìm theo tên nhà trọ"
                v-model="searchGroupQuery"
                solo
                hide-details
                class="text-muted py-1 size-sub-2 light-text-field"
                clearable
                @input="changeSearchQuery"
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
              ></v-text-field>
              <v-text-field
                v-show="!showSearchGroup"
                label="Tìm theo tên quản lý"
                v-model="searchManagerQuery"
                prepend-inner-icon="search"
                solo
                hide-details
                class="text-muted py-1 px-3 size-sub-2 light-text-field text-field-medium"
                clearable
                @input="changeSearchQuery"
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
              ></v-text-field>
              <v-menu open-on-hover offset-y left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    height="38"
                    class="font-nunito size9rem btn-dropdown d-flex align-center justify-center px-0"
                    style="
                      background-color: #6c757d !important;
                      border-top-left-radius: 0;
                      border-bottom-left-radius: 0;
                      box-shadow: 0 2px 6px 0 rgba(108, 117, 125, 0.5);
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
                      >Nhà trọ</v-list-item-title
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
            <v-col cols="1" class="d-flex justify-end align-end">
              <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon class="btn-hover pa-0" v-bind="attrs" v-on="on"
                    ><v-icon size="20">mdi-sort-ascending</v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-item
                    style="min-height: 20px !important"
                    class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
                  >
                    <v-list-item-title class="item-hover font-nunito text-gray size9rem"
                      >Phòng trống</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item
                    style="min-height: 20px !important"
                    class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
                  >
                    <v-list-item-title class="item-hover font-nunito size9rem text-gray"
                      >Phòng đang thuê</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <v-card class="mt-5 px-5 py-4">
            <v-row>
              <div class="d-flex mx-4 py-2" style="width: 100%; border-bottom: 2px solid #eef2f7">
                <v-col cols="2" class="d-flex align-center">
                  <span class="font-nunito text-primary size9rem font-weight-bold"
                    >Tên nhà trọ</span
                  >
                </v-col>
                <v-col cols="4" class="d-flex align-center">
                  <span class="font-nunito text-primary font-weight-bold size9rem"
                    >Phòng cho thuê</span
                  >
                </v-col>
                <v-col cols="3" class="d-flex r align-center">
                  <span class="font-nunito text-primary font-weight-bold size9rem">Địa chỉ</span>
                </v-col>
                <v-col cols="2" class="d-flex align-center justify-center">
                  <span class="font-nunito text-primary font-weight-bold size9rem">Quản lý</span>
                </v-col>
                <v-col cols="1" class="d-flex align-center justify-center font-weight-bold">
                  <span class="font-nunito text-primary size9rem">Thao tác</span>
                </v-col>
              </div>
            </v-row>
            <v-row class="d-flex flex-column">
              <itemGroup
                v-for="(group, index) in display"
                v-bind:key="group.groupId"
                :group="group"
                :index="index"
              />
            </v-row>
          </v-card>
          <v-row class="d-flex justify-center">
            <v-pagination
              class="mt-5"
              v-model="page"
              :length="getTotalPage"
              :total-visible="7"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              color="#727cf5"
            ></v-pagination>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-col cols="11">
      <div class="d-flex flex-row flex-nowrap red mt-16" _style="height: 100%;">
        <v-card width="100%" height="100%" class="overflow-hidden" :loading="isLoading">
          <template v-if="groups.length > 0">
            <v-navigation-drawer
              v-model="drawer"
              :mini-variant="miniVariant"
              absolute
              width="350"
              permanent
              mini-variant-width="70"
            >
              <v-list-item>
                <v-list-item-action>
                  <v-btn icon depressed color="primary" @click="miniVariant = !miniVariant">
                    <v-icon v-if="miniVariant">mdi-chevron-right</v-icon>
                    <v-icon v-if="!miniVariant">mdi-chevron-left</v-icon>
                  </v-btn>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title style="fontsize: 22px; color: #6c98c6"
                    >Khu trọ</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-btn
                      color="green"
                      dark
                      fab
                      small
                      depressed
                      @click="showGroupCreator = !showGroupCreator"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Tạo khu phòng trọ mới</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <HostelGroup
                :groups="groups"
                @getIdSelected="groupId = $event"
                v-on:close-menu="mini = !mini"
              />
            </v-navigation-drawer>
            <HostelGroupActions :groupData="getSelectedGroup()" v-if="groupId" />
            <div style="height: calc(100% - 68px); overflow-y: scroll">
              <HostelType
                :typesData="getSelectedTypes()"
                @getTypeIdSelected="typeId = $event"
                v-if="groupId"
              />
            </div>
            <HostelGroupCreator
              :show="showGroupCreator"
              @close="showGroupCreator = false"
              :create="true"
              :update="false"
              @check-created="checkCreated"
            />
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
          </template>
          <template v-if="groups.length === 0">
            <HostelNoData />
          </template>
        </v-card>
      </div>
    </v-col> -->
  </v-row>
</template>
<script>
// import HostelGroup from '@/components/vendor/hostel_management/HostelGroup.vue';
// import HostelNoData from '@/components/vendor/hostel_management/HostelNoData.vue';
// import HostelGroupCreator from '@/components/vendor/hostel_management/HostelGroupCreator.vue';
// import HostelType from '@/components/vendor/hostel_management/HostelType.vue';
// import HostelGroupActions from '@/components/vendor/hostel_management/HostelGroupActions.vue';
import itemGroup from '@/components/vendor/hostel_management/groupItem.vue';
import { mapActions } from 'vuex';
import snackBarMixin from '@/components/mixins/snackBar';
// thuy
import GroupManagement from '@/components/vendor/hostel_management/group_management/GroupManagement.vue';

export default {
  name: 'HostelManagement',
  components: {
    // HostelGroup,
    // HostelType,
    // HostelGroupActions,
    // HostelGroupCreator,
    // HostelNoData,
    // thuy
    itemGroup,
    GroupManagement,
  },
  mixins: [snackBarMixin],
  data: () => ({
    groupId: null,
    typeId: null,
    drawer: true,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
    mini: false,
    miniVariant: true,
    expandOnHover: true,
    showGroupCreator: false,
    // thuy
    searchGroupQuery: '',
    searchManagerQuery: '',
    sortEmpty: false,
    sortRenting: false,
    page: 1,
    pageRange: 5,
    openGroupManagementDialog: false,
    showSearchGroup: true,
  }),
  computed: {
    newRoomValue() {
      return this.$store.state.vendor.group.newRoom.data;
    },
    groups() {
      console.log(this.$store.state.vendor.group.groups.data);
      return this.$store.state.vendor.group.groups.data;
    },
    isLoading() {
      const groups = this.$store.state.vendor.group.groups.isLoading;
      const types = this.$store.state.vendor.group.types.isLoading;
      const rooms = this.$store.state.vendor.group.rooms.isLoading;
      return groups || types || rooms;
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        case 'sm':
          return true;
        default:
          return false;
      }
    },
    getTotalPage() {
      return Math.ceil(this.searchResult.length / this.pageRange);
    },
    searchResult() {
      if (this.searchGroupQuery && this.searchGroupQuery.trim() !== '') {
        return this.groups.filter((item2) => {
          const res =
            item2.groupName.toLowerCase().indexOf(this.searchGroupQuery.trim().toLowerCase()) !==
            -1;
          return res;
        });
      }
      if (this.searchManagerQuery && this.searchManagerQuery.trim() !== '') {
        return this.groups.filter((item2) => {
          const res =
            item2.managerName
              .toLowerCase()
              .indexOf(this.searchManagerQuery.trim().toLowerCase()) !== -1;
          return res;
        });
      }
      return this.groups;
    },
    display() {
      return this.searchResult.slice(this.pageRange * (this.page - 1), this.pageRange * this.page);
    },
  },
  methods: {
    ...mapActions({
      getGroups: 'vendor/group/getGroups',
      getTypes: 'vendor/group/getTypes',
      getRooms: 'vendor/group/getRooms',
    }),
    getSelectedGroup() {
      const res = this.groups.find((groupItem) => groupItem.groupId === this.groupId);
      return res;
    },
    getSelectedTypes() {
      return this.getSelectedGroup().types;
    },
    checkCreated(e) {
      console.log(e);
      console.log('aaa');
      this.showSnackBar(`Khu trọ ${e} đã được tạo thành công`, {
        color: 'green',
      });
    },
    changeSearchQuery() {
      this.page = 1;
    },
  },

  async created() {
    if (this.groups.length === 0) {
      this.getGroups().then(() => {
        this.getTypes().then(() => {
          this.getRooms().then(() => {
            if (this.groups.length > 0) {
              this.groupId = this.groups[0].groupId;
            }
          });
        });
      });
    } else {
      this.groupId = this.groups[0].groupId;
    }
  },
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
</style>
