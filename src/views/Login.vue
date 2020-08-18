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
              <v-btn color="primary" :loading="loging" @click="login">Đăng nhập</v-btn>
            </v-card-actions>
            <v-card-text class="red--text">{{ message }}</v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex';
import firebase from '../config/firebase';

const { auth } = firebase;

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
    loging: false,
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
    async getTokenIdFromFirebase(jwtToken) {
      try {
        await auth.signInWithCustomToken(jwtToken);
        const idToken = await auth.currentUser.getIdToken();
        return idToken;
      } catch (error) {
        console.log('firebase login error: ', error);
        alert(`error when login with firebase: ${error}`);
      }
      return null;
    },
    async afterLogin() {
      if (this.loginSuccess) {
        const { jwtToken } = this.userData;
        this.$cookies.set('jwt', jwtToken);
        const idToken = await this.getTokenIdFromFirebase(jwtToken);
        this.$cookies.set('firebaseIdToken', idToken);
        console.log('firebase id token', idToken);
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
        console.log(this.$route);
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
      this.loging = true;
      await this.loginRequest({
        phone: this.phone,
        password: this.password,
      });
      console.log(this.userData);
      await this.afterLogin();
      this.loging = false;
    },
  },
  created() {
    console.log(this.$route);
  },
};
</script>
<style scoped></style>
