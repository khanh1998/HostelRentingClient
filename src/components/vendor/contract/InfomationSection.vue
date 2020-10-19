<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-row no-gutters>
            <v-col cols="6">
              <v-card-text>
                <v-container>
                  <h1>BÊN A: BÊN CHO THUÊ</h1>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Ông/Bà"
                        :value="vendor.username"
                        required
                        readonly
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Năm sinh"
                        :value="vendor.yearOfBirth"
                        dense
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Số CMND"
                        persistent-hint
                        required
                        readonly
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Ngày cấp"
                        dense
                        required
                        readonly
                        :value="new Date(vendor.idIssuedDate)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Nơi cấp"
                        dense
                        required
                        readonly
                        :value="vendor.idIssuedLocation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea rows="2" readonly dense :value="vendor.householdAddress">
                        <template v-slot:label>
                          <div>
                            Hộ khẩu
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea rows="2" readonly dense :value="vendor.currentAddress">
                        <template v-slot:label>
                          <div>
                            Địa chỉ
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    <v-col cols="12" sm="8" md="4">
                      <v-text-field
                        label="Điện thoại"
                        dense
                        :value="vendor.phone"
                        required
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-card-text>
                <v-container>
                  <h1>BÊN B: BÊN THUÊ</h1>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Ông/Bà"
                        :value="renter.username"
                        dense
                        required
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Năm sinh"
                        :value="renter.yearOfBirth"
                        dense
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Số CMND"
                        dense
                        persistent-hint
                        required
                        readonly
                        :value="renter.idNum"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Ngày cấp"
                        dense
                        required
                        readonly
                        :value="new Date(renter.idIssuedDate)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Nơi cấp"
                        dense
                        required
                        readonly
                        :value="renter.idIssuedLocation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea rows="2" readonly dense :value="renter.householdAddress">
                        <template v-slot:label>
                          <div>
                            Hộ khẩu
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea rows="2" readonly dense :value="renter.currentAddress">
                        <template v-slot:label>
                          <div>
                            Địa chỉ
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    <v-col cols="12" sm="8" md="4">
                      <v-text-field
                        label="Điện thoại"
                        :value="vendor.phone"
                        required
                        readonly
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="4">
                      <v-text-field
                        dense
                        label="Trường đại học (đã và đang học)"
                        :value="renter.school.schoolName"
                        required
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        dense
                        :value="renter.school.address.districtName"
                        rows="2"
                        readonly
                      >
                        <template v-slot:label>
                          <div>
                            Địa chỉ trường
                          </div>
                        </template>
                      </v-textarea>
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
  methods: {},
  created() {},
};
</script>
