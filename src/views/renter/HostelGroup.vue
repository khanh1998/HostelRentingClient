<template>
  <!-- eslint-disable max-len -->
  <v-row no-gutters class="d-flex justify-center white">
    <v-col cols="12" md="10">
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-container>
        <v-row no-gutters class="my-5">
          <v-col
            cols="12"
            md="5"
            class="flex allSides align-center justify-center"
            :style="{backgroundColor: '#F3F4F9', height: '200px', borderRadius: '10px',}"
          >
            <v-row class="d-flex px-5 align-center red">
              <!-- <div class="d-flex flex-column align-center justify-center"> -->
              <v-col cols="3">
                <v-avatar class="allSides" height="90" width="90">
                  <v-img max-height="90" max-width="90" src="../../assets/home/thumnail.png"></v-img>
                </v-avatar>
                <!-- <v-btn
                  class="checked text-uppercase mt-n4 white--text"
                  depressed
                  x-small
                  color="primary"
                  style="border-radius: 2px;"
                >Xác thực</v-btn>-->
                <!-- <v-rating
                  v-model="rate"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  small
                  half-increments
                  class="pa-0 rating"
                ></v-rating>-->
                <!-- </div> -->
              </v-col>
              <v-col cols="9">
                <span
                  class="text-h6 font-weight-medium text-center font-nunito"
                  style="color: #222; word-wrap: break-word;"
                >{{ group.groupName }}</span>
                <div class="d-flex">
                  <!-- <v-icon color="yellow darken-3">mdi-star-outline</v-icon> -->
                  <!-- <v-icon small>mdi-star-outline</v-icon> -->
                  <!-- <span class="text-subtitle-2 grey--text">Đánh giá:</span> -->
                </div>
              </v-col>
            </v-row>
            <v-row class="black">
              <v-btn small class="ma-2 text-caption font-nunito" outlined color="indigo">
                <v-icon small>share</v-icon>Chia Sẽ
              </v-btn>
              <v-btn small class="ma-2 text-caption font-nunito" outlined color="indigo">
                <v-icon small>report_problem</v-icon>Báo Xấu
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" md="7">{{group.buildingNo}}</v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HostelGroup',
  components: {},
  data: () => ({
    rate: '3.5',
  }),
  methods: {
    ...mapActions({
      getHostelGroup: 'renter/hostelGroup/getHostelGroup',
    }),
  },
  computed: {
    isLoading() {
      const group = this.$store.state.renter.hostelGroup.hostelGroup.isLoading;
      return group;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    group() {
      let data = this.$store.getters['renter/home/getHostelGroupById'](this.groupId);
      if (data === null) {
        data = this.$store.state.renter.hostelGroup.hostelGroup.data;
      }
      return data;
    },
  },
  created() {
    // if home.js store is empty then start to call api
    this.getHostelGroup(this.groupId);
  },
};
</script>
<style scoped>
.info-card {
  width: 100%;
  height: 100%;
  border: 2.5px solid #edefee;
  box-sizing: border-box;
  border-radius: 10px;
}
.above {
  width: 100%;
}
.below {
  width: 100%;
  background: #f3f5f5;
  /* background: #f7f7f7; */
}
.font-nunito {
  font-family: 'Nunito', sans-serif !important;
}
.category {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: auto;
  max-width: 80%;
  padding: 8px 16px;
  background: rgba(32, 112, 185, 0.66);
  color: #fff;
  text-align: center;
  border-bottom-left-radius: 24px;
  box-sizing: border-box;
}
.line-before {
  height: 2px;
  background-color: #eee;
}
.line-after {
  height: 2px;
  background-color: #2c92d5;
}
.average-item {
  border: solid 1px #eeeeee;
}
.average-infor {
  background-color: #eeeeee;
}
.allSides {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  -o-box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}
.checked {
  z-index: 1;
}
</style>
