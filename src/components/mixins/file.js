const fileUploadMixin = {
  data: () => ({
    isFileUploading: false,
    fileUploadError: null,
    fileUploadSuccess: null,
    listUploadedFiles: [],
  }),
  methods: {
    async uploadFile(formDatas) {
      try {
        this.isFileUploading = true;
        this.listUploadedFiles = [];
        const res = await window.axios.post('/api/v1/files', formDatas, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.isFileUploading = false;
        this.fileUploadSuccess = true;
        this.listUploadedFiles = res.data.data.map((item) => item.fileDownloadUri);
      } catch (error) {
        this.isFileUploading = false;
        this.fileUploadError = error;
      }
    },
  },
  watch: {
    listUploadedFiles: {
      handler() {
        this.$emit('newUploadedFile', this.listUploadedFiles);
      },
      deep: true,
    },
  },
};

export default fileUploadMixin;
