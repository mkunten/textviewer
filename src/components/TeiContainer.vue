<script setup>
import {
  reactive, computed, watch, onMounted, provide, readonly,
} from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import Prism from 'vue-prism-component/src/index';
import axios from 'axios';
import { xml2js, json2xml } from 'xml-js';
import TeiNodes from '@/components/TeiNodes.vue';
import 'prismjs/themes/prism.css';

// props
const props = defineProps({
  edRef: { type: String, requied: true },
  uri: { type: String, required: true },
  layout: { type: Object, required: true },
  setM3Layout: { type: Function, required: true },
});

// local variables
const pbPos = [
  Array(props.layout.length).fill(0),
  Array(props.layout.length).fill(0),
];
const lbPos = Array(props.layout.length).fill(1);
let posStacked = 0;

// data
const data = reactive({
  // text
  tei: {},
  tree: {},
  chunked: [],
  isLazy: [],
  // menu
  menuItems: [
    {
      id: 'settings',
      title: '設定',
      props: {
        'prepend-icon': 'mdi-cog',
      },
    }, {
      type: 'divider',
    }, {
      id: 'tools',
      title: 'TEI tools',
      props: {
        'prepend-icon': 'mdi-cog',
      },
    },
  ],
  // dialog
  isDialog: {
    settings: false,
    tools: false,
  },
  // tools
  codes: [],
  teiSelected: '',
});

// computed
const teiItems = computed(() => (data.tei.xmlIds
  ? data.tei.list.concat(Object.keys(data.tei.xmlIds)
    .map((name) => ({ name })))
  : []));

// methods for provide
const parseCanvasId = (s) => (/^https?:\/\/.*\/canvas\/.*$/.test(s) ? s : null);

// methods
const checkIsPosStacked = () => {
  if (posStacked > 0) {
    posStacked -= 1;
    return true;
  }
  return false;
};

const updatePbPos = (ed, canvas) => {
  for (let idx0 = 0; idx0 < props.layout.length; idx0 += 1) {
    const idx1 = props.layout[idx0].indexOf(ed);
    if (idx1 !== -1) {
      pbPos[0][idx0] = idx1;
      pbPos[1][idx0] = canvas;
      lbPos[idx0] = 1;
      break;
    }
  }
};

const updateLbPos = (ed, line) => {
  for (let idx = 0; idx < props.layout.length; idx += 1) {
    if (props.layout[idx].indexOf(ed) !== -1) {
      lbPos[idx] = line;
      break;
    }
  }
};

const getPos = () => ({
  pb: pbPos,
  lb: lbPos,
});

const doUpdatePos = (obj0) => { // notice: destructive method...
  const obj1 = obj0; // destructive
  obj1.edRef = obj1.attributes.edRef
    ? obj1.attributes.edRef.slice(1)
    : props.edRef;
  obj1.isOriginal = obj1.edRef === props.edRef;
  if (obj1.name === 'pb') {
    let canvasId = parseCanvasId(obj1.attributes.facs);
    if (!canvasId) {
      if (obj1.attributes.source) {
        canvasId = `source:${obj1.attributes.source}`;
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
  const xmlIds = {};
  const walk = (obj0, nodeIdx) => {
    const obj1 = obj0; // mutable: xxx
    obj1.elementId = id;
    obj1.nodeIdx = nodeIdx;
    if (obj1.name) {
      if (!map[obj1.name]) {
        map[obj1.name] = 1;
      } else {
        map[obj1.name] += 1;
      }
      if (obj1.name === 'pb' || obj1.name === 'lb') {
        obj1.posText = JSON.stringify(updatePos(obj1));
      }
    }
    if (obj1.attributes && obj1.attributes['xml:id']) {
      xmlIds[`#${obj1.attributes['xml:id']}`] = obj1;
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
  console.info('taglist:', list, map, 'xml:id', xmlIds);

  return {
    tei: { list, xmlIds, els: {} },
    tree: obj,
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
        || els[i].attributes.edRef === `#${props.edRef}`)) {
      chunked.push(els.slice(prev, i));
      prev = i;
    }
  }
  chunked.push(els.slice(prev));
  data.isLazy = Array(chunked.length);
  data.chunked = chunked;
};

const init = async () => {
  const res = await preprocessXML(props.uri);
  if (res) {
    data.tei = res.tei;
    data.tree = res.tree;
    // console.info(res.treeData.elements[0].elements[1].elements[0]);
    makeChunked(data.tree);
  }
};

const initTeiObjectsByTagname = (tagname) => {
  const r = [];
  const walk = (obj) => {
    if (!obj.elements) {
      return;
    }
    obj.elements.forEach((o) => {
      if (o.name === tagname) {
        r.push(o);
      } else {
        walk(o);
      }
    });
  };
  walk(data.tree);
  data.tei.els[tagname] = r;
};

const getTeiObjectsByTagname = (tagname) => {
  if (data.tei.els[tagname] === undefined) {
    initTeiObjectsByTagname(tagname);
  }
  return data.tei.els[tagname];
};

const prettifyJson = (obj) => {
  if (!obj) {
    return '';
  }
  return json2xml({ elements: [obj] }, {
    spaces: 2,
    fullTagEmptyElement: true,
    indentCxml: true,
    indentAttributes: true,
  });
};

const onMenuSelected = (param) => { // { id, value, event }
  if (typeof data.isDialog[param.id] !== 'undefined') {
    data.isDialog[param.id] = true;
  }
};

const onVfmOpened = () => {
  document.body.style.paddingRight = 0;
  // though cf. https://github.com/vue-final/vue-final-modal/issues/23
};

// watch
watch(() => data.teiSelected, (v) => {
  if (v.startsWith('#')) {
    const el = data.tei.xmlIds[v];
    data.codes = [{
      elementId: el.elementId,
      code: prettifyJson(el),
    }];
  } else {
    const els = getTeiObjectsByTagname(v);
    data.codes = els.map((el) => ({
      elementId: el.elementId,
      code: prettifyJson(el),
    }));
  }
});

// lifecycle hooks
onMounted(() => {
  console.info('TeiContainer mounted');
  init();
});

// provide
provide('parseCanvasId', parseCanvasId);
provide('teiXmlIds', readonly(() => data.tei.xmlIds));
provide('setM3Layout', props.setM3Layout);
</script>

<template>
  <!-- menu -->
  <v-card position="absolute" style="right: 0; z-index: 1000">
    <v-menu transition="slice-x-reverse-transition" open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-menu"
          variant="plain"
          rounded="0"
          v-bind="props"
        ></v-btn>
      </template>
      <v-list
        width="12rem"
        nav
        density="compact"
        :items="data.menuItems"
        item-value="id"
        @click:select="onMenuSelected"
      ></v-list>
    </v-menu>
  </v-card>
  <!-- text -->
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
  </div>
  <!-- settings -->
  <v-dialog v-model="data.isDialog.settings">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>設定</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon="mdi-close"
            @click="data.isDialog.settings = false"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        nothing...
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- tools -->
  <VueFinalModal
    v-model="data.isDialog.tools"
    classes="tools-dialog-container"
    :hide-overlay="true"
    :click-to-close="false"
    :z-index-base="1100"
    :drag="true"
    :resize="true"
    @opened="onVfmOpened"
  >
    <v-card
      variant="elevated"
    >
      <v-toolbar>
        <v-toolbar-title>TEI tools</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon="mdi-close"
            @click="data.isDialog.tools = false"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-autocomplete
          v-model="data.teiSelected"
          label="tag name or #xml:id"
          density="compact"
          :items="teiItems"
          item-title="name"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" nav>
              {{ item.raw.name }}
              <template v-if="item.raw.count">
                ({{ item.raw.count }})
              </template>
            </v-list-item>
          </template>
        </v-autocomplete>
        <v-sheet
          height="400"
          class="overflow-auto"
          scrollable v-if="data.codes.length > 0"
        >
          <v-card
            v-for="(code, idx) in data.codes"
            :key="idx"
          >
            <v-chip
              label
              size="x-small"
            >
              {{ code.elementId }}
            </v-chip>
            <Prism
              :code="code.code"
              language="xml"
            ></Prism>
          </v-card>
        </v-sheet>
      </v-card-text>
    </v-card>
  </VueFinalModal>
</template>

<style scoped>
/* text */
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

/* tools */
:deep(.tools-dialog-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.tools-dialog-container) > div {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  filter: drop-shadow(0 0 16px black);
}
</style>
