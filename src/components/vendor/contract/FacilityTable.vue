<template>
  <v-data-table :headers="headersF" hide-default-footer :items="facilityItems" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Nội thất</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItemF(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItemF(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: 'FacilityTable',
  props: ['facilities'],
  data: () => ({
    facilityItems: [],
    dialogF: false,
    dialogDeleteF: false,
    headersF: [
      {
        text: 'Nội dung',
        align: 'start',
        sortable: false,
        value: 'facilityName',
      },
      { text: 'Số lượng', value: 'count' },
      { text: 'Đơn vị tính', value: 'unit', sortable: false },
      { value: 'actions', sortable: false },
    ],
    editedIndexF: -1,
    editedItemF: {
      facilityName: '',
      quantity: 0,
      priceUnit: '',
    },
    defaultItemF: {
      facilityName: '',
      quantity: 0,
      priceUnit: '',
    },
  }),
  methods: {
    // methods for facility
    editItemF(item) {
      this.editedIndexF = this.facilities.indexOf(item);
      this.editedItemF = { ...item };
      this.dialogF = true;
    },
    deleteItemF(item) {
      this.editedIndexF = this.facilities.indexOf(item);
      this.editedItemF = { ...item };
      this.dialogDeleteF = true;
    },
    deleteItemConfirmF() {
      this.facilities.splice(this.editedIndexF, 1);
      this.closeDeleteF();
    },
    closeF() {
      this.dialogF = false;
      this.$nextTick(() => {
        this.editedItemF = { ...this.defaultItemF };
        this.editedIndexF = -1;
      });
    },
    closeDeleteF() {
      this.dialogDeleteF = false;
      this.$nextTick(() => {
        this.editedItemF = { ...this.defaultItemF };
        this.editedIndexF = -1;
      });
    },
    saveF() {
      if (this.editedIndexF > -1) {
        Object.assign(this.facilities[this.editedIndexF], this.editedItemF);
      } else {
        this.facilities.push(this.editedItemF);
      }
      this.closeF();
    },
  },
  created() {
    this.facilityItems = this.facilities.map((f) => ({ ...f, count: 1, unit: 'Cái' }));
  },
};
</script>
