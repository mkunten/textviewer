import{bc as W,r as f,w as _,d as K,f as S,g as F,bb as G,$ as u,cJ as B,aB as w,cK as M,bu as $,b1 as H,a2 as k,a4 as N,cL as L,cM as J,c6 as Q,cN as U,cO as X,at as Y,aO as Z,cP as ee,cQ as te,cR as ne,P as re,a3 as ae,b5 as oe,cS as ie}from"./ViewerView.095e3144.js";import{d as se}from"./WorkspaceArea.ef756e1b.js";import"./index.bfdbebe2.js";const ce=W(f.exports.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}));var le=function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:e.palette.type==="light"?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}};function ue(t){var e=t.src,n=t.srcSet,r=f.exports.useState(!1),a=r[0],o=r[1];return f.exports.useEffect(function(){if(!(!e&&!n)){o(!1);var c=!0,s=new Image;return s.src=e,s.srcSet=n,s.onload=function(){!c||o("loaded")},s.onerror=function(){!c||o("error")},function(){c=!1}}},[e,n]),a}var fe=f.exports.forwardRef(function(e,n){var r=e.alt,a=e.children,o=e.classes,c=e.className,s=e.component,i=s===void 0?"div":s,l=e.imgProps,d=e.sizes,p=e.src,h=e.srcSet,P=e.variant,q=P===void 0?"circular":P,z=K(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),v=null,V=ue({src:p,srcSet:h}),I=p||h,x=I&&V!=="error";return x?v=f.exports.createElement("img",S({alt:r,src:p,srcSet:h,sizes:d,className:o.img},l)):a!=null?v=a:I&&r?v=r[0]:v=f.exports.createElement(ce,{className:o.fallback}),f.exports.createElement(i,S({className:F(o.root,o.system,o[q],c,!x&&o.colorDefault),ref:n},z),v)});const A=_(le,{name:"MuiAvatar"})(fe);function de(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function pe(t,e,n){return e&&R(t.prototype,e),n&&R(t,n),t}function he(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}function O(t,e){return O=Object.setPrototypeOf||function(r,a){return r.__proto__=a,r},O(t,e)}function ve(t){var e=ge();return function(){var r=g(t),a;if(e){var o=g(this).constructor;a=Reflect.construct(r,arguments,o)}else a=r.apply(this,arguments);return ye(this,a)}}function ye(t,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return y(t)}function y(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ge(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function g(t){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},g(t)}var T=function(t){he(n,t);var e=ve(n);function n(r){var a;return de(this,n),a=e.call(this,r),a.state={requestedAnnotations:!1},a.handleSelect=a.handleSelect.bind(y(a)),a.handleKey=a.handleKey.bind(y(a)),a.handleIntersection=a.handleIntersection.bind(y(a)),a}return pe(n,[{key:"handleSelect",value:function(){var a=this.props,o=a.canvas,c=a.selected,s=a.setCanvas,i=a.focusOnCanvas;c?i():s(o.id)}},{key:"handleKey",value:function(a){var o=this.props,c=o.canvas,s=o.setCanvas,i=o.focusOnCanvas;this.keys={enter:"Enter",space:" "},this.chars={enter:13,space:32};var l=a.key===this.keys.enter||a.which===this.chars.enter||a.key===this.keys.space||a.which===this.chars.space;l?i():s(c.id)}},{key:"handleIntersection",value:function(a){var o=a.isIntersecting,c=this.props,s=c.annotationsCount,i=c.requestCanvasAnnotations,l=this.state.requestedAnnotations;!o||s===void 0||s>0||l||(this.setState({requestedAnnotations:!0}),i())}},{key:"render",value:function(){var a=this.props,o=a.annotationsCount,c=a.searchAnnotationsCount,s=a.canvas,i=a.classes,l=a.config,d=a.selected,p=new G(s);return u.createElement(B,{onChange:this.handleIntersection},u.createElement("div",{key:s.index,className:w(i.galleryViewItem,d?i.selected:"",c>0?i.hasAnnotations:""),onClick:this.handleSelect,onKeyUp:this.handleKey,role:"button",tabIndex:0},u.createElement(M,{resource:s,labelled:!0,variant:"outside",maxWidth:l.width,maxHeight:l.height,style:{margin:"0 auto",maxWidth:"".concat(Math.ceil(l.height*p.aspectRatio),"px")}},u.createElement("div",{className:i.chips},c>0&&u.createElement($,{avatar:u.createElement(A,{className:i.avatar,classes:{circle:i.avatarIcon}},u.createElement(H,{fontSize:"small"})),label:c,className:w(i.searchChip),size:"small"}),(o||0)>0&&u.createElement($,{avatar:u.createElement(A,{className:i.avatar,classes:{circle:i.avatarIcon}},u.createElement(se,{className:i.annotationIcon})),label:o,className:w(i.annotationsChip),size:"small"})))))}}]),n}(f.exports.Component);T.defaultProps={annotationsCount:void 0,config:{height:100,width:null},requestCanvasAnnotations:function(){},searchAnnotationsCount:0,selected:!1};function E(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?E(Object(n),!0).forEach(function(r){me(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function me(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var we=function(e){return{annotationIcon:{height:"1rem",width:"1rem"},annotationsChip:b({},e.typography.caption),avatar:{backgroundColor:"transparent"},chips:{opacity:.875,position:"absolute",right:0,textAlign:"right",top:0},galleryViewItem:{"&$hasAnnotations":{border:"2px solid ".concat(e.palette.action.selected)},"&$selected,&$selected$hasAnnotations":{border:"2px solid ".concat(e.palette.primary.main)},"&:focus":{outline:"none"},"&:hover":{backgroundColor:e.palette.action.hover},border:"2px solid transparent",cursor:"pointer",display:"inline-block",margin:"".concat(e.spacing(1),"px ").concat(e.spacing(.5),"px"),maxHeight:function(r){return r.config.height+45},minWidth:"60px",overflow:"hidden",padding:e.spacing(.5),position:"relative",width:"min-content"},hasAnnotations:{},searchChip:b(b({},e.typography.caption),{},{"&$selected $avatar":{backgroundColor:e.palette.highlights.primary},marginTop:2}),selected:{}}},be=function(e,n){var r=n.canvas,a=n.windowId,o=L(e,{windowId:a}),c=J(e,{windowId:a}),s=Q(c.map(function(l){return l.resources})).filter(function(l){return l.targetId===r.id}),i=U(e,{content:"annotations",windowId:a}).length>0;return{annotationsCount:function(){if(!!i){var l=X(e,{canvasId:r.id});return l.reduce(function(d,p){return d+p.resources.filter(function(h){return h.targetId===r.id}).length},0)}}(),config:Y(e).galleryView,searchAnnotationsCount:s.length,selected:o&&o.id===r.id}},Oe=function(e,n){var r=n.canvas;n.id;var a=n.windowId;return{focusOnCanvas:function(){return e(Z(a,"single"))},requestCanvasAnnotations:function(){return e(ee(a,r.id))},setCanvas:function(){for(var c=arguments.length,s=new Array(c),i=0;i<c;i++)s[i]=arguments[i];return e(te.apply(ne,[a].concat(s)))}}},Ce=k(N(be,Oe),_(we));const _e=Ce(T);function Pe(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Ie(t,e,n){return e&&j(t.prototype,e),n&&j(t,n),t}function xe(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&C(t,e)}function C(t,e){return C=Object.setPrototypeOf||function(r,a){return r.__proto__=a,r},C(t,e)}function Se(t){var e=Re();return function(){var r=m(t),a;if(e){var o=m(this).constructor;a=Reflect.construct(r,arguments,o)}else a=r.apply(this,arguments);return $e(this,a)}}function $e(t,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Ae(t)}function Ae(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Re(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},m(t)}var D=function(t){xe(n,t);var e=Se(n);function n(){return Pe(this,n),e.apply(this,arguments)}return Ie(n,[{key:"render",value:function(){var a=this.props,o=a.canvases,c=a.classes,s=a.viewingDirection,i=a.windowId,l=s==="right-to-left"?"rtl":"ltr";return u.createElement(re,{component:"section",dir:l,square:!0,elevation:0,className:c.galleryContainer,id:"".concat(i,"-gallery")},o.map(function(d){return u.createElement(_e,{key:d.id,windowId:i,canvas:d})}))}}]),n}(f.exports.Component);D.defaultProps={classes:{},viewingDirection:""};var Ee=function(e,n){var r=n.windowId;return{canvases:oe(e,{windowId:r}),viewingDirection:ie(e,{windowId:r})}},je=function(e){return{galleryContainer:{alignItems:"flex-start",display:"flex",flexDirection:"row",flexWrap:"wrap",overflowX:"hidden",overflowY:"scroll",padding:"50px 0 50px 20px",width:"100%"}}},ke=k(_(je),N(Ee),ae("GalleryView"));const qe=ke(D);export{qe as default};