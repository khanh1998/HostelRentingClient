<template>
  <v-row class="ma-0">
    <v-row class="white my-5">
      <v-col cols="12" class="py-0">
        <v-row class="ma-0">
          <v-col cols="8">
            <v-row no-gutters>
              <v-col cols="6" class="d-flex flex-column pb-0">
                <span class="field-name font-weight-medium">Diện tích nhà nguyên căn</span>
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
              <v-col cols="3" class="d-flex flex-column pb-0">
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
              <v-col cols="3" class="d-flex flex-column pb-0">
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
              <v-col cols="12" class="pt-0">
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
            </v-row>
          </v-col>
          <v-col cols="4" class="d-flex flex-column">
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
                    style="
                      border: 1px solid #f1f3fa;
                      border-radius: 6px;
                      max-width: 220px !important;
                    "
                  >
                    <v-carousel-item
                      v-for="(image, i) in type.imageUrls"
                      :key="i"
                      :src="image.resourceUrl"
                    >
                    </v-carousel-item>
                  </v-carousel>
                  <span class="d-flex justify-center ml-8 mt-10" v-if="type.imageUrls.length === 0">
                    Không có ảnh</span
                  >
                </v-row>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-row class="d-flex flex-wrap ma-0" v-if="getRooms.length > 0">
          <v-col cols="4" :key="index" v-for="(item, index) in getRooms">
            <v-row class="ma-0">
              <v-col cols="12" class="d-flex pb-0">
                <v-row class="ma-0">
                  <span class="font-nunito text-primary size9rem font-weight-bold mt-auto"
                    >Loại phòng:</span
                  >
                  <v-col cols="8" class="d-flex flex-column pa-0 ml-auto">
                    <v-text-field
                      class="size-sub form font-nunito"
                      color="#727cf5"
                      solo
                      dense
                      light
                      v-model="item.roomName"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="d-flex">
                <v-row class="ma-0">
                  <span class="field-name mt-4">Số lượng:</span>
                  <v-col cols="8" class="d-flex pa-0 ml-auto">
                    <v-text-field
                      class="size-sub form font-nunito"
                      color="#727cf5"
                      solo
                      dense
                      light
                      v-model="item.roomQuantity"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="getRooms.length === 0" class="pt-0 pb-2 pl-6">
        <v-card
          class="overflow-y-auto px-2 d-flex justify-center"
          min-height="100"
          max-height="270"
          style="box-shadow: none !important; border: thin solid rgba(0, 0, 0, 0.12)"
        >
          <span class="mt-8">Không có phòng</span>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: 'WholeHouseViewCategory',
  props: { type: Object },
  data: () => ({
    rooms: [],
    room: {
      roomQuantity: null,
      roomName: null,
    },
  }),
  computed: {
    getRooms() {
      const roomAndNum = this.type.description.split('|');
      roomAndNum.forEach((element) => {
        if (element.trim() !== '') {
          const temp = element.split(/(\d+)/);
          // eslint-disable-next-line prefer-destructuring
          const roomQuantity = temp[1];
          // eslint-disable-next-line prefer-destructuring
          const roomName = temp[2];
          this.rooms.push({ roomQuantity, roomName });
        }
      });
      console.log(this.rooms);
      return this.rooms;
    },
  },
  methods: {},
};
</script>

<style></style>
