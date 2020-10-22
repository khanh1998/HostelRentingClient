<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-card-text>
                <v-container>
                  <span class="text-h6">BÊN A: BÊN CHO THUÊ</span>
                  <v-row class="mt-5">
                    <v-col cols="12" sm="6" md="6" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Ông (Bà): </span
                      ><span class="ml-2 text-gray-black">{{ vendor.username }}</span>
                    </v-col>
                    <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Năm sinh: </span
                      ><span class="ml-2 text-gray-black">{{ vendor.yearOfBirth }}</span>
                    </v-col>
                    <v-col cols="7" sm="12" md="12" class="d-flex pb-2">
                      <span class="font-weight-bold text-gray-black">Điện thoại: </span
                      ><span class="ml-2 text-gray-black">{{ vendor.phone }}</span>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">CMND số:</span
                      ><span class="ml-2 text-gray-black">{{ vendor.idNum }}</span>
                    </v-col>
                    <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Ngày cấp:</span
                      ><span class="ml-2 text-gray-black">{{
                        getIdNumber(vendor.idIssuedDate)
                      }}</span>
                    </v-col>
                    <v-col cols="7" sm="6" md="6" class="d-flex pb-2">
                      <span class="font-weight-bold text-gray-black">Nơi cấp:</span
                      ><span class="ml-2 text-gray-black">{{ vendor.idIssuedLocation }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Địa chỉ thường trú:</span
                      ><span class="ml-2 text-gray-black">{{ vendor.householdAddress }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Chỗ ở hiện nay:</span
                      ><span class="ml-2 text-gray-black">{{ vendor.currentAddress }}</span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <v-container>
                  <span class="text-h6">BÊN A: BÊN CHO THUÊ</span>
                  <v-row class="mt-5">
                    <v-col cols="12" sm="6" md="6" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Ông (Bà): </span
                      ><span class="ml-2 text-gray-black">{{ renter.username }}</span>
                    </v-col>
                    <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Năm sinh: </span
                      ><span class="ml-2 text-gray-black">{{ renter.yearOfBirth }}</span>
                    </v-col>
                    <v-col cols="7" sm="12" md="12" class="d-flex pb-2">
                      <span class="font-weight-bold text-gray-black">Điện thoại: </span
                      ><span class="ml-2 text-gray-black">{{ renter.phone }}</span>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">CMND số:</span
                      ><span class="ml-2 text-gray-black">{{ renter.idNum }}</span>
                    </v-col>
                    <v-col cols="5" sm="6" md="6" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Ngày cấp:</span
                      ><span class="ml-2 text-gray-black">{{
                        getIdNumber(renter.idIssuedDate)
                      }}</span>
                    </v-col>
                    <v-col cols="7" sm="6" md="6" class="d-flex pb-2">
                      <span class="font-weight-bold text-gray-black">Nơi cấp:</span
                      ><span class="ml-2 text-gray-black">{{ renter.idIssuedLocation }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex pb-0">
                      <span class="font-weight-bold text-gray-black">Địa chỉ thường trú:</span
                      ><span class="ml-2 text-gray-black">{{ renter.householdAddress }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex pb-2">
                      <span class="font-weight-bold text-gray-black">Chỗ ở hiện nay:</span
                      ><span class="ml-2 text-gray-black">{{ renter.currentAddress }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex pb-2">
                      <span class="font-weight-bold text-gray-black">Trường đã / đang học:</span
                      ><span class="ml-2 text-gray-black"
                        >{{ renter.school.schoolName }} -
                        {{ renter.school.address.districtName }}</span
                      >
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
export default {
  name: 'InfomationSection',
  props: ['vendor', 'renter'],
  data: () => ({}),
  computed: {},
  methods: {
    getIdNumber(time) {
      return new Date(time).toLocaleDateString('vi-vn');
    },
  },
  created() {},
};
</script>
