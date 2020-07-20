<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!isLoading" style="background-color: #fff">
      <v-dialog width="350" v-model="chatBox.show">
        <chatBox v-on:close="chatBox.show=false" :info="info" :group="group"/>
      </v-dialog>
      <v-row no-gutters class="pt-2">
        <v-col cols="8">
          <p class="text-h5 font-weight-medium">{{info.title}}</p>
          <p class="grey--text" v-if="!isLoadingProvinces">
            <v-icon>location_on</v-icon>
            {{group.street}},
            {{ward.wardName}},
            {{district.districtName}},
            {{province.provinceName}}
          </p>
        </v-col>
        <v-col cols="4">
          <div class="d-flex flex-column justify-end">
            <p
              class="font-weight-medium text-h5 blue--text text-center"
            >{{info.price}} {{info.priceUnit}}/tháng</p>
            <div class="d-flex align-center justify-center">
              <p class="font-weight-medium grey--text mr-3">
                <v-icon>crop</v-icon>
                {{info.superficiality}} m2
              </p>
              <p class="font-weight-medium grey--text">
                <v-icon>supervisor_account</v-icon>
                {{info.capacity}} người
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8" md="8" lg="8">
          <v-carousel
            cycle
            progress
            progress-color="red"
            height="300"
            delimiter-icon="mdi-circle-medium"
            next-icon="mdi-arrow-right-bold"
            prev-icon="mdi-arrow-left-bold"
          >
            <v-carousel-item
              v-for="(image, i) in images"
              :key="i"
              :src="images[i]"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4">
          <dateTimePickerBox
            :name="group.groupName"
            :rating="{average: 3.5, total: 30}"
            :groupId="group.groupId"
            v-on:openMessage="chatBox.show = true"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <p class="text-h5">Tiện nghi</p>
          <v-divider />
          <facilitiesBox :facilities="info.facilities"/>
        </v-col>
        <v-col cols="12" md="4">
          <p class="text-h5">Dịch vụ</p>
          <v-divider />
          <servicesBox :services="info.services"/>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex justify-space-between">
            <p class="text-h5">Tiện nghi xung quanh</p>
            <v-btn color="success" class="ml-1" depressed tile>
              <v-icon small>fas fa-map-signs</v-icon>Bản đồ
            </v-btn>
          </div>
          <v-divider />
          <treeView />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dateTimePickerBox from '@/components/hostel_type/dateTimePickerBox.vue';
import treeView from '@/components/hostel_type/treeView.vue';
import chatBox from '@/components/hostel_type/chatBox.vue';
import { mapActions } from 'vuex';
import facilitiesBox from '../../components/hostel_type/facilitiesBox.vue';
import servicesBox from '../../components/hostel_type/servicesBox.vue';

export default {
  name: 'HostelDetail',
  components: {
    dateTimePickerBox,
    servicesBox,
    treeView,
    chatBox,
    facilitiesBox,
  },
  data: () => ({
    chatBox: {
      show: false,
    },
  }),
  methods: {
    ...mapActions({
      getTypeAndGroup: 'renter/hostelType/getTypeAndGroup',
      getProvinces: 'renter/common/getProvinces',
    }),
  },
  computed: {
    typeId() {
      return this.$route.params.typeId;
    },
    ward() {
      const { wardId } = this.group;
      return this.$store.getters['renter/common/getWardById'](wardId);
    },
    district() {
      const { wardId } = this.group;
      return this.$store.getters['renter/common/getDistrictByWardId'](wardId);
    },
    province() {
      const { districtId } = this.district;
      return this.$store.getters['renter/common/getProvinceByDistrictId'](districtId);
    },
    images: {
      get() {
        if (this.info) {
          // return this.info.typeImages.map((obj) => obj.resourceUrl);
        }
        return [
          'https://tiendoduan.org/wp-content/uploads/2020/04/can-ho-mini-25m2.jpg',
        ];
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
    isLoadingProvinces() {
      return this.$store.state.renter.common.provinces.isLoading;
    },
    info() {
      let data = this.$store.getters['renter/home/getHostelTypeById'](
        this.typeId,
      );
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
    this.getProvinces();
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
}
</style>
