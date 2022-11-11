import { defineStore, acceptHMRUpdate } from 'pinia';

/* eslint-disable-next-line import/prefer-default-export */
export const useStore = defineStore({
  id: 'index',

  state: () => ({
    debug: {
      m3: false,
      texts: false,
    },
    messages: [],
    m3: null,
    list: [
      {
        provider: 'textwg',
        items: ['奈良女'],
      },
    ],
    currId: '奈良女',
    texts: {
      奈良女: {
        title: '奈良女',
        // xmlURI: "http://localhost:1323/api/files/xmlbyname/kiryo20221026.xml",
        xmlURI: 'http://localhost:1323/api/files/xmlbyname/kiryoshort.xml',
        manifestURI: {
          奈良女: 'https://kotenseki.nijl.ac.jp/biblio/100260054/manifest',
          南葵1:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/b047fc5e-61a7-9c8f-9344-053245cb06c4/manifest',
          南葵2:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/a506c60b-9c34-4c1f-0478-e52605252f9d/manifest',
          南葵3:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/e77cbfbb-52fd-18da-891a-b334ea1fa43d/manifest',
        },
        layout: [['奈良女'], ['南葵1', '南葵2', '南葵3']],
        layoutIdIdx: [0, 0],
        layoutCanvasIdOrIdx: [0, 0], // idx or canvasId
      },
    },
    teiData: {},
    treeData: {},
  }),

  getters: {
    currText(state) {
      return state.texts[state.currId];
    },
    currTei(state) {
      return state.teiData[state.texts[state.currId].xmlURI];
    },
    currTree(state) {
      return state.treeData[state.texts[state.currId].xmlURI];
    },
  },

  actions: {
    // m3
    setM3(m3) {
      this.m3 = m3;
    },
    setM3Layout(idIdx, canvasIdOrIdx, lineIdx) {
      this.texts[this.currId].layoutIdIdx = idIdx;
      this.texts[this.currId].layoutCanvasIdOrIdx = canvasIdOrIdx;
      this.texts[this.currId].layoutLineIdx = lineIdx;
    },
    // texts
    setCurrText(id) {
      if (!this.texts[id]) {
        console.error('store: setCurrText: illegal id: ', id);
        return null;
      }
      this.currId = id;
      return id;
    },
  },
});

// ??
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
