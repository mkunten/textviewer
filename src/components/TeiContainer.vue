<script setup>
import {
  reactive, computed, watch, provide,
} from 'vue';
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
const { currId } = store;
const { layout } = store.currText;
const pbPos = [Array(layout.length).fill(0), Array(layout.length).fill(0)];
const lbPos = Array(layout.length).fill(1);
let posStacked = 0;
const data = reactive({
  isLazy: [],
});

// computed
const chunkedEls = computed(() => {
  let { el } = props;
  if (!el) {
    return [];
  }
  [el] = el.elements;
  if (el.name === 'TEI') {
    el = el.elements.find((e) => e.name === 'text');
  }
  if (el.name === 'text') {
    el = el.elements.find((e) => e.name === 'body');
  }
  const els = el.elements;
  const chunked = [];
  let prev = 0;
  for (let i = 1; i < els.length; i += 1) {
    if (els[i].name === 'pb'
      && (!els[i].attributes.edRef
        || els[i].attributes.edRef === `#${currId}`)) {
      chunked.push(els.slice(prev, i));
      prev = i;
    }
  }
  chunked.push(els.slice(prev));
  return chunked;
});

// methods
const checkIsPosStacked = () => {
  if (posStacked > 0) {
    posStacked -= 1;
    return true;
  }
  return false;
};

const incrementPosStacked = () => {
  posStacked += 1;
};

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

const getPos = () => ({
  pb: pbPos,
  lb: lbPos,
});

// watch
watch(
  () => chunkedEls,
  (v) => {
    console.log(0, data, data.isLazy);
    data.isLazy = Array(v.length).fill(false);
    console.log(1, v.length, data.isLazy.length, data);
  },
);

// provide
provide('checkIsPosStacked', checkIsPosStacked);
provide('incrementPosStacked', incrementPosStacked);
provide('updatePbPos', updatePbPos);
provide('updateLbPos', updateLbPos);
provide('getPos', getPos);
</script>

<template>
  <div class="container tategaki">
    <template v-if="chunkedEls">
      <template v-for="(els, idx0) in chunkedEls" :key="idx0">
        <v-progress-circular
          v-if="!data.isLazy[idx0]"
          color="primary"
          indeterminate
          style="top: 40%"
        ></v-progress-circular>
        <v-lazy v-model="data.isLazy[idx0]">
          <div>
            <TeiNodes
              v-for="(el, idx1) in els"
              :key="idx1"
              :el="el"
              :depth="1"
            ></TeiNodes>
          </div>
        </v-lazy>
      </template>
    </template>
    <!-- <TeiNodes :el="props.el" :depth="0"></TeiNodes> -->
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
