import{$ as a,r as u,a2 as m,a3 as h,a4 as w,w as g,a5 as _,cI as b,at as O,bC as R}from"./ViewerView.ffb355c9.js";import"./index.43e3eefa.js";import"./VTextField.7c0d6178.js";function P(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function V(t,e,r){return e&&p(t.prototype,e),r&&p(t,r),t}function E(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}function f(t,e){return f=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},f(t,e)}function j(t){var e=S();return function(){var n=c(t),o;if(e){var s=c(this).constructor;o=Reflect.construct(n,arguments,s)}else o=n.apply(this,arguments);return x(this,o)}}function x(t,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return I(t)}function I(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function S(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function c(t){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},c(t)}var d=function(t){E(r,t);var e=j(r);function r(){return P(this,r),e.apply(this,arguments)}return V(r,[{key:"render",value:function(){var o=this.props,s=o.captions,l=o.classes,y=o.videoOptions,v=o.videoResources;return a.createElement("div",{className:l.container},a.createElement("video",Object.assign({className:l.video},y),v.map(function(i){return a.createElement(u.exports.Fragment,{key:i.id},a.createElement("source",{src:i.id,type:i.getFormat()}))}),s.map(function(i){return a.createElement(u.exports.Fragment,{key:i.id},a.createElement("track",{src:i.id,label:i.getDefaultLabel(),srcLang:i.getProperty("language")}))})))}}]),r}(u.exports.Component);d.defaultProps={captions:[],videoOptions:{},videoResources:[]};var T=function(e,r){var n=r.windowId;return{captions:b(e,{windowId:n})||[],videoOptions:O(e).videoOptions,videoResources:R(e,{windowId:n})||[]}},k=function(){return{container:{alignItems:"center",display:"flex",width:"100%"},video:{maxHeight:"100%",width:"100%"}}},C=m(_(),g(k),w(T,null),h("VideoViewer"));const B=C(d);export{B as default};
