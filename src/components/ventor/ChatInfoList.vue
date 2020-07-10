<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6" md="7">
          <v-text-field label="Tìm kiếm" solo></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="5">
          <v-select :items="chooses" solo></v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-card class="mx-auto rounded" max-width="400" tile>
      <v-list :dense="dense" :two-line="twoLine" :nav="nav" :avatar="avatar">
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-avatar v-if="avatar">
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1">{{item.title}}</v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
            <div class="text-center">
              <span v-html="item.price"></span><br/>
              <span v-html="item.preprice"></span>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'chatInfoList',
  data() {
    return {
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Bùi Quốc Khánh',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
          price: "<span class='red--text'>1.500.000 Đ</span>",
          preprice: '<s>1.900.000 Đ</s>',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Trần Tiến Duật',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Phòng trọ ở đây có thể ở được hơn bốn người không ạ?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Võ Thị Kim Trang',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
          price: "<span class='red--text'>1.500.000 Đ</span>",
          preprice: '<s>1.900.000 Đ</s>',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Võ Thị Kim Thùy',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
          price: "<span class='red--text'>1.500.000 Đ</span>",
          preprice: '<s>1.900.000 Đ</s>',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Nguyễn Văn Thanh',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Mai mình lên xem phòng được không ạ?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Trần Tiến Duật',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Alo chủ trọ ơi!",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Trần Dực',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Phòng trọ nuôi chó được không ạ?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Lê Ngọc Ly',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
          price: "<span class='red--text'>1.500.000 Đ</span>",
          preprice: '<s>1.900.000 Đ</s>',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Trần Tiến Duật',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Cho mình hỏi thông tin nhà trọ một chút?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Bùi Văn Khánh',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Phòng trọ nuôi chó được không ạ?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Đặng Công Thành',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Phòng trọ nuôi chó được không ạ?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Phạm Minh Thành',
          subtitle:
            "<span class='green--text'>Phòng gác lửng, không máy lạnh</span> <br/> Phòng trọ nuôi chó được không ạ?",
        },
      ],
      chooses: ['Tất cả', 'Trả giá', 'Đặt lịch'],
      dense: true,
      twoLine: true,
      nav: true,
      avatar: true,
    };
  },
  mounted() {
    this.$emit('input', this.selected);
  },
};
</script>
