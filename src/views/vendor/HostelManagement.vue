<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-container _v-if="!isLoading">
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12" xl="11">
          <v-row class="d-flex align-center ma-0">
            <span class="page-title">Danh sách nhà trọ</span>
            <v-btn class="mx-5 btn-success btn-sm font-nunito white--text">Tạo mới</v-btn>
            <v-spacer></v-spacer>
            <v-col cols="4" class="pa-0">
              <v-text-field
                label="Tìm kiếm theo tên"
                v-model="searchGroupQuery"
                append-icon="search"
                solo
                hide-details
                class="text-muted pa-0 size-sub-2 slide-booking"
                height="10"
                rounded
                clearable
                @input="changeSearchQuery"
                style="background-color: #f1f3fa !important; border-color: #f1f3fa !important;"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card class="mt-10 px-5 py-4">
            <v-row class="hidden-xs-only">
              <div class="d-flex mx-4 py-2" style="width: 100%; border-bottom: 2px solid #eef2f7;">
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
    <v-col cols="11" class="d-flex flex-column">
      <v-row class="d-flex align-center ma-0">
        <span class="page-title">Danh sách nhà trọ</span>
        <v-btn class="mx-5 btn-success btn-sm font-nunito white--text">Tạo mới</v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          label="Tìm kiếm theo tên"
          v-model="searchGroupQuery"
          append-icon="search"
          solo
          hide-details
          class="text-muted pa-0 size-sub-2 slide-booking"
          height="10"
          rounded
          clearable
          style="background-color: #f1f3fa !important; border-color: #f1f3fa !important;"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 my-10 d-flex flex-column">
        <v-card class="pa-4 d-flex flex-column">
          <v-row class="d-flex ma-0">
            <v-col cols="2" class="red pa-1 d-flex align-center">
              <span class="yellow">Tên nhà trọ</span>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-col>
    <v-col cols="11">
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
                  <v-list-item-title style="fontsize: 22px; color: #6c98c6;"
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
            <div style="height: calc(100% - 68px); overflow-y: scroll;">
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
    </v-col>
  </v-row>
</template>
<script>
import HostelGroup from '@/components/vendor/hostel_management/HostelGroup.vue';
import HostelNoData from '@/components/vendor/hostel_management/HostelNoData.vue';
import HostelGroupCreator from '@/components/vendor/hostel_management/HostelGroupCreator.vue';
import HostelType from '@/components/vendor/hostel_management/HostelType.vue';
import HostelGroupActions from '@/components/vendor/hostel_management/HostelGroupActions.vue';
import itemGroup from '@/components/vendor/hostel_management/groupItem.vue';
import { mapActions } from 'vuex';
import snackBarMixin from '@/components/mixins/snackBar';

export default {
  name: 'HostelManagement',
  components: {
    HostelGroup,
    HostelType,
    HostelGroupActions,
    HostelGroupCreator,
    HostelNoData,
    itemGroup,
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
    page: 1,
    pageRange: 5,
  }),
  computed: {
    groups() {
      console.log(this.$store.state.vendor.group.groups.data);
      return this.$store.state.vendor.group.groups.data;
    },
    isLoading() {
      return (
        this.$store.state.vendor.group.groups.isLoading ||
        this.$store.state.vendor.group.types.isLoading ||
        this.$store.state.vendor.group.rooms.isLoading
      );
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
      return Math.ceil(this.display.length / this.pageRange);
    },
    display() {
      if (this.searchGroupQuery && this.searchGroupQuery.trim() !== '') {
        return this.groups.filter((item2) => {
          const res =
            item2.groupName.toLowerCase().indexOf(this.searchGroupQuery.trim().toLowerCase()) !==
            -1;
          return res;
        });
      }
      return this.groups.slice(this.pageRange * (this.page - 1), this.pageRange * this.page);
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
</style>
