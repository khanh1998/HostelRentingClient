<template>
  <div class="mt-2">
    <v-card
      width="100%"
      class="d-flex flex-row justify-start align-center pa-2"
    >
      <div class="d-flex flex-nowrap align-center">
        <v-avatar>
          <v-img src="@/assets/suzy-avatar.jpg"></v-img>
        </v-avatar>
        <p class="font-weight-medium mb-0 ml-2">HyunA</p>
      </div>
    </v-card>
    <v-sheet class="message mt-3 rounded-l">
      <v-virtual-scroll
        :items="items"
        :item-height="100"
        height="670"
      >
        <template v-slot="{ item }">
          <div class="pa-3">
            <div
              v-if="item.renter"
              class="d-flex justify-start"
            >
              <v-card width="400">
                <p>{{ item.message }}</p>
              </v-card>
            </div>
            <div
              v-if="!item.renter"
              class="d-flex justify-end"
            >
              <v-card width="400">
                <p>{{ item.message }}</p>
              </v-card>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </v-sheet>
    <div class="mt-3 d-flex">
        <v-textarea
          v-model="inputChat.model"
          :auto-grow="inputChat.autoGrow"
          :clearable="inputChat.clearable"
          :filled="inputChat.filled"
          :loading="inputChat.loading"
          :no-resize="inputChat.noResize"
          :outlined="inputChat.outlined"
          :row-height="inputChat.rowHeight"
          :rows="inputChat.rows"
          :single-line="inputChat.singleLine"
          :solo="inputChat.solo"
          class="mr-3"
        ></v-textarea>
        <!-- <div class="mt-12 text-center">
          Value: {{ inputChat.model }}
        </div> -->
        <v-btn
          color="#7794F8"
          x-large
          @click="sendMessage"
        >
          <v-icon color="#FFFFFF">fa fa-paper-plane</v-icon>
        </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  data: () => ({
    items: [
      {
        renter: true,
        message: 'Check tin nhắn chờ của Phương nha Hoàng THoàng Tuấn Kiên',
      },
      {
        renter: false,
        message: 'Mua dùm mình con này với giá min rồi đang cần tiền xây lại đội hình...mình cám ơn',
      },
      {
        renter: true,
        message: 'Đề nghị nên tính điểm Skill qua người để tăng hấp dẫn chứ toàn mấy bố tự dốc bóng xong sút lấy sút để k chuyền :))',
      },
      {
        renter: false,
        message: 'Bạn nào đang muốn tìm một nha khoa để gắn bó lâu dài thì tham khảo Vincos nha, các bác sĩ rất nhiệt tình và nhẹ nhàng ạ, vào đây nè:',
      },
      {
        renter: true,
        message: 'Chỉnh lại cái 2light cuối trận đi ngta cày chay nên treo game giờ có cái đó phải ngồi canh để tắt ạ :((',
      },
      {
        renter: false,
        message: 'Này vừa đọc truyện xong chỉ đọc đến 1 đoạn ngưng vì truyện éo sub ra nữa mà đọc bản eng thì lm biếng dịch từng trang ',
      },
    ],
    inputChat: {
      autoGrow: true,
      autofocus: true,
      clearable: true,
      filled: true,
      loading: false,
      model: '',
      noResize: true,
      outlined: true,
      rowHeight: 24,
      rows: 1,
      singleLine: true,
      solo: true,
    },
  }),
  methods: {
    sendMessage() {
      if (this.inputChat.model.length > 0) {
        this.items.push({
          renter: false,
          message: this.inputChat.model,
        });
        this.inputChat.model = '';
      }
    },
  },
};
</script>
<style>
</style>
