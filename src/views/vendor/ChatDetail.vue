<template>
  <div>
    <v-row no-gutters style="flex-wrap: nowrap">
      <v-col cols="3" class="mx-3">
        <chatInfoList />
      </v-col>
      <v-col cols="5">
        <chatBox />
      </v-col>
      <v-col cols="3" class="mx-3 mt-2">
        <hostel-info />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import chatInfoList from '@/components/vendor/ChatInfoList.vue';
import hostelInfo from '@/components/vendor/HostelInfo.vue';
import chatBox from '@/components/vendor/Chatbox.vue';

export default {
  name: 'ChatDetail',
  data: () => ({}),
  components: {
    chatInfoList,
    hostelInfo,
    chatBox,
  },
};
</script>
<style>
.item-image {
  height: 200px;
}
.item-text-display {
  color: #031d5f;
}
.text-display {
  color: #b4b7c8;
}
.bottom-item {
  margin-top: 120px;
}
.container {
  overflow: initial;
}
</style>
