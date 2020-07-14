<template>
  <div class="d-flex flex-column">
    <div class="above d-flex justify-space-around">
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Diện tích</p>
        <p class="font-weight-bold">{{info.superficiality}} m2</p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Sức chứa</p>
        <p class="font-weight-bold">{{info.capacity}} người</p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Toilet</p>
        <p class="font-weight-bold">{{ true }}</p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Nấu ăn</p>
        <p class="font-weight-bold" v-if="true">Có</p>
        <p class="font-weight-bold" v-if="false">Không</p>
      </div>
    </div>
    <div class="above d-flex justify-space-around">
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Điện</p>
        <p class="font-weight-bold">
          {{12}}
          {{'unit'}}
        </p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Nước</p>
        <p class="font-weight-bold">
          {{13}}
          {{'unit'}}
        </p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Wifi</p>
        <p class="font-weight-bold">
          {{12}}
          {{'unit'}}
        </p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Rác</p>
        <p class="font-weight-bold">
          {{12}}
          {{'unit'}}
        </p>
      </div>
    </div>
    <div class="above d-flex flex-column">
      <div class="d-flex">
        <p class="font-weight-bold blue--text mr-8">Tiện nghi</p>
        <p class="font-weight-thin">
          {{info.facilities.map(item => item.facilityName).join(', ')}}
        </p>
      </div>
      <div class="d-flex">
        <p class="font-weight-bold blue--text mr-8">Dịch vụ</p>
        <p class="font-weight-thin">
          {{group.services.map(item => item.serviceName).join(', ')}}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.above {
  width: 100%;
}
.below {
  width: 100%;
  background: #F3F5F5;
}
</style>
<script>
export default {
  name: 'mainInfo',
  props: {
    info: Object,
    group: Object,
  },
};
</script>
