<script>
import {
  toRef, inject, h, useCssModule,
} from 'vue';
import { VBadge } from 'vuetify/components/VBadge';
import { VBtn } from 'vuetify/components/VBtn';
import { VChip } from 'vuetify/components/VChip';
import { useStore } from '../stores';
import TeiApp from '@/components/TeiApp.vue';
import TeiNodes from '@/components/TeiNodes.vue';

export default {
  components: {
    TeiApp,
  },

  props: {
    el: { type: Object, default: null, required: true },
    parents: { type: Array, default: () => [], required: false },
    depth: { type: Number, default: 0, required: true },
  },

  setup(props) {
    // store
    const store = useStore();

    // style
    const style = useCssModule();

    // props
    const elRef = toRef(props, 'el');
    const parentsRef = toRef(props, 'parents');
    const depthRef = toRef(props, 'depth');

    // methods
    const renderChild = (el) => h(TeiNodes, {
      el,
      parents: parentsRef.value.concat(elRef.value.name),
      depth: depthRef.value + 1,
    });

    const parseCanvasId = (s) => (/^https?:\/\/.*\/canvas\/.*$/.test(s) ? s : null);

    const updatePb = (ed, attrs) => {
      let canvasId = parseCanvasId(attrs.facs);
      if (!canvasId) {
        if (attrs.source) {
          const source = store.currTei.xmlIDs[attrs.source];
          if (source) {
            canvasId = parseCanvasId(source.attributes.source);
          }
        }
      }
      const updatePbPos = inject('updatePbPos');
      return updatePbPos(ed, canvasId);
    };

    const updateLb = (ed, line) => {
      const updateLbPos = inject('updateLbPos');
      return updateLbPos(ed, line);
    };

    const onPosClicked = (event) => {
      const pos = event.target.classList.contains('v-badge__badge')
        ? JSON.parse(event.target.parentNode.parentNode.dataset.pos)
        : JSON.parse(event.target.dataset.pos);
      store.setM3Layout(pos.pb[0], pos.pb[1], pos.lb);
      event.preventDefault();
    };

    const getClassName = (tategaki = false) => (tategaki
      ? `${style[`tei-${elRef.value.name}`]} ${style.tategaki}`
      : style[`tei-${elRef.value.name}`]);

    // render
    let vnodes = null;

    switch (elRef.value.type) {
      case 'text': {
        if (elRef.value.text) {
          vnodes = h('span', elRef.value.text);
        }
        break;
      }
      case 'element': {
        switch (elRef.value.name) {
          case 'pb': {
            const ed = elRef.value.attributes.edRef
              ? elRef.value.attributes.edRef.slice(1)
              : store.currId;
            const isOriginal = ed === store.currId;
            const pos = updatePb(ed, elRef.value.attributes);
            if (isOriginal) {
              vnodes = [h('br', { class: getClassName() })];
            } else {
              vnodes = [];
            }
            vnodes.push(
              h(
                VChip,
                {
                  class: getClassName(true),
                  title: elRef.value.attributes.edRef,
                  color: isOriginal ? 'primary' : 'secondary',
                  'prepend-icon': 'mdi-book-open-page-variant-outline',
                  'data-pos': JSON.stringify(pos),
                  onClick: onPosClicked,
                },
                () => elRef.value.attributes.n,
              ),
            );
            break;
          }
          case 'lb': {
            const ed = elRef.value.attributes.edRef
              ? elRef.value.attributes.edRef.slice(1)
              : store.currId;
            const isOriginal = ed === store.currId;
            const pos = updateLb(ed, elRef.value.attributes.n);
            if (isOriginal) {
              vnodes = [h('br', { class: getClassName() })];
            } else {
              vnodes = [];
            }
            vnodes.push(
              h(VBadge, {
                class: getClassName(true),
                style: 'cursor: pointer',
                title: elRef.value.attributes.edRef,
                color: isOriginal ? 'primary' : 'secondary',
                content: elRef.value.attributes.n,
                inline: true,
                'data-pos': JSON.stringify(pos),
                onClick: onPosClicked,
              }),
            );
            break;
          }
          // case "graphic": {
          //   if (elRef.value.attributes.n) {
          //     vnodes = createVNodeByURI(elRef.value.attributes.n);
          //   }
          //   break;
          // }
          case 'app': {
            vnodes = h(TeiApp, {
              el: elRef.value,
              parents: parentsRef.value,
              depth: depthRef.value + 1,
            });
            break;
          }
          case 'add': {
            vnodes = h(VBtn, {
              variant: 'plain',
              size: 'x-small',
              icon: 'mdi-information',
              title: '付加',
              onClick: () => {
                window.message('add');
              },
            });
            break;
          }
          default: {
            if (elRef.value.elements) {
              vnodes = elRef.value.elements.map((el) => renderChild(el));
            }
            break;
          }
        }
        break;
      }
      case 'cdata': {
        break;
      }
      case 'comment': {
        break;
      }
      default: {
        console.error('TeiNodes: unexpected type:', elRef.value);
        break;
      }
    }

    return () => vnodes;
  },
};
</script>

<style module>
.tei-pb {
  height: auto !important;
  padding: 12px 0 !important;
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
</style>