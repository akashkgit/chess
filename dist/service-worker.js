if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>s(e,t),f={module:{uri:t},exports:o,require:d};i[t]=Promise.all(n.map((e=>f[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-2b403519"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/index.html",revision:"08ea5871bdd36f50dd60fbf4b8939997"},{url:"/main.css",revision:"a9bf9c8393033e36201cd4c0d14222a3"},{url:"/main.js",revision:"b94fdb84467423bb6d3f33b57641ab1f"},{url:"/main.js.LICENSE.txt",revision:"25d87fcf8639664c474fe66a0adadd3f"}],{})}));
