<template>
  <div class="d-flex justify-center align-center px-3" style="height: 100%">
    <v-menu left :offset-y="true" :offset-x="true" @blur="this.notifications = []">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-badge
            color="red"
            :content="messages.length"
            bordered
            left
            overlap
            v-bind="attrs"
            v-on="on"
            v-if="messages.length !== 0"
          >
            <v-icon color="#727cf5">mdi-bell-outline</v-icon>
          </v-badge>
          <v-icon v-else color="#98a6ad">mdi-bell-outline</v-icon>
        </v-btn>
      </template>
      <v-list
        :dense="true"
        :two-line="true"
        :nav="true"
        :avatar="true"
        class="rounded-l"
        style="height: 405px; width: 300px"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in messages"
            :key="i"
            class="mb-2 pt-2"
            style="backgroundcolor: #f2f2f2"
          >
            <v-list-item-avatar>
              <v-img :src="item.data.icon"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="fontsize: 16px" class="py-1">
                {{ item.data.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <!-- {{ new Date(item.data.time).toLocaleString('vi') }} -->
                {{ item.data.body }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <div
      class="d-flex align-center justify-center"
      style="
        height: 100%;
        background-color: #fafbfd !important;
        border: 1px solid #f1f3fa !important;
        border-width: 0 1px !important;
      "
    >
      <v-menu offset-y v-if="!isLoadingUser">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" class="d-flex justify-center align-center px-4">
            <v-btn icon>
              <v-avatar color="#727cf5" size="35" min-width="30" min-height="30" item>
                <v-img v-if="user.avatar" :src="user.avatar" :alt="user.username"></v-img>
                <span v-else class="text-overline white--text">{{
                  getAvatarTitle(user.username)
                }}</span>
              </v-avatar>
            </v-btn>
            <div class="hidden-xs-only">
              <span class="text-muted d-flex flex-column font-nunito">
                <span class="size9rem text-primary">{{ user.username }}</span>
                <span class="size-caption">Chủ trọ</span>
              </span>
            </div>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ user.username }}
              </v-list-item-title>
              <v-list-item-subtitle> Chủ trọ </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <template v-for="(item, index) in infoMenu">
            <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>
            <v-list-item v-else :key="item.title" :to="item.url">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import processFCMForegroundMixins from '../../mixins/processFCMForeground';

export default {
  name: 'NotifyAndProfile',
  mixins: [processFCMForegroundMixins],
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      clearUserData: 'user/clearUserData',
      getNewCommingBooking: 'user/getOneBooking',
    }),
    getAvatarTitle(name) {
      return name.substring(name.lastIndexOf(' ') + 1).substring(0, 1);
    },
  },
  mounted() {
    this.registerMessaging();
  },
  computed: {
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
    messages() {
      return this.$store.state.user.notifications.data;
    },
  },
  data: () => ({
    infoMenu: [
      {
        title: 'Thông tin',
        url: '',
      },
    ],
  }),
  created() {
    this.getUser();
  },
};
</script>
