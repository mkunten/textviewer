<script setup>
import Mirador from 'mirador/dist/es/src';
import { miradorImageToolsPlugin } from 'mirador-image-tools';
import {
  reactive, watch, onMounted, onBeforeUnmount,
} from 'vue';
import { useStore } from '@/stores/index';

// store
const store = useStore();

// props
const props = defineProps({
  miradorId: String,
  target: String,
});

// data
const data = reactive({
  m3: null,
});

// methods
const generateM3Catalog = () => Object.values(store.currText.manifestURI).map((manifestId) => ({
  manifestId,
}));

const generateM3Windows = () => store.currText.layout.map((arr, i) => {
  const id = arr[store.currText.layoutIdIdx[i]];
  const manifestId = store.currText.manifestURI[id];
  return { id, manifestId };
});

const generateM3Layout = () => {
  const { layout, layoutIdIdx } = store.currText;
  let m3layout = layout[0][layoutIdIdx[0]];
  if (layout.length >= 2) {
    m3layout = {
      first: layout[0][layoutIdIdx[0]],
      second: layout[1][layoutIdIdx[1]],
      direction: 'column',
    };
    for (let i = 2; i < layout.length; i += 1) {
      m3layout = {
        first: m3layout,
        second: layout[2][layoutIdIdx[i]],
        direction: 'column',
      };
    }
  }
  return m3layout;
};

const generateM3Config = () => ({
  language: 'ja',
  id: props.miradorId,
  catalog: generateM3Catalog(),
  windows: generateM3Windows(),
  workspace: {
    layout: generateM3Layout(),
  },
});

const initM3 = () => {
  if (data.m3) {
    data.m3.unmount();
  }

  data.m3 = Mirador.viewer(generateM3Config(), [...miradorImageToolsPlugin]);

  window.m3 = data.m3; // debug
};

// const addM3Window = (window) => {
//   const windows = Object.keys(data.m3.store.getState().windows);
//   if (!windows.includes(window.id)) {
//     data.m3.store.dispatch(Mirador.actions.addWindow(window));
//   }
// };

const generateCanvasId = (id, canvasIdOrIdx) => (Number.isInteger(canvasIdOrIdx)
  ? data.m3.store.getState().manifests[store.currText.manifestURI[id]].json
    .sequences[0].canvases[canvasIdOrIdx]['@id']
  : canvasIdOrIdx);

const updateM3LayoutIfNecessary = (idIdx, canvasIdOrIdx) => {
  let isLayoutUpdated = false;
  const expected = idIdx.map((n, idx) => store.currText.layout[idx][n]);
  const { windowIds } = data.m3.store.getState().workspace;
  expected.forEach((n, idx) => {
    if (!windowIds.includes(n)) {
      if (Number.isInteger(canvasIdOrIdx[idx])) {
        data.m3.store.dispatch(
          Mirador.actions.addWindow({
            id: n,
            manifestId: store.currText.manifestURI[n],
            canvasIndex: canvasIdOrIdx[idx],
          }),
        );
      } else {
        data.m3.store.dispatch(
          Mirador.actions.addWindow({
            id: n,
            manifestId: store.currText.manifestURI[n],
            canvasId: canvasIdOrIdx[idx],
          }),
        );
      }
      isLayoutUpdated = true;
    }
  });
  windowIds.forEach((n, idx) => {
    if (isLayoutUpdated && !expected.includes(n)) {
      data.m3.store.dispatch(Mirador.actions.removeWindow(n));
    } else {
      data.m3.store.dispatch(
        Mirador.actions.setCanvas(n, generateCanvasId(n, canvasIdOrIdx[idx])),
      );
    }
  });
  if (isLayoutUpdated) {
    data.m3.store.dispatch(
      Mirador.actions.updateWorkspaceMosaicLayout(generateM3Layout()),
    );
    console.info('m3 layout updated');
  }
};

watch(
  () => store.currId,
  () => {
    initM3();
  },
);

watch(
  () => [store.currText.layoutIdIdx, store.currText.layoutCanvasIdOrIdx],
  (v) => {
    updateM3LayoutIfNecessary(...v);
  },
  { deep: true },
);

// lifecycle hooks
onMounted(() => {
  console.info('m3: mounted');
  initM3();
});

onBeforeUnmount(() => {
  console.info('m3: unmounted');
  if (data.m3) {
    data.m3.unmount();
  }
});
</script>

<template>
  <div :id="props.miradorId" class="mirador"></div>
</template>

<style scoped>
.mirador {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
