<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="7"
      >
        <v-text-field
          label="Tìm kiếm"
          solo
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="5"
      >
        <v-select
          :items="combobox.chooses"
          v-model="combobox.select"
          solo
        ></v-select>
      </v-col>
    </v-row>
    <div class="vuebar-element" v-bar> <!-- el1 -->
    <div> <!-- el2 -->
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Sed, molestiae expedita voluptate a autem impedit, consequuntur
       dolore rem at et nam dolorum commodi soluta eum adipisci quaerat blanditiis! Ipsa, pariatur.
       Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Sed, molestiae expedita voluptate a autem impedit, consequuntur
       dolore rem at et nam dolorum commodi soluta eum adipisci quaerat blanditiis! Ipsa, pariatur.
       Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Sed, molestiae expedita voluptate a autem impedit, consequuntur
       dolore rem at et nam dolorum commodi soluta eum adipisci quaerat blanditiis! Ipsa, pariatur.
    </div>
    <!-- dragger will be automatically added here -->
  </div>
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
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}
</style>
