import{e as me,d as D,m as X,f as p,h as Le,g as dt,i as Me,j as he,r as T,u as R,k as ft,b as i,l as Y,F as U,V as vt,n as ge,p as ke,q as Ne,s as xe,t as be,v as mt,x as ht,y as gt,z as bt,A as yt,B as St,C as Vt,D as Ct,E as pt,G as kt,H as xt,I as ae,J as De,K as wt,L as _t,M as Tt,N as Bt,O as je,P as ye,Q as He,R as Ue,S as ne,T as oe,U as $t,W as Ye,X as Ft,Y as Xe,Z as we,$ as zt,a0 as _e,a1 as fe,a2 as Pt,a3 as It,a4 as Ge,a5 as Et,a6 as At,a7 as E,a8 as Rt,a9 as Ot,aa as Lt,ab as j,ac as Mt,ad as We,ae as qe,af as Nt,ag as Dt,ah as jt,ai as Ht,aj as Ut,ak as Yt,al as Xt,am as Gt,an as Wt,ao as qt,ap as Te,o as M,aq as H,w as V,c as Kt,ar as Jt,as as Be,at as ee,a as N,au as te,av as A,aw as ue,ax as Qt,ay as $e,az as Fe,aA as ze}from"./index.43e3eefa.js";import{V as re}from"./VContainer.e43cd123.js";import{m as Zt,a as el,f as tl,b as ll,V as al,c as nl,d as ol,e as sl,g as il,h as ce}from"./VTextField.7c0d6178.js";const Se=["sm","md","lg","xl","xxl"],Ke=(()=>Se.reduce((e,n)=>(e[n]={type:[Boolean,String,Number],default:!1},e),{}))(),Je=(()=>Se.reduce((e,n)=>(e["offset"+me(n)]={type:[String,Number],default:null},e),{}))(),Qe=(()=>Se.reduce((e,n)=>(e["order"+me(n)]={type:[String,Number],default:null},e),{}))(),Pe={col:Object.keys(Ke),offset:Object.keys(Je),order:Object.keys(Qe)};function ul(e,n,t){let a=e;if(!(t==null||t===!1)){if(n){const u=n.replace(e,"");a+=`-${u}`}return e==="col"&&(a="v-"+a),e==="col"&&(t===""||t===!0)||(a+=`-${t}`),a.toLowerCase()}}const rl=["auto","start","end","center","baseline","stretch"],cl=D({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...Ke,offset:{type:[String,Number],default:null},...Je,order:{type:[String,Number],default:null},...Qe,alignSelf:{type:String,default:null,validator:e=>rl.includes(e)},...X()},setup(e,n){let{slots:t}=n;const a=p(()=>{const u=[];let r;for(r in Pe)Pe[r].forEach(s=>{const c=e[s],l=ul(r,s,c);l&&u.push(l)});const o=u.some(s=>s.startsWith("v-col-"));return u.push({"v-col":!o||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),u});return()=>{var u;return Le(e.tag,{class:a.value},(u=t.default)==null?void 0:u.call(t))}}}),dl=["sm","md","lg","xl","xxl"],Ve=["start","end","center"],Ze=["space-between","space-around","space-evenly"];function Ce(e,n){return dl.reduce((t,a)=>(t[e+me(a)]=n(),t),{})}const fl=[...Ve,"baseline","stretch"],et=e=>fl.includes(e),tt=Ce("align",()=>({type:String,default:null,validator:et})),vl=[...Ve,...Ze],lt=e=>vl.includes(e),at=Ce("justify",()=>({type:String,default:null,validator:lt})),ml=[...Ve,...Ze,"stretch"],nt=e=>ml.includes(e),ot=Ce("alignContent",()=>({type:String,default:null,validator:nt})),Ie={align:Object.keys(tt),justify:Object.keys(at),alignContent:Object.keys(ot)},hl={align:"align",justify:"justify",alignContent:"align-content"};function gl(e,n,t){let a=hl[e];if(t!=null){if(n){const u=n.replace(e,"");a+=`-${u}`}return a+=`-${t}`,a.toLowerCase()}}const de=D({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:et},...tt,justify:{type:String,default:null,validator:lt},...at,alignContent:{type:String,default:null,validator:nt},...ot,...X()},setup(e,n){let{slots:t}=n;const a=p(()=>{const u=[];let r;for(r in Ie)Ie[r].forEach(o=>{const s=e[o],c=gl(r,o,s);c&&u.push(c)});return u.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),u});return()=>{var u;return Le(e.tag,{class:["v-row",a.value]},(u=t.default)==null?void 0:u.call(t))}}});const bl=D({name:"VFileInput",inheritAttrs:!1,props:{chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,hint:String,persistentHint:Boolean,placeholder:String,showSize:{type:[Boolean,Number],default:!1,validator:e=>typeof e=="boolean"||[1e3,1024].includes(e)},...Zt({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:e=>dt(e).every(n=>n!=null&&typeof n=="object")},...el({clearable:!0})},emits:{"click:control":e=>!0,"update:modelValue":e=>!0},setup(e,n){let{attrs:t,emit:a,slots:u}=n;const{t:r}=Me(),o=he(e,"modelValue"),s=p(()=>typeof e.showSize!="boolean"?e.showSize:void 0),c=p(()=>{var m;return((m=o.value)!=null?m:[]).reduce((x,B)=>{let{size:P=0}=B;return x+P},0)}),l=p(()=>xe(c.value,s.value)),h=p(()=>{var m;return((m=o.value)!=null?m:[]).map(x=>{const{name:B="",size:P=0}=x;return e.showSize?`${B} (${xe(P,s.value)})`:B})}),w=p(()=>{var B;var m;const x=(B=(m=o.value)==null?void 0:m.length)!=null?B:0;return e.showSize?r(e.counterSizeString,x,l.value):r(e.counterString,x)}),_=T(),g=T(),y=T(!1),k=T(),F=p(()=>e.messages.length?e.messages:e.persistentHint?e.hint:"");function b(){if(k.value!==document.activeElement){var m;(m=k.value)==null||m.focus()}y.value||(y.value=!0)}function d(m){ke(e["onClick:prepend"],m),f(m)}function f(m){var x;(x=k.value)==null||x.click(),a("click:control",m)}function S(m){m.stopPropagation(),b(),Ne(()=>{o.value=[],k!=null&&k.value&&(k.value.value=""),ke(e["onClick:clear"],m)})}return R(()=>{const m=!!(u.counter||e.counter),x=!!(m||u.details),[B,P]=ft(t),[{modelValue:le,...I}]=tl(e),[q]=ll(e);return i(ol,Y({ref:_,modelValue:o.value,"onUpdate:modelValue":O=>o.value=O,class:"v-file-input","onClick:prepend":d,"onClick:append":e["onClick:append"]},B,I,{focused:y.value,messages:F.value}),{...u,default:O=>{let{isDisabled:$,isDirty:L,isReadonly:G,isValid:K}=O;return i(al,Y({ref:g,"prepend-icon":e.prependIcon,"onClick:control":f,"onClick:clear":S,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},q,{active:L.value||y.value,dirty:L.value,focused:y.value,error:K.value===!1}),{...u,default:J=>{let{props:{class:se,...ie}}=J;return i(U,null,[i("input",Y({ref:k,type:"file",readonly:G.value,disabled:$.value,multiple:e.multiple,name:e.name,onClick:v=>{v.stopPropagation(),b()},onChange:v=>{var z;if(!v.target)return;const C=v.target;o.value=[...(z=C.files)!=null?z:[]]},onFocus:b,onBlur:()=>y.value=!1},ie,P),null),i("div",{class:se},[o.value.length>0&&(u.selection?u.selection({fileNames:h.value,totalBytes:c.value,totalBytesReadable:l.value}):e.chips?h.value.map(v=>i(vt,{key:v,size:"small",color:e.color},{default:()=>[v]})):h.value.join(", "))])])}})},details:x?O=>{var $;return i(U,null,[($=u.details)==null?void 0:$.call(u,O),m&&i(U,null,[i("span",null,null),i(nl,{active:!!o.value.length,value:w.value},u.counter)])])}:void 0})}),ge({},_,g,k)}}),Ee=D({name:"VForm",props:{...sl()},emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,n){let{slots:t,emit:a}=n;const u=il(e),r=T();function o(c){c.preventDefault(),u.reset()}function s(c){const l=c,h=u.validate();l.then=h.then.bind(h),l.catch=h.catch.bind(h),l.finally=h.finally.bind(h),a("submit",l),l.defaultPrevented||h.then(w=>{let{valid:_}=w;if(_){var g;(g=r.value)==null||g.submit()}}),l.preventDefault()}return R(()=>{var c;return i("form",{ref:r,class:"v-form",novalidate:!0,onReset:o,onSubmit:s},[(c=t.default)==null?void 0:c.call(t,u)])}),ge(u,r)}});const yl=be()({name:"VSnackbar",props:{multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...mt({location:"bottom"}),...ht(),...gt(),...bt(),...yt(St({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const a=he(e,"modelValue"),{locationStyles:u}=Vt(e),{positionClasses:r}=Ct(e),{scopeId:o}=pt(),{colorClasses:s,colorStyles:c,variantClasses:l}=kt(e),{roundedClasses:h}=xt(e),w=T();ae(a,g),ae(()=>e.timeout,g),De(()=>{a.value&&g()});let _=-1;function g(){window.clearTimeout(_);const k=Number(e.timeout);!a.value||k===-1||(_=window.setTimeout(()=>{a.value=!1},k))}function y(){window.clearTimeout(_)}return R(()=>{const[k]=wt(e);return i(Bt,Y({ref:w,class:["v-snackbar",{"v-snackbar--active":a.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--vertical":e.vertical},r.value]},k,{modelValue:a.value,"onUpdate:modelValue":F=>a.value=F,contentProps:Y({style:u.value},k.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none"},o),{default:()=>[i("div",{class:["v-snackbar__wrapper",s.value,h.value,l.value],style:[c.value],onPointerenter:y,onPointerleave:g},[_t(!1,"v-snackbar"),t.default&&i("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[t.default()]),t.actions&&i(Tt,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[i("div",{class:"v-snackbar__actions"},[t.actions()])]})])],activator:t.activator})}),ge({},w)}});const Sl=D({name:"VTable",props:{fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...je(),...X(),...ye()},setup(e,n){let{slots:t}=n;const{themeClasses:a}=He(e),{densityClasses:u}=Ue(e);return R(()=>{var r,o;return i(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!t.top,"v-table--has-bottom":!!t.bottom,"v-table--hover":e.hover},a.value,u.value]},{default:()=>[(r=t.top)==null?void 0:r.call(t),t.default&&i("div",{class:"v-table__wrapper",style:{height:ne(e.height)}},[i("table",null,[t.default()])]),(o=t.bottom)==null?void 0:o.call(t)]})}),{}}});function Ae(e){const t=Math.abs(e);return Math.sign(e)*(t/((1/.501-2)*(1-t)+1))}function Re(e){let{selectedElement:n,containerSize:t,contentSize:a,isRtl:u,currentScrollOffset:r,isHorizontal:o}=e;const s=o?n.clientWidth:n.clientHeight,c=o?n.offsetLeft:n.offsetTop,l=u&&o?a-c-s:c,h=t+r,w=s+l,_=s*.4;return l<=r?r=Math.max(l-_,0):h<=w&&(r=Math.min(r-(h-w-_),a-t)),r}function Vl(e){let{selectedElement:n,containerSize:t,contentSize:a,isRtl:u,isHorizontal:r}=e;const o=r?n.clientWidth:n.clientHeight,s=r?n.offsetLeft:n.offsetTop,c=u&&r?a-s-o/2-t/2:s+o/2-t/2;return Math.min(a-t,Math.max(0,c))}const Cl=Symbol.for("vuetify:v-slide-group"),pl=be()({name:"VSlideGroup",props:{centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Cl},nextIcon:{type:oe,default:"$next"},prevIcon:{type:oe,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...X(),...$t({selectedClass:"v-slide-group-item--active"})},emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const{isRtl:a}=Ye(),{mobile:u}=Ft(),r=Xe(e,e.symbol),o=T(!1),s=T(0),c=T(0),l=T(0),h=p(()=>e.direction==="horizontal"),{resizeRef:w,contentRect:_}=we(),{resizeRef:g,contentRect:y}=we(),k=p(()=>r.selected.value.length?r.items.value.findIndex(v=>v.id===r.selected.value[0]):-1),F=p(()=>r.selected.value.length?r.items.value.findIndex(v=>v.id===r.selected.value[r.selected.value.length-1]):-1);if(zt){let v=-1;ae(()=>[r.selected.value,_.value,y.value,h.value],()=>{cancelAnimationFrame(v),v=requestAnimationFrame(()=>{if(_.value&&y.value){const C=h.value?"width":"height";c.value=_.value[C],l.value=y.value[C],o.value=c.value+1<l.value}if(k.value>=0&&g.value){const C=g.value.children[F.value];k.value===0||!o.value?s.value=0:e.centerActive?s.value=Vl({selectedElement:C,containerSize:c.value,contentSize:l.value,isRtl:a.value,isHorizontal:h.value}):o.value&&(s.value=Re({selectedElement:C,containerSize:c.value,contentSize:l.value,isRtl:a.value,currentScrollOffset:s.value,isHorizontal:h.value}))}})})}const b=T(!1);let d=0,f=0;function S(v){const C=h.value?"clientX":"clientY";f=(a.value&&h.value?-1:1)*s.value,d=v.touches[0][C],b.value=!0}function m(v){if(!o.value)return;const C=h.value?"clientX":"clientY",z=a.value&&h.value?-1:1;s.value=z*(f+d-v.touches[0][C])}function x(v){const C=l.value-c.value;s.value<0||!o.value?s.value=0:s.value>=C&&(s.value=C),b.value=!1}function B(){!w.value||(w.value[h.value?"scrollLeft":"scrollTop"]=0)}const P=T(!1);function le(v){if(P.value=!0,!(!o.value||!g.value)){for(const C of v.composedPath())for(const z of g.value.children)if(z===C){s.value=Re({selectedElement:z,containerSize:c.value,contentSize:l.value,isRtl:a.value,currentScrollOffset:s.value,isHorizontal:h.value});return}}}function I(v){P.value=!1}function q(v){var C;!P.value&&!(v.relatedTarget&&(C=g.value)!=null&&C.contains(v.relatedTarget))&&$()}function O(v){!g.value||(h.value?v.key==="ArrowRight"?$(a.value?"prev":"next"):v.key==="ArrowLeft"&&$(a.value?"next":"prev"):v.key==="ArrowDown"?$("next"):v.key==="ArrowUp"&&$("prev"),v.key==="Home"?$("first"):v.key==="End"&&$("last"))}function $(v){if(!!g.value)if(v){if(v==="next"){var z;const W=(z=g.value.querySelector(":focus"))==null?void 0:z.nextElementSibling;W?W.focus():$("first")}else if(v==="prev"){var Q;const W=(Q=g.value.querySelector(":focus"))==null?void 0:Q.previousElementSibling;W?W.focus():$("last")}else if(v==="first"){var Z;(Z=g.value.firstElementChild)==null||Z.focus()}else if(v==="last"){var pe;(pe=g.value.lastElementChild)==null||pe.focus()}}else{var C;(C=[...g.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(ct=>!ct.hasAttribute("disabled"))[0])==null||C.focus()}}function L(v){const C=s.value+(v==="prev"?-1:1)*c.value;s.value=Pt(C,0,l.value-c.value)}const G=p(()=>{let v=s.value>l.value-c.value?-(l.value-c.value)+Ae(l.value-c.value-s.value):-s.value;s.value<=0&&(v=Ae(-s.value));const C=a.value&&h.value?-1:1;return{transform:`translate${h.value?"X":"Y"}(${C*v}px)`,transition:b.value?"none":"",willChange:b.value?"transform":""}}),K=p(()=>({next:r.next,prev:r.prev,select:r.select,isSelected:r.isSelected})),J=p(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!u.value;case!0:return o.value||Math.abs(s.value)>0;case"mobile":return u.value||o.value||Math.abs(s.value)>0;default:return!u.value&&(o.value||Math.abs(s.value)>0)}}),se=p(()=>Math.abs(s.value)>0),ie=p(()=>l.value>Math.abs(s.value)+c.value);return R(()=>{var v,C,z;return i(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!h.value,"v-slide-group--has-affixes":J.value,"v-slide-group--is-overflowing":o.value}],tabindex:P.value||r.selected.value.length?-1:0,onFocus:q},{default:()=>{var Q,Z;return[J.value&&i("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!se.value}],onClick:()=>L("prev")},[(Q=(v=t.prev)==null?void 0:v.call(t,K.value))!=null?Q:i(_e,null,{default:()=>[i(fe,{icon:a.value?e.nextIcon:e.prevIcon},null)]})]),i("div",{key:"container",ref:w,class:"v-slide-group__container",onScroll:B},[i("div",{ref:g,class:"v-slide-group__content",style:G.value,onTouchstartPassive:S,onTouchmovePassive:m,onTouchendPassive:x,onFocusin:le,onFocusout:I,onKeydown:O},[(C=t.default)==null?void 0:C.call(t,K.value)])]),J.value&&i("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!ie.value}],onClick:()=>L("next")},[(Z=(z=t.next)==null?void 0:z.call(t,K.value))!=null?Z:i(_e,null,{default:()=>[i(fe,{icon:a.value?e.prevIcon:e.nextIcon},null)]})])]}})}),{selected:r.selected,scrollTo:L,scrollOffset:s,focus:$}}});const st=Symbol.for("vuetify:v-tabs"),ve=D({name:"VTab",props:{fixed:Boolean,icon:[Boolean,String,Function,Object],prependIcon:oe,appendIcon:oe,stacked:Boolean,title:String,ripple:{type:Boolean,default:!0},color:String,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...X(),...It(),...Ge({selectedClass:"v-tab--selected"}),...ye()},setup(e,n){let{slots:t,attrs:a}=n;const{textColorClasses:u,textColorStyles:r}=Et(e,"sliderColor"),o=p(()=>e.direction==="horizontal"),s=T(!1),c=T(),l=T();function h(w){let{value:_}=w;if(s.value=_,_){var g,y;const k=(g=c.value)==null||(y=g.$el.parentElement)==null?void 0:y.querySelector(".v-tab--selected .v-tab__slider"),F=l.value;if(!k||!F)return;const b=getComputedStyle(k).color,d=k.getBoundingClientRect(),f=F.getBoundingClientRect(),S=o.value?"x":"y",m=o.value?"X":"Y",x=o.value?"right":"bottom",B=o.value?"width":"height",P=d[S],le=f[S],I=P>le?d[x]-f[x]:d[S]-f[S],q=Math.sign(I)>0?o.value?"right":"bottom":Math.sign(I)<0?o.value?"left":"top":"center",$=(Math.abs(I)+(Math.sign(I)<0?d[B]:f[B]))/Math.max(d[B],f[B]),L=d[B]/f[B],G=1.5;Rt(F,{backgroundColor:[b,""],transform:[`translate${m}(${I}px) scale${m}(${L})`,`translate${m}(${I/G}px) scale${m}(${($-1)/G+1})`,""],transformOrigin:Array(3).fill(q)},{duration:225,easing:Ot})}}return R(()=>{const[w]=At(e,["href","to","replace","icon","stacked","prependIcon","appendIcon","ripple","theme","disabled","selectedClass","value","color"]);return i(E,Y({_as:"VTab",symbol:st,ref:c,class:["v-tab"],tabindex:s.value?0:-1,role:"tab","aria-selected":String(s.value),active:!1,block:e.fixed,maxWidth:e.fixed?300:void 0,variant:"text",rounded:0},w,a,{"onGroup:selected":h}),{default:()=>[t.default?t.default():e.title,!e.hideSlider&&i("div",{ref:l,class:["v-tab__slider",u.value],style:r.value},null)]})}),{}}});function kl(e){return e?e.map(n=>typeof n=="string"?{title:n,value:n}:n):[]}const xl=D({name:"VTabs",props:{alignTabs:{type:String,default:"start"},color:String,direction:{type:String,default:"horizontal"},fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,modelValue:null,mandatory:{type:[Boolean,String],default:"force"},...je(),...X()},emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const a=he(e,"modelValue"),u=p(()=>kl(e.items)),{densityClasses:r}=Ue(e),{backgroundColorClasses:o,backgroundColorStyles:s}=Lt(j(e,"bgColor"));return Mt({VTab:{color:j(e,"color"),direction:j(e,"direction"),stacked:j(e,"stacked"),fixed:j(e,"fixedTabs"),sliderColor:j(e,"sliderColor"),hideSlider:j(e,"hideSlider")}}),R(()=>i(pl,{modelValue:a.value,"onUpdate:modelValue":c=>a.value=c,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},r.value,o.value],style:[{"--v-tabs-height":ne(e.height)},s.value],role:"tablist",symbol:st,mandatory:e.mandatory,direction:e.direction},{default:()=>[t.default?t.default():u.value.map(c=>i(ve,Y(c,{key:c.title}),null))]})),{}}});const wl=e=>{const{touchstartX:n,touchendX:t,touchstartY:a,touchendY:u}=e,r=.5,o=16;e.offsetX=t-n,e.offsetY=u-a,Math.abs(e.offsetY)<r*Math.abs(e.offsetX)&&(e.left&&t<n-o&&e.left(e),e.right&&t>n+o&&e.right(e)),Math.abs(e.offsetX)<r*Math.abs(e.offsetY)&&(e.up&&u<a-o&&e.up(e),e.down&&u>a+o&&e.down(e))};function _l(e,n){var t;const a=e.changedTouches[0];n.touchstartX=a.clientX,n.touchstartY=a.clientY,(t=n.start)==null||t.call(n,{originalEvent:e,...n})}function Tl(e,n){var t;const a=e.changedTouches[0];n.touchendX=a.clientX,n.touchendY=a.clientY,(t=n.end)==null||t.call(n,{originalEvent:e,...n}),wl(n)}function Bl(e,n){var t;const a=e.changedTouches[0];n.touchmoveX=a.clientX,n.touchmoveY=a.clientY,(t=n.move)==null||t.call(n,{originalEvent:e,...n})}function $l(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const n={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:t=>_l(t,n),touchend:t=>Tl(t,n),touchmove:t=>Bl(t,n)}}function Fl(e,n){var c,l;var t;const a=n.value,u=a!=null&&a.parent?e.parentElement:e,r=(c=a==null?void 0:a.options)!=null?c:{passive:!0},o=(t=n.instance)==null?void 0:t.$.uid;if(!u||!o)return;const s=$l(n.value);u._touchHandlers=(l=u._touchHandlers)!=null?l:Object.create(null),u._touchHandlers[o]=s,We(s).forEach(h=>{u.addEventListener(h,s[h],r)})}function zl(e,n){var t,a;const u=(t=n.value)!=null&&t.parent?e.parentElement:e,r=(a=n.instance)==null?void 0:a.$.uid;if(!(u!=null&&u._touchHandlers)||!r)return;const o=u._touchHandlers[r];We(o).forEach(s=>{u.removeEventListener(s,o[s])}),delete u._touchHandlers[r]}const it={mounted:Fl,unmounted:zl},Pl=it,ut=Symbol.for("vuetify:v-window"),rt=Symbol.for("vuetify:v-window-group"),Il=be()({name:"VWindow",directives:{Touch:it},props:{continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{default:"force"},...X(),...ye()},emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const{themeClasses:a}=He(e),{isRtl:u}=Ye(),{t:r}=Me(),o=Xe(e,rt),s=T(),c=p(()=>u.value?!e.reverse:e.reverse),l=T(!1),h=p(()=>{const S=e.direction==="vertical"?"y":"x",x=(c.value?!l.value:l.value)?"-reverse":"";return`v-window-${S}${x}-transition`}),w=T(0),_=T(void 0),g=p(()=>o.items.value.findIndex(S=>o.selected.value.includes(S.id)));ae(g,(S,m)=>{const x=o.items.value.length,B=x-1;x<=2?l.value=S<m:S===B&&m===0?l.value=!0:S===0&&m===B?l.value=!1:l.value=S<m}),Dt(ut,{transition:h,isReversed:l,transitionCount:w,transitionHeight:_,rootRef:s});const y=p(()=>e.continuous||g.value!==0),k=p(()=>e.continuous||g.value!==o.items.value.length-1);function F(){y.value&&o.prev()}function b(){k.value&&o.next()}const d=p(()=>{const S=[],m={icon:u.value?e.nextIcon:e.prevIcon,class:`v-window__${c.value?"right":"left"}`,onClick:o.prev,ariaLabel:r("$vuetify.carousel.prev")};S.push(y.value?t.prev?t.prev({props:m}):i(E,m,null):i("div",null,null));const x={icon:u.value?e.prevIcon:e.nextIcon,class:`v-window__${c.value?"left":"right"}`,onClick:o.next,ariaLabel:r("$vuetify.carousel.next")};return S.push(k.value?t.next?t.next({props:x}):i(E,x,null):i("div",null,null)),S}),f=p(()=>e.touch===!1?e.touch:{...{left:()=>{c.value?F():b()},right:()=>{c.value?b():F()},start:m=>{let{originalEvent:x}=m;x.stopPropagation()}},...e.touch===!0?{}:e.touch});return R(()=>{var S,m;return qe(i(e.tag,{ref:s,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},a.value]},{default:()=>[i("div",{class:"v-window__container",style:{height:_.value}},[(S=t.default)==null?void 0:S.call(t,{group:o}),e.showArrows!==!1&&i("div",{class:"v-window__controls"},[d.value])]),(m=t.additional)==null?void 0:m.call(t,{group:o})]}),[[Nt("touch"),f.value]])}),{group:o}}}),Oe=D({name:"VWindowItem",directives:{Touch:Pl},props:{reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...Ge(),...jt()},emits:{"group:selected":e=>!0},setup(e,n){let{slots:t}=n;const a=Ht(ut),u=Ut(e,rt),{isBooted:r}=Yt();if(!a||!u)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const o=T(!1),s=p(()=>a.isReversed.value?e.reverseTransition!==!1:e.transition!==!1);function c(){!o.value||!a||(o.value=!1,a.transitionCount.value>0&&(a.transitionCount.value-=1,a.transitionCount.value===0&&(a.transitionHeight.value=void 0)))}function l(){if(!(o.value||!a)){if(o.value=!0,a.transitionCount.value===0){var y;a.transitionHeight.value=ne((y=a.rootRef.value)==null?void 0:y.clientHeight)}a.transitionCount.value+=1}}function h(){c()}function w(y){!o.value||Ne(()=>{!s.value||!o.value||!a||(a.transitionHeight.value=ne(y.clientHeight))})}const _=p(()=>{const y=a.isReversed.value?e.reverseTransition:e.transition;return s.value?{name:typeof y!="string"?a.transition.value:y,onBeforeEnter:l,onAfterEnter:c,onEnterCancelled:h,onBeforeLeave:l,onAfterLeave:c,onLeaveCancelled:h,onEnter:w}:!1}),{hasContent:g}=Xt(e,u.isSelected);return R(()=>{var y;return i(Wt,{transition:r.value&&_.value},{default:()=>[qe(i("div",{class:["v-window-item",u.selectedClass.value]},[g.value&&((y=t.default)==null?void 0:y.call(t))]),[[Gt,u.isSelected.value]])]})}),{}}}),El=A("span",{class:"text-h5"},"file registration",-1),Al=A("span",{class:"text-h5"},"file deletion",-1),Rl=A("div",null,"Are you sure you want to delete",-1),Ol={class:"text-center"},Dl={__name:"FilesView",setup(e){const n=qt(),t=T(null),a=T(null),u={file:t,url:a},o="http://localhost:1323/api/files",s=Te({isOpen:!1,color:"primary",timeout:5e3,message:"no messages"}),c={id:0,name:"",path:"",size:0,sha256:"",file:[]},l=Te({files:[],fileDialog:!1,editFileNameDialog:!1,deleteFileDialog:!1,file:{id:0,name:"",path:"",size:0,sha256:"",updated:"",file:c},formFiles:[],formValid:!0,tab:null}),h=b=>{s.color="info",s.message=b,s.isOpen=!0,n.messages.push({sender:"files",type:"success",message:b})},w=b=>{const d=ee.isAxiosError(b)?b.response.data.message:b;s.color="error",s.message=d,s.isOpen=!0,n.messages.push({sender:"files",type:"error",message:d})},_=()=>{ee.get(o).then(b=>{l.files=b.data}).catch(b=>{w(b)})},g=()=>{l.file=c,l.fileDialog=!0},y=()=>{u[l.tab].value.validate(),l.formValid&&(l.tab==="file"&&([l.file.file]=l.formFiles),(l.tab==="file"?ee.postForm:ee.post)(o,l.file).then(d=>{l.files.unshift(d.data),h("registered"),l.fileDialog=!1,l.file=c}).catch(d=>{w(d)}))},k=b=>{l.file=b,l.deleteFileDialog=!0},F=()=>{ee.delete(`${o}/${l.file.id}`).then(b=>{l.files=l.files.filter(d=>d.id!==b.data.id),h(`${b.data.name} successfully deleted`)}).catch(b=>{w(b)}).finally(()=>{l.file=c,l.deleteFileDialog=!1})};return De(()=>{_()}),(b,d)=>(M(),H(U,null,[i(yl,{modelValue:s.isOpen,"onUpdate:modelValue":d[1]||(d[1]=f=>s.isOpen=f),color:s.color,timeout:s.timeout},{actions:V(()=>[i(E,{icon:"mdi-close",onClick:d[0]||(d[0]=f=>s.isOpen=!1)})]),default:V(()=>[N(te(s.message)+" ",1)]),_:1},8,["modelValue","color","timeout"]),l.files.length>0?(M(),Kt(re,{key:0},{default:V(()=>[i(de,null,{default:V(()=>[i(cl,{cols:"12"},{default:V(()=>[i(Sl,null,{default:V(()=>[A("thead",null,[A("tr",null,[(M(!0),H(U,null,ue(Object.keys(l.files[0]),(f,S)=>(M(),H("th",{key:S},te(f),1))),128)),A("th",null,[i(E,{class:"text-right",color:"primary",size:"x-small",icon:"mdi-plus",onClick:Qt(g,["stop"])},null,8,["onClick"])])])]),A("tbody",null,[(M(!0),H(U,null,ue(l.files,f=>(M(),H("tr",{key:f.id},[(M(!0),H(U,null,ue(f,(S,m)=>(M(),H("td",{key:m,style:{"max-width":"10em","overflow-x":"hidden"}},te(S),1))),128)),A("td",null,[i(E,{size:"x-small",icon:"mdi-delete",onClick:S=>k(f)},null,8,["onClick"])])]))),128))])]),_:1})]),_:1})]),_:1})]),_:1})):Jt("",!0),i(Be,{modelValue:l.fileDialog,"onUpdate:modelValue":d[11]||(d[11]=f=>l.fileDialog=f),"max-width":"450px"},{default:V(()=>[i($e,null,{default:V(()=>[i(Fe,null,{default:V(()=>[El]),_:1}),i(ze,null,{default:V(()=>[i(xl,{modelValue:l.tab,"onUpdate:modelValue":d[2]||(d[2]=f=>l.tab=f),"fixed-tabs":""},{default:V(()=>[i(ve,{value:"file"},{default:V(()=>[N("file upload")]),_:1}),i(ve,{value:"url"},{default:V(()=>[N("url")]),_:1})]),_:1},8,["modelValue"]),i(Il,{modelValue:l.tab,"onUpdate:modelValue":d[9]||(d[9]=f=>l.tab=f)},{default:V(()=>[i(Oe,{value:"file"},{default:V(()=>[i(Ee,{ref_key:"refCreateFileByFile",ref:t,modelValue:l.formValid,"onUpdate:modelValue":d[5]||(d[5]=f=>l.formValid=f),"lazy-validation":""},{default:V(()=>[i(ce,{modelValue:l.file.name,"onUpdate:modelValue":d[3]||(d[3]=f=>l.file.name=f),modelModifiers:{trim:!0},label:"Name (optional)"},null,8,["modelValue"]),i(bl,{modelValue:l.formFiles,"onUpdate:modelValue":d[4]||(d[4]=f=>l.formFiles=f),label:"File",accept:"application/xml","show-size":"",rules:[f=>!(!f||!f.length)||"File is required"],required:""},null,8,["modelValue","rules"])]),_:1},8,["modelValue"])]),_:1}),i(Oe,{value:"url"},{default:V(()=>[i(Ee,{ref_key:"refCreateFileByUrl",ref:a,modelValue:l.formValid,"onUpdate:modelValue":d[8]||(d[8]=f=>l.formValid=f),"lazy-validation":""},{default:V(()=>[i(ce,{modelValue:l.file.name,"onUpdate:modelValue":d[6]||(d[6]=f=>l.file.name=f),modelModifiers:{trim:!0},label:"Name (optional)"},null,8,["modelValue"]),i(ce,{modelValue:l.file.path,"onUpdate:modelValue":d[7]||(d[7]=f=>l.file.path=f),modelModifiers:{trim:!0},label:"Url",rules:[f=>!!f||"Url is required"],required:""},null,8,["modelValue","rules"])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(re,null,{default:V(()=>[i(de,{justify:"end"},{default:V(()=>[i(E,{color:"success",class:"mr-4","prepend-icon":"mdi-check",onClick:y},{default:V(()=>[N("save")]),_:1}),i(E,{color:"error",class:"mr-4","prepend-icon":"mdi-close",onClick:d[10]||(d[10]=f=>l.fileDialog=!1)},{default:V(()=>[N("cancel")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(Be,{modelValue:l.deleteFileDialog,"onUpdate:modelValue":d[13]||(d[13]=f=>l.deleteFileDialog=f),"max-width":"450px"},{default:V(()=>[i($e,null,{default:V(()=>[i(Fe,null,{default:V(()=>[i(fe,{color:"warning",icon:"mdi-alert"}),Al]),_:1}),i(ze,null,{default:V(()=>[Rl,A("div",Ol,[A("b",null,te(l.file.id)+": "+te(l.file.name),1),N("? ")]),i(re,null,{default:V(()=>[i(de,{justify:"end"},{default:V(()=>[i(E,{color:"success",class:"mr-4","prepend-icon":"mdi-check",onClick:F},{default:V(()=>[N("delete")]),_:1}),i(E,{color:"error",class:"mr-4","prepend-icon":"mdi-close",onClick:d[12]||(d[12]=f=>{l.file=c,l.deleteFileDialog=!1})},{default:V(()=>[N("cancel")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{Dl as default};
