<template>
  <!-- eslint-disable max-len -->
  <div class="d-flex align-center" style="border-bottom: 1px dashed rgba(0, 0, 0, 0.1);">
    <v-avatar max-height="30" max-width="30" min-width="30" min-height="30" color="#727cf5">
      <v-img
        max-height="30"
        max-width="30"
        min-width="30"
        min-height="30"
        :src="feedback.renter.avatar"
        v-if="feedback.renter.avatar"
      />
      <span v-else class="text-overline white--text">{{ getAvatarTitle(user.username) }}</span>
    </v-avatar>
    <div class="ml-5 d-flex flex-column">
      <v-rating
        _v-model="rate"
        color="yellow darken-3"
        background-color="grey darken-1"
        small
        readonly
        class="pa-0 rating"
        :value="feedback.rating"
      ></v-rating>
      <span>
        <span class="font-nunito font-weight-bold size-sub-2 text-primary"
          >{{ feedback.renter.username }}<span v-if="feedback.comment">:</span></span
        >
        <span class="font-nunito size-sub-2 ml-1">{{ feedback.comment }}</span>
      </span>
      <span class="text-caption font-nunito text-muted">{{
        getDateFormat(feedback.createdAt)
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RatingItem',
  data: () => ({
    rate: 4,
  }),
  props: { feedback: Object },
  methods: {
    getAvatarTitle(name) {
      return name.substring(name.lastIndexOf(' ') + 1).substring(0, 1);
    },
    getDateFormat(createdTime) {
      const date = new Date(createdTime).toLocaleDateString('vi-vn');
      const time = new Date(createdTime).toLocaleTimeString('vi-vn').substr(0, 5);
      return `${date}, ${time}`;
    },
  },
};
</script>
<style scoped>
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
</style>
