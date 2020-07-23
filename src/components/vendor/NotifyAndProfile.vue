<template>
  <div class="d-flex flex-row justify-center align-center pa-2">
    <v-menu
      left
      :offset-y=true
      :offset-x=true
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-badge
            color="red"
            content="6"
            bordered
            overlap
            v-bind="attrs"
            v-on="on"
          >
            <v-img
              :src="require('@/assets/notification.svg')"
              height="30"
              width="30"
            ></v-img>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :dense="dense"
        :two-line="twoLine"
        :nav="nav"
        :avatar="avatar"
        class="rounded-l"
        style="height: 405px; width: 300px"
      >
        <v-list-item-group
          v-model="item"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in listBookChange"
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
              <v-list-item-subtitle>Đã đặt lịch hẹn ngày {{item.message}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <div class="d-flex flex-nowrap align-center ml-3">
      <v-menu
        left
        :offset-y=true
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            text
          >
            <v-avatar>
              <v-img src="@/assets/suzy-avatar.jpg"></v-img>
            </v-avatar>
            <p class="font-weight-medium mb-0 ml-2">Bae Suzy</p>
          </v-btn>
        </template>

        <v-list two-line>
          <template v-for="(item, index) in infoMenu">
            <v-divider
              v-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

              <v-list-item
                v-else
                :key="item.title"
                @click="chonhannutclick"
              >
                <v-list-item-content>
                  <v-list-item-title style="color:#1F17FF; fontSize:18px">
                    {{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NotifyAndProfile',
  components: {
  },
  computed: {
    listBookChange() {
      return this.items.filter((items) => {
        if (items.book) {
          return true;
        }
        return false;
      });
    },
  },
  data: () => ({
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
        seen: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Trang',
        message:
          '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Thỳ',
        message:
          '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: false,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Trí',
        message:
          '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: true,
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Võ Thị Kim Chung',
        message:
          '21/ 6/ 2020 từ 15:30',
        bargain: false,
        book: true,
        seen: true,
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
    infoMenu: [
      {
        title: 'Thông tin',
      },
      { divider: true, inset: false },
      {
        title: 'Đổi mật khẩu',
      },
    ],
  }),
};
</script>
