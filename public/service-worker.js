if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,n)=>{const c=s||("document"in self?document.currentScript.src:"")||location.href;if(e[c])return;let t={};const o=s=>a(s,c),u={module:{uri:c},exports:t,require:o};e[c]=Promise.all(i.map((s=>u[s]||o(s)))).then((s=>(n(...s),t)))}}define(["./workbox-4754cb34"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3eafaec4cc4191e281631f3bbba07b7d"},{url:"/_next/static/IsJoDYwuLNqu85UyaFsmD/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/IsJoDYwuLNqu85UyaFsmD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1075-d87cd57bec68706e.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/1749-b519eb4d4adb8997.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/2723-4ca4fd2dcb2b5057.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/2967-9b725e4fe37e3b32.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/3224-744ff299218de73b.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/3477-56ea9942c7656eaf.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/3606-69ed8cbbaea3566f.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/41ade5dc-1270abbad53a0c67.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/4938-68e47d94dc85c5a5.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/5250-2456684b1eab219a.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/6395-ae53b13ea37f1f20.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/6729-7de02c13f4bc98f8.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/6845-d51071473eba4920.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/8492-0404776454999c84.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/883-a9ec9c1ff070aff1.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/a5ed7f3c-de48d576bc36a357.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/error-4a625afb830cf4a8.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/loading-213133855359614b.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/not-found-58b592bf55920f07.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/page-aa2d8308209262f2.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/error-b3ace920ea8bc548.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/loading-2fd5c5c1574c23b1.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/not-found-21f06a756fdf0c8e.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/page-00903eb1fd9e3f8d.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/website/page-e915c7a78e5c5512.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/%5Bslug%5D/page-12231e778a13e09e.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/create/page-a4b6b16d5bab14de.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/error-7f8eebd4bac65e2c.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/loading-b06ff52ee0dac0a4.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/not-found-7ad96f4c15ccab03.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/page-c0cb7e32e594f7d4.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/error-f23762b34598891d.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/loading-223e31a06be730f4.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/not-found-2da214d9c6c1c766.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/page-5b71d913f87ea716.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/roles/page-cfccb43ffe5c5ff8.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/users/page-6a436d3df9b34ea0.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/error-e0bd38faec844fec.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/loading-3c7c9d453c334fbc.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/not-found-56c63de39d4f36ba.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/page-e19e37617c601910.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/(dashboard)/layout-9750eef16c96b136.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/_not-found-a8ae053545539884.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/auth/layout-60efd00b137a07ba.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/auth/login/page-0c01f68f5a0a9588.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/auth/signup/page-7fc7a73f0ca40474.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/layout-0d14ae11ff8bd39f.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/app/page-126d5c21cdd80490.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/fd9d1056-917c6c24ee3af519.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/framework-638abc5ad5ea33cc.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/main-a025d8f8e0fc3aa7.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/main-app-5080b6638a8f86e0.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-1ea66c7668d69b21.js",revision:"IsJoDYwuLNqu85UyaFsmD"},{url:"/_next/static/css/7e4a3f62725ef652.css",revision:"7e4a3f62725ef652"},{url:"/_next/static/css/b66e6c5bfcc68dbb.css",revision:"b66e6c5bfcc68dbb"},{url:"/_next/static/media/0066078b55585ece-s.p.ttf",revision:"ed86af2ed5bbaf879e9f2ec2e2eac929"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/29f102afc662829f-s.p.ttf",revision:"b6d08fb2f89a7b71dd0ca70ce941c922"},{url:"/_next/static/media/54c76208542a99cd-s.p.ttf",revision:"5e077c15f6e1d334dd4e9be62b28ac75"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/5f09f4e4c1b6445e-s.p.ttf",revision:"155c2e8af05b78017012be8ff2962731"},{url:"/_next/static/media/62e48611196b08b2-s.p.ttf",revision:"bdb7ba651b7bdcda6ce527b3b6705334"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/762f69bea2cb4058-s.p.ttf",revision:"85caebdc62414beb10457fdc6ca2d4c2"},{url:"/_next/static/media/941396b781615e84-s.p.ttf",revision:"cc10461cb5e0a6f2621c7179f4d6de17"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/c67a6a7546a3e253-s.p.ttf",revision:"d52e2a5ca7f9d70f174ac0a7095dbccf"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/icons/android-chrome-192x192.png",revision:"7d5a0d6592efa670804ae1586d0efbe6"},{url:"/icons/android-chrome-512x512.png",revision:"117ac878b5320ed55d93ae31efc9b63e"},{url:"/icons/apple-touch-icon.png",revision:"4cc73cc09e85b3a407755df21e883687"},{url:"/icons/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/icons/favicon-16x16.png",revision:"8dc91d3bfb991d9c48d46638007df138"},{url:"/icons/favicon-32x32.png",revision:"6b9a156b29575bf513fafd8efc8c05d0"},{url:"/icons/favicon.ico",revision:"6fa4f67397afcc237d130e8147c803f3"},{url:"/icons/icon-192x192.png",revision:"71bce7bff50006c8ffdf9bb08e50d41b"},{url:"/icons/icon-256x256.png",revision:"580398bdcb8f956461410a2ea0a96c16"},{url:"/icons/icon-384x384.png",revision:"6115540106dd07ed954a32cdc1905426"},{url:"/icons/icon-512x512.png",revision:"d96af6f5023161ebb69862162dcd647f"},{url:"/icons/mstile-150x150.png",revision:"fe03ad12200e7bd759561535410f3295"},{url:"/icons/safari-pinned-tab.svg",revision:"fa2bec50138bf903bbd74a16d0112908"},{url:"/images/Pencil.png",revision:"3e60c7a3728185fb59d3024edd62a316"},{url:"/images/avatar-1.png",revision:"b794185eb6e0e2ee3eab0094a01a257e"},{url:"/images/bg4.jpg",revision:"fd6931f5ac09e473e285c005a07c838f"},{url:"/images/default.jpg",revision:"c1b2178526f98c9ae6aa748b39b999f8"},{url:"/images/dummy-avatar.jpg",revision:"31899ac57f01a5bb633cb54f41f46f68"},{url:"/images/empty.svg",revision:"ad17058e0be79216b2a5ad2a66b2769c"},{url:"/images/logo-white.svg",revision:"4644a9eb645b683bdeb2d2fbecfa15a4"},{url:"/images/logo.svg",revision:"b130d5af209425881852bee855384c7f"},{url:"/images/no-transactions.png",revision:"fac49c4673d1fdfb3e285f1234c7affa"},{url:"/images/page_not_found.svg",revision:"228e4ee9247e1cceb504ad2281f14458"},{url:"/images/socialIcons/apple.svg",revision:"01757cfb5d9ec53247c4f7a7d6e06be3"},{url:"/images/socialIcons/discord.svg",revision:"a1200f081a00352e409e8fee72850de8"},{url:"/images/socialIcons/facebook.svg",revision:"caa02e14b090dab2a6387c6a9643202a"},{url:"/images/socialIcons/google.svg",revision:"97ef9e117a1508170a996d37251c893a"},{url:"/images/socialIcons/linkedin.svg",revision:"8886a46babd87b186dbd9cf501311872"},{url:"/images/socialIcons/twitter.svg",revision:"6a71aeef497755725c9b23405d420cc1"},{url:"/images/void-ggu.svg",revision:"27bf9e3d99b21dc17c032c310f1b7717"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
