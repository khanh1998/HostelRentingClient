<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script>
import WebViewer from '@pdftron/webviewer';

export default {
  name: 'WebViewer',
  props: { initialDoc: { type: String } },
  mounted() {
    const { viewer } = this.$refs;
    console.log(viewer.value);
    const path = `${process.env.BASE_URL}webviewer`;
    WebViewer({ path, initialDoc: this.initialDoc, isReadOnly: true }, viewer);
  },
  created() {},
};
</script>

<style>
#webviewer {
  height: 100%;
}
</style>
