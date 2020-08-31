<template>
  <!-- eslint-disable max-len -->
  <div class="d-flex" style="border-bottom: 1px dashed rgba(0, 0, 0, 0.1);">
    <v-avatar height="45" width="45">
      <v-img max-height="45" max-width="45" src="../../assets/home/thumnail.png" />
    </v-avatar>
    <div class="ml-5">
      <span class="text-subtitle-2">Võ Thị Kim Thùy</span>
      <v-rating
        v-model="rate"
        color="yellow darken-3"
        background-color="grey darken-1"
        small
        class="pa-0 rating"
      ></v-rating>
      <span class="text-body-2 font-italic">
        Phòng trọ sạch sẽ, thoáng mát.
        An ninh tốt.
        Nhưng xung quanh còn ồn.
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RatingItem',
  data: () => ({
    rate: 4,
  }),
  props: {},
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
