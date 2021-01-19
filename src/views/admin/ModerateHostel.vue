<template>
  <v-row no-gutters class="d-flex justify-center ma-0 pa-0">
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading" class="pa-0 hidden-xs-only">
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="12" md="12" lg="12" xl="11">
          <v-row class="d-flex align-center ma-0">
            <v-spacer></v-spacer>
            <v-col cols="3" class="d-flex align-center">
              <v-text-field
                label="Tìm theo tên"
                v-model="searchQuery"
                solo
                hide-details
                class="text-muted py-1 size-sub-2 light-text-field font-nunito"
                clearable
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
              ></v-text-field>
            </v-col>
            <!-- <v-menu offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="btn-hover px-0"
                  v-bind="attrs"
                  v-on="on"
                  max-width="50"
                  min-width="50"
                  style="
                    background-color: #727cf5 !important;
                    border-radius: 0.15rem !important;
                    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5) !important;
                  "
                  ><v-icon size="15" color="#fff">mdi-sort-ascending</v-icon></v-btn
                >
              </template>
              <v-list>
                <v-list-item
                  style="min-height: 20px !important"
                  class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
                >
                  <v-list-item-title
                    class="item-hover font-nunito text-gray size9rem"
                    @click="sortEmpty = true"
                    >Phòng trống</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  style="min-height: 20px !important"
                  class="py-2 pl-3 pr-10 item-hover d-flex align-center cursor item-menu"
                >
                  <v-list-item-title
                    class="item-hover font-nunito size9rem text-gray"
                    @click="sortEmpty = false"
                    >Phòng đang thuê</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu> -->
          </v-row>
          <v-card class="mt-5 px-5 py-4">
            <v-row>
              <div class="d-flex mx-4 py-2" style="width: 100%; border-bottom: 2px solid #eef2f7">
                <v-col cols="3" class="d-flex align-center">
                  <span class="font-nunito text-primary size9rem font-weight-bold"
                    >Tên loại phòng</span
                  >
                </v-col>
                <v-col cols="2" class="d-flex align-center">
                  <span class="font-nunito text-primary font-weight-bold size9rem"
                    >Chủ trọ</span
                  >
                </v-col>
                <v-col cols="2" class="d-flex align-center">
                  <span class="font-nunito text-primary font-weight-bold size9rem"
                    >Số điện thoại</span
                  >
                </v-col>
                <v-col cols="3" class="d-flex r align-center">
                  <span class="font-nunito text-primary font-weight-bold size9rem"
                    >Địa chỉ</span
                  >
                </v-col>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <span class="font-nunito text-primary font-weight-bold size9rem">Trạng thái</span>
                </v-col>
                <v-col cols="1" class="d-flex align-center justify-center font-weight-bold">
                  <span class="font-nunito text-primary size9rem">Thao tác</span>
                </v-col>
              </div>
            </v-row>
            <v-row class="d-flex flex-column">
              <itemHostel
                v-for="(type, index) in displayTypes"
                v-bind:key="type.typeId"
                :type="type"
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
  </v-row>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import snackBarMixin from '@/components/mixins/snackBar';
import itemHostel from '@/views/admin/HostelItem.vue';

export default {
  name: 'ModerateHostel',
  components: {
    itemHostel,
  },
  mixins: [snackBarMixin],
  data: () => ({
    page: 1,
    pageRange: 5,
    searchQuery: '',
    showDetailDiaglog: false,
    itemDetail: null,
  }),
  computed: {
    isLoading() {
      const types = this.$store.state.user.types.isLoading;
      return types;
    },
    ...mapState({
      types: (state) => state.user.types,
    }),
    getTotalPage() {
      return Math.ceil(this.types.data.types.length / this.pageRange);
    },
    displayTypes() {
      if (this.searchQuery !== null) {
        return this.getTypes
          .filter(
            (item) => item.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1,
          )
          .sort((value) => (value.active ? 1 : -1))
          .slice(this.pageRange * (this.page - 1), this.pageRange * this.page);
      }
      return this.getTypes.slice(this.pageRange * (this.page - 1), this.pageRange * this.page);
    },
    getTypes() {
      return this.types.data.types;
    },
  },
  methods: {
    ...mapActions({
      getAllTypes: 'user/getAllTypes',
    }),
    closeDetailDialog() {
      this.showDetailDiaglog = false;
    },
  },

  async created() {
    this.getAllTypes();
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
.v-application a:hover {
  color: #fff !important;
}
</style>
