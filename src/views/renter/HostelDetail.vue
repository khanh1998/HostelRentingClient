<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading">
      <v-dialog width="350" v-model="chatBox.show">
        <chatBox v-on:close="chatBox.show=false"/>
      </v-dialog>
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
            <v-carousel-item v-for="(image, i) in images" :key="i">
              <v-img max-height="400" v-bind:src="images[i]"/>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4">
          <dateTimePickerBox
            :name="group.groupName"
            :rating="{average: 3.5, total: 30}"
            :groupId="group.groupId"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="2" md="2" sm="2">
          <p class="text-h5 blue--text">{{info.price}} đ</p>
          <p class="text-caption">114 lượt xem</p>
        </v-col>
        <v-col cols="8" lg="4" md="6" sm="6">
          <p class="font-weight-bold">{{group.detailedAddress}}</p>
          <p class="font-weight-medium grey--text">{{'description'}}</p>
        </v-col>
        <v-col cols="12" lg="2" md="4" sm="4">
          <div class="d-flex justify-center align-center" style="width: 100%; height: 100%">
            <v-btn
              color="orange"
              outlined
              @click="chatBox.show=true"
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
          <mainInfo v-bind:info="info" :group="group"/>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <treeView/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dateTimePickerBox from '@/components/hostel_type/dateTimePickerBox.vue';
import mainInfo from '@/components/hostel_type/mainInfo.vue';
import treeView from '@/components/hostel_type/treeView.vue';
import chatBox from '@/components/hostel_type/chatBox.vue';
import { mapActions } from 'vuex';

export default {
  name: 'HostelDetail',
  components: {
    dateTimePickerBox,
    mainInfo,
    treeView,
    chatBox,
  },
  data: () => ({
    chatBox: {
      show: false,
    },
  }),
  methods: {
    ...mapActions({
      getTypeAndGroup: 'renter/hostelType/getTypeAndGroup',
    }),
  },
  computed: {
    typeId() {
      return this.$route.params.typeId;
    },
    images: {
      get() {
        if (this.info) {
          return this.info.typeImages.map((obj) => obj.resourceUrl);
        }
        return [];
      },
    },
    hostelTypes: {
      get() {
        return this.$store.state.renter.home.hostelTypes.data;
      },
    },
    isLoading() {
      if (this.info && this.group) {
        return false;
      }
      // return this.$store.getters['renter/hostelType/isLoading'];
      const type = this.$store.state.renter.hostelType.hostelType.isLoading;
      const group = this.$store.state.renter.hostelType.hostelGroup.isLoading;
      return type || group;
    },
    info() {
      let data = this.$store.getters['renter/home/getHostelTypeById'](this.typeId);
      if (data === null) {
        data = this.$store.state.renter.hostelType.hostelType.data;
      }
      return data;
    },
    group() {
      let data = null;
      if (this.info != null) {
        const { groupId } = this.info;
        data = this.$store.getters['renter/home/getHostelGroupById'](groupId);
      }
      if (data === null) {
        data = this.$store.state.renter.hostelType.hostelGroup.data;
      }
      return data;
    },
  },
  created() {
    this.getTypeAndGroup(this.typeId); // if home.js store is empty then start to call api
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
