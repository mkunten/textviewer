<script setup>
import { reactive, onMounted, provide } from 'vue';
import axios from 'axios';
import { xml2js } from 'xml-js';
import { useStore } from '@/stores';
import TeiNodes from '@/components/TeiNodes.vue';

// store
const store = useStore();

// local variables
const { layout } = store.currText;
const pbPos = [Array(layout.length).fill(0), Array(layout.length).fill(0)];
const lbPos = Array(layout.length).fill(1);
let posStacked = 0;

// data
const data = reactive({
  chunked: [],
  isLazy: [],
});

// methods
const checkIsPosStacked = () => {
  if (posStacked > 0) {
    posStacked -= 1;
    return true;
  }
  return false;
};

const updatePbPos = (ed, canvas) => {
  for (let idx0 = 0; idx0 < layout.length; idx0 += 1) {
    const idx1 = layout[idx0].indexOf(ed);
    if (idx1 !== -1) {
      pbPos[0][idx0] = idx1;
      pbPos[1][idx0] = canvas;
      lbPos[idx0] = 1;
      break;
    }
  }
};

const updateLbPos = (ed, line) => {
  for (let idx = 0; idx < layout.length; idx += 1) {
    if (layout[idx].indexOf(ed) !== -1) {
      lbPos[idx] = line;
      break;
    }
  }
};

const getPos = () => ({
  pb: pbPos,
  lb: lbPos,
});

const parseCanvasId = (s) => (/^https?:\/\/.*\/canvas\/.*$/.test(s) ? s : null);

const doUpdatePos = (obj0) => {
  const obj1 = obj0;
  obj1.edRef = obj1.attributes.edRef
    ? obj1.attributes.edRef.slice(1)
    : store.currId;
  obj1.isOriginal = obj1.edRef === store.currId;
  if (obj1.name === 'pb') {
    let canvasId = parseCanvasId(obj1.attributes.facs);
    if (!canvasId) {
      if (obj1.attributes.source) {
        canvasId = `source:${obj1.attributes.source}`;
        // const source = store.currTei.xmlIDs[obj1.attributes.source];
        // if (source) {
        //   canvasId = parseCanvasId(source.attributes.source);
        // }
      }
    }
    updatePbPos(obj1.edRef, canvasId);
  }
  updateLbPos(obj1.edRef, obj1.attributes.n);
};

const updatePos = (obj) => {
  if (!checkIsPosStacked()) {
    doUpdatePos(obj);
    const siblings = obj.parent.elements;
    for (let i = obj.nodeIdx + 1; i < siblings.length; i += 1) {
      if (siblings[i].name === 'pb' || siblings[i].name === 'lb') {
        doUpdatePos(siblings[i]);
        posStacked += 1;
      } else {
        break;
      }
    }
  }
  return getPos();
};

const xmlJsInit = (obj) => {
  let id = 0;
  const map = {};
  const xmlIDs = {};
  const walk = (obj0, nodeIdx) => {
    const obj1 = obj0; // mutable: xxx
    obj1.elementID = id;
    obj1.nodeIdx = nodeIdx;
    if (obj1.name) {
      if (!map[obj1.name]) {
        map[obj1.name] = 1;
      } else {
        map[obj1.name] += 1;
      }
      if (obj1.name === 'pb' || obj1.name === 'lb') {
        // obj1.edRef = getEdRef(obj1);
        // obj1.isOriginal = obj1.edRef === store.currId;
        obj1.posText = JSON.stringify(updatePos(obj1));
      }
    }
    if (obj1.attributes && obj1.attributes['xml:id']) {
      xmlIDs[`#${obj1.attributes['xml:id']}`] = obj1;
    }
    id += 1;
    if (obj1.elements) {
      obj1.elements.forEach((obj2, idx) => {
        walk(obj2, idx, obj1);
      });
    }
  };
  walk(obj, 0, null);

  const list = Object.keys(map)
    .sort()
    .map((name) => ({
      name,
      count: map[name],
    }));
  // console.info('taglist:', list, map, 'xml:id', xmlIDs);

  return {
    teiData: { list, xmlIDs, els: {} },
    treeData: obj,
  };
};

const preprocessXML = async (uri) => {
  try {
    const response = await axios.get(uri);
    const js = xml2js(response.data, {
      addParent: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreComment: true,
    });
    return xmlJsInit(js);
  } catch (err) {
    console.error('TextsViewer: preprocessXML:', err);
  }
  return null;
};

const makeChunked = (tree) => {
  if (!tree) {
    return;
  }
  let [el] = tree.elements;
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
        || els[i].attributes.edRef === `#${store.currId}`)) {
      chunked.push(els.slice(prev, i));
      prev = i;
    }
  }
  chunked.push(els.slice(prev));
  data.isLazy = Array(chunked.length);
  data.chunked = chunked;
};

const init = async () => {
  const uri = store.texts[store.currId].xmlURI;
  const res = await preprocessXML(uri);
  if (res) {
    store.teiData[uri] = res.teiData;
    store.treeData[uri] = res.treeData;
    // console.info(res.treeData.elements[0].elements[1].elements[0]);
    makeChunked(res.treeData);
  }
};

// lifecycle hooks
onMounted(() => {
  console.info('TeiContainer mounted');
  init();
});

// provide
provide('parseCanvasId', parseCanvasId);
</script>

<template>
  <div class="container tategaki">
    <template v-if="data.chunked">
      <template v-for="(els, idx0) in data.chunked" :key="idx0">
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
