<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      item-key="typeName"
      hide-default-footer
      @page-count="pageCount = $event"
      sort-by="status"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="fontsize: 20px; color: #6c98c6">Loại phòng</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark fab small text class="mb-2" v-bind="attrs" v-on="on" color="#EF7239">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Hủy</v-btn>
                <v-btn color="blue darken-1" text @click="save">Lưu</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.typeName`]="{ item }">
        <div class="d-flex justify-space-between">
          <div>{{ item.typeName }}</div>
          <div>
            <v-icon color="green">mdi-check-circle</v-icon>
          </div>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-badge :content="6" class="ml-5" color="red lighten-2" overlap>
          <v-icon>mdi-calendar-month-outline</v-icon>
        </v-badge>
        <v-badge :content="6" class="ml-5" color="red lighten-2" overlap>
          <v-icon>mdi-cash-usd-outline</v-icon>
        </v-badge>
        <v-icon class="ml-5" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon class="ml-5" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col cols="2">
              <v-card-text style="fontsize: 20px" class="text-center"> Phòng trống </v-card-text>
            </v-col>
            <v-col cols="7" style="max-height: 100px; overflow-y: auto" class="mt-2" id="style-1">
              <v-chip
                class="ml-2 mt-2"
                color="green lighten-1"
                v-for="tag in item.roomEm"
                :key="tag"
              >
                <div v-if="tag.available">
                  {{ tag.roomName }}
                </div>
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-card-text style="fontsize: 20px" class="text-center"> Phòng đã thuê </v-card-text>
            </v-col>
            <v-col cols="7">
              <v-chip class="ml-2 mt-2" color="red lighten-2" v-for="tag in item.roomFu" :key="tag">
                <div v-if="!tag.available">
                  {{ tag.roomName }}
                </div>
              </v-chip>
            </v-col>
          </v-row>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="desserts">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount" color="#6C98C6"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HostelType',
  props: ['groups', 'groupId'],
  components: {},
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 8,
    search: '',
    dialog: false,
    singleExpand: true,
    expanded: [],
    tags: [
      'Phòng 401',
      'Phòng 402',
      'Phòng 403',
      'Phòng 404',
      'Phòng 405',
      'Phòng 406',
      'Phòng 407',
      'Phòng 407',
      'Phòng 407',
      'Phòng 407',
      'Phòng 407',
      'Phòng 407',
      'Phòng 407',
      'Phòng 407',
      'Phòng 407',
    ],
    headers: [
      {
        text: 'Tên loại phòng',
        align: 'start',
        sortable: false,
        value: 'typeName',
      },
      { text: 'Diện tích (m²)', value: 'superficiality' },
      { text: 'Người', value: 'capacity' },
      { text: 'Giá tiền', value: 'price' },
      { text: 'Trạng thái', value: 'status', sortable: false },
      { value: 'actions', sortable: false },
      { value: 'data-table-expand', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      typeName: '',
      superficiality: 0,
      capacity: 0,
      price: 0,
      status: '',
    },
    defaultItem: {
      typeName: '',
      superficiality: 0,
      capacity: 0,
      price: 0,
      status: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Tạo mới phòng trọ' : 'Cập nhật thông tin phòng trọ';
    },
    desserts() {
      if (this.groupId != null) {
        const groupList = this.groups.filter((groupItem) => groupItem.groupId === this.groupId);
        const dessertList = [];
        const roomEmptyList = [];
        const roomFullList = [];
        groupList[0].types.forEach((typeElement) => {
          const id = typeElement.typeId;
          const ten = typeElement.title;
          const dientich = typeElement.superficiality;
          const nguoi = typeElement.capacity;
          const gia = typeElement.price;
          const trangthai = typeElement.typeStatus.statusName;
          typeElement.rooms.forEach((roomItem) => {
            const loaiid = roomItem.typeId;
            if (loaiid === id) {
              const tinhtrang = roomItem.available;
              if (tinhtrang) {
                const tenid = roomItem.roomId;
                const tenphong = roomItem.roomName;

                const tong2 = {
                  roomId: tenid,
                  roomName: tenphong,
                  available: tinhtrang,
                  typeIds: loaiid,
                };
                roomEmptyList.push(tong2);
              }
              if (!tinhtrang) {
                const tenid = roomItem.roomId;
                const tenphong = roomItem.roomName;

                const tong2 = {
                  roomId: tenid,
                  roomName: tenphong,
                  available: tinhtrang,
                  typeIds: loaiid,
                };
                roomFullList.push(tong2);
              }
            }
          });
          const tong = {
            typeId: id,
            typeName: ten,
            superficiality: dientich,
            capacity: nguoi,
            price: `${gia} triệu`,
            status: trangthai,
            roomEm: roomEmptyList,
            roomFu: roomFullList,
          };
          dessertList.push(tong);
        });
        return dessertList;
      }
      return [];
    },
  },
  methods: {
    clicked(value) {
      this.expanded.push(value);
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
      this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style>
th {
  font-size: 19px !important;
}
td {
  font-size: 18px !important;
}
#style-1::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
