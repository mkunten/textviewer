<script setup>
import { provide, readonly } from 'vue';
import { useStore } from '@/stores';
import TeiNodes from '@/components/TeiNodes.vue';

// store
const store = useStore();

// props
const props = defineProps({
  el: { type: Object, default: null, required: true },
  parents: { type: Array, default: () => [], required: false },
});

// data
const { layout } = store.currText;
const pbPos = [Array(layout.length).fill(0), Array(layout.length).fill(0)];
const lbPos = Array(layout.length).fill(1);

// methods
const updatePbPos = (ed, canvas) => {
  for (let idx0 = 0; idx0 < layout.length; idx0 += 1) {
    const idx1 = layout[idx0].indexOf(ed);
    if (idx1 !== -1) {
      pbPos[0][idx0] = idx1;
      pbPos[1][idx0] = canvas;
      lbPos[idx0] = 1;
    }
  }
  return {
    pb: pbPos,
    lb: lbPos,
  };
};

const updateLbPos = (ed, line) => {
  for (let idx = 0; idx < layout.length; idx += 1) {
    if (layout[idx].indexOf(ed) !== -1) {
      lbPos[idx] = line;
      break;
    }
  }
  return {
    pb: pbPos,
    lb: lbPos,
  };
};

// provide
provide('pbPos', readonly(pbPos));
provide('updatePbPos', updatePbPos);
provide('updateLbPos', updateLbPos);
</script>

<template>
  <div class="container tategaki">
    <TeiNodes :el="props.el" :parents="props.parents" :depth="0"></TeiNodes>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3rem 2rem 1rem;
  background-color: white;
  overflow-x: auto;
  overflow-y: hidden;
}

.tategaki {
  text-align: left;
  writing-mode: vertical-tb;
  -webkit-writing-mode: vertical-tb;
  -ms-writing-mode: vertical-tb;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  text-orientation: upright;
}
</style>
