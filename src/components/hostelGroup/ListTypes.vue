<template>
  <!-- eslint-disable max-len -->
  <div class="d-flex flex-column flex-md-row flex-wrap">
    <Type
      :group="group"
      v-for="i in list.length"
      :key="i"
      :index="i"
      :type="list[i - 1]"
      class="mb-8"
    />
  </div>
</template>
<style scoped></style>
<script>
import Type from './Type.vue';

export default {
  name: 'ListTypes',
  components: { Type },
  props: {
    list: Array,
    group: Object,
  },
  data: () => ({}),
};
</script>
