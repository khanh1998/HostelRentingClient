<template>
  <div>
    <v-chip-group column>
      <v-chip
        v-for="item in regulations"
        v-bind:key="item.regulationId"
        :color="item.allowed ? '#f1f3fa' : 'red lighten-4'"
        class="font-nunito"
      >
        <v-icon small color="#4250f2" v-if="item.allowed">done</v-icon>
        <v-icon x-small color="red" v-else>close</v-icon>
        {{ item.regulationName }}
      </v-chip>
    </v-chip-group>
  </div>
</template>
<script>
export default {
  name: 'RegulationsBox',
  data: () => ({
    icons: ['ac_unit', 'kitchen'],
  }),
  props: ['regulations'],
};
</script>
