<template>
  <v-sheet>
    <v-row no-gutters>
      <v-col cols="5" md="3" class="d-flex justify-space-between">
        <div class="d-flex flex-column align-center justify-center pt-2 pl-4 pb-2">
          <v-avatar size="100">
            <v-img src="../../assets/suzy-avatar.jpg"></v-img>
          </v-avatar>
          <p class="font-weight-medium">Nhà trọ Lalahome</p>
          <div class="d-flex align-center">
            <v-icon color="yellow" small>fas fa-star</v-icon>
            <p class="mb-0">4.5/5 (30)</p>
          </div>
          <p class="blue--text">0378.034.064</p>
          <v-btn rounded outlined dark color="red">BÁO CÁO</v-btn>
        </div>
        <v-divider vertical class="mr-4"/>
      </v-col>
      <v-col cols="7" md="6">
        <div class="pa-1">
          <p class="indigo--text font-weight-medium text-h6">
            Phòng trọ mới xây 100%, full nội thất
          </p>
          <p>
            <span class="grey--text">Giá thuê</span>
            <span class="blue--text">3.000.000 đ</span>
            <span class="font-italic">(đã trả giá)</span>
          </p>
          <p class="grey--text font-italic">
            1426/39 Nguyễn Duy Trinh, Long Trường, Bình Thạnh, HCM
          </p>
          <v-btn color="success" outlined>
            <v-icon class="mr-1">near_me</v-icon>Bản đồ
          </v-btn>
        </div>
        <v-divider vertical inset light />
      </v-col>
      <v-col cols="12" md="3">
        <v-sheet color="blue">
          <v-row no-gutters justify="center">
            <v-col cols="3" md="7">
              <p class="font-weight-bold text-h1 white--text mb-0">26</p>
            </v-col>
            <v-col cols="2" md="5" class="d-flex align-center justify-center">
              <div>
                <p class="white--text font-weight-bold">tháng 7</p>
                <p class="white--text font-weight-bold">2020</p>
              </div>
            </v-col>
            <v-col cols="2" md="12" class="d-flex align-center justify-center">
              <p class="font-weight-bold">13h - 14h</p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6"></v-col>
          </v-row>
        </v-sheet>
        <v-row align-content="center">
          <v-col>
            <v-btn color="red" outlined>XEM CHI TIẾT</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'BookingItem',
};
</script>
