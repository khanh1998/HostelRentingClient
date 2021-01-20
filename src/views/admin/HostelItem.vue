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
          {{ type.group.buildingNo }} {{ type.group.address.streetName }} ,
          {{ type.group.address.wardName }}, {{ type.group.address.districtName }}
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
          <v-icon class="ml-4" color="rgb(255, 255, 255, 0.8)">house</v-icon>

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
          <!-- detail -->
          <v-tabs color="#727CF5" left>
            <v-tab>Khu trọ</v-tab>
            <v-tab>Loại phòng</v-tab>
            <v-tab>Dịch vụ</v-tab>
            <!-- khu trọ -->
            <v-tab-item>
              <v-card
                class="overflow-y-auto d-flex flex-column pb-3 px-10 my-0"
                max-height="430"
                min-height="430"
                style="box-shadow: none !important"
              >
                <v-row class="ma-0 d-flex justify-space-between">
                  <v-col cols="12" class="py-0 pr-md-10">
                    <v-row class="ma-0">
                      <v-col cols="5" class="d-flex flex-column pb-0">
                        <span class="field-name">Tên khu trọ</span>
                        <v-text-field
                          class="size-sub-2 font-nunito form"
                          solo
                          dense
                          light
                          hide-details
                          readonly
                          v-model="type.group.groupName"
                        />
                      </v-col>
                      <v-col cols="4" class="d-flex flex-column pb-0">
                        <span class="field-name font-weight-medium">Hình thức cho thuê</span>
                        <v-text-field
                          class="size-sub-2 font-nunito form"
                          solo
                          dense
                          light
                          hide-details
                          readonly
                          v-model="type.group.category.categoryName"
                        />
                      </v-col>
                      <v-col cols="3" class="d-flex align-end pb-0">
                        <v-checkbox
                          v-model="type.group.ownerJoin"
                          label="Chung chủ"
                          color="#727cf5"
                          class="filter font-nunito size-sub-2 checkbox ma-0"
                          hide-details
                          readonly
                          v-if="type.group.category.categoryName.toLowerCase() !== 'nhà nguyên căn'"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="9" class="d-flex flex-column mt-3">
                        <span class="field-name font-weight-medium">Địa chỉ cho thuê </span>
                        <v-textarea
                          class="size-sub-2 font-nunito"
                          solo
                          dense
                          light
                          readonly
                          rows="2"
                          row-height="20"
                          auto-grow
                          v-model="getAddress"
                        />
                      </v-col>
                      <v-col cols="3" class="d-flex flex-column mt-3">
                        <span class="field-name font-weight-medium d-flex align-center font-nunito"
                          >Số tiền cọc giữ phòng
                        </span>
                        <v-text-field
                          dense
                          label="Giá tiền"
                          class="py-0 form size-sub-2 font-nunito my-0"
                          solo
                          readonly
                          v-model="getDownpayment"
                          suffix="VNĐ"
                        />
                      </v-col>
                      <v-col cols="11" class="d-flex pt-0 pb-0">
                        <span class="field-name mt-1">Khung giờ đóng cửa</span>
                        <div class="d-flex ml-5 justify-center">
                          <v-text-field
                            dense
                            class="py-0 form size-sub-2 font-nunito my-0"
                            style="width: 130px !important"
                            solo
                            readonly
                            value="Tự do"
                            v-if="type.group.curfewTime === null"
                          />
                        </div>
                        <div class="d-flex ml-auto" v-if="type.group.curfewTime !== null">
                          <div class="pt-0 d-flex flex-row mr-2">
                            <span class="field-name mt-2 mr-3">Mở cửa</span>
                            <v-text-field
                              dense
                              label="Mở cửa"
                              class="py-0 form size-sub-2 font-nunito my-0"
                              style="width: 130px !important"
                              solo
                              readonly
                              v-model="getStartTime"
                            />
                          </div>
                          <div cols="4" class="pt-0 d-flex flex-row ml-2">
                            <span class="field-name mt-2 mr-3">Đóng cửa</span>
                            <v-text-field
                              dense
                              label="Đóng cửa"
                              class="py-0 form size-sub-2 font-nunito my-0"
                              style="width: 130px !important"
                              solo
                              readonly
                              v-model="getEndTime"
                            />
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" class="py-0" v-if="type.group.regulations.length > 0">
                        <span class="field-name font-weight-medium">Nội quy </span>
                        <v-card class="d-flex flex-wrap py-3 mt-3">
                          <div
                            v-for="(item, index) in type.group.regulations"
                            v-bind:key="index"
                            class="font-nunito size-sub-3 mx-1 mb-2 py-1 d-flex align-center"
                            style="
                              border-radius: 1rem;
                              border: 1px solid #cccccc;
                              text-align: center;
                              position: relative;
                            "
                          >
                            <div>
                              <span class="mx-2">{{ item.regulationName }}</span>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                      <v-col cols="12" class="py-0" v-if="type.group.regulations.length === 0">
                        <span class="field-name font-weight-medium">Nội quy </span>
                        <v-card class="d-flex justify-center py-3 mt-3">
                          Không có nội quy
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
            <!-- Loại phòng -->
            <v-tab-item>
              <v-card
                class="overflow-y-auto d-flex flex-column pt-1 pb-3 px-16 my-0"
                max-height="430"
                min-height="430"
                style="box-shadow: none !important"
                v-bind:style="
                  type.group.category.categoryName.toLowerCase() !== 'nhà nguyên căn'
                    ? 'background-color: #f1f3fa;'
                    : 'background-color: #fff;'
                "
              >
                <WholeHouseViewCategory
                  :type="type"
                  v-if="type.group.category.categoryName.toLowerCase() === 'nhà nguyên căn'"
                />
                <HostelRoomViewCategory
                  :type="type"
                  v-if="type.group.category.categoryName.toLowerCase() === 'nhà cho thuê phòng'"
                />
                <HostelBedViewCategory
                  :type="type"
                  v-if="type.group.category.categoryName.toLowerCase() === 'ký túc xá'"
                />
              </v-card>
            </v-tab-item>
            <!-- dịch vụ -->
            <v-tab-item>
              <v-card flat>
                <div class="d-flex flex-column">
                  <v-row
                    class="mx-0 mt-4 pr-4"
                    style="
                      border-bottom: 2px solid #eef2f7;
                      border-top: 2px solid #eef2f7;
                      border-left: 2px solid #eef2f7;
                      border-right: 2px solid #eef2f7;
                      max-height: 50px !important;
                      min-height: 50px !important;
                    "
                  >
                    <v-col
                      cols="1"
                      class="d-flex pa-0 align-center justify-center"
                      style="border-right: 1px solid #eef2f7"
                    >
                      <span
                        class="font-nunito text-black size-sub-3 d-flex flex-column justify-center align-center"
                        >Bắt buộc
                      </span>
                    </v-col>
                    <v-col
                      cols="1"
                      class="d-flex pa-0 align-center justify-center"
                      style="border-right: 1px solid #eef2f7"
                    >
                      <span
                        class="font-nunito text-black size-sub-3 d-flex flex-column justify-center align-center"
                        style="width: 50%"
                        >STT
                      </span>
                    </v-col>
                    <v-col
                      cols="3"
                      class="d-flex py-0 align-center justify-center"
                      style="border-right: 1px solid #eef2f7"
                    >
                      <span class="font-nunito text-black size-sub-3">Tên</span>
                    </v-col>
                    <v-col
                      cols="5"
                      class="d-flex py-0 align-center justify-center"
                      style="border-right: 1px solid #eef2f7"
                    >
                      <span class="font-nunito text-black size-sub-3">Giá</span>
                    </v-col>
                    <v-col
                      cols="2"
                      class="d-flex py-0 align-center justify-center"
                    >
                      <span class="font-nunito text-black size-sub-3">Tần suất</span>
                    </v-col>
                  </v-row>
                  <v-card
                    max-height="260"
                    v-if="type.group.services.length > 0"
                    class="overflow-y-auto d-flex flex-column"
                  >
                    <div
                      :key="index"
                      v-for="(item, index) in type.group.services"
                      class="px-0 d-flex justify-start align-start"
                    >
                      <v-row
                        class="mx-0 pa-0 service-item cursor"
                        style="border-bottom: 1px solid #eef2f7"
                      >
                        <v-col
                          cols="1"
                          class="d-flex justify-center align-center pa-0"
                          style="border-right: 1px solid #eef2f7; border-left: 1px solid #eef2f7"
                        >
                          <v-checkbox
                            v-model="item.required"
                            color="#727cf5"
                            hide-details
                            readonly
                            class="filter my-0 pl-7 d-flex align-center"
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          cols="1"
                          class="d-flex justify-center align-center pa-0"
                          style="border-right: 1px solid #eef2f7; border-left: 1px solid #eef2f7"
                        >
                          <span
                            class="font-nunito text-gray size-sub-3 d-flex flex-column justify-center align-center"
                            style="width: 40%"
                            >{{ index + 1 }}
                          </span>
                        </v-col>
                        <v-col
                          cols="3"
                          class="d-flex align-start py-2"
                          style="border-right: 1px solid #eef2f7"
                        >
                          <span
                            class="font-nunito text-gray size-sub-3 my-auto">{{ item.serviceName }}</span
                          >
                        </v-col>
                        <v-col
                          cols="5"
                          class="d-flex flex-column py-2 align-start justify-start"
                          style="border-right: 1px solid #eef2f7"
                        >
                            <span
                                class="font-nunito text-gray size-sub-3 d-flex flex-column justify-center align-center"
                                v-if="item.price !== -1"
                                >{{ item.price }} {{item.priceUnit}} {{item.userUnit}}
                            </span>
                            <span
                                class="font-nunito text-gray size-sub-3 d-flex flex-column justify-center align-center"
                                v-else
                                >Nhà nước
                            </span>
                        </v-col>
                        <v-col
                          cols="2"
                          class="d-flex py-2 align-start justify-center"
                          style="border-right: 1px solid #eef2f7"
                        >
                          <span
                                class="font-nunito text-gray size-sub-3 d-flex flex-column justify-center align-center"
                                >{{ item.timeUnit }}
                            </span>
                        </v-col>
                    </v-row>
                  </div>
                  </v-card>
                  <span
                    v-else
                    style="
                      border: 2px dashed #dee2e6;
                      border-bottom-right-radius: 6px;
                      border-top: 0px;
                      border-bottom-left-radius: 6px;
                      text-align: center;
                    "
                    class="pa-5 font-nunito text-primary size9rem"
                    >Không có dịch vụ nào</span
                  >
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-divider></v-divider>
          <div class="d-flex px-4 py-3">
            <v-spacer></v-spacer>
            <v-btn class="btn btn-primary font-nunito mx-2"> Kích hoạt </v-btn>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
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
import WholeHouseViewCategory from '@/views/admin/WholeHouseViewCategory.vue';
import HostelRoomViewCategory from '@/views/admin/HostelRoomViewCategory.vue';
import HostelBedViewCategory from '@/views/admin/HostelBedViewCategory.vue';

export default {
  name: 'HostelItem',
  props: { type: Object, index: Number },
  components: {
    WholeHouseViewCategory,
    HostelRoomViewCategory,
    HostelBedViewCategory,
  },
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
    getAddress() {
      // eslint-disable-next-line
      return `${this.type.group.buildingNo} ${this.type.group.address.streetName}, ${this.type.group.address.wardName}, ${this.type.group.address.districtName}, ${this.type.group.address.provinceName}`;
    },
    getDownpayment() {
      if (`${this.type.group.downPayment}`.includes('.')) {
        const string = `${this.type.group.downPayment}`.split('.');
        const a = Math.floor(string[0]);
        const b = Math.floor(string[1]);
        if (a === 0) {
          if (b / 10 > 0) {
            const b2 = b % 10;
            const b1 = (b - b2) / 10;
            if (b1 === 0) {
              return `${b2}00.000`;
            }
            return `${b2}${b1}0.000`;
          }
          return `${b}00.000`;
        }
        return `${a}.${b}00.000`;
      }
      if (!`${this.type.group.downPayment}`.includes('.') && this.type.group.downPayment !== 0) {
        return `${this.type.group.downPayment}.000.000`;
      }
      return this.type.group.downPayment;

      //   if ((`${this.type.group.downPayment}`).include('.') && string[0] === 0) {
      //     return `${string[1]} trăm`;
      //   }
      //   if ((`${this.type.group.downPayment}`).include('.') && string[0] !== 0) {
      //     return `${string[0]} triệu ${string[1]}`;
      //   }
      //   if (!(`${this.type.group.downPayment}`).include('.')) {
      //     return `${this.type.group.downPayment} triệu`;
      //   }
      //   return null;
    },

    getStartTime() {
      if (this.type.group.curfewTime !== null) {
        return this.type.group.curfewTime.split('-')[0];
      }
      return null;
    },

    getEndTime() {
      if (this.type.group.curfewTime !== null) {
        return this.type.group.curfewTime.split('-')[1];
      }
      return null;
    },
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
/* .light.v-input textarea {
    color: #6c757d !important;
} */
</style>
<style scoped>
.v-application a:hover {
  color: #fff !important;
}
</style>
