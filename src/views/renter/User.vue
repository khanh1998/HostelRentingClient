<template>
  <v-container>
    <v-overlay :value="user.isLoading || user.isUpdating" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackBarMixin.show"
      :multi-line="snackBarMixin.multiLine"
      :timeout="snackBarMixin.timeout"
      :absolute="snackBarMixin.absolute"
      :color="snackBarMixin.color"
    >
      {{ snackBarMixin.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackBarMixin.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div>
      <v-row v-if="!user.isLoading">
        <v-col cols="3">
          <v-avatar size="128">
            <v-img :src="user.data.avatar" />
          </v-avatar>
          <v-btn color="primary" @click="prepareToEditProfile">
            <v-icon>edit</v-icon> Sửa hồ sơ
          </v-btn>
        </v-col>
        <v-col cols="3">
          <p v-if="!editProfile">{{ user.data.username }}</p>
          <p v-if="!editProfile">{{ user.data.role.roleName }}</p>
          <v-text-field v-if="editProfile" v-model="newUser.username"></v-text-field>
          <p v-if="!editProfile">{{ user.data.yearOfBirth }}</p>
          <v-text-field
            v-if="editProfile"
            type="number"
            v-model="newUser.yearOfBirth"
          ></v-text-field>
          <p v-if="!editProfile">{{ user.data.phone }}</p>
          <p v-if="!editProfile">{{ user.data.email }}</p>
          <v-text-field v-if="editProfile" type="email" v-model="newUser.email"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <!-- CMND -->
        <v-col>
          <p v-if="!editProfile">{{ user.data.idNum }}</p>
          <v-text-field v-if="editProfile" type="number" v-model="newUser.idNum"></v-text-field>
          <p v-if="!editProfile">{{ user.data.idIssuedLocation }}</p>
          <v-text-field v-if="editProfile" v-model="newUser.idIssuedLocation"></v-text-field>
          <p v-if="!editProfile">{{ user.data.idIssuedDate }}</p>
          <v-text-field v-if="editProfile" v-model="newUser.idIssuedDate"></v-text-field>
          <p v-if="!editProfile">{{ user.data.householdAddress }}</p>
          <v-text-field v-if="editProfile" v-model="newUser.householdAddress"></v-text-field>
          <p v-if="!editProfile">{{ user.data.currentAddress }}</p>
          <v-text-field v-if="editProfile" v-model="newUser.currentAddress"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="updatable" @click="updateUser" color="primary">
            <v-icon>update</v-icon> Cập nhật ngay
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import snackBarMixin from '../../components/mixins/snackBar';

export default {
  name: 'User',
  mixins: [snackBarMixin],
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      updateUser: 'user/updateUser',
    }),
    prepareToEditProfile() {
      this.editProfile = true;
    },
    updateUser() {
      this.updateUser(this.newUser).then(() => {
        if (this.user.error) {
          this.showSnackBar(this.user.error.message, { color: 'red' });
        }
      });
    },
  },
  computed: {
    ...mapState('user', ['user']),
  },
  data: () => ({
    editProfile: false,
    newUser: null,
    updatable: false,
  }),
  watch: {
    newUser: {
      handler(newVal, oldVal) {
        if (oldVal === null) {
          console.log(newVal);
        } else {
          this.updatable = true;
        }
      },
      deep: true,
    },
  },
  created() {
    this.getUser().then(() => {
      this.newUser = this.user.data;
    });
  },
};
</script>
