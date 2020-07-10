<template>
  <v-sheet>
    <v-row>
      <v-col cols="3">
        <div class="d-flex flex-column align-center justify-center">
          <v-avatar size="100">
            <v-img src="../../assets/suzy-avatar.jpg">
            </v-img>
          </v-avatar>
          <p class="font-weight-medium">Nhà trọ Lalahome</p>
          <div class="d-flex align-center">
            <v-icon color="yellow" small>fas fa-star</v-icon>
            <p class="mb-0">4.5/5 (30)</p>
          </div>
          <p class="blue--text">0378.034.064</p>
          <v-btn rounded outlined dark color="red">BÁO CÁO</v-btn>
        </div>
      </v-col>
      <v-divider vertical inset light/>
      <v-col cols="6">
      </v-col>
      <v-col cols="3">
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
