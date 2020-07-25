<template>
  <v-card v-if="!isLoadingContracts">
    <div
      style="font-size:20px; fontWeight:bold"
      class="pt-3 pl-2 pb-6"
    >
      Các phòng sắp hết hạn hợp đồng
    </div>
    <v-list two-line>
      <template v-for="(item, index) in contracts">
        <v-divider
          v-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>
        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-content>
            <v-list-item-title style="color:#1F17FF; fontSize:18px">
              {{ item.group.groupName }}</v-list-item-title>
            <v-list-item-subtitle
              v-html="item.group.street"
              class="pb-1"
            ></v-list-item-subtitle>
            <div
              class="d-flex justify-space-between mt-5"
              v-for="room in item.rooms"
              :key="room"
            >
              <div style="fontWeight:bold">{{room.roomName}}</div>
              <div style="fontWeight:bold">{{room.time}}</div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-card-text
      style="color:#818286"
      class="d-flex justify-end"
    >Xem thêm >></v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SuggestContract',
  components: {
  },
  methods: {
    ...mapActions({
      getContracts: 'user/getContracts',
    }),
  },
  computed: {
    contracts() {
      return this.$store.state.user.contracts.data;
    },
    isLoadingContracts() {
      return this.$store.state.user.contracts.isLoading;
    },
  },
  created() {
    this.getContracts();
  },
  data: () => ({
    items: [
      {
        title: 'Nhà trọ Lalahome',
        subtitle: '1426/33 Nguyễn Duy Trinh, Long Trường Quận 9',
        rooms: [
          { roomName: 'B6', time: '08/2020' },
          { roomName: 'B10', time: '09/2020' },
          { roomName: 'A1', time: '12/2020' },
        ],
      },
      { divider: true, inset: true },
      {
        title: 'Nhà trọ Lalahome',
        subtitle: '1426/33 Nguyễn Duy Trinh, Long Trường Quận 9',
        rooms: [
          { roomName: 'B6', time: '08/2020' },
          { roomName: 'B10', time: '09/2020' },
          { roomName: 'A1', time: '12/2020' },
        ],
      },
      { divider: true, inset: true },
    ],

  }),
};
</script>
