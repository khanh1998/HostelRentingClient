<template>
    <v-card>
      <v-card-title class="blue--text py-0 px-2">
          <v-icon color="blue">message</v-icon> Nhà trọ Lalahome
          <v-spacer/>
          <v-btn icon color="success">
            <v-icon>remove</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="$emit('close')">
            <v-icon>clear</v-icon>
          </v-btn>
      </v-card-title>
      <v-divider/>
      <div
        style="max-height: 200px"
        class="overflow-y-auto"
      >
        <v-list
          v-scroll.self="myOnScroll"
          align="center"
          justify="center"
        >
            <v-list-item v-for="item in items" v-bind:key="item.message">
              <v-list-item-content>
                <div
                  v-if="item.renter"
                  class="d-flex justify-end"
                >
                  <span
                    v-ripple
                    style="width: 250px"
                    class="blue lighten-5 pa-2 rounded max-w-3/4"
                  >
                    {{item.message}}
                  </span>
                </div>
                <div
                  v-if="!item.renter"
                  class="d-flex justify-start"
                >
                  <span
                    v-ripple
                    class="green lighten-5 pa-2 rounded max-w-3/4"
                  >
                    {{item.message}}
                  </span>
                </div>
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </div>
      <v-divider/>
      <div class="input">
        <div class="d-flex flex-no-wrap mt-1">
          <v-text-field
            autofocus
            clearable
            dense
            flat
            outlined
            placeholder="Nội dung tin nhắn..."
            v-model="inputChat.text"
            class="ma-1"
            hide-details
          >
          </v-text-field>
          <v-btn color="blue" class="ma-1" depressed>
            <v-icon color="white">
              far fa-paper-plane
            </v-icon>
          </v-btn>
        </div>
        <div class="d-flex flex-no-wrap pl-1">
          <v-chip-group>
            <v-chip color="amber">
              <v-icon color="white" class="mr-1">monetization_on</v-icon>
              Trả giá
            </v-chip>
            <v-chip color="green">
              <v-icon color="white" class="mr-1">schedule</v-icon>
              Đặt lịch
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </v-card>
</template>
<script>
export default {
  name: 'ChatBox',
  methods: {
    myOnScroll() {},
  },
  data: () => ({
    inputChat: {
      text: '',
    },
    items: [
      {
        renter: true,
        message: 'cái idea quay video lần trc chứ gì :)))',
      },
      {
        renter: false,
        message: 'Cám ơn bạn Minh Hà đã ghé thăm fanpage và chia sẻ thông tin nhé.',
      },
      {
        renter: true,
        message: 'chất như xôi gấc haha',
      },
      {
        renter: false,
        message: 'Chất như YoMost chứ sao ',
      },
      {
        renter: true,
        message: 'Khá mặn đến từ yomost',
      },
      {
        renter: false,
        message: 'Nếu thích đừng ngại share post của YoMost nha bạn Bình Dương ơi <3',
      },
      {
        renter: true,
        message: 'Cảm ơn bạn Trần Duy Khang đã tin dùng sản phẩm của YoMost nha <3',
      },
      {
        renter: false,
        message: 'Bạn Phua Sung ơi, nhanh chân đi đến cửa hàng gần nhất để "tậu" cho mình 1 hộp YoMost ngay nào. Đừng quên rủ thêm hội bạn để cùng nhau bùng nổ "Năng lượng YO!" nha bạn Phua Sung ơi <3',
      },
    ],
  }),
};
</script>
