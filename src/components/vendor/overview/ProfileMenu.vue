<template>
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
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    infoMenu: [
      {
        title: 'Thông tin',
        url: '',
      },
    ],
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    getAvatarTitle(name) {
      return name.substring(name.lastIndexOf(' ') + 1).substring(0, 1);
    },
  },
  computed: {
    user() {
      return this.$store.state.user.user.data;
    },
    isLoadingUser() {
      return this.$store.state.user.user.isLoading;
    },
  },
  created() {
    this.getUser();
  },
};
</script>
