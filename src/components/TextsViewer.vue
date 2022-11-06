<script setup>
import { computed } from "vue";
import { useStore } from "@/stores";
import TeiContainer from "@/components/TeiContainer.vue";

// store
const store = useStore();

// computed
const tree = computed(() => {
  return store.currTree;
});

// methods
// // find a element by a tagname
// const xmlJsGetObjectByTagname = (uri, tagname) => {
//   if (xml[uri].tei.els[tagname] === undefined) {
//     xmlJsGetObjectsByTagnameInit(uri, tagname);
//   }
//   if (xml[uri].tei.els[tagname].length > 0) {
//     return xml[uri].tei.els[tagname][0];
//   }
//   return null;
// };
//
// // find elements by a tagname
// const xmlJsGetObjectsByTagname = (uri, tagname) => {
//   if (xml[uri].tei.els[tagname] === undefined) {
//     xmlJsGetObjectsByTagnameInit(uri, tagname);
//   }
//   return xml[uri].tei.els[tagname];
// };
// const xmlJsGetObjectsByTagnameInit = (uri, tagname) => {
//   const r = [];
//   const walk = (obj) => {
//     if (!obj.elements) {
//       return;
//     }
//     obj.elements.forEach((o) => {
//       if (o.name === tagname) {
//         r.push(o);
//       } else {
//         walk(o);
//       }
//     });
//   };
//   walk(xml[uri].xml);
//   xml[uri].tei.els[tagname] = r;
// };
//
// // get prettified json string
// const jsonPrettify = (obj) => {
//   if (!obj) {
//     return "";
//   }
//   return json2xml(obj, {
//     spaces: 2,
//     fullTagEmptyElement: true,
//     indentCxml: true,
//     indentAttributes: true,
//   });
// };
//
// // convert json to string
// const xmlJsToText = (obj) => {
//   return obj.elements.reduce(xmlJsToTextWalk, "");
// };
// const xmlJsToTextWalk = (prev, curr) => {
//   if (curr.type === "text") {
//     return `${prev}${curr.text}`;
//   }
//   return curr.elements.reduce(xmlJsToTextWalk, prev);
// };
</script>

<template>
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
      <v-list width="12rem">
        <v-list-item prepend-icon="mdi-cog"> 設定 </v-list-item>
        <v-divider></v-divider>
        <v-list-item> </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
  <TeiContainer v-if="tree" :el="tree"></TeiContainer>
</template>
