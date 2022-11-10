<script setup>
import { reactive, computed, watch } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import Prism from 'vue-prism-component/src/index.js';
import { useStore } from '@/stores';
import TeiContainer from '@/components/TeiContainer.vue';
import 'prismjs/themes/prism.css';

// store
const store = useStore();

// data
const data = reactive({
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
      id: 'tei',
      title: 'TEI tools',
      props: {
        'prepend-icon': 'mdi-cog',
      },
    },
  ],
  codes: [],
  teiSelected: '',
  isDialog: {
    settings: false,
    tei: false,
  },
});

// computed
const tree = computed(() => store.currTree);
const teiItems = computed(() => (store.currTei
  ? store.currTei.list.concat(Object.keys(store.currTei.xmlIDs)
    .map((name) => ({ name })))
  : []));

// methods
const onMenuSelected = (param) => { // (id, value, event)
  if (typeof data.isDialog[param.id] !== 'undefined') {
    data.isDialog[param.id] = true;
  }
};

const onVfmOpened = () => {
  document.body.style.paddingRight = 0;
  // though cf. https://github.com/vue-final/vue-final-modal/issues/23
};

watch(() => data.teiSelected, (v) => {
  if (v.startsWith('#')) {
    const el = store.currTei.xmlIDs[v];
    data.codes = [{
      elementID: el.elementID,
      code: store.prettifyJson(el),
    }];
  } else {
    const els = store.getTeiObjectsByTagname(v);
    data.codes = els.map((el) => ({
      elementID: el.elementID,
      code: store.prettifyJson(el),
    }));
  }
});
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
  <TeiContainer
    v-if="tree"
    :el="tree"
  ></TeiContainer>
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
  <VueFinalModal
    v-model="data.isDialog.tei"
    classes="tei-dialog-container"
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
            @click="data.isDialog.tei = false"
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
              {{ code.elementID }}
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
:deep(.tei-dialog-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.tei-dialog-container) > div {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  filter: drop-shadow(0 0 16px black);
}
</style>
