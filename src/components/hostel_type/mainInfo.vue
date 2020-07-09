<template>
  <div class="d-flex flex-column">
    <div class="above d-flex justify-space-around">
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Diện tích</p>
        <p class="font-weight-bold">{{info.details.area}} m2</p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Sức chứa</p>
        <p class="font-weight-bold">{{info.details.capacity}} người</p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Toilet</p>
        <p class="font-weight-bold">{{info.details.toilet}}</p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Nấu ăn</p>
        <p class="font-weight-bold" v-if="info.details.cooking">Có</p>
        <p class="font-weight-bold" v-if="!info.details.cooking">Không</p>
      </div>
    </div>
    <div class="above d-flex justify-space-around">
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Điện</p>
        <p class="font-weight-bold">
          {{info.details.electricity.price}}
          {{info.details.electricity.unit}}
        </p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Nước</p>
        <p class="font-weight-bold">
          {{info.details.water.price}}
          {{info.details.water.unit}}
        </p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Wifi</p>
        <p class="font-weight-bold">
          {{info.details.wifi.price}}
          {{info.details.wifi.unit}}
        </p>
      </div>
      <div style="width: 140px">
        <p class="font-weight-medium grey--text">Rác</p>
        <p class="font-weight-bold">
          {{info.details.garbage.price}}
          {{info.details.garbage.unit}}
        </p>
      </div>
    </div>
    <div class="above d-flex flex-column">
      <div class="d-flex">
        <p class="font-weight-bold blue--text mr-8">Tiện nghi</p>
        <p class="font-weight-thin">{{info.details.facility.join(', ')}}</p>
      </div>
      <div class="d-flex">
        <p class="font-weight-bold blue--text mr-8">Dịch vụ</p>
        <p class="font-weight-thin">{{info.details.service.join(', ')}}</p>
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
  },
};
</script>
