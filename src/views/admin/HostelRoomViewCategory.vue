<template>
  <v-row class="ma-0">
    <v-row class="white my-5">
      <v-col cols="12" class="py-0">
        <v-row class="ma-0">
          <v-col cols="4" class="d-flex flex-column pb-0">
            <span class="field-name font-weight-medium">Tên nhóm phòng</span>
            <v-text-field
              class="size-sub-2 font-nunito form"
              solo
              dense
              light
              hide-details
              readonly
              v-model="type.title"
            />
          </v-col>
          <v-col cols="2" class="d-flex flex-column pb-0">
            <span class="field-name font-weight-medium">Giá thuê</span>
            <v-text-field
              class="size-sub form font-nunito"
              color="#727cf5"
              solo
              dense
              light
              readonly
              v-model="type.price"
              :suffix="type.priceUnit"
            />
          </v-col>
          <v-col cols="2" class="d-flex flex-column pb-0">
            <span class="field-name font-weight-medium">Diện tích</span>
            <v-text-field
              class="size-sub form font-nunito"
              type="number"
              color="#727cf5"
              solo
              dense
              light
              readonly
              v-model="type.superficiality"
              suffix="m2"
            />
          </v-col>
          <v-col cols="2" class="d-flex flex-column pb-0">
            <span class="field-name font-weight-medium">Sức chứa</span>
            <v-text-field
              class="size-sub form font-nunito"
              type="number"
              color="#727cf5"
              solo
              dense
              light
              readonly
              v-model="type.capacity"
              suffix="người"
            />
          </v-col>
          <v-col cols="2" class="d-flex flex-column pb-0">
            <span class="field-name font-weight-medium">Cọc thế chân</span>
            <v-text-field
              class="size-sub form font-nunito"
              type="number"
              color="#727cf5"
              solo
              dense
              light
              readonly
              v-model="type.deposit"
              suffix="tháng"
            />
          </v-col>
          <v-col cols="8" class="pt-0">
            <span class="field-name font-weight-medium">Tiện ích </span>
            <v-card class="d-flex flex-wrap py-3 mt-3" outlined>
              <div
                v-for="(item, index) in type.facilities"
                v-bind:key="index"
                class="font-nunito size-sub-3 mx-1 mb-2 py-1 d-flex align-center"
                style="
                  border-radius: 1rem;
                  border: 1px solid #cccccc;
                  text-align: center;
                  position: relative;
                "
              >
                <div>
                  <span class="mx-2">{{ item.facilityName }}</span>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="2" class="pr-0">
            <span class="field-name font-weight-medium">Tổng phòng </span>
            <v-text-field
              class="size-sub light-autocomplete font-nunito"
              color="#727cf5"
              outlined
              dense
              light
              readonly
              v-model="getTotalRoomNumber"
              style="
                border-top-right-radius: 0px !important;
                border-bottom-right-radius: 0px !important;
              "
            />
          </v-col>
          <v-col cols="2" class="px-0">
            <span class="field-name font-weight-medium">Phòng trống </span>
            <v-text-field
              class="size-sub light-autocomplete font-nunito"
              color="#727cf5"
              outlined
              dense
              light
            readonly
              v-model="getEmptyRoomNumber"
              style="border-radius: 0px !important"
            />
          </v-col>
          <!-- <v-col cols="3" class="px-0"> </v-col>
          <v-col cols="1" class="pb-0" v-if="type.rooms.length > 0"> </v-col>
          <v-col cols="3" class="pb-0" v-if="type.rooms.length > 0">
            <v-select
              v-model="newGroupValue.types[index].displayRoomStatus"
              :items="displayRooms"
              label="Hiển thị"
              dense
              hide-details
              outlined
              class="size-sub-2 font-nunito light-autocomplete"
              background-color="#f1f3fa"
            ></v-select>
          </v-col> -->
        </v-row>
      </v-col>
      <v-col cols="12" v-if="type.rooms.length > 0" class="pt-0 pb-2 pl-6">
        <v-card
          class="overflow-y-auto px-2"
          min-height="100"
          max-height="270"
          style="box-shadow: none !important; border: thin solid rgba(0, 0, 0, 0.12)"
        >
          <v-row class="ma-0">
            <v-col cols="4" :key="i" v-for="(item, i) in type.rooms">
              <v-card
                class="pt-4 pb-1 pl-2 pr-0 d-flex flex-column justify-center"
                style="border: 1px solid #e1e1e1"
                min-height="115"
              >
                <v-row class="d-flex align-start ma-0 pr-0">
                  <v-col cols="1">
                    <v-icon class="mr-2 mt-10">{{
                      item.available ? 'mdi-door-closed' : 'mdi-door-closed-lock'
                    }}</v-icon>
                  </v-col>
                  <v-col cols="10">
                    <span class="field-name font-weight-medium ml-2">Tên phòng</span>
                    <div class="d-flex flex-column ml-2 mt-2">
                      <v-text-field
                        class="size-sub-2 font-nunito form"
                        solo
                        label="Tên phòng"
                        dense
                        light
                        hide-details
                        v-model="item.roomName"
                      />
                    </div>
                  </v-col>
                </v-row>
                <v-row class="ma-0 d-flex justify-center mt-2">
                  <span class="field-name font-weight-bold" v-if="item.available"
                    >Phòng trống
                  </span>
                  <span class="field-name font-weight-medium" v-else>Đang thuê </span>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="type.rooms.length === 0" class="pt-0 pb-2 pl-6">
        <v-card
          class="overflow-y-auto px-2 d-flex justify-center"
          min-height="100"
          max-height="270"
          style="box-shadow: none !important; border: thin solid rgba(0, 0, 0, 0.12)"
        >
          <span class="mt-8">Không có phòng</span>
        </v-card>
      </v-col>
      <v-col cols="12" class="d-flex flex-column pb-5 pl-6">
        <v-card outlined min-height="220" max-height="220">
          <v-col cols="12" class="d-flex flex-column px-5">
            <span class="field-name font-weight-medium">Hình ảnh</span>
            <v-row class="px-3 pt-2">
              <v-carousel
                cycle
                height="115"
                delimiter-icon="mdi-circle-medium"
                hide-delimiter-background
                show-arrows-on-hover
                v-if="type.imageUrls.length !== 0"
                style="border: 1px solid #f1f3fa; border-radius: 6px; max-width: 220px !important"
              >
                <v-carousel-item
                  v-for="(image, i) in type.imageUrls"
                  :key="i"
                  :src="image.resourceUrl"
                >
                </v-carousel-item>
              </v-carousel>
              <v-card
                class="overflow-y-auto px-2 d-flex justify-center"
                min-height="100"
                max-height="270"
                v-if="type.imageUrls.length === 0"
                style="box-shadow: none !important; border: thin solid rgba(0, 0, 0, 0.12)"
              >
                <span class="mt-8">Không có ảnh</span>
              </v-card>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: 'HostelRoomViewCategory',
  props: { type: Object },
  data: () => ({}),
  computed: {
    getTotalRoomNumber() {
      return this.type.rooms.length;
    },
    getEmptyRoomNumber() {
      return this.type.rooms.filter((item) => item.available).length;
    },
  },
  methods: {},
};
</script>

<style></style>
