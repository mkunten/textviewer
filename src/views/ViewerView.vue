<script setup>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import Mirador3 from "@/components/Mirador3Component.vue";
</script>

<template>
  <Splitpanes class="default-theme">
    <Pane>
      <Mirador3 mirador-id="m3"></Mirador3>
    </Pane>
    <Pane> </Pane>
  </Splitpanes>
</template>
