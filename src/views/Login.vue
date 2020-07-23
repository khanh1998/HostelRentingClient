<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card width="300" class="pa-3">
          <v-card-title>Đăng nhập</v-card-title>
          <v-text-field label="ID" />
          <v-text-field label="password" placeholder="no need to password here" />
          <v-card-actions>
            <v-btn @click="login">Đăng nhập</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data: () => ({
    username: '1',
    password: '',
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    login() {
      this.getUser({ role: 'renters', id: 1 });
    },
  },
};
</script>
<style scoped>
</style>
