<template>
  <v-card>
    <v-card-title class="blue--text py-0 px-2">
      <v-icon color="blue">message</v-icon> Nhà trọ Lalahome
      <v-spacer />
      <v-btn icon color="success">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn icon color="red" @click="$emit('close')">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider />
    <div
      style="max-height: 300px; min-height: 300px;"
      class="overflow-y-auto"
      id="chatbox"
    >
      <v-list v-scroll.self="myOnScroll" align="center" justify="center">
        <v-list-item v-for="item in items" v-bind:key="item.createdAt">
          <v-list-item-content>
            <div v-if="item.renter" class="d-flex justify-end">
              <span
                v-ripple
                style="width: 75%;"
                class="blue lighten-5 pa-2 rounded max-w-3/4"
              >
                {{ item.message }}
              </span>
            </div>
            <div v-if="!item.renter" class="d-flex justify-start">
              <span
                style="width: 75%;"
                v-ripple
                class="green lighten-5 pa-2 rounded max-w-3/4"
              >
                {{ item.message }}
              </span>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <v-divider />
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
          v-on:keyup.enter="sendMessage()"
        >
        </v-text-field>
        <v-btn color="blue" class="ma-1" depressed @click="sendMessage()">
          <v-icon color="white">
            far fa-paper-plane
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
  <!-- <v-btn
      class="ma-2"
      color="primary"
      dark
      style="border-radius: 50%; height: 60px; width:60px"
    >
      <v-icon
        x-large="true"
        size="600"
      >comment</v-icon>
    </v-btn> -->
</template>

<script>
export default {
  name: 'ChatboxBottom',
  components: {},
  data: () => ({}),
};
</script>
