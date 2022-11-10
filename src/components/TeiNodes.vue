<script>
import {
  toRef, h, inject, useCssModule,
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
    depth: { type: Number, default: 0, required: true },
  },

  setup(props) {
    // store
    const store = useStore();

    // style
    const style = useCssModule();

    // props
    const elRef = toRef(props, 'el');
    const depthRef = toRef(props, 'depth');

    // methods
    const renderChild = (el) => h(TeiNodes, {
      el,
      depth: depthRef.value + 1,
    });

    const parseCanvasId = inject('parseCanvasId');

    const parsePb1 = (pb1) => pb1.map((v) => {
      if (!Number.isInteger(v) && v.startsWith('source:#')) {
        const source = store.currTei.xmlIDs[v.slice(7)];
        if (source) {
          return parseCanvasId(source.attributes.source);
        }
      }
      return v;
    });

    const onPosClicked = (event) => {
      const pos = event.target.classList.contains('v-badge__badge')
        ? JSON.parse(event.target.parentNode.parentNode.dataset.pos)
        : JSON.parse(event.target.dataset.pos);
      store.setM3Layout(pos.pb[0], parsePb1(pos.pb[1]), pos.lb);
      event.preventDefault();
    };

    const getClassName = (tategaki = false) => (
      style[`tei-${elRef.value.name}`] ? style[`tei-${elRef.value.name}`] : ''
    ) + (tategaki ? ` ${style['tategaki-digits']}` : '');

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
            if (elRef.value.isOriginal) {
              vnodes = [h('br', { class: getClassName() })];
            } else {
              vnodes = [];
            }
            vnodes.push(
              h(
                VChip,
                {
                  class: getClassName(),
                  title: elRef.value.posText,
                  color: elRef.value.isOriginal ? 'primary' : 'secondary',
                  'prepend-icon': 'mdi-book-open-page-variant-outline',
                  'data-pos': elRef.value.posText,
                  onClick: onPosClicked,
                },
                () => elRef.value.attributes.n,
              ),
            );
            break;
          }
          case 'lb': {
            if (elRef.value.isOriginal) {
              vnodes = [h('br', { class: getClassName() })];
            } else {
              vnodes = [];
            }
            vnodes.push(
              h(VBadge, {
                class: getClassName(true),
                style: 'cursor: pointer',
                title: elRef.value.posText,
                color: elRef.value.isOriginal ? 'primary' : 'secondary',
                content: elRef.value.attributes.n,
                inline: true,
                'data-pos': elRef.value.posText,
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

.tei-lb {
}

.tategaki-digits {
  text-combine-upright: all;
}
</style>
