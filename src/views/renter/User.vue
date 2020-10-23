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
    <v-dialog v-model="dialog.show" width="350">
      <v-card height="350" :loading="isFileUploading">
        <div class="d-flex flex-column align-center justify-center">
          <input
            type="file"
            @change="onFileChange"
            ref="fileSelect"
            lang="vi"
            accept="image/*"
            class="ma-2"
          />
          <div class="d-flex flex-wrap" style="height: 250px; overflow-y: auto;">
            <v-img
              v-for="url in upload.imageUrls"
              :key="url"
              :src="url"
              height="100"
              width="100"
              class="ma-1 elevation-2"
            ></v-img>
          </div>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" v-if="this.upload.imageUrls.length > 0" @click="uploadImages">
            <v-icon>cloud_upload</v-icon> Tải lên
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!user.isLoading">
      <v-row>
        <v-col cols="12" md="3">
          <div class="d-flex flex-column justify-center align-center">
            <v-avatar size="128" v-if="!editProfile">
              <v-img :src="user.data.avatar"> </v-img>
            </v-avatar>
            <v-avatar size="128" v-if="editProfile">
              <v-img :src="newUser.avatar">
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-btn icon @click="uploadAvatarImage">
                    <v-icon color="white">edit</v-icon>
                  </v-btn>
                </v-row>
              </v-img>
            </v-avatar>
            <v-btn color="primary" v-if="!editProfile" @click="prepareToEditProfile">
              <v-icon>edit</v-icon> Sửa hồ sơ
            </v-btn>
            <v-btn color="primary" v-if="editProfile" @click="editProfile = false">
              <v-icon>cancel</v-icon> Hủy
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <p v-if="!editProfile">{{ user.data.role.roleName }}: {{ user.data.username }}</p>
          <v-text-field v-if="editProfile" label="Tên" v-model="newUser.username"></v-text-field>
          <p v-if="!editProfile">Năm sinh: {{ user.data.yearOfBirth }}</p>
          <v-text-field
            v-if="editProfile"
            type="number"
            label="Năm sinh"
            v-model="newUser.yearOfBirth"
          ></v-text-field>
          <div v-if="user.data.role.code === 'RENTER'">
            <p v-if="!editProfile">Quê quán: {{ user.data.hometown.provinceName }}</p>
            <v-autocomplete
              v-if="editProfile"
              v-model="newUser.hometown.provinceId"
              :items="provinces.items"
              item-text="provinceName"
              item-value="provinceId"
              dense
              label="Quê quán"
              chips
            ></v-autocomplete>
            <p v-if="!editProfile">Trường đại học: {{ user.data.school.schoolName }}</p>
            <v-autocomplete
              v-if="editProfile"
              v-model="newUser.school.schoolId"
              :items="schools.items"
              item-text="schoolName"
              item-value="schoolId"
              dense
              label="Trường đại học"
              chips
            ></v-autocomplete>
          </div>

          <p v-if="!editProfile">Số điện thoại: {{ user.data.phone }}</p>
          <p v-if="!editProfile">Email: {{ user.data.email }}</p>
          <v-text-field v-if="editProfile" label="Email" v-model="newUser.email"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <!-- CMND -->
          <v-col>
            <p>Chứng minh nhân dân</p>
            <p v-if="!editProfile">Số chứng minh nhân dân: {{ user.data.citizenIdNum }}</p>
            <v-text-field
              v-if="editProfile"
              label="Số chứng minh nhân dân"
              type="number"
              v-model="newUser.citizenIdNum"
            ></v-text-field>
            <p v-if="!editProfile">Nơi cấp: {{ user.data.idIssuedLocation }}</p>
            <v-text-field
              v-if="editProfile"
              label="Nơi cấp"
              v-model="newUser.idIssuedLocation"
            ></v-text-field>
            <p v-if="!editProfile">Thời gian cấp:{{ user.data.idIssuedDate }}</p>
            <v-text-field
              v-if="editProfile"
              label="Thời gian cấp"
              v-model="newUser.idIssuedDate"
            ></v-text-field>
            <p v-if="!editProfile">Địa chỉ thường trú: {{ user.data.householdAddress }}</p>
            <v-text-field
              v-if="editProfile"
              label="Địa chỉ thường trú"
              v-model="newUser.householdAddress"
            ></v-text-field>
          </v-col>
        </v-col>
        <v-col cols="12" md="3">
          <p v-if="!editProfile">Địa chỉ hiện tại: {{ user.data.currentAddress }}</p>
          <v-text-field
            v-if="editProfile"
            label="Địa chỉ hiện tại"
            v-model="newUser.currentAddress"
          ></v-text-field>
          <p>Mặt trước của CMND</p>
          <div v-if="!editProfile">
            <p v-if="!user.data.citizenIdFrontImg">Thiếu ảnh mặt trước của CMND</p>
            <v-img
              height="128"
              width="256"
              v-if="user.data.citizenIdFrontImg"
              :src="user.data.citizenIdFrontImg"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
              <p>Mặt trước của CMND</p>
            </v-img>
          </div>

          <div v-if="editProfile">
            <v-img
              height="128"
              width="256"
              v-if="newUser.citizenIdFrontImg"
              :src="newUser.citizenIdFrontImg"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
              <p>Mặt trước của CMND</p>
            </v-img>
            <v-btn v-if="editProfile" class="ml-2" @click="uploadFrontIDCardImage" depressed>
              <v-icon>add_photo_alternate</v-icon>Tải lên ảnh mới</v-btn
            >
          </div>

          <p>Mặt sau của CMND</p>
          <div v-if="!editProfile">
            <p v-if="!user.data.citizenIdBackImg">Thiếu ảnh mặt sau của CMND</p>
            <v-img
              height="128"
              width="256"
              v-if="user.data.citizenIdBackImg"
              :src="user.data.citizenIdBackImg"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
              <p>Mặt sau của CMND</p>
            </v-img>
          </div>
          <div v-if="editProfile">
            <v-img
              height="128"
              width="256"
              v-if="newUser.citizenIdBackImg"
              :src="newUser.citizenIdBackImg"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
              <p>Mặt sau của CMND</p>
            </v-img>
            <v-btn class="ml-2" @click="uploadBackIDCardImage" depressed>
              <v-icon>add_photo_alternate</v-icon>Tải lên ảnh mới</v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="updatable && editProfile" @click="updateUserInfo" color="primary">
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
import fileMixins from '../../components/mixins/file';

export default {
  name: 'User',
  mixins: [snackBarMixin, fileMixins],
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      updateUser: 'user/updateUser',
      getAllProvinces: 'renter/filterResult/getAllProvinces',
      getAllSchools: 'renter/filterResult/getAllSchools',
    }),
    prepareToEditProfile() {
      this.editProfile = true;
    },
    updateUserInfo() {
      this.updateUser(this.newUser).then(() => {
        this.updatable = false;
        this.editProfile = false;
        if (this.user.error) {
          this.showSnackBar(this.user.error.message, { color: 'red' });
        } else if (this.user.success) {
          this.showSnackBar('Cập nhật thông tin thành công', { color: 'green' });
        }
      });
    },
    openImageUploadDialog() {
      this.dialog.show = true;
      this.$nextTick(() => this.$refs.fileSelect.click());
    },
    uploadFrontIDCardImage() {
      this.openImageUploadDialog();
      this.dialog.isUploadFrontIDCard = true;
    },
    uploadBackIDCardImage() {
      this.openImageUploadDialog();
      this.dialog.isUploadBackIDCard = true;
    },
    uploadAvatarImage() {
      this.openImageUploadDialog();
      this.dialog.isUploadAvatar = true;
    },
    onFileChange(e) {
      console.log(e.target.files);
      const { files } = e.target;
      this.files = files;
      this.upload.imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    },
    bindImageUrlToUserObject() {
      if (this.dialog.isUploadBackIDCard) {
        [this.newUser.citizenIdBackImg] = this.upload.imageUrls;
        this.dialog.isUploadBackIDCard = false;
      } else if (this.dialog.isUploadFrontIDCard) {
        [this.newUser.citizenIdFrontImg] = this.upload.imageUrls;
        this.dialog.isUploadFrontIDCard = false;
      } else if (this.dialog.isUploadAvatar) {
        [this.newUser.avatar] = this.upload.imageUrls;
        this.dialog.isUploadAvatar = false;
      }
    },
    uploadImages() {
      const fd = new FormData();
      Array.from(this.files).forEach((file) => {
        fd.append('files', file, file.data);
      });
      this.uploadFile(fd)
        .then(() => {
          this.upload.imageUrls = this.listUploadedFiles;
          this.dialog.show = false;
          this.showSnackBar('Tải ảnh lên thành công', { color: 'green' });
          this.bindImageUrlToUserObject();
        })
        .catch((error) => {
          console.log(error);
          this.showSnackBar('Tải ảnh lên thất bại', { color: 'red' });
        });
    },
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState({
      provinces: (state) => state.renter.filterResult.filter.hometown,
      schools: (state) => state.renter.filterResult.filter.schools,
    }),
  },
  data: () => ({
    editProfile: false,
    newUser: null,
    updatable: false,
    dialog: {
      show: false,
      files: null,
      isUploadFrontIDCard: false,
      isUploadBackIDCard: false,
      isUploadAvatar: false,
    },
    upload: {
      imageUrls: [],
    },
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
      this.newUser = { ...this.user.data };
    });
    this.getAllProvinces();
    this.getAllSchools();
  },
};
</script>
