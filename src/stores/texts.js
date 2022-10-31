import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'texts',
  state: () => ({
    m3: null,
    list: [{
      provider: 'textwg',
      items: ['奈良女'],
    }],
    currId: '奈良女',
    texts: {
      '奈良女': {
        title: '奈良女',
        text: 'http://localhost:1323/api/files/xmlbyname/kiryo20221026.xml',
        data: {
          manifestURI: {
            '奈良女': 'https://kotenseki.nijl.ac.jp/biblio/100260054/manifest',
            '南葵1': 'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/b047fc5e-61a7-9c8f-9344-053245cb06c4/manifest',
            '南葵2': 'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/a506c60b-9c34-4c1f-0478-e52605252f9d/manifest',
            '南葵3': 'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/e77cbfbb-52fd-18da-891a-b334ea1fa43d/manifest',
          },
        },
      },
    },
  }),
  getters: {
    currText: (state) => state.texts[state.currId],
  },
  actions: {
    setCurrText(id) {
      if (!Object.keys(this.texts).includes(id)) {
        console.error('store: setCurrText: illegal id: ', id);
        return;
      }
      this.currId = textId;
    },
    setData(data) {
      this.currText.data = data;
    },
  },
});