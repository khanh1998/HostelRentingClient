<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex justify-center align-center">
        <div>
          <v-card class="elevation-12" width="300">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Đăng nhập</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Số điện thoại"
                  name="Số điện thoại"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="phone"
                  autofocus
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.empty, rules.phone]"
                ></v-text-field>

                <v-text-field
                  validate-on-blur
                  id="password"
                  autofocus
                  hide-details="auto"
                  v-model="password"
                  label="Mật khẩu"
                  name="Mật khẩu"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="[rules.empty]"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn to="/register" dark class="green lighten-3">
                <v-icon>create</v-icon>Tạo tài khoản mới
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :loading="isLoging" @click="login">Đăng nhập</v-btn>
            </v-card-actions>
            <v-card-text class="red--text">{{message}}</v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data: () => ({
    phone: '',
    password: '',
    message: '',
    rules: {
      empty: (value) => value.length > 0 || 'Không được để trống.',
      phone: (value) => Number.isInteger(Number(value)) === true || 'Phải là số điện thoại',
    },
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
        const { nextUrl, preUrl } = this.$route.params;
        console.log(this.$attrs);
        console.log(nextUrl, preUrl);
        if (nextUrl) {
          this.$router.push(nextUrl);
        } else {
          switch (role) {
            case 'vendors':
              this.$router.push('/vendor');
              break;
            case 'renters':
              this.$router.push(preUrl || '/');
              break;
            case 'admin':
              this.$router.push('/admin');
              break;
            default:
              this.$router.push('/');
          }
        }
      } else {
        this.message = 'Số điện thoại hoặc mật khẩu không đúng!';
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
