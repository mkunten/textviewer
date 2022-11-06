<script setup>
import Mirador from "mirador/dist/es/src/index";
import { miradorImageToolsPlugin } from "mirador-image-tools";
import { watch, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "@/stores/index";

// store
const store = useStore();

// props
const props = defineProps({
  miradorId: String,
  target: String,
});

// methods
const initM3 = () => {
  if (store.m3) {
    store.m3.unmount();
  }

  const m3 = Mirador.viewer(generateM3Config(), [...miradorImageToolsPlugin]);
  store.setM3(m3);
  window.m3 = m3; // debug
};

const generateM3Config = () => ({
  language: "ja",
  id: props.miradorId,
  catalog: generateM3Catalog(),
  windows: generateM3Windows(),
  workspace: {
    layout: generateM3Layout(),
  },
});

const generateM3Catalog = () =>
  Object.values(store.currText.manifestURI).map((manifestId) => ({
    manifestId,
  }));

const generateM3Windows = () =>
  store.currText.layout.map((arr, i) => {
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
      direction: "column",
    };
    for (let i = 2; i < layout.length; i += 1) {
      m3layout = {
        first: m3layout,
        second: layout[2][layoutIdIdx[i]],
        direction: "column",
      };
    }
  }
  return m3layout;
};

// const addM3Window = (window) => {
//   const windows = Object.keys(store.m3.store.getState().windows);
//   if (!windows.includes(window.id)) {
//     store.m3.store.dispatch(Mirador.actions.addWindow(window));
//   }
// };

const updateM3LayoutIfNecessary = (idIdx, canvasIdOrIdx) => {
  let isLayoutUpdated = false;
  const expected = idIdx.map((n, idx) => store.currText.layout[idx][n]);
  const windowIds = store.m3.store.getState().workspace.windowIds;
  expected.map((n, idx) => {
    if (!windowIds.includes(n)) {
      if (Number.isInteger(canvasIdOrIdx[idx])) {
        store.m3.store.dispatch(
          Mirador.actions.addWindow({
            id: n,
            manifestId: store.currText.manifestURI[n],
            canvasIndex: canvasIdOrIdx[idx],
          })
        );
      } else {
        store.m3.store.dispatch(
          Mirador.actions.addWindow({
            id: n,
            manifestId: store.currText.manifestURI[n],
            canvasId: canvasIdOrIdx[idx],
          })
        );
      }
      isLayoutUpdated = true;
    }
  });
  windowIds.map((n, idx) => {
    if (isLayoutUpdated && !expected.includes(n)) {
      store.m3.store.dispatch(Mirador.actions.removeWindow(n));
    } else {
      store.m3.store.dispatch(
        Mirador.actions.setCanvas(n, generateCanvasId(n, canvasIdOrIdx[idx]))
      );
    }
  });
  if (isLayoutUpdated) {
    store.m3.store.dispatch(
      Mirador.actions.updateWorkspaceMosaicLayout(generateM3Layout())
    );
    console.info("m3 layout updated");
  }
};

const generateCanvasId = (id, canvasIdOrIdx) =>
  Number.isInteger(canvasIdOrIdx)
    ? store.m3.store.getState().manifests[store.currText.manifestURI[id]].json
        .sequences[0].canvases[canvasIdOrIdx]["@id"]
    : canvasIdOrIdx;

watch(
  () => store.currId,
  () => {
    initM3();
  }
);

watch(
  () => [store.currText.layoutIdIdx, store.currText.layoutCanvasIdOrIdx],
  (v) => {
    updateM3LayoutIfNecessary(...v);
  },
  { deep: true }
);

// lifecycle hooks
onMounted(() => {
  console.log("m3: mounted");
  if (store.m3) {
    store.m3.unmount();
  }
  initM3();
});

onBeforeUnmount(() => {
  console.log("m3: unmounted");
  if (store.m3) {
    store.m3.unmount();
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
