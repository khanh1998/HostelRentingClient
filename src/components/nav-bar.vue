<template>
    <div class="nav-bar">
        <div class="nav-inner">
          <div class="nav-logo">
            <img v-bind:src="img-src"/>
          </div>

          <div class="nav-search">
            <input v-bind:placeholder="search-title" v-model="searchValue"/>
            <input type="submit" />
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'nav-bar',
  props: {
    'img-src': String,
    'search-title': String,
  },
  data: () => ({
    searchValue: '',
  }),
};
</script>
<style>
  .nav-bar {
    width: 108px;
    position: absolute;

  }
  .nav-inner {

  }
  .nav-logo {
    width: 180px;
    height: 100px;
  }

</style>
