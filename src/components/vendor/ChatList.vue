<template>
  <div class="d-flex flex-column justify-center align-start">
    <v-card
      width="100%"
      class="d-flex flex-row justify-center align-center pa-2"
    >

      <v-badge
        color="red"
        content="6"
        bordered
        overlap
        class="mr-6"
      >
        <v-img
          :src="require('@/assets/notification.svg')"
          height="30"
          width="30"
        ></v-img>
      </v-badge>
      <div class="d-flex flex-nowrap align-center">
        <v-avatar>
          <v-img src="@/assets/suzy-avatar.jpg"></v-img>
        </v-avatar>
        <p class="font-weight-medium mb-0 ml-2">Bae Suzy</p>
      </div>
    </v-card>
    <v-card class="mt-3">
      <v-row no-gutters>
        <v-col cols="8">
          <v-text-field
            label="Tìm kiếm"
            solo
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="combobox.chooses"
            v-model="combobox.input.selected"
            item-text="name"
            item-value="name"
            @input='RefreshGrid'
            solo
          ></v-select>
        </v-col>

        <v-list
          :dense="dense"
          :two-line="twoLine"
          :nav="nav"
          :avatar="avatar"
          class="rounded-l"
          style="height: 670px"
        >
          <v-container
            id="scroll-target"
            style="max-height: 650px"
            class="overflow-y-auto"
          >
            <v-row
              v-scroll:#scroll-target="onScroll"
              align="center"
              justify="center"
            >
              <v-list-item-group
                v-model="item"
                color="primary"
              >
                <!-- <v-list-item
                  v-for="(item, i) in listChange"
                  :key="i"
                  class="mb-2 pt-2"
                  style="backgroundColor: #F2F2F2"
                  id = "item-list"
                  v-on:click="getItemSelected(item)"
                > -->
                <v-list-item
                  v-for="(item, i) in listChange"
                  :key="i"
                  class="mb-2 pt-2"
                  style="backgroundColor: #F2F2F2"
                  @click="$emit('clickedItem', getItemSelected(item))"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      style="fontSize:16px"
                      class="py-1"
                    >
                      {{item.title}}
                    </v-list-item-title>
                    <div v-if="item.bargain">
                      <v-row>
                        <v-col cols="4">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            height="100"
                            width="150"
                            class="mx-2 rounded-l"
                          ></v-img>
                        </v-col>
                        <v-col
                          cols="4"
                          class="d-flex justify-left align-center"
                        >
                          <div style="fontSize:18px">
                            <span style="color:#98B7D7">Giá gốc:</span> <br />
                            <span class="red--text"><s>3.000.000 Đ</s></span><br />
                            <span style="color:#98B7D7">Trả giá:</span> <br />
                            <span>{{ item.message}} Đ</span><br />
                          </div>
                        </v-col>
                        <v-col cols="4">
                          <v-list-item-action>
                            <v-row>
                              <v-chip
                                color="green"
                                @click="acceptMessage"
                                style="margin:10px"
                              >
                                Chấp nhận
                              </v-chip>
                              <v-chip
                                color="red"
                                @click="denyMessage"
                                style="width: 90px; margin:10px"
                                class="d-flex justify-center mr-5"
                              >
                                Từ chối
                              </v-chip>
                              <!-- <v-list-item-action>
                                  <v-btn icon>
                                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                                  </v-btn>
                                </v-list-item-action> -->
                            </v-row>
                          </v-list-item-action>
                        </v-col>
                      </v-row>
                      <v-col cols="12">
                        <span style="color: #6C98C6; fontSize:18px">
                          Nhà trọ Lalahome</span>
                      </v-col>
                    </div>
                    <div v-if="item.book">
                      <v-row>
                        <v-col cols="4">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            height="100"
                            width="150"
                            class="mx-2"
                          ></v-img>
                        </v-col>
                        <v-col
                          cols="4"
                          class="d-flex justify-left align-center"
                        >
                          <div style="fontSize:18px">
                            <span style="color:#98B7D7">Ngày hẹn:</span> <br />
                            <span>{{item.message.split("từ")[0]}}</span><br />
                            <span style="color:#98B7D7">Giờ hẹn:</span> <br />
                            <span>{{ item.message.split("từ")[1]}}</span><br />
                          </div>
                        </v-col>
                        <v-col cols="4">
                          <v-row>

                            <!-- <v-btn
                                color="red"
                                @click="denyBookMessage"
                                style="width: 90px"
                                class="d-flex justify-center mr-5"
                              >
                                Từ chối
                              </v-btn>
                              <v-btn
                                color="green"
                                @click="acceptBookMessage"
                              >
                                Chấp nhận
                              </v-btn> -->
                            <v-chip
                              color="green"
                              @click="acceptBookMessage"
                              style="margin:10px"
                            >
                              Chấp nhận
                            </v-chip>
                            <v-chip
                              color="red"
                              @click="denyBookMessage"
                              style="width: 90px; margin:10px"
                              class="d-flex justify-center mr-5"
                            >
                              Từ chối
                            </v-chip>
                          </v-row>

                        </v-col>
                      </v-row>
                      <v-col cols="12">
                        <span style="color: #6C98C6; fontSize:18px">
                          Nhà trọ Lalahome</span>
                      </v-col>
                    </div>
                    <div v-if="!item.bargain && !item.book">
                      <v-list-item-subtitle>{{item.message}}</v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-row>
          </v-container>
        </v-list>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import firebase from '../../config/firebase';

export default {
  name: 'ChatList',
  props: {
    chatShow: Boolean,
    itemSelected: Object,
  },
  data() {
    return {
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Bùi Quốc Khánh',
          message:
            '2.500.000',
          bargain: true,
          book: false,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Võ Thị Kim Trang',
          message:
            '21/ 6/ 2020 từ 15:30',
          bargain: false,
          book: true,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Trần Tiến Dực',
          message:
            'Phòng trọ ở đây có thể ở được hơn bốn người không ạ?',
          bargain: false,
          book: false,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Trần Tiến Duật',
          message:
            'Phòng trọ ở đây có thể ở được hơn bốn người không ạ?',
          bargain: false,
          book: false,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Trần Tiến Duật',
          message:
            'Phòng trọ ở đây có thể ở được hơn bốn người không ạ?',
          bargain: false,
          book: false,
        },

      ],
      dense: true,
      twoLine: true,
      nav: true,
      avatar: true,
      combobox: {
        input: {
          selected: 'Tất cả',
        },
        chooses: [
          {
            name: 'Tất cả',
          },
          {
            name: 'Trả giá',
          },
          {
            name: 'Đặt lịch',
          },
        ],
      },
      // itemGrid: [],
    };
  },
  computed: {
    listChange() {
      return this.items.filter((items) => {
        if (items.bargain && this.combobox.input.selected === 'Trả giá') {
          return true;
        }
        if (items.book && this.combobox.input.selected === 'Đặt lịch') {
          return true;
        }
        if (this.combobox.input.selected === 'Tất cả') {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    acceptMessage() {
      // this.visible = true;
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Chấp nhận trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });

      // this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },

    denyMessage() {
      // this.visible = true;
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Từ chối trả giá của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },

    acceptBookMessage() {
      // this.visible = true;
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Chấp nhận lịch hẹn của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },

    denyBookMessage() {
      // this.visible = true;
      firebase.firestore().collection('chat').add({
        renter: false,
        message: 'Từ chối lịch hẹn của bạn',
        bargain: true,
        booking: false,
        createdAt: new Date(),
      });
      this.$nextTick(() => this.scrollToBottom());
      // this.visible = false;
    },
    getItemSelected(selectedItem) {
      this.itemSelected = selectedItem;
      this.chatShow = true;
      alert(`Hello ${this.itemSelected.title} ${this.chatShow}!`);
    },
  },
};
</script>
<style>
.text-color {
  color: #0022d5;
  font-size: 18px;
}
</style>
