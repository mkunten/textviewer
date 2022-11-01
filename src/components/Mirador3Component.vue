<script setup>
import Mirador from "mirador/dist/es/src/index";
import { miradorImageToolsPlugin } from "mirador-image-tools";
import ReactDOM from "react-dom";
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { useStore } from "../stores/index";
import { useTextsStore } from "../stores/texts";

// delay for m3 dispatch processing?
const temporalDelay = 360;

// store
const store = useStore();
const textsStore = useTextsStore();

// props
const props = defineProps({
  miradorId: String,
  target: String,
});

// methods
const initM3 = async () => {
  if (store.m3) {
    console.log("initM3 rerender");
    ReactDOM.render(
      store.m3.render(),
      document.getElementById(props.miradorId)
    );
  } else {
    console.log("initM3");
    const m3 = Mirador.viewer(
      {
        language: "ja",
        id: props.miradorId,
        window: {
          sideBarOpenByDefault: false,
        },
      },
      [...miradorImageToolsPlugin]
    );
    await store.setM3(m3);
    window.m3 = m3; // debug
  }
  await nextTick();
  setM3Layout();
};

const setM3Layout = () => {
  const { manifestURI, layoutGroup, layout } = textsStore.currText;
  const windows = Object.keys(store.m3.store.getState().windows);
  for (const [id, manifestId] of Object.entries(manifestURI)) {
    if (!windows.includes(id)) {
      store.m3.store.dispatch(
        Mirador.actions.addWindow({
          id,
          manifestId,
        })
      );
    }
  }
  // m3layout: m3.store.getState().workspace().layout
  let m3layout = layoutGroup[0][0];
  const getLayout = (windowIdx) => {
    return layoutGroup[windowIdx][layout[windowIdx] || 0];
  };
  if (layoutGroup.length >= 2) {
    m3layout = {
      first: getLayout(0),
      second: getLayout(1),
      direction: "column",
    };
    for (let i = 2; i < layoutGroup.length; i += 1) {
      m3layout = {
        first: m3layout,
        second: getLayout(i),
        direction: "column",
      };
    }
  }

  setTimeout(() => {
    store.m3.store.dispatch(
      Mirador.actions.updateWorkspaceMosaicLayout(m3layout)
    );
  }, temporalDelay);
};

const setM3Canvas = (windowId, canvasId) => {
  store.m3.store.dispatch(Mirador.actions.setCanvas(windowId, canvasId));
};

const setM3CanvasBySeqIdx = (windowId, seqIdx) => {
  setM3Canvas(
    windowId,
    store.m3.store.getState().manifests[
      textsStore.currText.manifestURI[windowId]
    ].json.sequences[0].canvases[seqIdx]["@id"]
  );
};

// watch
// watch(textsStore.currId, () => {
//   initM3();
// });

// lifecycle hooks
onMounted(() => {
  console.log("m3: mounted");
  initM3();
});

onBeforeUnmount(() => {
  console.log("m3: unmounted");
  store.m3.unmount();
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
