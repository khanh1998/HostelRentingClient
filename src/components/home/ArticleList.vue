<template>
  <div class="d-flex flex-column flex-md-row flex-wrap">
    <Article
      v-for="i in 5"
      :key="i"
      :index="i"
      :type="list[i]"
    />
  </div>
</template>
<style scoped>
</style>
<script>
import Article from './Article.vue';

export default {
  name: 'ArticleList',
  components: { Article },
  props: {
    list: Array,
  },
  data: () => ({}),
};
</script>
