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
            {{ vendor.username }}
          </span>
        </div>
      </v-col>
      <v-col cols="2" class="d-flex align-center pt-2 pb-1">
        <span class="font-nunito text-gray size-sub-2"> {{ vendor.phone }} </span>
      </v-col>
      <v-col cols="3" class="d-flex align-center pt-2 pb-1">
        <span class="font-nunito text-gray size-sub-2">
          {{ vendor.householdAddress }}
        </span>
      </v-col>
      <v-col cols="2" class="d-flex align-center justify-center pt-2 pb-1">
        <span class="font-nunito text-gray size-sub-2">
          <v-chip class="ma-2" color="yellow darken-1" text-color="white" v-if="!vendor.censored">
            Chưa kiểm duyệt
          </v-chip>
          <v-chip class="ma-2" color="green" text-color="white" v-if="vendor.censored">
            Đã kiểm duyệt
          </v-chip>
        </span>
      </v-col>
      <v-col cols="2" class="d-flex align-center justify-center pt-2 pb-1">
        <v-btn icon @click="showDetailDiaglog = true"
          ><v-icon small color="#98a6ad">visibility</v-icon></v-btn
        >

        <v-btn icon @click="showBlockDiaglog = true"
        v-if="!vendor.blocked"
          ><v-icon small color="#98a6ad">block</v-icon></v-btn
        >

        <v-btn icon @click="showCancelBlockDiaglog = true"
        v-if="vendor.blocked"
          ><v-icon small color="red">block</v-icon></v-btn
        >
      </v-col>
    </div>
    <v-dialog
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
            >Thông tin chủ trọ
          </span>
          <v-btn icon @click="closeDetailDialog()" class="mr-4"
            ><v-icon color="rgb(255, 255, 255, 0.75)">close</v-icon></v-btn
          >
        </v-card>
        <!-- detail -->
        <v-card class="font-nunito">
          <v-row>
            <v-col cols="12" md="3" class="pt-10">
              <div class="d-flex flex-column justify-center align-center">
                <v-avatar size="128" class="pb-3" v-if="vendor.avatar !== null">
                  <v-img :src="vendor.avatar"> </v-img>
                </v-avatar>
                <v-avatar size="128" class="pb-3" v-else>
                  <v-img src="@/assets/user-no-avatar.png"> </v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col cols="12" md="9" style="border-left: 1px solid lightgray" class="mt-3 pa-0 py-0">
              <v-row no-gutters class="hidden-sm-and-down">
                <v-col cols="6" class="pl-5">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >{{ vendor.role === 'RENTER' ? 'Khách thuê' : '' }}
                            {{ vendor.role === 'VENDOR' ? 'Chủ trọ' : '' }}</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.username }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Năm sinh</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.yearOfBirth }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Quê quán</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.hometown.provinceName }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col> -->
                    <!-- <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Trường đại học</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.school.schoolName }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col> -->
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Số điện thoại</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.phone }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Email</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.email }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" class="pr-5">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Số CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.citizenIdNum }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Nơi cấp</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.idIssuedLocation }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Ngày cấp</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{
                              new Date(vendor.idIssuedDate).toLocaleDateString('vi')
                            }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Địa chỉ thường trú</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.householdAddress }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Địa chỉ hiện tại</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ vendor.currentAddress }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pl-3 pt-10 pr-3">
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium d-flex justify-center"
                            >Mặt trước CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2 d-flex justify-center pl-3 pr-3"
                          >
                            <p v-if="!vendor.citizenIdFrontImg" class="d-flex justify-center">
                              Thiếu ảnh
                            </p>
                            <v-img
                              height="240"
                              width="260"
                              v-if="vendor.citizenIdFrontImg"
                              :src="vendor.citizenIdFrontImg"
                            >
                              <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                              </template>
                            </v-img>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium d-flex justify-center"
                            >Mặt sau CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2 d-flex justify-center pl-3 pr-3"
                          >
                            <p v-if="!vendor.citizenIdBackImg" class="d-flex justify-center">
                              Thiếu ảnh
                            </p>
                            <v-img
                              height="240"
                              width="260"
                              v-if="vendor.citizenIdBackImg"
                              :src="vendor.citizenIdBackImg"
                            >
                              <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                              </template>
                            </v-img>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="d-flex justify-end pr-9 pb-5 pt-5">
                  <v-btn @click="confirmedCensoredVendor()" color="#727CF5" dark v-if="!vendor.censored">
                    <v-icon left>verified_user</v-icon> Kiểm duyệt
                  </v-btn>
                  <v-btn @click="unConfirmedCensoredVendor()" color="#727CF5" dark v-if="vendor.censored">
                    <v-icon left>verified_user</v-icon> Hủy kiểm duyệt
                  </v-btn>
                </v-col>
              </v-row>
              <!-- <v-row no-gutters class="hidden-sm-and-up">
                <v-col cols="12" class="pl-5">
                  <v-row no-gutters v-if="!editProfile">
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >{{ user.data.role === 'RENTER' ? 'Khách thuê' : '' }}
                            {{ user.data.role === 'VENDOR' ? 'Chủ trọ' : '' }}</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.username }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Năm sinh</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.yearOfBirth }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Quê quán</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.hometown.provinceName }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Trường đại học</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.school.schoolName }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Số điện thoại</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.phone }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Email</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.email }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row no-gutters v-if="editProfile">
                    <v-col cols="12" md="8" class="d-flex flex-column justify-center pt-2 pr-4">
                      <span class="field-name font-weight-medium"
                        >{{ user.data.role === 'RENTER' ? 'Khách thuê' : '' }}
                        {{ user.data.role === 'VENDOR' ? 'Chủ trọ' : '' }}</span
                      >
                      <div>
                        <v-text-field
                          color="#727CF5"
                          v-model="newUser.username"
                          dense
                          solo
                          clearable
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                      <span class="field-name font-weight-medium">Năm sinh</span>
                      <div>
                        <v-text-field
                          color="#727CF5"
                          v-model="newUser.yearOfBirth"
                          type="number"
                          :step="1"
                          :min="1900"
                          solo
                          dense
                          clearable
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                      <span class="field-name font-weight-medium">Quê quán</span>
                      <div>
                        <v-autocomplete
                          v-model="newUser.hometown.provinceId"
                          :items="provinces.items"
                          item-text="provinceName"
                          item-value="provinceId"
                          color="#727CF5"
                          dense
                          solo
                        ></v-autocomplete>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                      <span class="field-name font-weight-medium">Trường đại học</span>
                      <div>
                        <v-autocomplete
                          v-model="newUser.school.schoolId"
                          :items="schools.items"
                          item-text="schoolName"
                          item-value="schoolId"
                          color="#727CF5"
                          dense
                          solo
                        ></v-autocomplete>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                      <span class="field-name font-weight-medium">Email</span>
                      <div>
                        <v-text-field
                          color="#727CF5"
                          v-model="newUser.email"
                          dense
                          solo
                          clearable
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pl-5">
                  <v-row no-gutters v-if="!editProfile">
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Số CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.citizenIdNum }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Nơi cấp</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{ user.data.idIssuedLocation }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Ngày cấp</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2"
                            >{{
                              new Date(user.data.idIssuedDate).toLocaleDateString('vi')
                            }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Địa chỉ thường trú</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2 pr-3"
                            >{{ user.data.householdAddress }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium"
                            >Địa chỉ hiện tại</v-card-text
                          >
                        </v-col>
                        <v-col cols="8" class="d-flex justify-start">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2 pr-3"
                            >{{ user.data.currentAddress }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row no-gutters v-if="editProfile">
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12" md="8" class="d-flex flex-column justify-center pt-2 pr-4">
                          <span class="field-name font-weight-medium">Số CMND</span>
                          <div>
                            <v-text-field
                              color="#727CF5"
                              type="number"
                              v-model="newUser.citizenIdNum"
                              dense
                              solo
                              clearable
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                          <span class="field-name font-weight-medium">Nơi cấp</span>
                          <div>
                            <v-text-field
                              color="#727CF5"
                              v-model="newUser.idIssuedLocation"
                              dense
                              solo
                              clearable
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                          <span class="field-name font-weight-medium">Ngày cấp</span>
                          <div>
                            <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="datePicker.value"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  class="pt-0"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="vi-vn"
                                v-model="datePicker.value"
                                color="#727CF5"
                                :no-title="true"
                                @input="menu2 = false"
                              ></v-date-picker>
                            </v-menu>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                          <span class="field-name font-weight-medium">Địa chỉ thường trú</span>
                          <div>
                            <v-text-field
                              color="#727CF5"
                              v-model="newUser.householdAddress"
                              dense
                              solo
                              clearable
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12" md="8" class="d-flex flex-column justify-center pr-4">
                          <span class="field-name font-weight-medium">Địa chỉ hiện tại</span>
                          <div>
                            <v-text-field
                              color="#727CF5"
                              v-model="newUser.currentAddress"
                              dense
                              solo
                              full-width
                              single-line
                              clearable
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pl-3 pt-10 pr-3">
                  <v-row no-gutters v-if="!editProfile">
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium d-flex justify-center"
                            >Mặt trước CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2 d-flex justify-center pl-3 pr-3"
                          >
                            <p v-if="!user.data.citizenIdFrontImg" class="d-flex justify-center">
                              Thiếu ảnh
                            </p>
                            <v-img
                              height="240"
                              width="260"
                              v-if="user.data.citizenIdFrontImg"
                              :src="user.data.citizenIdFrontImg"
                            >
                              <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                              </template>
                            </v-img>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium d-flex justify-center"
                            >Mặt sau CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="12">
                          <v-card-text
                            style="font-size: 16px"
                            class="font-weight-bold pa-0 py-0 pt-2 pb-2 d-flex justify-center pl-3 pr-3"
                          >
                            <p v-if="!user.data.citizenIdBackImg" class="d-flex justify-center">
                              Thiếu ảnh
                            </p>
                            <v-img
                              height="240"
                              width="260"
                              v-if="user.data.citizenIdBackImg"
                              :src="user.data.citizenIdBackImg"
                            >
                              <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                              </template>
                            </v-img>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row no-gutters v-if="editProfile">
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="6">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium d-flex justify-center"
                            >Mặt trước CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="6" class="pt-1">
                          <v-btn v-if="editProfile" @click="uploadFrontIDCardImage" depressed small>
                            <v-icon left>add_photo_alternate</v-icon>Tải lên ảnh mới</v-btn
                          >
                        </v-col>
                        <v-col cols="12" md="10" class="pa-0 py-0 pt-2 pb-2 d-flex justify-center">
                          <v-img
                            height="240"
                            width="260"
                            v-if="newUser.citizenIdFrontImg"
                            :src="newUser.citizenIdFrontImg"
                          >
                            <template v-slot:placeholder>
                              <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="6">
                          <v-card-text
                            style="font-size: 16px"
                            class="pa-0 py-0 pt-2 font-weight-medium d-flex justify-center"
                            >Mặt sau CMND</v-card-text
                          >
                        </v-col>
                        <v-col cols="6" class="pt-1">
                          <v-btn @click="uploadBackIDCardImage" depressed small>
                            <v-icon left>add_photo_alternate</v-icon>Tải lên ảnh mới</v-btn
                          >
                        </v-col>
                        <v-col cols="12" md="10" class="pa-0 py-0 pt-2 pb-2 d-flex justify-center">
                          <v-img
                            height="240"
                            width="260"
                            v-if="user.data.citizenIdBackImg"
                            :src="user.data.citizenIdBackImg"
                          >
                            <template v-slot:placeholder>
                              <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="d-flex justify-end pr-9 pb-5 pt-5">
                  <v-btn
                    v-if="updatable && editProfile"
                    @click="updateUserInfo"
                    color="#727CF5"
                    dark
                  >
                    <v-icon left>update</v-icon> Cập nhật ngay
                  </v-btn>
                </v-col>
              </v-row> -->
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showConfirmCensored" persistent max-width="290">
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
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import snackBarMixin from '@/components/mixins/snackBar';

export default {
  name: 'VendorItem',
  props: { vendor: Object, index: Number },
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
      const renters = this.$store.state.user.renters.isLoading;
      const vendors = this.$store.state.user.vendors.isLoading;
      return renters && vendors;
    },
    ...mapState({
      renters: (state) => state.user.renters,
      vendors: (state) => state.user.vendors,
    }),
  },
  methods: {
    ...mapActions({
      getAllRenters: 'user/getAllRenters',
      getAllVendors: 'user/getAllVendors',
      updateUser: 'user/updateVendorV2',
    }),
    closeDetailDialog() {
      this.showDetailDiaglog = false;
    },
    censoredVendor() {
      this.newUser.data.blocked = this.vendor.blocked;
      this.newUser.data.censored = true;
      this.newUser.userId = this.vendor.userId;
      this.updateUser(this.newUser).then(() => {
        this.showConfirmCensored = false;
        this.showDetailDiaglog = false;
      });
    },
    confirmedCensoredVendor() {
      this.showConfirmCensored = true;
    },
    closeConfirmCensoredDialog() {
      this.showConfirmCensored = false;
    },
    unCensoredVendor() {
      this.newUser.data.blocked = this.vendor.blocked;
      this.newUser.data.censored = false;
      this.newUser.userId = this.vendor.userId;
      this.updateUser(this.newUser).then(() => {
        this.showUnconfirmCensored = false;
        this.showDetailDiaglog = false;
      });
    },
    unConfirmedCensoredVendor() {
      this.showUnconfirmCensored = true;
    },
    closeUnconfirmCensoredDialog() {
      this.showUnconfirmCensored = false;
    },
    blockedVendor() {
      this.newUser.data.blocked = true;
      this.newUser.data.censored = this.vendor.censored;
      this.newUser.userId = this.vendor.userId;
      this.updateUser(this.newUser).then(() => {
        this.showBlockDiaglog = false;
      });
    },
    closeConfirmBlockedDialog() {
      this.showBlockDiaglog = false;
    },
    unBlockedVendor() {
      this.newUser.data.blocked = false;
      this.newUser.data.censored = this.vendor.censored;
      this.newUser.userId = this.vendor.userId;
      this.updateUser(this.newUser).then(() => {
        this.showCancelBlockDiaglog = false;
      });
    },
    closeConfirmUnblockedDialog() {
      this.showCancelBlockDiaglog = false;
    },
  },

  async created() {
    if (this.renters.data.length === 0) {
      this.getAllRenters();
    }
    if (this.vendors.data.length === 0) {
      this.getAllVendors();
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
.v-application a:hover {
  color: #fff !important;
}
</style>
