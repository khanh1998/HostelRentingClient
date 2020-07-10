<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="8" lg="8">
        <v-carousel
          cycle
          progress
          progress-color="red"
          height="400"
          delimiter-icon="mdi-circle-medium"
          next-icon="mdi-arrow-right-bold"
          prev-icon="mdi-arrow-left-bold">
          <v-carousel-item v-for="(image, i) in info.images" :key="i">
            <v-img max-height="400" v-bind:src="info.images[i]"/>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4">
        <dateTimePickerBox/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" lg="2" md="2" sm="2">
        <p class="text-h5 blue--text">{{info.price}} đ</p>
        <p class="text-caption">114 lượt xem</p>
      </v-col>
      <v-col cols="8" lg="4" md="6" sm="6">
        <p class="font-weight-bold">{{info.address}}</p>
        <p class="font-weight-medium grey--text">{{info.description}}</p>
      </v-col>
      <v-col cols="12" lg="2" md="4" sm="4">
        <div class="d-flex justify-center align-center" style="width: 100%; height: 100%">
          <v-btn
            color="orange"
            outlined
            >
            <v-icon class="mr-6">fas fa-comment-dots</v-icon> Nhắn tin ngay!
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2">
        <v-chip
          color="primary"
          outlined
          label
        >
          <v-icon left>fas fa-info-circle</v-icon>
          Thông tin phòng
        </v-chip>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-divider class="mb-6"/>
        <mainInfo v-bind:info="info"/>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <treeView/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import json from '@/assets/hostel-detail.json';
import dateTimePickerBox from '@/components/hostel_type/dateTimePickerBox.vue';
import mainInfo from '@/components/hostel_type/mainInfo.vue';
import treeView from '@/components/hostel_type/treeView.vue';

export default {
  name: 'HostelDetail',
  components: { dateTimePickerBox, mainInfo, treeView },
  data: () => ({
    info: null, // infomation of the hostel that being display
  }),
  methods: {},
  async created() {
    this.info = json;
  },
};
</script>
<style>
.info-card {
  width: 100%;
  height: 100%;
  border: 2.5px solid #EDEFEE;
  box-sizing: border-box;
  border-radius: 10px;
}
.above {
  width: 100%;
}
.below {
  width: 100%;
  background: #F3F5F5;
}
</style>
