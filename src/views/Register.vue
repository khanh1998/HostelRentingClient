<template>
  <v-app>
    <v-main style="background-color: #fafbfe !important">
      <v-container class="fill-height">
        <v-row class="d-flex justify-center align-center">
          <v-col cols="11" xl="4" lg="4" sm="8" xs="11" md="6" class="flex pa-0">
            <v-card
              v-show="!vetify"
              style="width: 100%; box-shadow: 0 0 35px 0 rgba(154,161,171,.15) !important;"
              class="pb-4"
            >
              <div
                class="py-4"
                style="background-color: #727cf5!important; border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;"
              >
                <v-img
                  alt="Hostel Renting"
                  class="shrink"
                  contain
                  src="@/assets/logo2.png"
                  max-height="50"
                  _max-width="10%"
                />
              </div>
              <v-card-text class="d-flex flex-column">
                <span
                  class="align-self-center font-weight-bold font-nunito brow-text"
                  style="font-size: 1.125rem;"
                >ĐĂNG KÝ</span>
                <v-form class="pa-4 d-flex flex-column">
                  <v-text-field
                    class="register"
                    v-model="name"
                    solo
                    label="Nhập họ tên của bạn"
                    prepend-icon="mdi mdi-account-outline"
                    color="#727cf5"
                  ></v-text-field>
                  <v-text-field
                    class="register py-0"
                    v-model="password"
                    solo
                    label="Nhập mật khẩu"
                    prepend-icon="mdi mdi-shield-lock-outline"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPass ? 'text' : 'password'"
                    @click:append="showPass = !showPass"
                    color="#727cf5"
                  ></v-text-field>
                  <v-text-field
                    class="register py-0"
                    v-model="phone"
                    solo
                    label="Nhập số điện thoại"
                    prepend-icon="mdi mdi-phone"
                    color="#727cf5"
                  ></v-text-field>
                  <v-btn
                    min-width="100%"
                    class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 bt-primary-hover d-flex align-center"
                    @click="verifyPhoneNumber()"
                  >
                    <v-icon small class="mr-2">mdi mdi-account-arrow-right-outline</v-icon>Tiếp theo
                  </v-btn>
                </v-form>
                <span
                  class="font-nunito text-gray align-self-center mt-1"
                  style="font-size: 16px!important;"
                >Đăng ký bằng</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-center mt-n2">
                <v-btn outlined fab color="#39afd1" x-small class="register mx-2">
                  <v-icon small class="icon-phone">mdi mdi-phone</v-icon>
                </v-btn>
                <v-btn outlined fab color="#727cf5" x-small class="register mx-2">
                  <v-icon small class="icon-fb">mdi mdi-facebook</v-icon>
                </v-btn>
                <v-btn outlined fab color="#fa5c7c" x-small class="register mx-2">
                  <v-icon small class="icon-gmail">mdi mdi-google</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-text class="d-flex justify-center align-center py-0">
                <span class="text-muted">Đã có tài khoản?</span>
                <v-btn text link color="#727cf5" _height="100%">Đăng nhập</v-btn>
              </v-card-text>
            </v-card>
            <v-card
              v-show="vetify"
              style="width: 100%; box-shadow: 0 0 35px 0 rgba(154,161,171,.15) !important;"
              class="pb-4"
            >
              <div
                class="py-4"
                style="background-color: #727cf5!important; border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;"
              >
                <v-img
                  alt="Hostel Renting"
                  class="shrink"
                  contain
                  src="@/assets/logo2.png"
                  max-height="50"
                  _max-width="10%"
                />
              </div>
              <v-card-text class="d-flex flex-column px-10 py-4">
                <span
                  class="align-self-center font-weight-bold font-nunito brow-text mt-4"
                  style="font-size: 1.125rem;"
                >Nhập mã xác nhận</span>
                <span
                  class="font-nunito mt-3 align-self-center"
                  _style="font-size: 17px!important;"
                >Mã xác nhận được gửi qua số điện thoại</span>
                <span class="align-self-center text-body-1 font-nunito text-primary">0378034064</span>
                <v-form class="d-flex flex-column mt-3">
                  <v-text-field
                    class="register"
                    v-model="vetifyCode"
                    solo
                    label="Nhập mã xác nhận"
                    color="#727cf5"
                  ></v-text-field>
                  <span class="text-gray-dark font-nunito">
                    Gửi lại mã sau:
                    <span class="font-weight-bold">80</span>s
                  </span>
                  <div class="d-flex justify-space-between">
                    <v-btn
                      style="letter-spacing: 0.01rem !important"
                      class="pl-0"
                      text
                      link
                      color="#fa5c7c"
                    >Gửi lại mã xác nhận</v-btn>
                    <v-btn
                      @click="rollback()"
                      class="pr-0"
                      text
                      link
                      color="#727cf5"
                      style="letter-spacing: 0.01rem !important"
                    >Nhập lại số điện thoại</v-btn>
                  </div>
                  <v-btn
                    min-width="100%"
                    class="bg-primary white--text font-nunito align-self-center text-body-2 py-5 mt-5 bt-primary-hover d-flex align-center"
                  >XÁC NHẬN</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'register',
  data: () => ({
    vetify: false,
    name: '',
    password: '',
    phone: '',
    showPass: false,
    vetifyCode: '',
  }),
  methods: {
    verifyPhoneNumber() {
      this.vetify = true;
    },
    rollback() {
      this.vetify = false;
    },
  },
};
</script>
<style>
.brow-text {
  color: #6c757d;
}
.register .v-input__slot {
  border: 1px solid #dee2e6 !important;
  box-shadow: none !important;
  border-radius: 0.25rem;
  height: calc(2.25rem + 2px) !important;
  height: 30px !important;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6c757d;
}
.register.v-text-field.v-text-field--solo .v-label {
  color: #bfb9b9 !important;
  font-family: 'Nunito', sans-serif !important;
  font-weight: lighter !important;
}
.mdi-eye::before {
  font-size: 0.9rem !important;
}
.mdi-eye-off::before {
  font-size: 0.9rem !important;
}
.register.v-btn--outlined {
  border: 2px solid currentColor;
}
.icon-fb.v-icon:hover {
  color: #2b3af0 !important;
}
.icon-gmail.v-icon:hover {
  color: #f81240 !important;
}
.icon-phone.v-icon:hover {
  color: #247f9a !important;
}
</style>
