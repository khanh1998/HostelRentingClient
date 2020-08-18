<template>
  <div class="app-wrapper">
    <div class="header">
      <div class="icon"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User',
};
</script>
<style lang="scss" scoped>
$main-bg-color: #919890;
.app-wrapper {
  width: 1024px;
  height: 768px;
  background: $main-bg-color;
}
.header {
  height: 8%;
  background: #323232;
  width: 100%;
  border-bottom: 2px solid #919890;
  .icon {
    background-image: url(../../assets/logo1.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 30%;
    float: left;
    height: 90%;
    top: 30%;
    position: relative;
    margin-left: 10%;
  }
}
</style>
