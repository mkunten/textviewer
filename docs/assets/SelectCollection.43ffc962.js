import{r as h,a8 as _,a9 as g,aa as P,$ as a,s as b,a0 as I,a2 as O,a3 as S,a4 as C,w as R,a5 as z,b7 as D,bx as H}from"./ViewerView.ffb355c9.js";import{G as s}from"./WorkspaceArea.02b3d62e.js";import"./index.43e3eefa.js";import"./VTextField.7c0d6178.js";var f={},E=g.exports,j=P.exports;Object.defineProperty(f,"__esModule",{value:!0});var v=f.default=void 0,T=j(h.exports),x=E(_()),k=(0,x.default)(T.createElement("path",{d:"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}),"ListSharp");v=f.default=k;function q(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function M(t,e,o){return e&&p(t.prototype,e),o&&p(t,o),t}function V(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return u=Object.setPrototypeOf||function(r,n){return r.__proto__=n,r},u(t,e)}function $(t){var e=W();return function(){var r=l(t),n;if(e){var i=l(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return B(this,n)}}function B(t,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return d(t)}function d(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function W(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)},l(t)}var m=function(t){V(o,t);var e=$(o);function o(r){var n;return q(this,o),n=e.call(this,r),n.openCollectionDialog=n.openCollectionDialog.bind(d(n)),n}return M(o,[{key:"openCollectionDialog",value:function(){var n=this.props,i=n.collectionPath,c=n.manifestId,y=n.showCollectionDialog,w=n.windowId;y(c,i.slice(0,-1),w)}},{key:"render",value:function(){var n=this.props.t;return a.createElement(s,{container:!0,justify:"center",alignItems:"center"},a.createElement(s,{container:!0,direction:"column",alignItems:"center"},a.createElement(b,{variant:"h4",paragraph:!0},a.createElement("em",null,n("noItemSelected"))),a.createElement(I,{color:"primary",variant:"contained",onClick:this.openCollectionDialog,startIcon:a.createElement(v,null)},n("showCollection"))))}}]),o}(h.exports.Component);m.defaultProps={collectionPath:[],manifestId:null,t:function(){},windowId:null};var G=function(e,o){var r=o.windowId,n=D(e,{windowId:r})||{},i=n.collectionPath,c=n.manifestId;return{collectionPath:i,manifestId:c}},L={showCollectionDialog:H},N=function(e){return{}},A=O(z(),R(N),C(G,L),S("SelectCollection"));const U=A(m);export{U as default};
