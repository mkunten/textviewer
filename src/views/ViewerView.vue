<script setup>
import { onMounted } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import { useStore } from '@/stores';
import 'splitpanes/dist/splitpanes.css';
import Mirador3Viewer from '@/components/Mirador3Viewer.vue';
import TextsViewer from '@/components/TextsViewer.vue';
import DebugView from '@/components/DebugView.vue';

const store = useStore();

onMounted(() => {
  store.setCurrText(store.currId);
});
</script>

<template>
  <Splitpanes class="default-theme">
    <Pane>
      <Mirador3Viewer v-if="!store.debug.m3" mirador-id="m3"></Mirador3Viewer>
      <DebugView v-else></DebugView>
    </Pane>
    <Pane>
      <TextsViewer v-if="!store.debug.texts"></TextsViewer>
      <DebugView v-else></DebugView>
    </Pane>
  </Splitpanes>
</template>
