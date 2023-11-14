!function(){"use strict";/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function t(t,e,n,r){return new(n||(n=Promise))(function(i,o){function a(t){try{c(r.next(t))}catch(t){o(t)}}function u(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):((e=t.value)instanceof n?e:new n(function(t){t(e)})).then(a,u)}c((r=r.apply(t,e||[])).next())})}function e(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}(function(){(console.warn||console.log).apply(console,arguments)}).bind("[clipboard-polyfill]");var n,r,i,o,a="undefined"==typeof navigator?void 0:navigator,u=null==a?void 0:a.clipboard,c=null===(n=null==u?void 0:u.read)||void 0===n?void 0:n.bind(u),l=null===(r=null==u?void 0:u.readText)||void 0===r?void 0:r.bind(u),s=null===(i=null==u?void 0:u.write)||void 0===i?void 0:i.bind(u),d=null===(o=null==u?void 0:u.writeText)||void 0===o?void 0:o.bind(u),f="undefined"==typeof window?void 0:window,p=null==f?void 0:f.ClipboardItem;function v(){return"undefined"==typeof ClipboardEvent&&void 0!==f.clipboardData&&void 0!==f.clipboardData.setData}var h=function(){this.success=!1};function b(t,e,n){for(var r in t.success=!0,e){var i=e[r],o=n.clipboardData;o.setData(r,i),"text/plain"===r&&o.getData(r)!==i&&(t.success=!1)}n.preventDefault()}function y(t){var e=new h,n=b.bind(this,e,t);document.addEventListener("copy",n);try{document.execCommand("copy")}finally{document.removeEventListener("copy",n)}return e.success}function w(t,e){m(t);var n=y(e);return g(),n}function m(t){var e=document.getSelection();if(e){var n=document.createRange();n.selectNodeContents(t),e.removeAllRanges(),e.addRange(n)}}function g(){var t=document.getSelection();t&&t.removeAllRanges()}function x(n){return t(this,void 0,void 0,function(){var t;return e(this,function(e){var r,i,o,a,u,c,l,s;if(t="text/plain"in n,v()){if(!t)throw Error("No `text/plain` value was specified.");if(r=n["text/plain"],f.clipboardData.setData("Text",r))return[2,!0];throw Error("Copying failed, possibly because the user rejected it.")}return y(n)||navigator.userAgent.indexOf("Edge")>-1||w(document.body,n)||((i=document.createElement("div")).setAttribute("style","-webkit-user-select: text !important"),i.textContent="temporary element",document.body.appendChild(i),o=w(i,n),document.body.removeChild(i),o)||(a=n["text/plain"],(u=document.createElement("div")).setAttribute("style","-webkit-user-select: text !important"),c=u,u.attachShadow&&(c=u.attachShadow({mode:"open"})),(l=document.createElement("span")).innerText=a,c.appendChild(l),document.body.appendChild(u),m(l),s=document.execCommand("copy"),g(),document.body.removeChild(u),s)?[2,!0]:[2,!1]})})}function E(){return t(this,void 0,void 0,function(){return e(this,function(n){if(l)return[2,l()];if(v())return[2,function(){return t(this,void 0,void 0,function(){var t;return e(this,function(e){if(""===(t=f.clipboardData.getData("Text")))throw Error("Empty clipboard or could not read plain text from clipboard");return[2,t]})})}()];throw Error("Read is not supported in your browser.")})})}function C(t,e){for(var n=0;n<t.length;n++)if(-1!==t[n].types.indexOf(e))return!0;return!1}var T=function(){function n(t,e){var n;for(var r in void 0===e&&(e={}),this.types=Object.keys(t),this._items={},t){var i=t[r];this._items[r]="string"==typeof i?D(r,i):i}this.presentationStyle=null!==(n=null==e?void 0:e.presentationStyle)&&void 0!==n?n:"unspecified"}return n.prototype.getType=function(n){return t(this,void 0,void 0,function(){return e(this,function(t){return[2,this._items[n]]})})},n}();function D(t,e){return new Blob([e],{type:t})}function S(n){return t(this,void 0,void 0,function(){var t,r,i,o,a,u,c;return e(this,function(e){switch(e.label){case 0:t={},r=0,i=n.types,e.label=1;case 1:return r<i.length?(o=i[r],a=t,u=o,[4,n.getType(o)]):[3,4];case 2:a[u]=e.sent(),e.label=3;case 3:return r++,[3,1];case 4:return c={},n.presentationStyle&&(c.presentationStyle=n.presentationStyle),[2,new p(t,c)]}})})}function k(t){var e={};return e["text/plain"]=D(t,"text/plain"),new T(e)}navigator.clipboard||(navigator.clipboard={}),navigator.clipboard.read=function(){return t(this,void 0,void 0,function(){var t;return e(this,function(e){switch(e.label){case 0:return c?[2,c()]:(t=k,[4,E()]);case 1:return[2,[t.apply(void 0,[e.sent()])]]}})})},navigator.clipboard.readText=E,navigator.clipboard.write=function(n){return t(this,void 0,void 0,function(){var r,i,o;return e(this,function(a){switch(a.label){case 0:return s&&p?[4,Promise.all(n.map(S))]:[3,5];case 1:r=a.sent(),a.label=2;case 2:return a.trys.push([2,4,,5]),[4,s(r)];case 3:return[2,a.sent()];case 4:if(i=a.sent(),!C(n,"text/plain")&&!C(n,"text/html"))throw i;return[3,5];case 5:return C(n,"text/plain"),o=x,[4,function(n){return t(this,void 0,void 0,function(){var r,i,o,a,u,c;return e(this,function(l){switch(l.label){case 0:r={},i=0,o=n.types,l.label=1;case 1:return i<o.length?(a=o[i],u=r,c=a,[4,function(n,r){return t(this,void 0,void 0,function(){return e(this,function(i){switch(i.label){case 0:return[4,n.getType(r)];case 1:return[4,function(n){return t(this,void 0,void 0,function(){return e(this,function(t){return[2,new Promise(function(t,e){var r=new FileReader;r.addEventListener("load",function(){var n=r.result;"string"==typeof n?t(n):e("could not convert blob to string")}),r.readAsText(n)})]})})}(i.sent())];case 2:return[2,i.sent()]}})})}(n,a)]):[3,4];case 2:u[c]=l.sent(),l.label=3;case 3:return i++,[3,1];case 4:return[2,r]}})})}(n[0])];case 6:if(!o.apply(void 0,[a.sent()]))throw Error("write() failed");return[2]}})})},navigator.clipboard.writeText=function(n){return t(this,void 0,void 0,function(){return e(this,function(t){var e;if(d)return[2,d(n)];if(!x(((e={})["text/plain"]=n,e)))throw Error("writeText() failed");return[2]})})},window.ClipboardItem=T;try{Response.prototype.blob=async function(){return new Blob([await this.arrayBuffer()],{type:this.headers.get("Content-Type")?.split(";")[0]})}}catch{}}();