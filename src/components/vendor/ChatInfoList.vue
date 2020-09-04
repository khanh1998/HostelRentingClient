<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="7">
        <v-text-field label="Tìm kiếm" solo></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-select :items="combobox.chooses" v-model="combobox.select" solo></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list :dense="dense" :two-line="twoLine" :nav="nav" :avatar="avatar">
          <v-container id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
            <v-row
              v-scroll:#scroll-target="onScroll"
              align="center"
              justify="center"
              style="height: 670px rounded-l"
            >
              <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i" class="mb-2 pt-2">
                  <!-- <div class="d-flex mb-2 pt-2"> -->
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title style="fontsize: 16px" class="py-1">
                      {{ item.title }}</v-list-item-title
                    >
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
                  <div class="mt-3">
                    <span v-html="item.price"></span><br />
                    <span v-html="item.preprice"></span>
                  </div>
                  <!-- </div> -->
                </v-list-item>
              </v-list-item-group>
            </v-row>
          </v-container>
        </v-list>
      </v-col>
    </v-row>
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
          subtitle: "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
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
          subtitle: "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
          price: "<span class='red--text'>1.500.000 Đ</span>",
          preprice: '<s>1.900.000 Đ</s>',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Võ Thị Kim Thùy',
          subtitle: "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
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
          subtitle: "<span class='green--text'>Phòng gác lửng, không máy lạnh</span>",
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
      dense: true,
      twoLine: true,
      nav: true,
      avatar: true,
      combobox: {
        chooses: ['Tất cả', 'Trả giá', 'Đặt lịch'],
        select: ['Tất cả'],
      },
    };
  },
  mounted() {
    this.$emit('input', this.selected);
  },
};
</script>
<style>
.vuebar-element {
  height: 250px;
  width: 100%;
  max-width: 500px;
  background: #ffffff;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  background-color: rgba(48, 121, 244, 0.1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
}
</style>
