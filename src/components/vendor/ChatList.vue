<template>
  <v-card>
    <v-card flat>
      <v-toolbar
        color="#6C98C6"
        dark
        flat
      >
        <v-text-field
          class="mx-4 mt-3"
          flat
          hide-details
          label="Tìm kiếm"
          prepend-inner-icon="search"
          solo-inverted
        ></v-text-field>

        <template v-slot:extension>
          <v-tabs
            v-model="tabs.tabName"
            left
          >
            <v-tab
              v-for="(item, i) in tabs"
              :key="i"
            >
              <v-badge
                color="red"
                content="3"
              >
                {{item.tabName}}
              </v-badge>
            </v-tab>
          </v-tabs>
          <v-menu
            left
            :offset-y="true"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-filter</v-icon>
              </v-btn>
            </template>

            <v-list
              nav
              class="rounded-l"
            >
              <v-list-item-group
                v-model="item"
                color="primary"
              >
                <v-list-item
                  v-for="(item, i) in filter"
                  :key="i"
                  class=""
                >
                  <span
                    style="fontSize:16px"
                    class="py-1"
                  >
                    {{item.filterName}}
                  </span>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs.tabName">
        <v-tab-item>
          <v-card flat>
            <v-list
              :dense="dense"
              :two-line="twoLine"
              :nav="nav"
              :avatar="avatar"
              class="rounded-l"
              style="height: 705px"
            >
              <v-container
                id="scroll-target"
                style="max-height: 700px"
                class="overflow-y-auto"
              >
                <v-row
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
                      v-for="(item, i) in listMessageChange"
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
                        <div v-if="!item.bargain && !item.book">
                          <v-list-item-subtitle>{{item.message}}</v-list-item-subtitle>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-row>
              </v-container>
            </v-list>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            flat
            style="height:705px; max-height:705px"
          >
            <v-expansion-panels
              :accordion=true
              style="height:705px; max-height:705px; overflow-y:auto; position: initial"
            >
              <v-expansion-panel
                v-for="(item, i) in listDealChange"
                :key="i"
              >
                <v-expansion-panel-header>
                  <v-list-item-group color="primary">
                    <v-list-item>
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
                          <v-list-item-subtitle>Đã trả giá
                            <span style="color: #6C98C6">Nhà trọ Lalahome</span>
                            với giá {{ item.message}} triệu đồng</v-list-item-subtitle>
                          <v-list-item-action>
                            <v-row>
                              <v-dialog
                                v-model="dialogAccept"
                                width="350"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    color="#EF7239"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="width:90px; height:30px"
                                    class="mx-1"
                                  >
                                    Chấp nhận
                                  </v-btn>
                                </template>

                                <v-card>
                                  <v-card-title style="backgroundColor: #98B7D7; color: white">
                                    Xác nhận
                                  </v-card-title>

                                  <v-card-text
                                    class="text-center mt-3"
                                    style="fontSize:20px;"
                                  >
                                    Bạn sẽ chấp nhận trả giá này ?
                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="primary"
                                      text
                                      @click="acceptMessage"
                                    >
                                      Đồng ý
                                    </v-btn>
                                    <v-btn
                                      color="primary"
                                      text
                                      @click="dialogAccept = false"
                                    >
                                      Hủy
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog
                                v-model="dialogDeny"
                                width="350"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    color="#F3F3F3"
                                    v-bind="attrs"
                                    v-on="on"
                                    style="width:90px; height:30px"
                                    class="mx-1"
                                  >
                                    Từ chối
                                  </v-btn>
                                </template>

                                <v-card>
                                  <v-card-title style="backgroundColor: #98B7D7; color: white">
                                    Xác nhận
                                  </v-card-title>

                                  <v-card-text
                                    class="text-center mt-3"
                                    style="fontSize:20px;"
                                  >
                                    Bạn sẽ từ chối trả giá này ?
                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="primary"
                                      text
                                      @click="denyMessage"
                                    >
                                      Đồng ý
                                    </v-btn>
                                    <v-btn
                                      color="primary"
                                      text
                                      @click="dialogDeny = false"
                                    >
                                      Hủy
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-row>
                          </v-list-item-action>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-divider/>
                    <v-col cols="6" class="d-flex justify-center align-center">
                      <div style="fontSize:18px">
                        <span style="color:#98B7D7">Tên phòng:</span> <br />
                        <span>Nhà trọ Lalahome</span><br />
                        <span style="color:#98B7D7">Loại phòng:</span> <br />
                        <span>Ở ghép</span><br />
                      </div>
                    </v-col>
                    <v-col
                      cols="6"
                      class="d-flex justify-center align-center"
                    >
                      <div style="fontSize:18px">
                        <span style="color:#98B7D7">Giá gốc:</span> <br />
                        <span>4.3 triệu đồng</span><br />
                        <span style="color:#98B7D7">Trả giá:</span> <br />
                        <span>{{ item.message}} triệu đồng</span><br />
                      </div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script>
import firebase from '../../config/firebase';

const { store } = firebase;

export default {
  name: 'ChatList',
  props: {
    chatShow: Boolean,
    itemSelected: Object,
  },
  data() {
    return {
      tabs: [
        { tabName: 'Tin nhắn' },
        { tabName: 'Trả giá' },
      ],
      filter: [
        { filterName: 'Giá' },
        { filterName: 'Thời gian' },
      ],
      item: null,
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
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Bùi Quốc Khánh',
          message:
            '2.100.000',
          bargain: true,
          book: false,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Bùi Quốc Khánh',
          message:
            '2.100.000',
          bargain: true,
          book: false,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Bùi Quốc Khánh',
          message:
            '2.100.000',
          bargain: true,
          book: false,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Bùi Quốc Khánh',
          message:
            '2.100.000',
          bargain: true,
          book: false,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Bùi Quốc Khánh',
          message:
            '2.100.000',
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
      dialogAccept: false,
      dialogDeny: false,
    };
  },
  computed: {
    listDealChange() {
      return this.items.filter((items) => {
        if (items.bargain) {
          return true;
        }
        return false;
      });
    },
    listMessageChange() {
      return this.items.filter((items) => {
        if (!items.bargain && !items.book) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    acceptMessage() {
      // this.visible = true;
      this.dialogAccept = false;
      store.collection('chat').add({
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
      this.dialogDeny = false;
      store.collection('chat').add({
        renter: false,
        message: 'Từ chối trả giá của bạn',
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
