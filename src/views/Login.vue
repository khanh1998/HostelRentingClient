<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card width="300" class="pa-3">
          <v-card-title>Đăng nhập</v-card-title>
          <v-text-field label="Phone" v-model="phone" />
          <v-text-field label="password" v-model="password" />
          <v-card-actions>
            <v-btn :loading="isLoging" @click="login">Đăng nhập</v-btn>
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
    phone: '0987654321',
    password: '1234567',
  }),
  computed: {
    isLoging() {
      return this.$store.state.user.user.isLoading;
    },
    userData() {
      return this.$store.state.user.user.data;
    },
    loginSuccess() {
      return this.$store.state.user.user.success;
    },
  },
  methods: {
    ...mapActions({
      loginRequest: 'user/login',
    }),
    afterLogin() {
      if (this.loginSuccess) {
        this.$cookies.set('jwt', 'justAJsonWebToken');
        let role = 'admin';
        const id = this.userData.userId;
        switch (this.userData.role.roleId) {
          case 1:
            role = 'vendors';
            break;
          case 2:
            role = 'renters';
            break;
          default:
            break;
        }
        this.$cookies.set('role', role);
        this.$cookies.set('userId', id);
        const { nextUrl } = this.$route.params;
        if (nextUrl) {
          this.$router.push(nextUrl);
        } else {
          switch (role) {
            case 'vendors': this.$router.push('/vendor');
              break;
            case 'renters': this.$router.push('/');
              break;
            case 'admin': this.$router.push('/admin');
              break;
            default:
              this.$router.push('/');
          }
        }
      } else {
        alert('login fail');
      }
    },
    async login() {
      await this.loginRequest({
        phone: this.phone,
        password: this.password,
      });
      console.log(this.userData);
      this.afterLogin();
    },
  },
};
</script>
<style scoped>
</style>
